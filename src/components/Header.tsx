
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
      className="flex justify-between items-center bg-[#FBF2F4] px-4 py-2 rounded-lg"
    >
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img 
          src="/lovable-uploads/7d374c9b-8f90-4dfd-9538-9d2288c82118.png" 
          alt="Pre-PregnancyGuide Logo" 
          className="h-12 w-12"
        />
        <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-500 to-pink-400 text-transparent bg-clip-text">
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
            Logout
          </Button>
        ) : (
          <Button 
            variant="outline" 
            onClick={() => navigate("/auth")} 
            className="hover:bg-pink-50 transition-colors duration-300"
          >
            Login
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default Header;
