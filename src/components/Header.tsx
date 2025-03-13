
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import LanguageSelector from "@/components/LanguageSelector";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@/hooks/use-media-query";

interface HeaderProps {
  user: any;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  onLogout: () => Promise<void>;
}

const Header = ({ user, currentLanguage, onLanguageChange, onLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const translations = {
    en: {
      login: "Login",
      logout: "Logout"
    },
    sv: {
      login: "Logga in",
      logout: "Logga ut"
    }
  };

  const t = translations[currentLanguage as keyof typeof translations];

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row justify-between items-center gap-4"
    >
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img 
          src="/lovable-uploads/1ddbc9ac-594a-40a0-9455-adc4fd3f8ac4.png" 
          alt="Pre-PregnancyGuide Logo" 
          className="h-12 w-12"
        />
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text">
          Pre-PregnancyGuide
        </h1>
      </motion.div>
      <div className="flex items-center gap-4">
        <LanguageSelector
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />
        {user ? (
          <Button 
            variant="outline" 
            onClick={onLogout} 
            className="hover:bg-pink-50 transition-colors duration-300"
          >
            <motion.div
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.3 }}
            >
              <LogOut className="h-4 w-4 mr-2" />
            </motion.div>
            {t.logout}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => navigate("/auth")} 
            className="hover:bg-pink-50 transition-colors duration-300"
          >
            {t.login}
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
