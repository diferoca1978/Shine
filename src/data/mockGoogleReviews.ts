// Mock Google Reviews data for development and testing
// Replace with real API call once Google Business is approved

import type { ImageMetadata } from "astro";
import LogoAguilar from "@/assets/images/logoaguilar.svg";
import LogoZenith from "@/assets/images/logozenith.svg";

export interface GoogleReview {
  author_name: string;
  text: string;
  rating: number;
  datePublished: number;
  profile_photo_url: ImageMetadata;
  tag: string[];
}

export const mockGoogleReviews: GoogleReview[] = [
  {
    author_name: 'Alejandro Aguilar',
    text: 'Nos apoyaron con nuestro proyecto, nos posicionaron en la primera página de Google con SEO. Iniciaron nuestras redes sociales desde cero y han tenido un crecimiento orgánico muy interesante y valioso. Rocio es muy apasionada por su trabajo y tiene una visión de negocio que aporta mucho valor ! Súper recomendados',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: LogoAguilar,
    tag: ["marca personal", "diseño web", "rediseño web", "all"]
  },
  {
    author_name: 'Yohanna Ramirez',
    text: 'Un gran apoyo para el diseño y construcción de nuestro sitio web. Su fortaleza es lograr conectar con cada empresa desde las necesidades funcionales y la forma en la que interactúan con sus clientes, comunicando su propuesta de valor de una forma efectiva',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: LogoZenith,
    tag: ["diseño web", "all"]
  },
  {
    author_name: 'Luis Pinilla',
    text: 'Es un equipo que se concentra en entender muy bien los requerimientos del producto/servicio que necesitas, te proponen nuevas ideas y te ayudan cuando no estas seguro de cómo se debe ver el resultado final. Muy Profesionales.',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: "",
    tag: ["diseño web", "all"]
  },
  {
    author_name: 'Francisco Suarez',
    text: 'Super recomendados, excelentes profesionales',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: "",
    tag: ["all"]
  },
  {
    author_name: 'Angela P.',
    text: 'Es una empresa altamente comprometida con el crecimiento de los emprendedores. Su enfoque estratégico en marketing digital, acompañado de un acompañamiento cercano y personalizado, permite que cada negocio fortalezca su presencia en línea y logre resultados medibles. Destaco el profesionalismo de Leidy y Diego y su creatividad y capacidad para adaptar las estrategias a las necesidades específicas de cada cliente.',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: "",
    tag: ["all"]
  },
  {
    author_name: 'Daniela Rodriguez',
    text: 'En Shine trabajan con el corazón. Son muy profesionales y su especialidad son las estrategias de marketing para emprendedores. Ayudaron a robustecer la marca de nuestra firma de Abogados :) Sin duda hay mucho amor, trabajo y conocimiento detrás de todo su equipo.',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: "",
    tag: ["all"]
  }
];
