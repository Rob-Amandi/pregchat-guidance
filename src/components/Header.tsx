
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: any;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onLogout: () => Promise<void>;
}

const Header = ({ user, currentLanguage, onLanguageChange, onLogout }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center"
    >
      <motion.h1 
        className="text-4xl font-light text-gray-800"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        PregnancyGuide
      </motion.h1>
      <div className="flex items-center gap-4">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
        {user ? (
          <Button 
            variant="outline" 
            onClick={onLogout} 
            className="hover:bg-white/50 transition-colors duration-300"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <LogOut className="h-4 w-4 mr-2" />
            </motion.div>
            Logout
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => navigate("/auth")} 
            className="hover:bg-white/50 transition-colors duration-300"
          >
            Login
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
