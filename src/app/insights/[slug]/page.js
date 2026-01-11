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
      
      {/* 1. Article Header */}
      <section className="bg-brand-cream pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
            <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <span>•</span>
            <span className="text-brand-gold">{post.author || 'S&A Law Chambers'}</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-brand-900 leading-tight mb-10">
            {post.title}
          </h1>

          {post.mainImage && (
            <div className="relative w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden shadow-2xl">
              <Image 
                src={urlFor(post.mainImage).url()} 
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
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