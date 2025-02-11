
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PregnancyCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const PregnancyCard = ({ title, description, icon }: PregnancyCardProps) => {
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
        <CardContent>
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PregnancyCard;
