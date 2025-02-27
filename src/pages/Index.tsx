
import ChatInterface from "@/components/ChatInterface";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import CategoryGrid from "@/components/CategoryGrid";
import { Sparkles, BookOpen, MessageCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const { data: guideContent = [] } = useQuery({
    queryKey: ['pregnancyGuideContent', currentLanguage],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pregnancy_guide_content')
        .select('*')
        .eq('language', currentLanguage);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: currentLanguage === 'sv' 
            ? "Kunde inte ladda innehåll. Försök igen senare." 
            : "Failed to load content. Please try again later.",
        });
        return [];
      }
      
      return data;
    },
  });

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/auth");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: currentLanguage === 'sv' ? "Fel" : "Error",
        description: error.message,
      });
    }
  };

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  const translations = {
    en: {
      welcome: "Welcome to Pre-PregnancyGuide",
      description: "Your comprehensive guide to preparing for pregnancy, with expert advice and personalized support.",
      expertResources: "Expert Resources",
      expertResourcesDesc: "Access comprehensive guides and articles about pre-pregnancy preparation.",
      aiSupport: "AI Support",
      aiSupportDesc: "Get instant answers to your questions from our AI assistant.",
      personalizedJourney: "Personalized Journey",
      personalizedJourneyDesc: "Follow a customized path to prepare for your pregnancy journey.",
      askQuestions: "Ask Your Questions",
      askQuestionsDesc: "Get personalized answers to your pre-pregnancy questions from our AI assistant."
    },
    sv: {
      welcome: "Välkommen till Pre-PregnancyGuide",
      description: "Din omfattande guide för graviditetsförberedelser, med expertråd och personligt stöd.",
      expertResources: "Expertresurser",
      expertResourcesDesc: "Få tillgång till omfattande guider och artiklar om graviditetsförberedelser.",
      aiSupport: "AI-stöd",
      aiSupportDesc: "Få direkta svar på dina frågor från vår AI-assistent.",
      personalizedJourney: "Personlig Resa",
      personalizedJourneyDesc: "Följ en anpassad väg för att förbereda din graviditetsresa.",
      askQuestions: "Ställ Dina Frågor",
      askQuestionsDesc: "Få personliga svar på dina frågor om graviditetsförberedelse från vår AI-assistent."
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <div className="min-h-screen bg-[#FBF2F4]">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-8">
          <Header 
            user={user}
            currentLanguage={currentLanguage}
            onLanguageChange={handleLanguageChange}
            onLogout={handleLogout}
          />

          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="text-center space-y-4 py-6"
          >
            <div className="max-w-3xl mx-auto space-y-4">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text inline-flex items-center gap-2">
                  {t.welcome}
                  <Sparkles className="inline-block text-pink-400" />
                </h2>
              </motion.div>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white/80 rounded-xl shadow-md"
              >
                <BookOpen className="w-8 h-8 text-teal-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">{t.expertResources}</h3>
                <p className="text-gray-600">{t.expertResourcesDesc}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white/80 rounded-xl shadow-md"
              >
                <MessageCircle className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">{t.aiSupport}</h3>
                <p className="text-gray-600">{t.aiSupportDesc}</p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 bg-white/80 rounded-xl shadow-md"
              >
                <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">{t.personalizedJourney}</h3>
                <p className="text-gray-600">{t.personalizedJourneyDesc}</p>
              </motion.div>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative py-6"
          >
            <CategoryGrid 
              guideContent={guideContent}
              currentLanguage={currentLanguage}
            />
          </motion.div>

          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-4 py-6 bg-white/50 rounded-3xl shadow-lg p-6"
          >
            <div className="max-w-3xl mx-auto text-center space-y-3">
              <motion.h2 
                className="text-3xl font-semibold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {t.askQuestions}
              </motion.h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {t.askQuestionsDesc}
              </p>
            </div>
            <ChatInterface currentLanguage={currentLanguage} />
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Index;
