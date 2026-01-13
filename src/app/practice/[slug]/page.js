import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
// --- NEW IMPORT: The Judgments Component ---
import PracticeAreaJudgments from '@/components/PracticeAreaJudgments';

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

  // --- UPDATED QUERY ---
  // We added the "judgments" block to fetch related cases
  const practice = await client.fetch(`
    *[_type == "practiceArea" && slug.current == $slug][0]{
      _id,  // Need ID to match the reference
      title,
      description, 
      content,
      faqs,
      // Find judgments where 'practiceArea' refers to THIS document's ID
      "judgments": *[_type == "judgment" && practiceArea._ref == ^._id] | order(year desc) {
        title,
        citation,
        court,
        year,
        summary,
        slug,
        link
      }
    }
  `, { slug });

  if (!practice) {
    notFound();
  }

  return (
    <main className="bg-white min-h-screen">

      {/* A. HERO SECTION */}
      <section className="relative w-full aspect-[1128/191] flex items-center justify-center bg-brand-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sachambers_cover.jpeg"
            alt="S&A Law Chambers Practice Area"
            fill
            className="object-fill"
            priority
          />
          <div className="absolute inset-0 bg-brand-900/40" />
        </div>

        <div className="relative z-10 text-center px-6 w-full mt-4">
          <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 block drop-shadow-md">
            Expertise
          </span>
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
                  normal: ({ children }) => <p className="mb-6">{children}</p>,
                  h3: ({ children }) => <h3 className="text-2xl font-serif text-brand-900 mt-10 mb-4">{children}</h3>
                },
                list: {
                  bullet: ({ children }) => <ul className="list-disc pl-5 mb-6 space-y-2">{children}</ul>
                }
              }}
            />
          ) : (
            <p className="text-slate-400 italic">Content coming soon...</p>
          )}
        </div>

        {/* --- C. NEW: RELATED JUDGMENTS SECTION --- */}
        <PracticeAreaJudgments judgments={practice.judgments} />

        {/* D. FAQ SECTION */}
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