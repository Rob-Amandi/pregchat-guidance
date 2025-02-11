
import { Heart, Baby, Calendar, Book, LogOut } from "lucide-react";
import PregnancyCard from "@/components/PregnancyCard";
import ChatInterface from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";

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

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);

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
    queryKey: ['pregnancyGuideContent'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pregnancy_guide_content')
        .select('*');
      
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
      description: "Essential health tips and lifestyle changes to prepare for pregnancy.",
      icon: <Heart className="w-6 h-6 text-primary" />,
      content: guideContent
        .filter(item => item.category === "Health Preparation")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Fertility Awareness",
      description: "Understanding your fertility cycle and optimal conception timing.",
      icon: <Calendar className="w-6 h-6 text-primary" />,
      content: guideContent
        .filter(item => item.category === "Fertility Awareness")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Nutrition Guide",
      description: "Recommended nutrients and dietary guidelines for pre-pregnancy.",
      icon: <Book className="w-6 h-6 text-primary" />,
      content: guideContent
        .filter(item => item.category === "Nutrition Guide")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Lifestyle Changes",
      description: "Important lifestyle modifications to enhance fertility and pregnancy readiness.",
      icon: <Baby className="w-6 h-6 text-primary" />,
      content: guideContent
        .filter(item => item.category === "Lifestyle Changes")
        .map(item => ({ title: item.title, content: item.content })),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">PregnancyGuide</h1>
          {user ? (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          ) : (
            <Button variant="outline" onClick={() => navigate("/auth")}>
              Login
            </Button>
          )}
        </div>

        <section className="text-center space-y-4 animate-fade-in">
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your comprehensive guide to preparing for pregnancy, with expert advice and personalized support.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
          {categories.map((category, index) => (
            <PregnancyCard
              key={index}
              title={category.title}
              description={category.description}
              icon={category.icon}
              content={category.content}
            />
          ))}
        </section>

        <section className="space-y-6 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center text-gray-800">Ask Your Questions</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Get personalized answers to your pre-pregnancy questions from our AI assistant.
          </p>
          <ChatInterface />
        </section>
      </div>
    </div>
  );
};

export default Index;
