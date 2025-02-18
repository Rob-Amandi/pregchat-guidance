
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentItem {
  title: string;
  content: string;
}

interface PregnancyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  content?: ContentItem[];
}

const PregnancyCard = ({ title, description, icon, content }: PregnancyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`
          transform transition-all duration-300 
          bg-white border-[#E6E6FA]
          ${isHovered ? 'shadow-lg border-opacity-50 scale-[1.02]' : 'shadow-sm hover:shadow-md border-opacity-30'}
        `}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <motion.div 
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-[#FDF8F0] rounded-full"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl font-light text-gray-800">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed font-light">{description}</p>
          
          {content && content.length > 0 && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                className={`
                  w-full flex items-center justify-between p-2
                  transition-colors duration-300 ease-in-out font-light
                  ${isHovered ? 'bg-[#FDF8F0]' : 'hover:bg-[#FDF8F0]/50'}
                `}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>
                  {isExpanded ? "Show Less" : "Show More"}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.div>
              </Button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {content.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-l-2 pl-4 border-[#E6E6FA] border-opacity-50 hover:border-opacity-70 transition-all duration-300"
                      >
                        <h4 className="font-light text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 mt-1 leading-relaxed font-light">{item.content}</p>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PregnancyCard;
