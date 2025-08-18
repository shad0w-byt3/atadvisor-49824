
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { farmProfile, weatherData, marketData, timeframe } = await req.json();

    console.log('Generating AI tips for timeframe:', timeframe);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini-2025-04-14',
        messages: [
          {
            role: 'system',
            content: `You are an expert agricultural advisor for East African farmers, specializing in Rwanda's climate and farming conditions. Generate personalized, actionable farming tips based on current conditions, farm profile, and local context. Focus on practical advice that can be implemented with locally available resources.`
          },
          {
            role: 'user',
            content: `Generate ${timeframe} farming tips for a farm with the following profile:
            
            Farm Profile: ${JSON.stringify(farmProfile || {
              location: 'Kigali, Rwanda',
              crops: ['maize', 'beans', 'cassava', 'sweet_potatoes'],
              farmSize: '2 hectares',
              experience: 'intermediate',
              budget: 'moderate'
            })}
            
            Current Weather: ${JSON.stringify(weatherData || {
              temperature: '24°C',
              humidity: '68%',
              rainfall: 'moderate',
              season: 'dry season'
            })}
            
            Market Conditions: ${JSON.stringify(marketData || {
              tomatoPrices: 'high',
              beanPrices: 'stable',
              fertilizerCosts: 'moderate'
            })}
            
            Please provide 3-5 specific, actionable tips in JSON format:
            {
              "tips": [
                {
                  "title": "tip title",
                  "description": "detailed actionable advice",
                  "category": "weather-based|crop-specific|market-based|pest-management|soil-health",
                  "priority": "high|medium|low",
                  "timeRelevant": "specific timeframe for action",
                  "basedOn": ["factors this tip is based on"],
                  "localResources": ["local materials or methods suggested"],
                  "expectedBenefit": "what farmer can expect"
                }
              ]
            }`
          }
        ],
        max_completion_tokens: 1200
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const tipsText = data.choices[0].message.content;
    
    console.log('AI Tips generated:', tipsText);

    let tips;
    try {
      const jsonMatch = tipsText.match(/```json\n([\s\S]*?)\n```/) || tipsText.match(/\{[\s\S]*\}/);
      const jsonStr = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : tipsText;
      tips = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error('Error parsing tips as JSON:', parseError);
      tips = {
        tips: [
          {
            title: "Daily Crop Monitoring",
            description: "Check your crops daily for signs of pests or disease, especially during the current weather conditions.",
            category: "crop-specific",
            priority: "high",
            timeRelevant: "Daily",
            basedOn: ["Current weather conditions", "Local pest patterns"],
            localResources: ["Visual inspection", "Local farming knowledge"],
            expectedBenefit: "Early detection prevents major crop losses"
          }
        ],
        rawResponse: tipsText
      };
    }

    return new Response(JSON.stringify(tips), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-custom-tips function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      tips: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
