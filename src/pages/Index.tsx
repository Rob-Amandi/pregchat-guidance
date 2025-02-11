
import { Heart, Baby, Calendar, Book } from "lucide-react";
import PregnancyCard from "@/components/PregnancyCard";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const categories = [
    {
      title: "Health Preparation",
      description: "Essential health tips and lifestyle changes to prepare for pregnancy.",
      icon: <Heart className="w-6 h-6 text-primary" />,
    },
    {
      title: "Fertility Awareness",
      description: "Understanding your fertility cycle and optimal conception timing.",
      icon: <Calendar className="w-6 h-6 text-primary" />,
    },
    {
      title: "Nutrition Guide",
      description: "Recommended nutrients and dietary guidelines for pre-pregnancy.",
      icon: <Book className="w-6 h-6 text-primary" />,
    },
    {
      title: "Lifestyle Changes",
      description: "Important lifestyle modifications to enhance fertility and pregnancy readiness.",
      icon: <Baby className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background p-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <section className="text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800">PregnancyGuide</h1>
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
