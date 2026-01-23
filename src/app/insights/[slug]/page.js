import { client, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug });
  if (!post) return { title: 'Article Not Found' };
  return { title: `${post.title} | S&A Law Chambers` };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  
  const post = await client.fetch(`
    *[_type == "post" && slug.current == $slug][0]{
      title,
      publishedAt,
      author,
      mainImage,
      body
    }
  `, { slug });

  if (!post) notFound();

  return (
    <main className="bg-white min-h-screen font-sans">
      
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-900">
        
        {/* --- NEW BACKGROUND APPROACH --- */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/sachambers_hero2.jpg" 
            alt="S&A Law Chambers Insights"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          {/* Dark Overlay (30%) */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* --- CONTENT --- */}
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block font-serif drop-shadow-md">
            Knowledge Center
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-wide mb-6 drop-shadow-xl">
            Insights & Updates
          </h1>
          <div className="h-1 w-24 bg-brand-gold mx-auto shadow-[0_0_15px_rgba(197,160,89,0.6)]"></div>
        </div>
      </section>

      {/* 2. Article Body */}
      <article className="container mx-auto px-6 py-20 max-w-3xl">
        <div className="prose prose-lg prose-slate max-w-none font-sans text-brand-700 leading-relaxed text-justify prose-headings:font-serif prose-headings:text-brand-900 prose-a:text-brand-gold">
          <PortableText 
            value={post.body} 
            components={{
              block: {
                h2: ({children}) => <h2 className="text-3xl mt-12 mb-6 border-b border-slate-200 pb-2">{children}</h2>,
                h3: ({children}) => <h3 className="text-2xl mt-10 mb-4">{children}</h3>,
                blockquote: ({children}) => <blockquote className="border-l-4 border-brand-gold pl-6 italic bg-brand-cream p-4 rounded-r-sm my-8">{children}</blockquote>
              },
              types: {
                image: ({value}) => (
                  <div className="my-10 relative h-96 w-full rounded-sm overflow-hidden">
                    <Image src={urlFor(value).url()} alt="Blog Image" fill className="object-cover" />
                  </div>
                )
              }
            }}
          />
        </div>

        {/* Back Button */}
        <div className="mt-16 pt-10 border-t border-slate-200">
          <Link href="/insights" className="text-brand-900 font-bold uppercase tracking-widest text-xs hover:text-brand-gold transition-colors">
            ← Back to Insights
          </Link>
        </div>
      </article>

    </main>
  );
}