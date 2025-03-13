
import { Heart, Baby, Stethoscope, Smile, Sparkles, Apple } from "lucide-react";
import { 
  categoryTitles, 
  categoryDescriptions, 
  emotionalWellbeingContent, 
  understandingFertilityContent, 
  birthControlContent,
  Category
} from './CategoryData';

export const getCategoryData = (
  currentLanguage: string,
  guideContent: any[]
): Category[] => {
  const titles = categoryTitles[currentLanguage as keyof typeof categoryTitles] || categoryTitles.en;
  
  const getLocalizedDescription = (categoryKey: string) => {
    return categoryDescriptions[currentLanguage as keyof typeof categoryDescriptions]?.[categoryKey] || 
           categoryDescriptions.en[categoryKey as keyof typeof categoryDescriptions.en];
  };

  return [
    {
      title: titles.understandingFertility,
      description: getLocalizedDescription('Understanding Fertility'),
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      content: (currentLanguage === 'sv' ? understandingFertilityContent.sv : understandingFertilityContent.en)
    },
    {
      title: titles.birthControl,
      description: getLocalizedDescription('Birth Control Methods'),
      icon: <Baby className="w-6 h-6 text-purple-500" />,
      content: (currentLanguage === 'sv' ? birthControlContent.sv : birthControlContent.en)
    },
    {
      title: titles.healthPreparation,
      description: getLocalizedDescription('Health Preparation'),
      icon: <Stethoscope className="w-6 h-6 text-pink-400" />,
      content: guideContent
        .filter(item => item.category === "Health Preparation")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: titles.emotionalWellbeing,
      description: getLocalizedDescription('Emotional Well-being'),
      icon: <Smile className="w-6 h-6 text-yellow-400" />,
      content: (currentLanguage === 'sv' ? emotionalWellbeingContent.sv : emotionalWellbeingContent.en)
    },
    {
      title: titles.fertilityAwareness,
      description: getLocalizedDescription('Fertility Awareness'),
      icon: <Sparkles className="w-6 h-6 text-purple-400" />,
      content: guideContent
        .filter(item => item.category === "Fertility Awareness")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: titles.nutritionGuide,
      description: getLocalizedDescription('Nutrition Guide'),
      icon: <Apple className="w-6 h-6 text-green-400" />,
      content: guideContent
        .filter(item => item.category === "Nutrition Guide")
        .map(item => ({ title: item.title, content: item.content })),
    },
    {
      title: titles.lifestyleChanges,
      description: getLocalizedDescription('Lifestyle Changes'),
      icon: <Baby className="w-6 h-6 text-blue-400" />,
      content: guideContent
        .filter(item => item.category === "Lifestyle Changes")
        .map(item => ({ title: item.title, content: item.content })),
    },
  ];
};
