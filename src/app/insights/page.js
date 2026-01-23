import { client } from '@/lib/sanity';
import BlogList from '@/components/blog/BlogList';

export const metadata = {
  title: 'Insights & Articles | S&A Law Chambers',
  description: 'Legal analysis and updates on Arbitration, IBC, and Criminal Law.',
};

export const dynamic = 'force-dynamic';

export default async function InsightsPage() {
  const posts = await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      excerpt
    }
  `);

  return (
    <main className="bg-white min-h-screen">
      <section className="relative h-[40vh] bg-brand-900 flex items-center justify-center overflow-hidden">
        
        {/* UPDATED BACKGROUND IMAGE */}
        <div className="absolute inset-0 opacity-20 bg-[url('/sachambers_cover.jpeg')] bg-cover bg-center bg-no-repeat"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block font-serif">
            Knowledge Center
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-wide mb-6">
            Insights & Updates
          </h1>
          <div className="h-1 w-24 bg-brand-gold mx-auto shadow-[0_0_15px_rgba(197,160,89,0.6)]"></div>
        </div>
      </section>

      {/* Reuse the component, but we can tweak it or use it as is */}
      <BlogList posts={posts} />
    </main>
  );
}