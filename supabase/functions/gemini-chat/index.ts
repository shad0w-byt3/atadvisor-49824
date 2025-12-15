import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');

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
    
    console.log('Chat request:', { message, language, historyLength: conversationHistory?.length });

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Build system prompt based on language
    const systemPrompts: Record<string, string> = {
      en: `You are an expert agricultural assistant specializing in East African farming, particularly Rwanda. Provide practical, actionable advice on crop management, pest control, weather analysis, soil health, planting schedules, and sustainable farming practices. Keep responses clear, concise, and focused on solutions farmers can implement with locally available resources. Always be helpful, encouraging, and supportive of small-scale farmers.`,
      fr: `Vous êtes un assistant agricole expert spécialisé dans l'agriculture en Afrique de l'Est, particulièrement au Rwanda. Fournissez des conseils pratiques et actionnables sur la gestion des cultures, le contrôle des ravageurs, l'analyse météorologique, la santé des sols, les calendriers de plantation et les pratiques agricoles durables. Gardez les réponses claires, concises et axées sur des solutions que les agriculteurs peuvent mettre en œuvre avec des ressources disponibles localement.`,
      rw: `Uri umunyangazi w'ubuhinzi kabuhariwe mu buhinzi bwo muri Afurika y'Iburasirazuba, cyane cyane mu Rwanda. Tanga inama z'ibikorwa, z'ingenzi ku micungire y'ibihingwa, kugenzura udukoko, isesengura ry'ibihe, ubuzima bw'ubutaka, gahunda zo gutera, n'uburyo burambye bw'ubuhinzi. Komeza ibisubizo byeruye, byoroshye kandi byibande ku bisubizo abahinzi bashobora gushyira mu bikorwa ukoresheje ibikoresho biboneka hafi.`
    };

    const systemPrompt = systemPrompts[language] || systemPrompts.en;

    // Build messages array for Lovable AI
    const messages: Array<{role: string; content: string}> = [
      { role: 'system', content: systemPrompt }
    ];
    
    // Add conversation history if available
    if (conversationHistory && conversationHistory.length > 0) {
      for (const msg of conversationHistory) {
        if (msg.type === 'user') {
          messages.push({ role: 'user', content: msg.text });
        } else if (msg.type === 'bot') {
          messages.push({ role: 'assistant', content: msg.text });
        }
      }
    }

    // Add current message
    messages.push({ role: 'user', content: message });

    // Call Lovable AI Gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: messages,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again in a moment.',
          response: 'I apologize, but I\'m receiving too many requests right now. Please try again in a moment.'
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ 
          error: 'Usage limit reached.',
          response: 'The AI service has reached its usage limit. Please try again later.'
        }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI response received');
    
    const generatedText = data.choices?.[0]?.message?.content || 
      'I apologize, but I could not generate a response. Please try again.';

    return new Response(
      JSON.stringify({ response: generatedText }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        response: 'I apologize, but I encountered an error processing your request. Please try again.'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
