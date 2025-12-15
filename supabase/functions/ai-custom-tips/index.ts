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
    const { farmProfile, weatherData, marketData, timeframe } = await req.json();

    console.log('Generating AI tips for timeframe:', timeframe);

    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are an expert agricultural advisor for East African farmers, specializing in Rwanda's climate and farming conditions. Generate personalized, actionable farming tips based on current conditions, farm profile, and local context. Focus on practical advice that can be implemented with locally available resources. Always respond with valid JSON only.`;

    const userPrompt = `Generate ${timeframe || 'daily'} farming tips for a farm with the following profile:
            
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

Provide 3-5 specific, actionable tips. Respond ONLY with this JSON format (no markdown):
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
}`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded',
          tips: [{
            title: "Rate Limit Reached",
            description: "Please try again in a moment",
            category: "system",
            priority: "medium",
            timeRelevant: "Now",
            basedOn: ["System status"],
            localResources: [],
            expectedBenefit: "Full tips available after retry"
          }]
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const tipsText = data.choices?.[0]?.message?.content || '';
    
    console.log('AI Tips generated:', tipsText.substring(0, 200));

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      error: errorMessage,
      tips: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
