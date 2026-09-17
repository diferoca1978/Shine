import { COMPANY_INFO } from "./companyInfo";
import { services } from "./services";

export const SITE_CONFIG = {

  name: COMPANY_INFO.name,
  tagline: "Agencia de Marketing Digital y Desarrollo Web en Colombia",
  description: COMPANY_INFO.description,
  url: COMPANY_INFO.url,
  author: COMPANY_INFO.founders.join(" & "),
  language: "es-CO",
  llms: {
    topics: ['marketing digital', 'desarrollo web', 'marca personal', 'SEO Colombia'],
    targetAudience: 'Fundadores y Líderes de Empresas en Colombia'
  },
};

export const getServicesForLlms = () => {
  return services.map(s => ({
    title: s.title,
    description: s.seoDescription,
    url: `${COMPANY_INFO.url}/servicios/${s.slug}/`,
  }));
}
