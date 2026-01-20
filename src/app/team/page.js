// src/app/team/page.js (or whatever your route is)
import { client } from '@/lib/sanity';
import TeamContent from '@/components/TeamContent'; // Import the client component

// Force dynamic rendering so new Sanity changes show up instantly
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Team | S&A Law Chambers',
  description: 'Meet the partners and advocates of S&A Law Chambers.',
};

export default async function TeamPage() {
  // Fetch Data on the Server
  const team = await client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      name,
      designation,
      education,
      previousWork,
      profileDescription,
      image,
      bio
    }
  `);

  // Pass data to the Client Component
  return <TeamContent team={team} />;
}