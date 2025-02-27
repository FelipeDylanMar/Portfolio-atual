import { useState } from "react";
import { FaReact, FaJs, FaGitAlt, FaNodeJs, FaHtml5, FaCss3Alt, FaPython } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux, SiMongodb, SiPostgresql } from "react-icons/si";

const skills = [
  { icon: <FaHtml5 size={40} color="#E34F26" />, label: "HTML5", description: "Linguagem de marcação para estruturar páginas web." },
  { icon: <FaCss3Alt size={40} color="#1572B6" />, label: "CSS3", description: "Estilização para páginas web." },
  { icon: <FaJs size={40} color="#F7DF1E" />, label: "JavaScript", description: "Linguagem essencial para desenvolvimento web." },
  { icon: <SiTypescript size={40} color="#3178C6" />, label: "TypeScript", description: "Superset do JavaScript com tipagem estática." },
  { icon: <FaReact size={40} color="#61DAFB" />, label: "React.js", description: "Biblioteca JavaScript para interfaces interativas." },
  { icon: <SiNextdotjs size={40} color="black" />, label: "Next.js", description: "Framework React para aplicações server-side e estáticas." },
  { icon: <SiTailwindcss size={40} color="#06B6D4" />, label: "Tailwind CSS", description: "Framework CSS utilitário para estilização rápida." },
  { icon: <FaNodeJs size={40} color="#339933" />, label: "Node.js", description: "Ambiente de execução JavaScript server-side." },
  { icon: <SiRedux size={40} color="#764ABC" />, label: "Redux", description: "Gerenciamento de estado previsível para aplicações JavaScript." },
  { icon: <SiMongodb size={40} color="#47A248" />, label: "MongoDB", description: "Banco de dados NoSQL orientado a documentos." },
  { icon: <SiPostgresql size={40} color="#336791" />, label: "PostgreSQL", description: "Banco de dados relacional open-source poderoso." },
  { icon: <FaGitAlt size={40} color="#F05032" />, label: "Git", description: "Sistema de controle de versão distribuído." },
];

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="p-8 bg-gray-900 text-white rounded-lg shadow-lg mt-20 w-[90%] mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Skills</h2>
        <div className="flex flex-wrap justify-center gap-6 relative">
          {skills.map(({ icon, label, description }, index) => (
            <div key={label} className="relative flex flex-col items-center">
              <button
                className="p-4 bg-gray-800 rounded-full hover:bg-gray-700 transition relative z-10"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                aria-label={label}
              >
                {icon}
              </button>
              {hoveredSkill === index && (
                <div className="absolute bottom-full mb-3 bg-gray-800 text-white p-3 rounded-lg w-48 text-center shadow-lg z-20">
                  {description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;