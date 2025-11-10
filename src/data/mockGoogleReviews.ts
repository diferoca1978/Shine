// Mock Google Reviews data for development and testing
// Replace with real API call once Google Business is approved

export interface GoogleReview {
  author_name: string;
  text: string;
  rating: number;
  datePublished: number;
  author_url?: string;
  profile_photo_url?: string;
}

export const mockGoogleReviews: GoogleReview[] = [
  {
    author_name: 'Juan Pérez',
    text: 'Excelente servicio, muy recomendable.',
    rating: 5,
    datePublished: Date.now() / 1000,
    author_url: 'https://www.google.com/profiles/123456789',
    profile_photo_url: 'https://example.com/profile.jpg'
  },
  {
    author_name: 'María López',
    text: 'Muy buena experiencia, recomiendo fuertemente.',
    rating: 5,
    datePublished: Date.now() / 1000,
    author_url: 'https://www.google.com/profiles/987654321',
    profile_photo_url: 'https://example.com/profile.jpg'
  },
  {
    author_name: 'Pedro Rodríguez',
    text: 'Excelente servicio, muy recomendable.',
    rating: 5,
    datePublished: Date.now() / 1000,
    author_url: 'https://www.google.com/profiles/123456789',
    profile_photo_url: 'https://example.com/profile.jpg'
  },
  {
    author_name: 'Ana García',
    text: 'Muy buena experiencia, recomiendo fuertemente.',
    rating: 4,
    datePublished: Date.now() / 1000,
    author_url: 'https://www.google.com/profiles/987654321',
    profile_photo_url: 'https://example.com/profile.jpg'
  },
  {
    author_name: 'Juan Pérez',
    text: 'Excelente servicio, muy recomendable.',
    rating: 5,
    datePublished: Date.now() / 1000,
    author_url: 'https://www.google.com/profiles/123456789',
    profile_photo_url: 'https://example.com/profile.jpg'
  },
  
];
