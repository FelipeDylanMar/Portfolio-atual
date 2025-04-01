import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "home": "Home",
            "contact": "Contact",
            "webDeveloper": "Web Developer",
            "aboutMe": "About me",
            "selectLanguage": "Select language",
            "introText": "Hi, how are you? My name is Felipe Dylan Mar Fernandes, and I’m a web developer! 🚀 I’ve been working with React.js for 2 years, creating interactive and high-performance interfaces. I'm passionate about technology and always looking to learn new things and improve my skills. Let’s chat?",
            "learnMore": "Learn more about me",
            "letsContact": "Lets Contact",
            "github": "GitHub",
            "instagram": "Instagram",
            "whatsapp": "WhatsApp",
            "linkedin": "LinkedIn",
            "projectType": "What type of website or project do you need",
            "features": "What features or functionalities are essential for you?",
            "aboutYou": "Can you tell me a little about yourself and your company?",
            "send": "Send",
            "footerText": "© 2025 Felipe Dylan Mar Fernandes. All rights reserved.",
            "projectPlaceholder": "Ex: Site institucional, e-commerce...",
            "featuresPlaceholder": "Ex: Forms, login, payments...",
            "aboutYouPlaceholder": "Ex: Who you are, what you do...",
            "skills": "Skills",
            "html5": "HTML5",
            "html5Description": "Markup language for structuring web pages.",
            "css3": "CSS3",
            "css3Description": "Styling for web pages.",
            "javascript": "JavaScript",
            "javascriptDescription": "Essential language for web development.",
            "typescript": "TypeScript",
            "typescriptDescription": "Superset of JavaScript with static typing.",
            "reactjs": "React.js",
            "reactjsDescription": "JavaScript library for interactive UIs.",
            "nextjs": "Next.js",
            "nextjsDescription": "React framework for server-side and static applications.",
            "tailwindcss": "Tailwind CSS",
            "tailwindcssDescription": "Utility-first CSS framework for fast styling.",
            "nodejs": "Node.js",
            "nodejsDescription": "JavaScript runtime for server-side applications.",
            "redux": "Redux",
            "reduxDescription": "Predictable state management for JavaScript apps.",
            "mongodb": "MongoDB",
            "mongodbDescription": "NoSQL document-oriented database.",
            "postgresql": "PostgreSQL",
            "postgresqlDescription": "Powerful open-source relational database.",
            "git": "Git",
            "gitDescription": "Distributed version control system."

        }
    },
    pt: {
        translation: {
            "home": "Início",
            "contact": "Contato",
            "webDeveloper": "Desenvolvedor Web",
            "aboutMe": "Sobre mim",
            "selectLanguage": "Selecione um idioma",
            "introText": "Oi, como você está? Meu nome é Felipe Dylan Mar Fernandes, e sou desenvolvedor web! 🚀 Trabalho com React.js há 2 anos, criando interfaces interativas e de alta performance. Sou apaixonado por tecnologia e sempre busco aprender novas coisas e melhorar minhas habilidades. Vamos conversar?",
            "learnMore": "Saiba mais sobre mim",
            "letsContact": "Vamos Contatar",
            "github": "GitHub",
            "instagram": "Instagram",
            "whatsapp": "WhatsApp",
            "linkedin": "LinkedIn",
            "projectType": "Que tipo de site ou projeto você precisa",
            "features": "Quais funcionalidades ou recursos são essenciais para você?",
            "aboutYou": "Pode me contar um pouco sobre você e sua empresa?",
            "send": "Enviar",
            "footerText": "© 2025 Felipe Dylan Mar Fernandes. Todos os direitos reservados.",
            "projectPlaceholder": "Ex: Site institucional, e-commerce...",
            "featuresPlaceholder": "Ex: Formulários, login, pagamentos...",
            "aboutYouPlaceholder": "Ex: Quem é você, o que você faz...",
            "skills": "Habilidades",
            "html5": "HTML5",
            "html5Description": "Linguagem de marcação para estruturar páginas web.",
            "css3": "CSS3",
            "css3Description": "Estilização para páginas web.",
            "javascript": "JavaScript",
            "javascriptDescription": "Linguagem essencial para desenvolvimento web.",
            "typescript": "TypeScript",
            "typescriptDescription": "Superset do JavaScript com tipagem estática.",
            "reactjs": "React.js",
            "reactjsDescription": "Biblioteca JavaScript para interfaces interativas.",
            "nextjs": "Next.js",
            "nextjsDescription": "Framework React para aplicações server-side e estáticas.",
            "tailwindcss": "Tailwind CSS",
            "tailwindcssDescription": "Framework CSS utilitário para estilização rápida.",
            "nodejs": "Node.js",
            "nodejsDescription": "Ambiente de execução JavaScript server-side.",
            "redux": "Redux",
            "reduxDescription": "Gerenciamento de estado previsível para aplicações JavaScript.",
            "mongodb": "MongoDB",
            "mongodbDescription": "Banco de dados NoSQL orientado a documentos.",
            "postgresql": "PostgreSQL",
            "postgresqlDescription": "Banco de dados relacional open-source poderoso.",
            "git": "Git",
            "gitDescription": "Sistema de controle de versão distribuído."
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
