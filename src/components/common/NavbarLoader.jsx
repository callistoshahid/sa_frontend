// src/components/common/NavbarLoader.jsx
import { client } from '@/lib/sanity';
import Navbar from './Navbar';

export default async function NavbarLoader() {
  // Fetch practice areas, sorted alphabetically
  const practiceAreas = await client.fetch(`
    *[_type == "practiceArea"] | order(title asc) {
      title,
      slug
    }
  `);

  return <Navbar practiceAreas={practiceAreas} />;
}