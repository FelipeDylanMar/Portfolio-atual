import { HomeIcon, UserIcon, CogIcon, QuestionMarkCircleIcon } from "@heroicons/react/16/solid";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useAuth } from "../../hooks/AuthContext";

const MenuHamburguer: React.FC = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      <button className="text-white text-3xl font-bold" onClick={toggleMenu}>
        ☰
      </button>

      <div
        className={`absolute right-4 top-16 bg-indigo-900 font-bold p-4 rounded-md shadow-lg transition-all duration-300 ${
          isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"
        }`}
      >
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <HomeIcon className="w-5 h-5 " />
          Home
        </a>
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <UserIcon className="w-5 h-5" />
          Profile
        </a>
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <CogIcon className="w-5 h-5" />
          Settings
        </a>
        <a href="#" className="flex items-center gap-2 py-2 hover:text-white">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          Help
        </a>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 py-2 text-red-400 hover:text-red-500"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          Log Out
        </button>
      </div>
    </>
  );
};

export default MenuHamburguer;
