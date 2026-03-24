import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'iazv5qxj';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export function getSanityWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!token) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion: '2023-01-01',
    useCdn: false,
    token,
  });
}
