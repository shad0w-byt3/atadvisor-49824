
import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export const AIChatInterface = () => {
  const { t, language } = useLanguage();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message in current language
  useEffect(() => {
    const welcomeMessages = {
      en: "Hello! I'm your AI farming assistant with expertise in crop management, pest control, weather analysis, and agricultural best practices. How can I help you today?",
      fr: "Bonjour! Je suis votre assistant agricole IA avec une expertise en gestion des cultures, contrôle des ravageurs, analyse météorologique et meilleures pratiques agricoles. Comment puis-je vous aider aujourd'hui?",
      rw: "Muraho! Ndi umunyangazi wawe w'ubuhinzi wa AI ufite ubumenyi mu micungire y'ibihingwa, kugenzura udukoko, isesengura ry'ibihe, n'uburyo bwiza bw'ubuhinzi. Ese nshobora kugufasha iki uyu munsi?"
    };

    setMessages([{
      id: 1,
      type: 'bot',
      text: welcomeMessages[language],
      timestamp: new Date()
    }]);
  }, [language]);

  const quickQuestions = {
    en: [
      "What's wrong with my tomato plants?",
      "Best time to plant corn?",
      "How to prevent pest damage?",
      "Weather impact on crops?"
    ],
    fr: [
      "Qu'est-ce qui ne va pas avec mes plants de tomate?",
      "Meilleur moment pour planter du maïs?",
      "Comment prévenir les dégâts de ravageurs?",
      "Impact météo sur les cultures?"
    ],
    rw: [
      "Niki kibi ku bihingwa byanjye by'inyanya?",
      "Ni ryari igihe cyiza cyo gutera ibigori?",
      "Nigute wasanga udukoko dutagira nabi?",
      "Ibihe bigira ingaruka ki ku bihingwa?"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateMultilingualResponse = (userMessage: string, conversationHistory: Message[], targetLanguage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    const responses = {
      en: {
        tomato: {
          yellow: "Yellow leaves on tomatoes can indicate several issues: 1) Overwatering - check soil drainage, 2) Nitrogen deficiency - apply balanced fertilizer, 3) Early blight - remove affected leaves and improve air circulation, 4) Natural aging of lower leaves. Check the pattern: bottom leaves yellowing is often normal, but widespread yellowing needs attention. What's the current watering schedule?",
          pest: "Common tomato pests include aphids, whiteflies, and hornworms. For organic control: use neem oil spray for aphids, yellow sticky traps for whiteflies, and hand-pick hornworms. Companion planting with basil and marigolds helps deter pests. Are you seeing specific insects or just damage to leaves?",
          general: "Tomatoes thrive in well-draining soil with pH 6.0-6.8. They need consistent watering (1-2 inches per week), full sun (6+ hours), and support structures. Plant after last frost when soil temperature reaches 60°F. Regular pruning of suckers improves fruit production. What specific aspect of tomato growing interests you?"
        },
        corn: {
          planting: "Plant corn when soil temperature consistently reaches 60°F (15°C), typically 2-3 weeks after the last frost. In most regions, this is late April to early June. Corn needs warm soil for germination - cold, wet soil can cause seed rot. Plant in blocks rather than single rows for better pollination. Soil should be well-draining with pH 6.0-6.8.",
          general: "Corn requires deep, fertile soil with good drainage. Space plants 8-12 inches apart in rows 30-36 inches apart. Needs consistent moisture, especially during tasseling and ear development. Apply nitrogen fertilizer at planting and again when plants are knee-high. Watch for corn borers and earworms."
        },
        pest: "Integrated Pest Management (IPM) is most effective: 1) Monitor regularly with sticky traps and visual inspection, 2) Encourage beneficial insects with diverse plantings, 3) Use organic controls first (neem oil, insecticidal soap, diatomaceous earth), 4) Apply targeted treatments only when thresholds are exceeded. What crops are affected and what damage are you seeing?",
        weather: "Weather significantly impacts crop health and timing. Monitor soil moisture with a probe - most crops need 1-1.5 inches of water weekly. During drought, focus water on root zones and mulch heavily. Excessive rain can cause root rot and nutrient leaching - ensure good drainage and consider raised beds. Would you like specific weather adaptation strategies for your crops?",
        default: `I understand you're asking about "${userMessage}". As your farming assistant, I can help with crop selection, planting schedules, pest management, soil health, irrigation, harvesting, and season planning. Could you provide more specific details about your farming situation or the particular challenge you're facing?`
      },
      fr: {
        tomato: {
          yellow: "Les feuilles jaunes sur les tomates peuvent indiquer plusieurs problèmes: 1) Arrosage excessif - vérifiez le drainage du sol, 2) Carence en azote - appliquez un engrais équilibré, 3) Mildiou précoce - retirez les feuilles affectées et améliorez la circulation d'air, 4) Vieillissement naturel des feuilles inférieures. Vérifiez le motif: le jaunissement des feuilles du bas est souvent normal, mais un jaunissement généralisé nécessite attention. Quel est l'horaire d'arrosage actuel?",
          pest: "Les ravageurs communs des tomates incluent les pucerons, les mouches blanches et les vers de la tomate. Pour un contrôle biologique: utilisez un spray d'huile de neem pour les pucerons, des pièges collants jaunes pour les mouches blanches, et ramassez à la main les vers de la tomate. La plantation compagne avec du basilic et des soucis aide à dissuader les ravageurs. Voyez-vous des insectes spécifiques ou juste des dommages aux feuilles?",
          general: "Les tomates prospèrent dans un sol bien drainé avec un pH de 6,0-6,8. Elles ont besoin d'un arrosage constant (2,5-5 cm par semaine), de plein soleil (6+ heures), et de structures de support. Plantez après le dernier gel quand la température du sol atteint 15°C. La taille régulière des drageons améliore la production de fruits. Quel aspect spécifique de la culture de tomates vous intéresse?"
        },
        corn: {
          planting: "Plantez le maïs quand la température du sol atteint constamment 15°C, typiquement 2-3 semaines après le dernier gel. Dans la plupart des régions, c'est fin avril à début juin. Le maïs a besoin d'un sol chaud pour germer - un sol froid et humide peut causer la pourriture des graines. Plantez en blocs plutôt qu'en rangées simples pour une meilleure pollinisation. Le sol devrait être bien drainé avec un pH de 6,0-6,8.",
          general: "Le maïs nécessite un sol profond et fertile avec un bon drainage. Espacez les plants de 20-30 cm dans des rangées de 75-90 cm d'écart. Nécessite une humidité constante, surtout pendant la formation des épis. Appliquez un engrais azoté à la plantation et encore quand les plants arrivent au genou. Surveillez les foreurs et les vers de l'épi."
        },
        pest: "La Gestion Intégrée des Ravageurs (GIR) est la plus efficace: 1) Surveillez régulièrement avec des pièges collants et inspection visuelle, 2) Encouragez les insectes bénéfiques avec des plantations diversifiées, 3) Utilisez d'abord les contrôles biologiques (huile de neem, savon insecticide, terre de diatomée), 4) Appliquez des traitements ciblés seulement quand les seuils sont dépassés. Quelles cultures sont affectées et quels dommages voyez-vous?",
        weather: "La météo impacte significativement la santé des cultures et le timing. Surveillez l'humidité du sol avec une sonde - la plupart des cultures ont besoin de 2,5-4 cm d'eau par semaine. Pendant la sécheresse, concentrez l'eau sur les zones racinaires et paillez abondamment. Une pluie excessive peut causer la pourriture des racines et le lessivage des nutriments - assurez un bon drainage et considérez des plates-bandes surélevées. Voulez-vous des stratégies d'adaptation météo spécifiques pour vos cultures?",
        default: `Je comprends que vous demandez à propos de "${userMessage}". En tant qu'assistant agricole, je peux aider avec la sélection des cultures, les calendriers de plantation, la gestion des ravageurs, la santé du sol, l'irrigation, la récolte, et la planification saisonnière. Pourriez-vous fournir plus de détails spécifiques sur votre situation agricole ou le défi particulier que vous rencontrez?`
      },
      rw: {
        tomato: {
          yellow: "Amababi y'inyanya ahindagurika ashobora kwerekana ibibazo byinshi: 1) Guhira cyane - suzuma ukuntu ubutaka bwumira amazi, 2) Kubura azote - koresha ifumbire ryuzuye, 3) Indwara y'amababi - vana amababi yanduye kandi utezimbere umuyaga, 4) Gusaza bisanzwe kw'amababi y'hepfo. Suzuma uburyo: amababi y'hepfo ahindagurika akunze kuba bisanzwe, ariko ahindagurika menshi akeneye kwitabwaho. Ni gute ugenawo guhira?",
          pest: "Udukoko dusanzwe tw'inyanya harimo aphids, isazi z'umweru, n'inzoka z'inyanya. Kugenzura mu buryo kamere: koresha umuti wa neem kuri aphids, mitego y'umweru kuri isazi z'umweru, kandi ufate inzoka z'inyanya n'amaboko. Gutera basil na marigolds hamwe na nyanya bifasha kugabanya udukoko. Uraba udukoko runaka cyangwa gusa ibyangiritse ku mababi?",
          general: "Inyanya zikura neza mu butaka bwumira amazi bwiza bufite pH 6.0-6.8. Zikeneye guhirwa bikomeye (santimetero 2.5-5 ku cyumweru), iziko ryuzuye (amasaha 6+), n'ibikoresho byo gushigikira. Tera nyuma y'ubukonje bwa nyuma igihe ubushyuhe bw'ubutaka bugeze kuri 15°C. Guca bikomeye guhinga cyongera umusaruro w'imbuto. Ni ikihe kintu cyihariye cyo gutera inyanya ugishaka?"
        },
        corn: {
          planting: "Tera ibigori igihe ubushyuhe bw'ubutaka bugeze kuri 15°C bikomeye, mubisanzwe ni ibyumweru 2-3 nyuma y'ubukonje bwa nyuma. Mu turere twinshi, uku ni ukwezi kwa kane kugeza ku ntangiriro z'ukwezi kwa gatanu. Ibigori bikeneye ubutaka bushyuhe kugira bimere - ubutaka bukonje kandi butoroshye bushobora gutera imbuto zibora. Tera mu turere aho ugereranyije n'imirongo myiza kugira ngo ubone pollinisation myiza. Ubutaka bugomba kuba bwumira amazi bwiza bufite pH 6.0-6.8.",
          general: "Ibigori bikeneye ubutaka bw'imbere kandi bufite umwimerere mwiza hamwe n'ukumira amazi kwiza. Taka ibihingwa hagati ya santimetero 20-30 mu mirongo ya santimetero 75-90. Bikeneye ubushuhe bukomeye, cyane cyane mugihe cyo gukora ibigori. Shyira ifumbire ya azote mugihe cyo gutera kandi ukongera ibihingwa bigeze ku maguru. Kurikirana inzoka z'ibigori n'inzoka z'ibigori."
        },
        pest: "Gucunga Udukoko mu Buryo Buzuye (IPM) ni bwiza cyane: 1) Kurikirana bikomeye hamwe na mitego n'isuzuma ry'amaso, 2) Gushishikariza udukoko dutunga hamwe n'ibimera bitandukanye, 3) Koresha ubanza ubugenzuzi bwa kamere (amavuta ya neem, isabune y'udukoko, diatomaceous earth), 4) Koresha ubuvuzi bwihariye gusa igihe impande zarenga. Ni ibihe bihingwa byangiritse kandi ni iki gihe uraba?",
        weather: "Ibihe bigira ingaruka nyinshi ku buzima bw'ibihingwa n'igihe. Kurikirana ubushuhe bw'ubutaka hamwe na probe - ibihingwa byinshi bikeneye santimetero 2.5-4 z'amazi ku cyumweru. Mugihe cy'amapfa, shyira imbere amazi ku turere tw'imizi kandi shyira mulch cyane. Imvura nyinshi ishobora gutera imizi zibora no gukuramo intungamubiri - emeza ukumira amazi kwiza kandi utekereze ku bitanda byambukiriye. Urashaka ingamba zihariye zo guhangana n'ibihe ku bihingwa byawe?",
        default: `Ndumva ubaza kuri "${userMessage}". Nkumunyangazi wawe w'ubuhinzi, nshobora gufasha mu guhitamo ibihingwa, gahunda zo gutera, gucunga udukoko, ubuzima bw'ubutaka, guhira, gusarura, n'igenamigambi ry'ibihe. Urashobora gutanga amakuru yimbitse agenga ku miterere y'ubuhinzi bwawe cyangwa ikibazo cyihariye ukunda?`
      }
    };

    // Get responses for the target language
    const langResponses = responses[targetLanguage as keyof typeof responses] || responses.en;

    // Crop-specific responses
    if (lowerMessage.includes('tomato') || lowerMessage.includes('inyanya') || lowerMessage.includes('tomate')) {
      if (lowerMessage.includes('yellow') || lowerMessage.includes('leaf') || lowerMessage.includes('feuille') || lowerMessage.includes('ikijumaiju') || lowerMessage.includes('mababi')) {
        return langResponses.tomato.yellow;
      }
      if (lowerMessage.includes('pest') || lowerMessage.includes('bug') || lowerMessage.includes('ravageur') || lowerMessage.includes('udukoko')) {
        return langResponses.tomato.pest;
      }
      return langResponses.tomato.general;
    }

    if (lowerMessage.includes('corn') || lowerMessage.includes('maize') || lowerMessage.includes('maïs') || lowerMessage.includes('ibigori')) {
      if (lowerMessage.includes('plant') || lowerMessage.includes('time') || lowerMessage.includes('planter') || lowerMessage.includes('temps') || lowerMessage.includes('gutera') || lowerMessage.includes('igihe')) {
        return langResponses.corn.planting;
      }
      return langResponses.corn.general;
    }

    if (lowerMessage.includes('pest') || lowerMessage.includes('insect') || lowerMessage.includes('bug') || lowerMessage.includes('ravageur') || lowerMessage.includes('udukoko')) {
      return langResponses.pest;
    }

    if (lowerMessage.includes('weather') || lowerMessage.includes('rain') || lowerMessage.includes('drought') || lowerMessage.includes('météo') || lowerMessage.includes('ibihe') || lowerMessage.includes('imvura')) {
      return langResponses.weather;
    }

    // Default response
    return langResponses.default;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newUserMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      text: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: generateMultilingualResponse(newUserMessage.text, messages, language),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000); // 1-3 second response time
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  const handleVoiceInput = () => {
    toast({
      title: t('camera.title'),
      description: language === 'en' ? "Voice input feature coming soon! This will allow you to speak your farming questions directly." :
                  language === 'fr' ? "Fonction d'entrée vocale bientôt disponible! Cela vous permettra de poser vos questions agricoles directement par la voix." :
                  "Ikoranabuhanga ryo kwumva ijwi rizaza vuba! Iki kizagufasha kubaza ibibazo byawe by'ubuhinzi ukoresha ijwi."
    });
  };

  const handleImageUpload = () => {
    toast({
      title: language === 'en' ? "Image Analysis" : language === 'fr' ? "Analyse d'Image" : "Isesengura ry'Ishusho",
      description: language === 'en' ? "Image upload feature coming soon! This will analyze crop photos for disease and pest identification." :
                  language === 'fr' ? "Fonction de téléchargement d'images bientôt disponible! Cela analysera les photos de cultures pour identifier les maladies et ravageurs." :
                  "Ikoranabuhanga ryo kohereza amashusho rizaza vuba! Iki kizasesengura amashusho y'ibihingwa kugira umenye indwara n'udukoko."
    });
  };

  const clearConversation = () => {
    const welcomeMessages = {
      en: "Hello! I'm your AI farming assistant with expertise in crop management, pest control, weather analysis, and agricultural best practices. How can I help you today?",
      fr: "Bonjour! Je suis votre assistant agricole IA avec une expertise en gestion des cultures, contrôle des ravageurs, analyse météorologique et meilleures pratiques agricoles. Comment puis-je vous aider aujourd'hui?",
      rw: "Muraho! Ndi umunyangazi wawe w'ubuhinzi wa AI ufite ubumenyi mu micungire y'ibihingwa, kugenzura udukoko, isesengura ry'ibihe, n'uburyo bwiza bw'ubuhinzi. Ese nshobora kugufasha iki uyu munsi?"
    };

    setMessages([
      {
        id: 1,
        type: 'bot',
        text: welcomeMessages[language],
        timestamp: new Date()
      }
    ]);
    toast({
      title: language === 'en' ? "Conversation Cleared" : language === 'fr' ? "Conversation Effacée" : "Ibiganiro Byasibwe",
      description: language === 'en' ? "Starting fresh conversation with your farming assistant." :
                  language === 'fr' ? "Démarrage d'une nouvelle conversation avec votre assistant agricole." :
                  "Gutangira ibiganiro bishya na munyangazi wawe w'ubuhinzi."
    });
  };

  return (
    <Card className="agriculture-card p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-agriculture-green flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {language === 'en' ? 'AgriTech Assistant' : 
             language === 'fr' ? 'Assistant AgriTech' : 
             'Umunyangazi wa AgriTech'}
          </h3>
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearConversation}
            className="text-xs hover:bg-green-50"
          >
            {language === 'en' ? 'Clear Chat' : 
             language === 'fr' ? 'Effacer Chat' : 
             'Siba Ibiganiro'}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">
          {language === 'en' ? 'AI-powered farming expertise at your fingertips' :
           language === 'fr' ? 'Expertise agricole alimentée par IA à portée de main' :
           'Ubumenyi bw\'ubuhinzi bw\'AI muri intoki zawe'}
        </p>
      </div>

      {/* Messages */}
      <div className="space-y-3 mb-4 max-h-80 overflow-y-auto">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.type === 'user' ? 'bg-agriculture-green' : 'bg-green-50'
              }`}>
                {msg.type === 'user' ? 
                  <User className="h-4 w-4 text-white" /> : 
                  <Bot className="h-4 w-4 text-agriculture-green" />
                }
              </div>
              <div className={`p-3 rounded-lg text-sm leading-relaxed ${
                msg.type === 'user' 
                  ? 'bg-agriculture-green text-white' 
                  : 'bg-green-50 text-agriculture-green'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 justify-start">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center">
                <Bot className="h-4 w-4 text-agriculture-green" />
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 text-agriculture-green animate-spin" />
                  <span className="text-sm text-agriculture-green">
                    {language === 'en' ? 'Analyzing your question...' :
                     language === 'fr' ? 'Analyse de votre question...' :
                     'Gusesengura ikibazo cyawe...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {quickQuestions[language].map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-left justify-start h-auto p-2 text-xs hover:bg-green-50 transition-colors"
            onClick={() => handleQuickQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          placeholder={
            language === 'en' ? "Ask about crops, weather, pests, soil, or any farming question..." :
            language === 'fr' ? "Demandez sur les cultures, météo, ravageurs, sol, ou toute question agricole..." :
            "Baza ku bihingwa, ibihe, udukoko, ubutaka, cyangwa ikibazo cyose cy'ubuhinzi..."
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSendMessage()}
          className="flex-1"
          disabled={isTyping}
        />
        <Button 
          size="icon" 
          className="agriculture-gradient hover:opacity-90 transition-opacity"
          onClick={handleSendMessage}
          disabled={!message.trim() || isTyping}
        >
          <Send className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleVoiceInput}
          className="hover:bg-green-50 transition-colors"
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleImageUpload}
          className="hover:bg-green-50 transition-colors"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
