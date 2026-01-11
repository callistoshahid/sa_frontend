import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// 1. Metadata Generation
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const practice = await client.fetch(`*[_type == "practiceArea" && slug.current == $slug][0]`, { slug });
  
  if (!practice) return { title: 'Practice Area Not Found' };

  return {
    title: `${practice.title} | S&A Law Chambers`,
    description: practice.description || `Legal expertise in ${practice.title}.`,
  };
}

// 2. Main Page Component
export default async function PracticeTemplate({ params }) {
  const { slug } = await params;

  const practice = await client.fetch(`
    *[_type == "practiceArea" && slug.current == $slug][0]{
      title,
      description, 
      content,
      faqs
    }
  `, { slug });

  if (!practice) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen">
      
      {/* A. HERO SECTION: EXACT ASPECT RATIO MATCH */}
      {/* "w-full aspect-[1128/191]" forces the box to be exactly the shape of your image */}
      <section className="relative w-full aspect-[1128/191] flex items-center justify-center bg-brand-900">
        
        {/* 1. Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/sachambers_cover.jpeg" 
            alt="S&A Law Chambers Practice Area"
            fill
            className="object-fill" // Ensures image stretches to fill the box exactly
            priority
          />
          {/* 2. Optional Overlay: Removing or making very light so banner shows clearly */}
          <div className="absolute inset-0 bg-brand-900/40" /> 
        </div>

        {/* 3. Text Content - Centered */}
        <div className="relative z-10 text-center px-6 w-full mt-4">
          <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 block drop-shadow-md">
            Expertise
          </span>
          {/* Adjusted text size so it fits in the thinner banner */}
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-wide mb-3 drop-shadow-xl">
            {practice.title}
          </h1>
          <div className="h-0.5 w-16 bg-brand-gold mx-auto shadow-[0_0_10px_rgba(197,160,89,0.8)]"></div>
        </div>
      </section>

      {/* B. MAIN CONTENT */}
      <section className="container mx-auto px-6 py-16 max-w-4xl">
        {/* Breadcrumbs */}
        <div className="mb-10 text-sm text-slate-400 font-medium flex items-center gap-2">
          <Link href="/" className="hover:text-brand-gold transition-colors">Home</Link> 
          <span>/</span>
          <Link href="/#practice-areas" className="hover:text-brand-gold transition-colors">Practice Areas</Link>
          <span>/</span>
          <span className="text-brand-900 font-bold">{practice.title}</span>
        </div>

        {/* Main Body */}
        <div className="prose prose-lg prose-slate max-w-none font-sans text-brand-700 leading-relaxed text-justify">
          {practice.content ? (
            <PortableText 
              value={practice.content} 
              components={{
                block: {
                  normal: ({children}) => <p className="mb-6">{children}</p>,
                  h3: ({children}) => <h3 className="text-2xl font-serif text-brand-900 mt-10 mb-4">{children}</h3>
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc pl-5 mb-6 space-y-2">{children}</ul>
                }
              }}
            />
          ) : (
            <p className="text-slate-400 italic">Content coming soon...</p>
          )}
        </div>

        {/* CTA Section */}
        {/* <div className="mt-16 border-t border-slate-200 pt-10">
          <div className="bg-brand-cream border-l-4 border-brand-gold p-8 rounded-r-sm shadow-sm">
            <h3 className="font-serif text-xl text-brand-900 mb-2">Need advice on {practice.title}?</h3>
            <p className="text-sm text-brand-700 mb-6">
              Our team represents clients before the Supreme Court and High Courts in complex matters.
            </p>
            <Link 
              href="/contact" 
              className="text-xs font-bold uppercase tracking-widest text-brand-900 border-b border-brand-900 hover:text-brand-gold hover:border-brand-gold transition-all pb-1"
            >
              Contact Us →
            </Link>
          </div>
        </div> */}

        {/* DYNAMIC FAQ SECTION */}
        {practice.faqs && practice.faqs.length > 0 && (
          <div className="mt-20">
            <h3 className="text-3xl font-serif text-brand-900 mb-8 pb-4 border-b border-slate-200">
              Common Questions
            </h3>
            
            <div className="space-y-4">
              {practice.faqs.map((faq, index) => (
                <details key={index} className="group bg-slate-50 border border-slate-100 rounded-sm overflow-hidden">
                  <summary className="flex justify-between items-center font-serif font-medium cursor-pointer list-none p-6 text-brand-900 hover:bg-slate-100 transition-colors">
                    <span>{faq.question}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-brand-gold">
                      <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="bg-white text-slate-600 font-sans text-sm leading-relaxed px-6 pb-6 whitespace-pre-line border-t border-slate-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        )}

      </section>
    </main>
  );
}