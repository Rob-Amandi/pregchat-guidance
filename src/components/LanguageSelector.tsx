
import { Button } from "@/components/ui/button";

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
  return (
    <div className="flex gap-2">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant={currentLanguage === lang.code ? "default" : "outline"}
          onClick={() => onLanguageChange(lang.code)}
          className="min-w-[80px]"
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
};

export default LanguageSelector;
