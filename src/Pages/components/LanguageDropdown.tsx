import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GlobeAltIcon } from "@heroicons/react/20/solid";

const LanguageDropdown: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setMenuOpen(false);
  };

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 px-2 py-1 mt-3 text-white bg-indigo-900 rounded-md hover:bg-indigo-800"
        onClick={toggleMenu}
      >
        <GlobeAltIcon className="w-5 h-5" />
        <span>{t('selectLanguage')}</span>
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-12 font-bold p-4 rounded-md shadow-lg transition-all duration-300"
        >
            <div className="border rounded">
            <button
            onClick={() => handleLanguageChange("en")}
            className="block text-white py-2 px-4 hover:bg-indigo-800 w-full text-left"
          >
            en-US
          </button>
          <button
            onClick={() => handleLanguageChange("pt")}
            className="block text-white py-2 px-4 hover:bg-indigo-800 w-full text-left"
          >
            pt-BR
          </button>
            </div>
          
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
