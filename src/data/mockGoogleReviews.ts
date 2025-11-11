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
    tag: ["marca personal", "diseño web", "rediseño web"]
  },
  {
    author_name: 'Yohanna Ramirez',
    text: 'Un gran apoyo para el diseño y construcción de nuestro sitio web. Su fortaleza es lograr conectar con cada empresa desde las necesidades funcionales y la forma en la que interactúan con sus clientes, comunicando su propuesta de valor de una forma efectiva',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: LogoZenith,
    tag: ["diseño web"]
  },
  {
    author_name: 'Luis Pinilla',
    text: 'Es un equipo que se concentra en entender muy bien los requerimientos del producto/servicio que necesitas, te proponen nuevas ideas y te ayudan cuando no estas seguro de cómo se debe ver el resultado final. Muy Profesionales.',
    rating: 5,
    datePublished: Date.now() / 1000,
    profile_photo_url: "",
    tag: ["diseño web"]
  },
];
