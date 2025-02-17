
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-6">
      <div 
        className="fixed inset-0 opacity-10 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("/placeholder.svg")' }}
      />
      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
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
          className="text-center space-y-4"
        >
          <motion.div 
            className="w-40 h-40 mx-auto mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img 
              src="/lovable-uploads/7d374c9b-8f90-4dfd-9538-9d2288c82118.png" 
              alt="PregnancyGuide Logo" 
              className="w-full h-full object-contain"
            />
          </motion.div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
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
          className="space-y-6"
        >
          <motion.h2 
            className="text-3xl font-semibold text-center bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Ask Your Questions
          </motion.h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
            Get personalized answers to your pre-pregnancy questions from our AI assistant.
          </p>
          <ChatInterface />
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
