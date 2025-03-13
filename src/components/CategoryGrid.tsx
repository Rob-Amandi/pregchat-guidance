
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryData } from './pregnancy/getCategoryData';
import CategoryItem from './pregnancy/CategoryItem';

const mockedGuideContent = [
  {
    category: "Health Preparation",
    title: "Pre-pregnancy Check-up",
    content: "Schedule a check-up with your healthcare provider to discuss preexisting conditions, medications, and receive personalized advice."
  },
  {
    category: "Health Preparation",
    title: "Genetic Counseling",
    content: "Consider genetic counseling if you have a family history of genetic disorders or are of an ethnic background with specific genetic risks."
  },
  {
    category: "Fertility Awareness",
    title: "Basal Body Temperature",
    content: "Your BBT rises slightly (0.2-0.5°F) after ovulation. Track it daily upon waking for several cycles to identify patterns."
  },
  {
    category: "Fertility Awareness",
    title: "Cervical Mucus Changes",
    content: "Mucus becomes clear, slippery and stretchy (like egg white) during your most fertile days, helping sperm travel to the egg."
  },
  {
    category: "Nutrition Guide",
    title: "Folic Acid",
    content: "Start taking 400-800 mcg of folic acid daily at least one month before conception to prevent neural tube defects."
  },
  {
    category: "Nutrition Guide",
    title: "Iron-Rich Foods",
    content: "Increase consumption of lean red meat, beans, spinach, and fortified cereals to ensure adequate iron levels for pregnancy."
  },
  {
    category: "Lifestyle Changes",
    title: "Quit Smoking and Alcohol",
    content: "Both partners should stop smoking and drinking alcohol at least 3 months before trying to conceive for optimal fertility and embryo development."
  },
  {
    category: "Lifestyle Changes",
    title: "Maintain Healthy Weight",
    content: "Being significantly underweight or overweight can affect hormone levels and reduce fertility. Aim for a BMI between 18.5-24.9."
  }
];

interface CategoryGridProps {
  currentLanguage: string;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ currentLanguage }) => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const categories = getCategoryData(currentLanguage, mockedGuideContent);

  return (
    <div className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category, index) => (
          <Card 
            key={index} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" 
            onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
          >
            <CardContent className="p-4">
              <CategoryItem 
                category={category} 
                isSelected={selectedCategory === index}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
