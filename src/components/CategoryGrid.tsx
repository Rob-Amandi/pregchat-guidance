
import { Stethoscope, Baby, Sparkles, Apple } from "lucide-react";
import PregnancyCard from "@/components/PregnancyCard";
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

interface CategoryGridProps {
  guideContent: any[];
  currentLanguage: string;
}

const categoryDescriptions = {
  en: {
    'Health Preparation': 'Essential health tips and lifestyle changes to prepare for pregnancy.',
    'Fertility Awareness': 'Understanding your fertility cycle and optimal conception timing.',
    'Nutrition Guide': 'Recommended nutrients and dietary guidelines for pre-pregnancy.',
    'Lifestyle Changes': 'Important lifestyle modifications to enhance fertility and pregnancy readiness.',
  }
};

const CategoryGrid = ({ guideContent, currentLanguage }: CategoryGridProps) => {
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

  return (
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
  );
};

export default CategoryGrid;
