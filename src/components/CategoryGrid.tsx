
import { motion } from "framer-motion";
import CategoryItem from "@/components/pregnancy/CategoryItem";
import { getCategoryData } from "@/components/pregnancy/getCategoryData";

interface CategoryGridProps {
  guideContent: any[];
  currentLanguage: string;
}

const CategoryGrid = ({ guideContent, currentLanguage }: CategoryGridProps) => {
  const categories = getCategoryData(currentLanguage, guideContent);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {categories.map((category, index) => (
        <CategoryItem 
          key={index}
          title={category.title}
          description={category.description}
          icon={category.icon}
          content={category.content}
          currentLanguage={currentLanguage}
          index={index}
        />
      ))}
    </motion.section>
  );
};

export default CategoryGrid;
