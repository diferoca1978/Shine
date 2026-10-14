import { COMPANY_INFO } from "./companyInfo";
import { siteUrl } from "@/utils/url";

export const SITE_CONFIG = {

  name: COMPANY_INFO.name,
  tagline: "Agencia de Marketing Digital y Desarrollo Web en Colombia",
  description: COMPANY_INFO.description,
  url: siteUrl("/"),
  author: COMPANY_INFO.founders.join(" & "),
  language: "es-CO",
};
