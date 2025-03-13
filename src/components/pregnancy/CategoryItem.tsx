
import { motion } from "framer-motion";
import PregnancyCard from "@/components/PregnancyCard";
import { ReactNode } from "react";

interface ContentItem {
  title: string;
  content: string;
}

interface CategoryItemProps {
  title: string;
  description: string;
  icon: ReactNode;
  content?: ContentItem[];
  currentLanguage: string;
  index: number;
}

const CategoryItem = ({ 
  title, 
  description, 
  icon, 
  content, 
  currentLanguage,
  index 
}: CategoryItemProps) => {
  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <PregnancyCard
        title={title}
        description={description}
        icon={icon}
        content={content}
        currentLanguage={currentLanguage}
      />
    </motion.div>
  );
};

export default CategoryItem;
