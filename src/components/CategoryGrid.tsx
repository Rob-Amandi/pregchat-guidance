
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

const categoryTitles = {
  en: {
    'understandingFertility': 'Understanding Fertility',
    'healthPreparation': 'Health Preparation',
    'emotionalWellbeing': 'Emotional Well-being',
    'fertilityAwareness': 'Fertility Awareness',
    'nutritionGuide': 'Nutrition Guide',
    'lifestyleChanges': 'Lifestyle Changes',
  },
  sv: {
    'understandingFertility': 'Förstå Fertilitet',
    'healthPreparation': 'Hälsoförberedelser',
    'emotionalWellbeing': 'Emotionellt Välbefinnande',
    'fertilityAwareness': 'Fertilitetsmedvetenhet',
    'nutritionGuide': 'Näringsguide',
    'lifestyleChanges': 'Livsstilsförändringar',
  }
};

const categoryDescriptions = {
  en: {
    'Health Preparation': 'Essential health tips and lifestyle changes to prepare for pregnancy.',
    'Fertility Awareness': 'Understanding your fertility cycle and optimal conception timing.',
    'Nutrition Guide': 'Recommended nutrients and dietary guidelines for pre-pregnancy.',
    'Lifestyle Changes': 'Important lifestyle modifications to enhance fertility and pregnancy readiness.',
    'Emotional Well-being': 'Support and guidance for emotional health during your pre-pregnancy journey.',
    'Understanding Fertility': 'Important statistics and information about fertility and pregnancy journey.'
  },
  sv: {
    'Health Preparation': 'Viktiga hälsoråd och livsstilsförändringar för att förbereda graviditet.',
    'Fertility Awareness': 'Förstå din fertilitetscykel och optimal tid för befruktning.',
    'Nutrition Guide': 'Rekommenderade näringsämnen och kostråd inför graviditet.',
    'Lifestyle Changes': 'Viktiga livsstilsförändringar för att förbättra fertilitet och graviditetsberedskap.',
    'Emotional Well-being': 'Stöd och vägledning för emotionell hälsa under din pre-graviditetsresa.',
    'Understanding Fertility': 'Viktig statistik och information om fertilitet och graviditetsresan.'
  }
};

const emotionalWellbeingContent = {
  en: [
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
  ],
  sv: [
    {
      title: "Hantera Förväntningar",
      content: "Det är normalt att känna en blandning av spänning och ångest när du planerar för graviditet. Ta tid att bearbeta dina känslor."
    },
    {
      title: "Bygga Stöd",
      content: "Prata med din partner, familj eller vänner om din resa. Överväg att gå med i stödgrupper eller forum."
    },
    {
      title: "Egenvårdsmetoder",
      content: "Inkludera stressreducerande aktiviteter som meditation, skonsam träning eller dagboksskrivande i din rutin."
    },
    {
      title: "Professionellt Stöd",
      content: "Tveka inte att prata med en psykolog om dina funderingar eller oro kring graviditet."
    }
  ]
};

const understandingFertilityContent = {
  en: [
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
  ],
  sv: [
    {
      title: "Konceptionstidslinje",
      content: "Ungefär 85% av par blir gravida inom ett år av försök"
    },
    {
      title: "Graviditetsförlust",
      content: "Upp till 1 av 4 kända graviditeter kan sluta i missfall, de flesta under första trimestern"
    },
    {
      title: "Ålder och Fertilitet",
      content: "Fertiliteten minskar naturligt med åldern: vid 30 års ålder är den månatliga konceptionschansen ~20%"
    },
    {
      title: "Flera Faktorer",
      content: "Många faktorer påverkar fertiliteten, inklusive timing, hälsa och livsstil"
    }
  ]
};

const CategoryGrid = ({ guideContent, currentLanguage }: CategoryGridProps) => {
  const titles = categoryTitles[currentLanguage as keyof typeof categoryTitles] || categoryTitles.en;
  
  const getLocalizedDescription = (categoryKey: string) => {
    return categoryDescriptions[currentLanguage as keyof typeof categoryDescriptions]?.[categoryKey] || 
           categoryDescriptions.en[categoryKey as keyof typeof categoryDescriptions.en];
  };

  const categories: Category[] = [
    {
      title: titles.understandingFertility,
      description: getLocalizedDescription('Understanding Fertility'),
      icon: <Heart className="w-6 h-6 text-pink-400" />,
      content: (currentLanguage === 'sv' ? understandingFertilityContent.sv : understandingFertilityContent.en)
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
            currentLanguage={currentLanguage}
          />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default CategoryGrid;
