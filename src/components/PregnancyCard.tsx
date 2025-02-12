
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
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
          bg-white/80 backdrop-blur-sm border-transparent
          ${isHovered ? 'shadow-xl border-pink-100 scale-[1.02]' : 'shadow-md hover:shadow-lg'}
        `}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <motion.div 
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
            className="p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-full shadow-sm"
          >
            {icon}
          </motion.div>
          <CardTitle className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 leading-relaxed">{description}</p>
          
          {content && content.length > 0 && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                className={`
                  w-full flex items-center justify-between p-2
                  transition-colors duration-300 ease-in-out
                  ${isHovered ? 'bg-pink-50/50' : 'hover:bg-pink-50'}
                `}
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span className="font-medium">
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
                        className={`
                          border-l-2 pl-4 
                          transition-all duration-300 ease-in-out
                          hover:pl-6
                          ${isHovered ? 'border-pink-300' : 'border-pink-200 hover:border-pink-300'}
                        `}
                      >
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-gray-600 mt-1 leading-relaxed">{item.content}</p>
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
