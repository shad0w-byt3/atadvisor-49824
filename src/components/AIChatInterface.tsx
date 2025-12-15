import { useState, useRef, useEffect } from 'react';
import { Send, Mic, Camera, Bot, User, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

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
    const welcomeMessages: Record<string, string> = {
      en: "Hello! I'm your AI farming assistant powered by real AI. I can help with crop management, pest control, weather analysis, and agricultural best practices for East Africa. How can I help you today?",
      fr: "Bonjour! Je suis votre assistant agricole IA propulsé par une vraie IA. Je peux aider avec la gestion des cultures, le contrôle des ravageurs, l'analyse météorologique et les meilleures pratiques agricoles pour l'Afrique de l'Est. Comment puis-je vous aider aujourd'hui?",
      rw: "Muraho! Ndi umunyangazi wawe w'ubuhinzi wa AI ukoresha AI nyayo. Nshobora gufasha mu micungire y'ibihingwa, kugenzura udukoko, isesengura ry'ibihe, n'uburyo bwiza bw'ubuhinzi mu Burasirazuba bwa Afurika. Ese nshobora kugufasha iki uyu munsi?"
    };

    setMessages([{
      id: 1,
      type: 'bot',
      text: welcomeMessages[language] || welcomeMessages.en,
      timestamp: new Date()
    }]);
  }, [language]);

  const quickQuestions: Record<string, string[]> = {
    en: [
      "What's wrong with my tomato plants?",
      "Best time to plant corn in Rwanda?",
      "How to prevent pest damage?",
      "Current market prices for beans?"
    ],
    fr: [
      "Qu'est-ce qui ne va pas avec mes tomates?",
      "Meilleur moment pour planter du maïs?",
      "Comment prévenir les dégâts des ravageurs?",
      "Prix actuels du marché pour les haricots?"
    ],
    rw: [
      "Niki kibi ku bihingwa byanjye by'inyanya?",
      "Ni ryari igihe cyiza cyo gutera ibigori?",
      "Nigute nasanga udukoko dutagira nabi?",
      "Ibiciro by'isoko by'ibishyimbo ubu?"
    ]
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

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

    try {
      // Call the real AI edge function
      const { data, error } = await supabase.functions.invoke('gemini-chat', {
        body: {
          message: newUserMessage.text,
          language: language,
          conversationHistory: messages.map(m => ({
            type: m.type,
            text: m.text
          }))
        }
      });

      if (error) {
        throw new Error(error.message || 'Failed to get AI response');
      }

      const responseText = data?.response || 'I apologize, but I could not process your request. Please try again.';
      
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: responseText,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message to chat
      const errorMessages: Record<string, string> = {
        en: "I apologize, but I encountered an error. Please try again in a moment.",
        fr: "Je m'excuse, mais j'ai rencontré une erreur. Veuillez réessayer dans un moment.",
        rw: "Mbabarira, ariko nabonye ikosa. Ongera ugerageze mu kanya."
      };
      
      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        text: errorMessages[language] || errorMessages.en,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      
      toast({
        title: language === 'en' ? 'Connection Issue' : language === 'fr' ? 'Problème de Connexion' : 'Ikibazo cy\'Isano',
        description: language === 'en' ? 'Please check your connection and try again.' :
                    language === 'fr' ? 'Vérifiez votre connexion et réessayez.' :
                    'Suzuma umurongo wawe kandi ugerageze ukundi.',
        variant: 'destructive'
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setMessage(question);
  };

  const handleVoiceInput = () => {
    toast({
      title: language === 'en' ? "Voice Input" : language === 'fr' ? "Entrée Vocale" : "Ijwi",
      description: language === 'en' ? "Voice input feature coming soon!" :
                  language === 'fr' ? "Fonction d'entrée vocale bientôt disponible!" :
                  "Ikoranabuhanga ryo kwumva ijwi rizaza vuba!"
    });
  };

  const handleImageUpload = () => {
    toast({
      title: language === 'en' ? "Image Analysis" : language === 'fr' ? "Analyse d'Image" : "Isesengura ry'Ishusho",
      description: language === 'en' ? "Use the Camera Analysis feature for crop image analysis!" :
                  language === 'fr' ? "Utilisez la fonction Analyse Caméra pour l'analyse d'images de cultures!" :
                  "Koresha ikoranabuhanga rya Camera Analysis kugira usesengure amashusho y'ibihingwa!"
    });
  };

  const clearConversation = () => {
    const welcomeMessages: Record<string, string> = {
      en: "Hello! I'm your AI farming assistant powered by real AI. I can help with crop management, pest control, weather analysis, and agricultural best practices for East Africa. How can I help you today?",
      fr: "Bonjour! Je suis votre assistant agricole IA propulsé par une vraie IA. Je peux aider avec la gestion des cultures, le contrôle des ravageurs, l'analyse météorologique et les meilleures pratiques agricoles pour l'Afrique de l'Est. Comment puis-je vous aider aujourd'hui?",
      rw: "Muraho! Ndi umunyangazi wawe w'ubuhinzi wa AI ukoresha AI nyayo. Nshobora gufasha mu micungire y'ibihingwa, kugenzura udukoko, isesengura ry'ibihe, n'uburyo bwiza bw'ubuhinzi mu Burasirazuba bwa Afurika. Ese nshobora kugufasha iki uyu munsi?"
    };

    setMessages([{
      id: 1,
      type: 'bot',
      text: welcomeMessages[language] || welcomeMessages.en,
      timestamp: new Date()
    }]);
    
    toast({
      title: language === 'en' ? "Conversation Cleared" : language === 'fr' ? "Conversation Effacée" : "Ibiganiro Byasibwe",
      description: language === 'en' ? "Starting fresh conversation." :
                  language === 'fr' ? "Démarrage d'une nouvelle conversation." :
                  "Gutangira ibiganiro bishya."
    });
  };

  return (
    <Card className="agriculture-card p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-agriculture-green dark:text-green-400 flex items-center gap-2">
            <Bot className="h-5 w-5" />
            {language === 'en' ? 'AI Farming Assistant' : 
             language === 'fr' ? 'Assistant Agricole IA' : 
             'Umunyangazi w\'Ubuhinzi wa AI'}
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearConversation}
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          {language === 'en' ? 'Powered by real AI - Ask anything about farming!' :
           language === 'fr' ? 'Propulsé par une vraie IA - Posez vos questions!' :
           'Igenzurwa na AI nyayo - Baza ibibazo byose!'}
        </p>
        {/* AI Disclaimer */}
        <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            ⚠️ {language === 'en' ? 'AI advice is for guidance only. Consult local experts for critical decisions.' :
                language === 'fr' ? 'Les conseils IA sont indicatifs. Consultez des experts locaux pour les décisions critiques.' :
                'Inama za AI ni iz\'ubuyobozi gusa. Baza impuguke z\'aho uherereye ku byemezo bikomeye.'}
          </p>
        </div>
      </div>

      {/* Quick Questions */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(quickQuestions[language] || quickQuestions.en).map((question, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            className="text-xs h-auto py-1.5 px-2"
            onClick={() => handleQuickQuestion(question)}
          >
            {question}
          </Button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto mb-4 space-y-3 p-2 bg-muted/30 rounded-lg">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-lg ${
                msg.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card border border-border text-foreground'
              }`}
            >
              <div className="flex items-start gap-2">
                {msg.type === 'bot' && <Bot className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />}
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                {msg.type === 'user' && <User className="h-4 w-4 mt-0.5 flex-shrink-0" />}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-card border border-border p-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">
                  {language === 'en' ? 'Thinking...' : language === 'fr' ? 'Réflexion...' : 'Ndatekereza...'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-shrink-0"
          onClick={handleVoiceInput}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          className="flex-shrink-0"
          onClick={handleImageUpload}
        >
          <Camera className="h-4 w-4" />
        </Button>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={
            language === 'en' ? "Ask about farming..." :
            language === 'fr' ? "Posez votre question..." :
            "Baza ku buhinzi..."
          }
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-1"
          disabled={isTyping}
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!message.trim() || isTyping}
          className="flex-shrink-0 bg-primary hover:bg-primary/90"
        >
          {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </div>
    </Card>
  );
};
