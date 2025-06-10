
import { useTranslation } from "react-i18next";
import formationcss from '../images/htmlcss.jpg'
import jsforweb from '../images/JavaScript para Web.jpg'
import jsvandf from '../images/JS Variables and functions.jpg'
import tsPOO from '../images/tsPOO.jpg'
import reactTS from '../images/reactTS.jpg'

const Certificates = () => {
  const { t } = useTranslation();

  const certificates = [
  {
    title: t('htmlCssWebProjects'),
    provider: "Alura",
    image: formationcss,
    link: "https://cursos.alura.com.br/user/felipe-back98/degree-html-css-v527396-527396/certificate"
  },
  {
    title: t('javascriptWeb'),
    provider: "Alura",
    image: jsforweb,
    link: "https://cursos.alura.com.br/user/felipe-back98/course/javascript-web-paginas-dinamicas/certificate"
  },
  {
    title: t('javascriptVarsFunctions'),
    provider: "Alura",
    image: jsvandf,
    link: "https://cursos.alura.com.br/user/felipe-back98/course/fundamentos-javascript-tipos-variaveis-funcoes/certificate"
  },
  {
    title: t('tsPOO'),
    provider: "DIO",
    image: tsPOO,
    link: "https://hermes.dio.me/certificates/C953F973.pdf"
  },
  {
    title: t('reactTs'),
    provider: "DIO",
    image: reactTS,
    link: "https://hermes.dio.me/certificates/A75436ED.pdf"
  },
];

  return (
    <section
      id="certificates"
      className="p-8 bg-gray-900 text-white rounded-lg shadow-lg mt-20 w-[90%] mx-auto"
    >
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-8">{t("Certificates")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {certificates.map((cert) => (
            <div
              key={cert.title}
              className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-xl transition duration-300"
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="h-60 object-contain mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-center">{cert.title}</h3>
              <p className="text-x1 text-gray-400 text-center">{cert.provider}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 text-center text-blue-400 hover:underline"
              >
                {t("viewCertificate")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
