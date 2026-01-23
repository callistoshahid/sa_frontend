import { createClient } from 'next-sanity';
// CORRECT IMPORT: Import from the specific package, not next-sanity
import { createImageUrlBuilder } from '@sanity/image-url'; 

export const client = createClient({
  projectId: 'iazv5qxj',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}