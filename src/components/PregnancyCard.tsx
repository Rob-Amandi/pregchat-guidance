
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-300 bg-white">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="p-2 bg-accent rounded-full">{icon}</div>
          <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">{description}</p>
          
          {content && content.length > 0 && (
            <div className="space-y-4">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-2"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <span>{isExpanded ? "Show Less" : "Show More"}</span>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {content.map((item, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4">
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 mt-1">{item.content}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PregnancyCard;
