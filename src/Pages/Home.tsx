import { useEffect, useState, useCallback, useMemo } from "react";
import {
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaLinkedin,
  FaUniversity,
} from "react-icons/fa";
import fotoDylan from "./images/Foto Dylan.png";
import { HomeIcon } from "@heroicons/react/16/solid";
import SkillsSection from "./components/SkillsInteractions";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./components/LanguageDropdown";
import Certificates from "./components/Certificates";
import ReactBackground from "../components/MinimalParticles";
import ThemeToggle from "../components/ThemeToggle";

const socialLinks = [
  {
    icon: <FaGithub size={28} />,
    href: "https://github.com/FelipeDylanMar?tab=repositories",
    label: "github",
  },
  {
    icon: <FaInstagram size={28} />,
    href: "https://www.instagram.com/priv.dylanxz/",
    label: "instagram",
  },
  {
    icon: <FaWhatsapp size={28} />,
    href: "https://wa.me/5592994845459?text=Olá%20Felipe,%20quero%20saber%20mais%20sobre%20seu%20trabalho!",
    label: "whatsapp",
  },
  {
    icon: <FaLinkedin size={28} />,
    href: "https://www.linkedin.com/in/felipe-dylan-0b306b228/",
    label: "linkedin",
  },
];

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState("");
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    projeto: "",
    email: "",
    sobreVoce: "",
  });

  const [status, setStatus] = useState("");

  const sections = useMemo(() => [
    { id: "home", label: "home", icon: <HomeIcon className="w-6 h-6" /> },
    {
      id: "more-about",
      label: "contact",
      icon: <HomeIcon className="w-6 h-6" />,
    },
  ], []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    });

    sections.forEach(({ id }) => {
      const sectionElement = document.getElementById(id);
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSave = useCallback(async () => {
    setStatus("Enviando...");

    try {
      const response = await fetch(
        "https://portfolio-backend-xf3m.onrender.com/send-project-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tipoProjeto: formData.projeto,
            email: formData.email,
            sobreVoce: formData.sobreVoce,
          }),
        }
      );

      if (response.ok) {
        setStatus("E-mail enviado com sucesso!");
        setFormData({ projeto: "", email: "", sobreVoce: "" });
      } else {
        setStatus("Erro ao enviar o e-mail.");
      }
    } catch (error) {
      console.error("Erro ao conectar com o servidor:", error);
      setStatus("Erro ao conectar ao servidor.");
    }
  }, [formData]);

  return (
    <div className="relative flex flex-col min-h-screen bg-light-50 dark:bg-dark-950 text-dark-900 dark:text-white overflow-x-hidden">
      <ReactBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-light-100/95 dark:bg-dark-950/95 backdrop-blur-sm border-b border-light-300 dark:border-dark-700">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 py-4">
            {sections.map(({ id, icon }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onMouseEnter={() => setHoveredSection(id)}
                  onMouseLeave={() => setHoveredSection("")}
                  className={`group flex items-center px-6 py-3 transition-colors rounded-md ${
                    activeSection === id
                      ? "bg-primary-500 dark:bg-primary-600 text-white font-bold"
                      : "text-dark-600 dark:text-gray-300 hover:text-dark-900 dark:hover:text-white hover:bg-light-200 dark:hover:bg-dark-800"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div>
                      {icon}
                    </div>
                    <span className="text-sm font-medium">
                      {hoveredSection === "more-about" && id === "more-about"
                        ? t("letsContact")
                        : id === "home" ? t("home") : t("contact")}
                    </span>
                  </div>
                </a>
              </li>
            ))}
            <li>
              <LanguageDropdown />
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-12">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center z-10 text-dark-900 dark:text-white">
          {t("webDeveloper")}
        </h1>
        <div className="flex justify-center mt-6">
          <div className="w-24 h-0.5 bg-primary-600 dark:bg-primary-500"></div>
        </div>
      </div>

      <main className="relative flex flex-col items-center justify-center flex-1 px-4 py-8 z-10 gap-8">
        <section
          id="home"
          className="w-full max-w-6xl"
        >
          <div className="bg-light-100/80 dark:bg-gray-800/80 backdrop-blur-sm border border-light-300 dark:border-gray-600 p-8 sm:p-12 rounded-lg shadow-lg">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
              {/* Profile Image */}
              <div className="relative">
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 overflow-hidden rounded-lg border-2 border-primary-600 dark:border-primary-500">
                  <img
                    src={fotoDylan}
                    alt="Foto Dylan"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="text-center lg:text-left flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    {t("aboutMe")}
                  </h2>
                  <p className="text-lg sm:text-xl text-dark-700 dark:text-gray-300 leading-relaxed font-medium">
                    {t("introText")}
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-4">
                    {t("formation")}
                  </h2>
                  <p className="text-lg sm:text-xl text-dark-700 dark:text-gray-300 leading-relaxed font-medium mb-4">
                    {t("currentStudy")}
                  </p>
                  <a
                    href="https://presencial.fametro.edu.br/cursos/sistemas-de-informacao/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 bg-primary-600 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-900 text-white dark:text-white font-bold py-3 px-6 rounded-md transition-colors"
                  >
                    <FaUniversity className="text-xl" />
                    <span>Fametro</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SkillsSection />
      <Certificates />

      <section
        id="more-about"
        className="mt-20 mx-auto w-[95%] sm:w-[90%] md:w-[80%] max-w-6xl"
      >
        <div className="bg-light-100/80 dark:bg-dark-900/80 backdrop-blur-sm border border-light-300 dark:border-dark-700 p-8 sm:p-12 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-12">
            <div className="relative mb-6">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-2 border-primary-600 dark:border-primary-500">
                <img
                  src={fotoDylan}
                  alt="Foto Dylan"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
              {t("letsConnect") || "Let's Connect"}
            </h3>
            
            <div className="flex gap-4 flex-wrap justify-center">
              {socialLinks.map(({ icon, href, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 bg-light-200 dark:bg-dark-800 rounded-md hover:bg-light-300 dark:hover:bg-dark-700 transition-colors border border-light-400 dark:border-dark-700"
                  aria-label={label}
                >
                  <div className="text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-white transition-colors">
                    {icon}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h4 className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400 mb-6">
              {t("getInTouch") || "Get In Touch"}
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label
                  htmlFor="projeto"
                  className="block text-lg font-semibold text-primary-500 dark:text-primary-300"
                >
                  {t("projectType")}
                </label>
                <textarea
                  id="projeto"
                  name="projeto"
                  value={formData.projeto}
                  onChange={handleChange}
                  className="w-full p-4 bg-light-100 dark:bg-dark-800 border border-light-400 dark:border-dark-700 text-dark-900 dark:text-white rounded-md focus:border-primary-600 dark:focus:border-primary-400 focus:ring-1 focus:ring-primary-600 dark:focus:ring-primary-400 focus:outline-none transition-colors resize-none h-24"
                  placeholder={t("projectPlaceholder")}
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-lg font-semibold text-primary-500 dark:text-primary-300"
                >
                  {t("interest")}
                </label>
                <textarea
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-4 bg-light-100 dark:bg-dark-800 border border-light-400 dark:border-dark-700 text-dark-900 dark:text-white rounded-md focus:border-primary-600 dark:focus:border-primary-400 focus:ring-1 focus:ring-primary-600 dark:focus:ring-primary-400 focus:outline-none transition-colors resize-none h-24"
                  placeholder={t("interestPlaceholder")}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="sobreVoce"
                className="block text-lg font-semibold text-primary-500 dark:text-primary-300"
              >
                {t("aboutYou")}
              </label>
              <textarea
                id="sobreVoce"
                name="sobreVoce"
                value={formData.sobreVoce}
                onChange={handleChange}
                className="w-full p-4 bg-light-100 dark:bg-dark-800 border border-light-400 dark:border-dark-700 text-dark-900 dark:text-white rounded-md focus:border-primary-600 dark:focus:border-primary-400 focus:ring-1 focus:ring-primary-600 dark:focus:ring-primary-400 focus:outline-none transition-colors resize-none h-32"
                placeholder={t("aboutYouPlaceholder")}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={handleSave}
                className="w-full sm:w-auto bg-primary-600 dark:bg-primary-600 hover:bg-primary-700 dark:hover:bg-primary-900 text-white dark:text-white font-bold py-4 px-8 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <span>{t("send")}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
              
              {status && (
                <div className={`px-4 py-2 rounded-md font-medium ${
                  status.includes("sucesso") || status.includes("success")
                    ? "bg-green-600/20 text-green-400 border border-green-600"
                    : "bg-red-600/20 text-red-400 border border-red-600"
                }`}>
                  {status}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="relative p-4 text-center z-10 mt-10">
        <p className="text-dark-600 dark:text-gray-300">{t("footerText")}</p>
      </footer>
    </div>
  );
};

export default Home;
