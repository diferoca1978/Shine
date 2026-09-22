// Mock Google Reviews data for development and testing
// Replace with real API call once Google Business is approved

import type { ImageMetadata } from "astro";
import LogoAguilar from "@/assets/images/Aguilar&Abogados.png";
import LogoAguilarDark from "@/assets/images/Aguilar&AbogadosDark.png";
import LogoCausaPulso from "@/assets/images/logoCausaPulso.png"
import LogoCausaPulsoDark from "@/assets/images/logoCausaPulsoDark.png"
import LogoDelta from "@/assets/images/logoDelta.png"
import LogoDeltaDark from "@/assets/images/logoDeltaDark.png"

export interface GoogleReview {
  author_name: string;
  text: string;
  rating: number;
  datePublished: number;
  profile_photo_url?: ImageMetadata;
  profile_photo_url_dark?: ImageMetadata;
  tag: string[];
}

export const mockGoogleReviews: GoogleReview[] = [
  {
    author_name: 'Alejandro Aguilar',
    text: 'Nos apoyaron con nuestro proyecto, nos posicionaron en la primera página de Google con SEO. Iniciaron nuestras redes sociales desde cero y han tenido un crecimiento orgánico muy interesante y valioso. Rocio es muy apasionada por su trabajo y tiene una visión de negocio que aporta mucho valor ! Súper recomendados',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: LogoAguilarDark,
    profile_photo_url_dark: LogoAguilar,
    tag: ["marca personal", "diseño web", "rediseño web", "all"]
  },
  {
    author_name: 'Paulina Meza',
    text: 'Nos atendió ROCIO y wowwww que excelente servicio, demasiado atenta y dispuesta en cada paso que dimos.',
    rating: 5,
    datePublished: 1787313600,
    profile_photo_url: LogoCausaPulso,
    profile_photo_url_dark: LogoCausaPulsoDark,
    tag: ["all"]
  },
  {
    author_name: 'Alejandro Rico',
    text: 'Trabajo profesional, dedicado y muy amables en su atención. Quedamos satisfechos con la entrega, a tiempo, cumpliendo la expectativa y con respuesta rápida de soporte pos entrega.',
    rating: 5,
    profile_photo_url: LogoDeltaDark,
    profile_photo_url_dark: LogoDelta,
    datePublished: 1784635200,
    tag: ["all"]
  },
  {
    author_name: 'Daniela Rodriguez',
    text: 'Son un equipo muy humano, talentoso y disciplinado. Nos ayudaron a crear nuestras redes sociales en nuestra firma de abogados y tuvimos mucho éxito. Recomendados!',
    rating: 5,
    datePublished: 1784635200,
    profile_photo_url: LogoAguilar,
    tag: ["all"]
  },
  {
    author_name: 'Francisco Suarez',
    text: 'Excelentes Profesionales, trabajo de calidad, cumplidos y responsables.',
    rating: 5,
    datePublished: 1784635200,
    tag: ["all"]
  },
  {
    author_name: 'Tatiana Silva',
    text: 'Muy amables y profesionales.',
    rating: 5,
    datePublished: 1787313600,
    tag: ["all"]
  },
];
