import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import InteractiveParticles from "./components/InteractiveParticles";
import fotoDylan from "./images/Foto Dylan.jpeg";
import { HomeIcon } from "@heroicons/react/16/solid";
import SkillsSection from "./components/SkillsInteractions";

const sections = [
  { id: "home", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
  { id: "more-about", label: "Contact", icon: <HomeIcon className="w-6 h-6" /> },
];

const socialLinks = [
  { icon: <FaGithub size={28} />, href: "https://github.com/FelipeDylanMar?tab=repositories", label: "GitHub" },
  { icon: <FaInstagram size={28} />, href: "https://www.instagram.com/priv.dylanxz/", label: "Instagram" },
  { icon: <FaWhatsapp size={28} />, href: "https://wa.me/5592994845459?text=Olá%20Felipe,%20quero%20saber%20mais%20sobre%20seu%20trabalho!", label: "WhatsApp" },
  { icon: <FaLinkedin size={28} />, href: "https://www.linkedin.com/in/felipe-dylan-0b306b228/", label: "LinkedIn" },
];

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [hoveredSection, setHoveredSection] = useState("");

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
  }, []);

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
                    {hoveredSection === "more-about" && id === "more-about" ? "Let's contact" : label}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <h1 className="text-4xl font-bold text-center mt-20 z-10">Web Developer</h1>
      <main className="relative flex md:flex-row items-center justify-center flex-1 p-8 z-10 gap-8">
        <section id="home" className="w-full md:w-1/2 lg:w-2/5 bg-slate-800 p-8 rounded-lg shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-40 h-40 md:w-60 md:h-60 overflow-hidden border-4 border-white rounded-3xl">
              <img src={fotoDylan} alt="Foto Dylan" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left max-w-md w-full">
              <h2 className="text-2xl font-semibold mb-2">About me</h2>
              <p className="text-lg text-gray-300 font-bold mt-5">
                Oi, tudo bem? Me chamo Felipe Dylan Mar Fernandes e sou desenvolvedor web! 🚀 Trabalho com React.js há 2 anos, criando interfaces interativas e performáticas. Sou apaixonado por tecnologia e sempre estou em busca de aprender coisas novas e melhorar minhas habilidades. Bora trocar uma ideia?
              </p>
              <div className="flex gap-5">
                <a className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition">Saiba mais sobre mim</a>
                <a href="#more-about" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition">Lets Contact</a>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="w-40 border p-6 rounded-lg shadow-lg flex flex-col gap-4 font-bold">
          {socialLinks.map(({ icon, href, label }) => (
            <div key={href} className="flex items-center gap-2">
              {icon}
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white">{label}</a>
            </div>
          ))}
        </section>
      </main>
      <SkillsSection />
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
            <label htmlFor="project" className="block text-lg font-semibold mb-1">
              Qual tipo de site ou projeto você precisa?
            </label>
            <textarea id="project" className="p-3 w-full bg-gray-800 text-white rounded-lg" placeholder="Ex: Site institucional, e-commerce..." />
          </div>

          <div>
            <label htmlFor="features" className="block text-lg font-semibold mb-1">
              Quais funcionalidades ou recursos são essenciais para você?
            </label>
            <textarea id="features" className="p-3 w-full bg-gray-800 text-white rounded-lg" placeholder="Ex: Formulários, login, pagamentos..." />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="about-you" className="block text-lg font-semibold mb-1">
            Pode me contar um pouco sobre você e sua empresa?
          </label>
          <textarea id="about-you" className="p-3 w-full bg-gray-800 text-white rounded-lg h-32" placeholder="Ex: Quem você é, o que faz..." />
        </div>
      </section>
      <footer className="relative p-4 text-center z-10">
        <p>&copy; 2025 Felipe Dylan Mar Fernandes. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
