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
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setMenuOpen(false);
  };

  return (
    <div className="relative z-50">
      <button
        ref={buttonRef}
        className="flex items-center gap-2 px-3 py-2 text-white bg-indigo-900 rounded-md hover:bg-indigo-800 transition"
        onClick={toggleMenu}
      >
        <GlobeAltIcon className="w-5 h-5" />
        <span>{t("selectLanguage")}</span>
      </button>

      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-32 bg-indigo-900 text-white rounded-lg shadow-lg z-50"
        >
          <button
            onClick={() => handleLanguageChange("en")}
            className="w-full text-left px-4 py-2 hover:bg-indigo-800 rounded-t"
          >
            English
          </button>
          <button
            onClick={() => handleLanguageChange("pt")}
            className="w-full text-left px-4 py-2 hover:bg-indigo-800 rounded-b"
          >
            Português
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
