
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";

interface LanguageOption {
  code: string;
  label: string;
}

interface LanguageSelectorProps {
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
}

const languages: LanguageOption[] = [
  { code: 'en', label: 'English' },
  { code: 'sv', label: 'Svenska' },
];

const LanguageSelector = ({ currentLanguage, onLanguageChange }: LanguageSelectorProps) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  
  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          onClick={() => onLanguageChange(lang.code)}
          className={`${isMobile ? 'w-12 px-2 text-sm' : 'min-w-[80px]'}`}
          title={lang.label}
        >
          {isMobile ? lang.code.toUpperCase() : lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
