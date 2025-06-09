import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin, FaUniversity } from "react-icons/fa";
import InteractiveParticles from "./components/InteractiveParticles";
import fotoDylan from "./images/Foto Dylan.jpeg";
import { HomeIcon } from "@heroicons/react/16/solid";
import SkillsSection from "./components/SkillsInteractions";
import { useTranslation } from "react-i18next";
import LanguageDropdown from "./components/LanguageDropdown";
import Certificates from "./components/Certificates";

const socialLinks = [
  { icon: <FaGithub size={28} />, href: "https://github.com/FelipeDylanMar?tab=repositories", label: "github" },
  { icon: <FaInstagram size={28} />, href: "https://www.instagram.com/priv.dylanxz/", label: "instagram" },
  { icon: <FaWhatsapp size={28} />, href: "https://wa.me/5592994845459?text=Olá%20Felipe,%20quero%20saber%20mais%20sobre%20seu%20trabalho!", label: "whatsapp" },
  { icon: <FaLinkedin size={28} />, href: "https://www.linkedin.com/in/felipe-dylan-0b306b228/", label: "linkedin" },
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

  const sections = [
    { id: "home", label: t("home"), icon: <HomeIcon className="w-6 h-6" /> },
    { id: "more-about", label: t("contact"), icon: <HomeIcon className="w-6 h-6" /> },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
    );

    sections.forEach(({ id }) => {
      const sectionElement = document.getElementById(id);
      if (sectionElement) observer.observe(sectionElement);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setStatus("Enviando...");

    try {
      const response = await fetch("http://localhost:5000/send-project-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipoProjeto: formData.projeto,
          email: formData.email,
          sobreVoce: formData.sobreVoce,
        }),
      });
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
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-black text-indigo-200 overflow-y-auto">
      <InteractiveParticles />
      <nav className="top-nav shadow-md py-2 bg-black">
        <ul className="flex justify-center space-x-8">
          {sections.map(({ id, label, icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onMouseEnter={() => setHoveredSection(id)}
                onMouseLeave={() => setHoveredSection("")}
                className={`flex items-center px-4 py-2 transition-all duration-300 rounded-lg 
            ${activeSection === id ? "text-blue-500 font-bold" : "text-gray-700"}`}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-indigo-500 transition">
                  {icon}
                  <span className="text-sm">
                    {hoveredSection === "more-about" && id === "more-about" ? t("letsContact") : t(label)}
                  </span>
                </div>
              </a>
            </li>
          ))}
          <LanguageDropdown />
        </ul>
      </nav>
      <h1 className="text-4xl font-bold text-center mt-20 z-10">{t("webDeveloper")}</h1>
      <main className="relative flex md:flex-row items-center justify-center flex-1 p-8 z-10 gap-8">
        <section id="home" className="w-full md:w-1/2 lg:w-2/5 bg-slate-800 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-60 h-60 md:w-96 md:h-60 overflow-hidden border-4 border-white rounded-3xl">
              <img src={fotoDylan} alt="Foto Dylan" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left max-w-md w-full">
              <h2 className="text-2xl font-semibold">{t("aboutMe")}</h2>
              <p className="text-lg text-gray-300 font-bold mt-2">{t("introText")}</p>
            </div>
            <div className="text-center md:text-left max-w-md w-full">
              <h2 className="text-2xl font-semibold">{t("formation")}</h2>
              <p className="text-lg text-gray-300 font-bold mt-2">{t("currentStudy")}</p>
              <div className="flex  items-center">
                <a
                  href="https://presencial.fametro.edu.br/cursos/sistemas-de-informacao/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-700 hover:underline text-xl"
                >
                  <FaUniversity className="text-xl" />
                  Fametro
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SkillsSection />
      <Certificates />
      <section id="more-about" className="p-8 bg-gray-900 text-white rounded-lg shadow-lg mt-20 ml-24 w-[90%] h-full">
        <div className="flex flex-col items-center">
          <img src={fotoDylan} alt="Foto Dylan" className="w-32 h-32 border-4 border-white rounded-full object-cover" />
          <div className="flex gap-4 mt-4">
            {socialLinks.map(({ icon, href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 transition"
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label htmlFor="projeto" className="block text-lg font-semibold mb-1">{t("projectType")}</label>
            <textarea
              id="projeto"
              name="projeto"
              value={formData.projeto}
              onChange={handleChange}
              className="p-3 w-full bg-gray-800 text-white rounded-lg"
              placeholder={t("projectPlaceholder")}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-1">{t("interest")}</label>
            <textarea
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 w-full bg-gray-800 text-white rounded-lg"
              placeholder={t("interestPlaceholder")}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="sobreVoce" className="block text-lg font-semibold mb-1">{t("aboutYou")}</label>
          <textarea
            id="sobreVoce"
            name="sobreVoce"
            value={formData.sobreVoce}
            onChange={handleChange}
            className="p-3 w-full bg-gray-800 text-white rounded-lg h-32"
            placeholder={t("aboutYouPlaceholder")}
          />
          <button
            onClick={handleSave}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            {t("send")}
          </button>
          {status && <p className="mt-2 text-lg">{status}</p>}
        </div>
      </section>
      <footer className="relative p-4 text-center z-10">
        <p>{t("footerText")}</p>
      </footer>
    </div>
  );
};

export default Home;
