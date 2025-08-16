import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaReact, FaJs, FaGitAlt, FaNodeJs, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiRedux, SiMongodb, SiPostgresql } from "react-icons/si";

const skills = [
  { icon: <FaHtml5 size={40} color="#E34F26" />, key: "html5" },
  { icon: <FaCss3Alt size={40} color="#1572B6" />, key: "css3" },
  { icon: <FaJs size={40} color="#F7DF1E" />, key: "javascript" },
  { icon: <SiTypescript size={40} color="#3178C6" />, key: "typescript" },
  { icon: <FaReact size={40} color="#61DAFB" />, key: "reactjs" },
  { icon: <SiNextdotjs size={40} className="text-dark-900 dark:text-white" />, key: "nextjs" },
  { icon: <SiTailwindcss size={40} color="#06B6D4" />, key: "tailwindcss" },
  { icon: <FaNodeJs size={40} color="#339933" />, key: "nodejs" },
  { icon: <SiRedux size={40} color="#764ABC" />, key: "redux" },
  { icon: <SiMongodb size={40} color="#47A248" />, key: "mongodb" },
  { icon: <SiPostgresql size={40} color="#336791" />, key: "postgresql" },
  { icon: <FaGitAlt size={40} color="#F05032" />, key: "git" },
];

const SkillsSection = () => {
  const { t } = useTranslation();
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  return (
    <section id="skills" className="p-8 bg-light-100/80 dark:bg-dark-950/80 backdrop-blur-sm text-dark-900 dark:text-white rounded-lg shadow-lg mt-20 w-[90%] mx-auto">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">{t("skills")}</h2>
        <div className="flex flex-wrap justify-center gap-6 relative">
          {skills.map(({ icon, key }, index) => (
            <div key={key} className="relative flex flex-col items-center">
              <button
                className="p-4 bg-light-200/80 dark:bg-dark-900/80 backdrop-blur-sm rounded-full hover:bg-light-300/80 dark:hover:bg-dark-800/80 transition relative z-10"
                onMouseEnter={() => setHoveredSkill(index)}
                onMouseLeave={() => setHoveredSkill(null)}
                aria-label={t(key)}
              >
                {icon}
              </button>
              {hoveredSkill === index && (
                <div className="absolute bottom-full mb-3 bg-light-100/90 dark:bg-dark-900/90 backdrop-blur-sm text-dark-900 dark:text-white p-3 rounded-lg w-48 text-center shadow-lg z-20 border border-light-300 dark:border-dark-700">
                  {t(`${key}Description`)}
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