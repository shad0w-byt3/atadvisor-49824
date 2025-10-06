import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language, conversationHistory } = await req.json();
    
    console.log('Gemini chat request:', { message, language, historyLength: conversationHistory?.length });

    if (!GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY is not configured');
    }

    // Build system prompt based on language
    const systemPrompts = {
      en: "You are an expert agricultural assistant specializing in East African farming, particularly Rwanda. Provide practical, actionable advice on crop management, pest control, weather analysis, soil health, planting schedules, and sustainable farming practices. Keep responses clear, concise, and focused on solutions farmers can implement with locally available resources.",
      fr: "Vous êtes un assistant agricole expert spécialisé dans l'agriculture en Afrique de l'Est, particulièrement au Rwanda. Fournissez des conseils pratiques et actionnables sur la gestion des cultures, le contrôle des ravageurs, l'analyse météorologique, la santé des sols, les calendriers de plantation et les pratiques agricoles durables. Gardez les réponses claires, concises et axées sur des solutions que les agriculteurs peuvent mettre en œuvre avec des ressources disponibles localement.",
      rw: "Uri umunyangazi w'ubuhinzi kabuhariwe mu buhinzi bwo muri Afurika y'Iburasirazuba, cyane cyane mu Rwanda. Tanga inama z'ibikorwa, z'ingenzi ku micungire y'ibihingwa, kugenzura udukoko, isesengura ry'ibihe, ubuzima bw'ubutaka, gahunda zo gutera, n'uburyo burambye bw'ubuhinzi. Komeza ibisubizo byeruye, byoroshye kandi byibanze ku bisubizo abahinzi bashobora gushyira mu bikorwa ukoresheje ibikoresho biboneka hafi."
    };

    const systemPrompt = systemPrompts[language as keyof typeof systemPrompts] || systemPrompts.en;

    // Format conversation history for Gemini
    const contents = [];
    
    // Add conversation history if available
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        if (msg.type === 'user') {
          contents.push({
            role: 'user',
            parts: [{ text: msg.text }]
          });
        } else if (msg.type === 'bot') {
          contents.push({
            role: 'model',
            parts: [{ text: msg.text }]
          });
        }
      }
    }

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: contents,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Gemini response received');
    
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      'I apologize, but I could not generate a response. Please try again.';

    return new Response(
      JSON.stringify({ response: generatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in gemini-chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        response: 'I apologize, but I encountered an error processing your request. Please try again.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
