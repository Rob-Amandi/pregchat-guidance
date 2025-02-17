
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
    <div className="min-h-screen bg-[#FDF8F0] p-6">
      <div className="max-w-5xl mx-auto space-y-16">
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
          className="text-center space-y-4 mt-12"
        >
          <p className="text-lg text-gray-600 max-w-xl mx-auto leading-relaxed font-light">
            Your comprehensive guide to preparing for pregnancy, with expert advice and personalized support.
          </p>
        </motion.section>

        <CategoryGrid 
          guideContent={guideContent}
          currentLanguage={currentLanguage}
        />

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="space-y-8 pb-16"
        >
          <motion.h2 
            className="text-2xl font-light text-center text-gray-800"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ask Your Questions
          </motion.h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-8 leading-relaxed font-light">
            Get personalized answers to your pre-pregnancy questions from our AI assistant.
          </p>
          <ChatInterface />
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
