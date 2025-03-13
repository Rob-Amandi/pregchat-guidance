import { ReactNode } from "react";

export interface ContentItem {
  title: string;
  content: string;
}

export interface Category {
  title: string;
  description: string;
  icon: ReactNode;
  content?: ContentItem[];
}

export const categoryTitles = {
  en: {
    'understandingFertility': 'Understanding Fertility',
    'healthPreparation': 'Health Preparation',
    'emotionalWellbeing': 'Emotional Well-being',
    'fertilityAwareness': 'Fertility Awareness',
    'nutritionGuide': 'Nutrition Guide',
    'lifestyleChanges': 'Lifestyle Changes',
    'birthControl': 'Birth Control Methods'
  },
  sv: {
    'understandingFertility': 'Förstå Fertilitet',
    'healthPreparation': 'Hälsoförberedelser',
    'emotionalWellbeing': 'Emotionellt Välbefinnande',
    'fertilityAwareness': 'Fertilitetsmedvetenhet',
    'nutritionGuide': 'Näringsguide',
    'lifestyleChanges': 'Livsstilsförändringar',
    'birthControl': 'Preventivmedel'
  }
};

export const categoryDescriptions = {
  en: {
    'Health Preparation': 'Essential health tips and lifestyle changes to prepare for pregnancy.',
    'Fertility Awareness': 'Understanding your fertility cycle and optimal conception timing.',
    'Nutrition Guide': 'Recommended nutrients and dietary guidelines for pre-pregnancy.',
    'Lifestyle Changes': 'Important lifestyle modifications to enhance fertility and pregnancy readiness.',
    'Emotional Well-being': 'Support and guidance for emotional health during your pre-pregnancy journey.',
    'Understanding Fertility': 'Important statistics and information about fertility and pregnancy journey.',
    'Birth Control Methods': 'Information about contraceptives and their effects on future fertility.'
  },
  sv: {
    'Health Preparation': 'Viktiga hälsoråd och livsstilsförändringar för att förbereda graviditet.',
    'Fertility Awareness': 'Förstå din fertilitetscykel och optimal tid för befruktning.',
    'Nutrition Guide': 'Rekommenderade näringsämnen och kostråd inför graviditet.',
    'Lifestyle Changes': 'Viktiga livsstilsförändringar för att förbättra fertilitet och graviditetsberedskap.',
    'Emotional Well-being': 'Stöd och vägledning för emotionell hälsa under din pre-graviditetsresa.',
    'Understanding Fertility': 'Viktig statistik och information om fertilitet och graviditetsresan.',
    'Birth Control Methods': 'Information om preventivmedel och deras påverkan på framtida fertilitet.'
  }
};

export const emotionalWellbeingContent = {
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

export const understandingFertilityContent = {
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

export const birthControlContent = {
  en: [
    {
      title: "Hormonal Methods",
      content: "Pills, patches, and rings may delay return to fertility by 1-3 months on average. Side effects can include mood changes, headaches, and changes in menstrual flow."
    },
    {
      title: "Long-Acting Methods",
      content: "IUDs and implants allow quick return to fertility after removal. Hormonal IUDs may cause spotting, while copper IUDs can cause heavier periods."
    },
    {
      title: "Injectable Contraceptives",
      content: "Depo-Provera shots may delay fertility return for 6-12 months after the last injection. Side effects can include weight gain and irregular bleeding."
    },
    {
      title: "Preparing for Conception",
      content: "Consider stopping hormonal contraception 2-3 months before trying to conceive to allow your cycle to regulate and begin prenatal vitamins."
    }
  ],
  sv: [
    {
      title: "Hormonella Metoder",
      content: "P-piller, plåster och ringar kan fördröja återgången till fertilitet med 1-3 månader i genomsnitt. Biverkningar kan inkludera humörförändringar, huvudvärk och förändrat menstruationsflöde."
    },
    {
      title: "Långtidsverkande Metoder",
      content: "Spiraler och implantat möjliggör snabb återgång till fertilitet efter borttagning. Hormonspiraler kan orsaka spotting, medan kopparspiraler kan orsaka kraftigare menstruationer."
    },
    {
      title: "Injicerbara Preventivmedel",
      content: "P-sprutor kan fördröja återgången till fertilitet med 6-12 månader efter den sista injektionen. Biverkningar kan inkludera viktökning och oregelbundna blödningar."
    },
    {
      title: "Förberedelse för Graviditet",
      content: "Överväg att sluta med hormonella preventivmedel 2-3 månader innan du försöker bli gravid för att låta din cykel regleras och börja med vitamintillskott."
    }
  ]
};
