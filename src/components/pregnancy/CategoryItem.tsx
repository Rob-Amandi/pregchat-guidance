
import { motion } from "framer-motion";
import PregnancyCard from "@/components/PregnancyCard";
import { ReactNode } from "react";
import { Category } from './CategoryData';

interface CategoryItemProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  content?: { title: string; content: string }[];
  currentLanguage?: string;
  index?: number;
  category?: Category;
  isSelected?: boolean;
}

const CategoryItem = ({ 
  title, 
  description, 
  icon, 
  content, 
  currentLanguage = 'en',
  index = 0,
  category,
  isSelected
}: CategoryItemProps) => {
  // If category prop is provided, use its properties
  const titleToUse = category?.title || title;
  const descriptionToUse = category?.description || description;
  const iconToUse = category?.icon || icon;
  const contentToUse = category?.content || content;

  if (!titleToUse) return null;

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`h-full ${isSelected ? 'scale-[1.02]' : ''}`}
    >
      <PregnancyCard
        title={titleToUse}
        description={descriptionToUse || ''}
        icon={iconToUse || <></>}
        content={contentToUse}
        currentLanguage={currentLanguage}
      />
    </motion.div>
  );
};

export default CategoryItem;
