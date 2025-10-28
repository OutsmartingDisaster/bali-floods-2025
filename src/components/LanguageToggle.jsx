import { useTranslation } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Languages, Check } from 'lucide-react';
import { cn } from '../lib/utils';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'en', name: 'English', flag: '🇬🇧' }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-white/10 backdrop-blur-md rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20">
          <Languages className="w-4 h-4" />
          <span className="hidden sm:inline">{currentLanguage?.flag} {currentLanguage?.name}</span>
          <span className="sm:hidden">{currentLanguage?.flag}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[160px] bg-white rounded-lg shadow-xl border border-gray-200 p-1 z-[9999]"
          sideOffset={5}
        >
          {languages.map((language) => (
            <DropdownMenu.Item
              key={language.code}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm rounded-md cursor-pointer outline-none transition-colors",
                i18n.language === language.code
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => changeLanguage(language.code)}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="flex-1">{language.name}</span>
              {i18n.language === language.code && (
                <Check className="w-4 h-4 text-blue-600" />
              )}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default LanguageToggle;
