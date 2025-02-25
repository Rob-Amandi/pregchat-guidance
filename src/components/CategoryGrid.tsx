
import { Stethoscope, Baby, Sparkles, Apple, Heart, Smile } from "lucide-react";
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
    'Emotional Well-being': 'Support and guidance for emotional health during your pre-pregnancy journey.',
  },
  sv: {
    'Health Preparation': 'Viktiga hälsoråd och livsstilsförändringar för att förbereda graviditet.',
    'Fertility Awareness': 'Förstå din fertilitetscykel och optimal tid för befruktning.',
    'Nutrition Guide': 'Rekommenderade näringsämnen och kostråd inför graviditet.',
    'Lifestyle Changes': 'Viktiga livsstilsförändringar för att förbättra fertilitet och graviditetsberedskap.',
    'Emotional Well-being': 'Stöd och vägledning för emotionell hälsa under din pre-graviditetsresa.',
  }
};

const CategoryGrid = ({ guideContent, currentLanguage }: CategoryGridProps) => {
  const categories: Category[] = [
    {
      title: "Understanding Fertility",
      description: "Important statistics and information about fertility and pregnancy journey.",
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      content: [
        {
          title: "Conception Timeline",
          content: "About 85% of couples conceive within one year of trying"
        },
        {
          title: "Pregnancy Loss",
          content: "Up to 1 in 4 known pregnancies may end in miscarriage, most in the first trimester"
        },
        {
          title: "Age and Fertility",
          content: "Fertility rates naturally decline with age: at 30, monthly conception chance is ~20%"
        },
        {
          title: "Multiple Factors",
          content: "Many factors influence fertility, including timing, health, and lifestyle"
        }
      ]
    },
    {
      title: "Health Preparation",
      description: categoryDescriptions[currentLanguage]?.['Health Preparation'] || categoryDescriptions['en']['Health Preparation'],
      icon: <Stethoscope className="w-6 h-6 text-pink-400" />,
      content: guideContent
        .filter(item => item.category === "Health Preparation")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Emotional Well-being",
      description: categoryDescriptions[currentLanguage]?.['Emotional Well-being'] || categoryDescriptions['en']['Emotional Well-being'],
      icon: <Smile className="w-6 h-6 text-yellow-400" />,
      content: [
        {
          title: "Managing Expectations",
          content: "It's normal to feel a mix of excitement and anxiety when planning for pregnancy. Take time to process your emotions."
        },
        {
          title: "Building Support",
          content: "Connect with your partner, family, or friends about your journey. Consider joining support groups or forums."
        },
        {
          title: "Self-Care Practices",
          content: "Incorporate stress-reduction activities like meditation, gentle exercise, or journaling into your routine."
        },
        {
          title: "Professional Support",
          content: "Don't hesitate to speak with a mental health professional about your concerns or anxieties about pregnancy."
        }
      ]
    },
    {
      title: "Fertility Awareness",
      description: categoryDescriptions[currentLanguage]?.['Fertility Awareness'] || categoryDescriptions['en']['Fertility Awareness'],
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      content: guideContent
        .filter(item => item.category === "Fertility Awareness")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Nutrition Guide",
      description: categoryDescriptions[currentLanguage]?.['Nutrition Guide'] || categoryDescriptions['en']['Nutrition Guide'],
      icon: <Apple className="w-6 h-6 text-green-400" />,
      content: guideContent
        .filter(item => item.category === "Nutrition Guide")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: "Lifestyle Changes",
      description: categoryDescriptions[currentLanguage]?.['Lifestyle Changes'] || categoryDescriptions['en']['Lifestyle Changes'],
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
