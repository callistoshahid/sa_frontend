// lib/sanity.js
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'iazv5qxj', // Copy from sanity.config.js
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

// 2. Image Builder Configuration
const builder = imageUrlBuilder(client);

// 3. Export the helper function
export function urlFor(source) {
  return builder.image(source);
}