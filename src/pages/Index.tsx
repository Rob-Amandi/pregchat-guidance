import ChatInterface from "@/components/ChatInterface";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import CategoryGrid from "@/components/CategoryGrid";

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

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language);
  };

  return (
    <div className="min-h-screen bg-[#FDF8F0]">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
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
            className="text-center space-y-8 py-12"
          >
            <div className="max-w-3xl mx-auto space-y-6">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text">
                Welcome to PregnancyGuide
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your comprehensive guide to preparing for pregnancy, with expert advice and personalized support.
              </p>
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative py-12"
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
            className="space-y-8 py-12 bg-white/50 rounded-3xl shadow-lg p-8"
          >
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <motion.h2 
                className="text-3xl font-semibold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Ask Your Questions
              </motion.h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Get personalized answers to your pre-pregnancy questions from our AI assistant.
              </p>
            </div>
            <ChatInterface />
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Index;
