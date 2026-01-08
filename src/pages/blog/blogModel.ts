import type { Media } from '@content-island/api-client';

export interface Post {
  id: string;
  language: 'es';
  lastUpdate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  title: string;
  slug: string;
  description: string;
  pubDate: string; // Stores the date in ISO 8601 format. For example: 2021-09-10T19:30:00.000Z
  author: string;
  image: Media;
  tags?: string[];
  content: string;
  draft?: boolean;
}