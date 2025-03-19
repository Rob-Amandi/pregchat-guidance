import { ReactNode } from "react";

export interface ContentItem {
  title: string;
  content: string;
}

export interface Category {
  title: string;
  description: string;
  icon: ReactNode;
  content: ContentItem[];
}

export const categoryTitles = {
  en: {
    understandingFertility: "Understanding Fertility",
    birthControl: "Birth Control Methods",
    healthPreparation: "Health Preparation",
    emotionalWellbeing: "Emotional Well-being",
    fertilityAwareness: "Fertility Awareness",
    nutritionGuide: "Nutrition Guide",
    lifestyleChanges: "Lifestyle Changes",
    griefAndSupport: "Grief & Support"
  },
  sv: {
    understandingFertility: "Förstå Fertilitet",
    birthControl: "Preventivmetoder",
    healthPreparation: "Hälsoförberedelse",
    emotionalWellbeing: "Emotionellt Välbefinnande",
    fertilityAwareness: "Fertilitetsmedvetenhet",
    nutritionGuide: "Näringsguide",
    lifestyleChanges: "Livsstilsförändringar",
    griefAndSupport: "Sorg & Stöd"
  }
};

export const categoryDescriptions = {
  en: {
    "Understanding Fertility": "Learn about the menstrual cycle and fertility window",
    "Birth Control Methods": "Compare different contraception options",
    "Health Preparation": "Prepare your body for a healthy pregnancy",
    "Emotional Well-being": "Managing emotions and mental health",
    "Fertility Awareness": "Track your fertility signs effectively",
    "Nutrition Guide": "Essential nutrients for fertility and pregnancy",
    "Lifestyle Changes": "Habits to adopt for optimal fertility",
    "Grief & Support": "Resources for coping with pregnancy loss"
  },
  sv: {
    "Understanding Fertility": "Lär dig om menstruationscykeln och fertilitetsfönstret",
    "Birth Control Methods": "Jämför olika preventivmedelsalternativ",
    "Health Preparation": "Förbered din kropp för en hälsosam graviditet",
    "Emotional Well-being": "Hantera känslor och mental hälsa",
    "Fertility Awareness": "Spåra dina fertilitetstecken effektivt",
    "Nutrition Guide": "Essentiella näringsämnen för fertilitet och graviditet",
    "Lifestyle Changes": "Vanor att anta för optimal fertilitet",
    "Grief & Support": "Resurser för att hantera graviditetsförlust"
  }
};

export const understandingFertilityContent = {
  en: [
    {
      title: "The Menstrual Cycle",
      content: "The menstrual cycle is typically 28 days but can range from 21 to 35 days. It consists of the follicular phase, ovulation, and luteal phase. Understanding your cycle helps identify your most fertile days."
    },
    {
      title: "Ovulation",
      content: "Ovulation usually occurs 14 days before your next period. During this time, an egg is released from the ovary and can be fertilized for about 24 hours."
    },
    {
      title: "Fertile Window",
      content: "The fertile window spans about 6 days - the 5 days before ovulation and the day of ovulation. Sperm can survive in the female reproductive tract for up to 5 days."
    }
  ],
  sv: [
    {
      title: "Menstruationscykeln",
      content: "Menstruationscykeln är vanligtvis 28 dagar men kan variera från 21 till 35 dagar. Den består av follikelfasen, ägglossningen och lutealfasen. Att förstå din cykel hjälper dig att identifiera dina mest fertila dagar."
    },
    {
      title: "Ägglossning",
      content: "Ägglossning sker vanligtvis 14 dagar före din nästa menstruation. Under denna tid släpps ett ägg från äggstocken och kan befruktas i cirka 24 timmar."
    },
    {
      title: "Fertilt Fönster",
      content: "Det fertila fönstret sträcker sig över cirka 6 dagar - de 5 dagarna före ägglossning och dagen för ägglossning. Spermier kan överleva i kvinnans reproduktionsorgan i upp till 5 dagar."
    }
  ]
};

export const birthControlContent = {
  en: [
    {
      title: "Hormonal Methods",
      content: "Includes pills, patches, rings, and injections. They work by preventing ovulation and thickening cervical mucus. Effectiveness: 91-99% with perfect use."
    },
    {
      title: "Long-Acting Reversible Contraceptives",
      content: "IUDs and implants provide 3-10 years of protection. They are over 99% effective and require minimal maintenance."
    },
    {
      title: "Barrier Methods",
      content: "Condoms, diaphragms, and cervical caps physically block sperm. Male condoms are 85-98% effective and also protect against STIs."
    }
  ],
  sv: [
    {
      title: "Hormonella Metoder",
      content: "Inkluderar p-piller, p-plåster, p-ring och p-spruta. De fungerar genom att förhindra ägglossning och förtjocka slemhinnan i livmoderhalsen. Effektivitet: 91-99% vid perfekt användning."
    },
    {
      title: "Långtidsverkande Reversibla Preventivmedel",
      content: "Spiraler och p-stavar ger 3-10 års skydd. De är över 99% effektiva och kräver minimalt underhåll."
    },
    {
      title: "Barriärmetoder",
      content: "Kondomer, pessar och cervikala skydd blockerar spermier fysiskt. Manliga kondomer är 85-98% effektiva och skyddar även mot könssjukdomar."
    }
  ]
};

export const emotionalWellbeingContent = {
  en: [
    {
      title: "Managing Stress",
      content: "High stress levels can affect fertility by disrupting hormone balance. Regular exercise, adequate sleep, and relaxation techniques can help manage stress."
    },
    {
      title: "Mental Health Support",
      content: "Seeking therapy or counseling can be beneficial if you're experiencing anxiety or depression related to fertility concerns."
    },
    {
      title: "Building a Support Network",
      content: "Connect with others who are on similar journeys. Support groups, online forums, and community events can provide emotional support and practical advice."
    }
  ],
  sv: [
    {
      title: "Hantera Stress",
      content: "Höga stressnivåer kan påverka fertiliteten genom att störa hormonbalansen. Regelbunden motion, tillräcklig sömn och avslappningstekniker kan hjälpa till att hantera stress."
    },
    {
      title: "Stöd för Mental Hälsa",
      content: "Att söka terapi eller rådgivning kan vara fördelaktigt om du upplever ångest eller depression relaterad till fertilitetsproblem."
    },
    {
      title: "Bygga ett Stödnätverk",
      content: "Anslut till andra som är på liknande resor. Stödgrupper, onlineforum och gemenskapsevenemang kan ge emotionellt stöd och praktiska råd."
    }
  ]
};

export const griefAndSupportContent = {
  en: [
    {
      title: "Understanding Miscarriage",
      content: "Miscarriage is a common but often unexpected pregnancy loss that occurs in about 10-20% of known pregnancies. Most happen within the first trimester and are not caused by anything the pregnant person did or didn't do."
    },
    {
      title: "Coping Strategies",
      content: "Allow yourself to grieve. There's no right way to feel after a pregnancy loss. Find support through counseling, support groups, or talking with trusted friends and family. Practice self-care and give yourself time to heal."
    },
    {
      title: "Professional Support",
      content: "Seek help from healthcare providers who specialize in pregnancy loss. They can provide medical guidance, emotional support, and referrals to mental health professionals with expertise in grief and loss."
    },
    {
      title: "Resources and Communities",
      content: "Organizations like Share Pregnancy & Infant Loss Support, Resolve, and March of Dimes offer resources, online communities, and support groups specifically for those experiencing pregnancy loss."
    }
  ],
  sv: [
    {
      title: "Förstå Missfall",
      content: "Missfall är en vanlig men ofta oväntad graviditetsförlust som inträffar i cirka 10-20% av kända graviditeter. De flesta sker inom den första trimestern och orsakas inte av något den gravida personen gjorde eller inte gjorde."
    },
    {
      title: "Hanteringsstrategier",
      content: "Tillåt dig själv att sörja. Det finns inget rätt sätt att känna efter en graviditetsförlust. Hitta stöd genom rådgivning, stödgrupper eller genom att prata med betrodda vänner och familj. Praktisera egenvård och ge dig själv tid att läka."
    },
    {
      title: "Professionellt Stöd",
      content: "Sök hjälp från vårdgivare som specialiserar sig på graviditetsförlust. De kan ge medicinsk vägledning, emotionellt stöd och hänvisningar till psykiska hälsoexperter med expertis inom sorg och förlust."
    },
    {
      title: "Resurser och Gemenskaper",
      content: "Organisationer som SFOG (Svensk Förening för Obstetrik och Gynekologi), Spädbarnsfonden och 1177 Vårdguiden erbjuder resurser, onlinegemenskaper och stödgrupper specifikt för dem som upplever graviditetsförlust."
    }
  ]
};
