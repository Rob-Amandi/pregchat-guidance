import { Stethoscope, Baby, Sparkles, Apple, LogOut } from "lucide-react";
import PregnancyCard from "@/components/PregnancyCard";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import LanguageSelector from "@/components/LanguageSelector";
import { motion } from "framer-motion";

interface ContentItem {
  title: string;
  content: string;
}

interface Category {
  title: string;
  description: string;
  icon: React.ReactNode;
  content?: ContentItem[];
}

const categoryDescriptions = {
  en: {
    'Health Preparation': 'Essential health tips and lifestyle changes to prepare for pregnancy.',
    'Fertility Awareness': 'Understanding your fertility cycle and optimal conception timing.',
    'Nutrition Guide': 'Recommended nutrients and dietary guidelines for pre-pregnancy.',
    'Lifestyle Changes': 'Important lifestyle modifications to enhance fertility and pregnancy readiness.',
  },
  sv: {
    'Health Preparation': 'Viktiga hälsotips och livsstilsförändringar för att förbereda graviditet.',
    'Fertility Awareness': 'Förstå din fertilitetscykel och optimal tid för befruktning.',
    'Nutrition Guide': 'Rekommenderade näringsämnen och kostråd före graviditet.',
    'Lifestyle Changes': 'Viktiga livsstilsförändringar för att förbättra fertilitet och graviditetsberedskap.',
  }
};

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
          description: "Failed to load content. Please try again later.",
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
        title: "Error",
        description: error.message,
      });
    }
  };

  const categories: Category[] = [
    {
      title: "Health Preparation",
      description: categoryDescriptions[currentLanguage]['Health Preparation'],
      icon: <Stethoscope className="w-6 h-6 text-pink-400" />,
      content: guideContent
        .filter(item => item.category === "Health Preparation")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Fertility Awareness",
      description: categoryDescriptions[currentLanguage]['Fertility Awareness'],
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      content: guideContent
        .filter(item => item.category === "Fertility Awareness")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Nutrition Guide",
      description: categoryDescriptions[currentLanguage]['Nutrition Guide'],
      icon: <Apple className="w-6 h-6 text-green-400" />,
      content: guideContent
        .filter(item => item.category === "Nutrition Guide")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Lifestyle Changes",
      description: categoryDescriptions[currentLanguage]['Lifestyle Changes'],
      icon: <Baby className="w-6 h-6 text-blue-400" />,
      content: guideContent
        .filter(item => item.category === "Lifestyle Changes")
        .map(item => ({ title: item.title, content: item.content })),
    },
  ];

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center"
        >
          <motion.h1 
            className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            PregnancyGuide
          </motion.h1>
          <div className="flex items-center gap-4">
            <LanguageSelector
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
            {user ? (
              <Button 
                variant="outline" 
                onClick={handleLogout} 
                className="hover:bg-pink-50 transition-colors duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                </motion.div>
                Logout
              </Button>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => navigate("/auth")} 
                className="hover:bg-pink-50 transition-colors duration-300"
              >
                Login
              </Button>
            )}
          </div>
        </motion.div>

        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-4"
        >
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {currentLanguage === 'en' 
              ? "Your comprehensive guide to preparing for pregnancy, with expert advice and personalized support."
              : "Din omfattande guide för att förbereda graviditet, med expertråd och personligt stöd."}
          </p>
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PregnancyCard
                title={category.title}
                description={category.description}
                icon={category.icon}
                content={category.content}
              />
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-6"
        >
          <motion.h2 
            className="text-3xl font-semibold text-center bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {currentLanguage === 'en' ? "Ask Your Questions" : "Ställ Dina Frågor"}
          </motion.h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            {currentLanguage === 'en'
              ? "Get personalized answers to your pre-pregnancy questions from our AI assistant."
              : "Få personliga svar på dina frågor om graviditet från vår AI-assistent."}
          </p>
          <ChatInterface />
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
