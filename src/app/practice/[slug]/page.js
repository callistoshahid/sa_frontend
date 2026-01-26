import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import PracticeAreaJudgments from '@/components/PracticeAreaJudgments';

// --- HELPER: Define the Order of Forums ---
const getCourtRank = (courtName) => {
  if (!courtName) return 100;
  const c = courtName.toLowerCase().trim();

  // Your Specific Hierarchy
  if (c.includes('supreme court')) return 1;
  if (c.includes('high court')) return 2;
  if (c.includes('company law') || c.includes('nclt') || c.includes('nclat')) return 3;
  if (c.includes('arbitra')) return 4;
  if (c.includes('district')) return 5;
  if (c.includes('consumer')) return 6;
  if (c.includes('competition')) return 7;
  if (c.includes('real estate') || c.includes('rera')) return 8;

  return 99; // Others go to bottom
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const practice = await client.fetch(`*[_type == "practiceArea" && slug.current == $slug][0]`, { slug });
  if (!practice) return { title: 'Practice Area Not Found' };
  return {
    title: `${practice.title} | S&A Law Chambers`,
    description: practice.description || `Legal expertise in ${practice.title}.`,
  };
}

export default async function PracticeTemplate({ params }) {
  const { slug } = await params;

  const practice = await client.fetch(`
    *[_type == "practiceArea" && slug.current == $slug][0]{
      _id,
      title,
      description, 
      content,
      faqs,
      "judgments": *[_type == "judgment" && practiceArea._ref == ^._id] {
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

  // --- SORTING LOGIC (No Grouping) ---
  if (practice.judgments && practice.judgments.length > 0) {
    practice.judgments.sort((a, b) => {
      const rankA = getCourtRank(a.court);
      const rankB = getCourtRank(b.court);

      // 1. Primary Sort: Court Hierarchy (Supreme Court Top)
      if (rankA !== rankB) {
        return rankA - rankB; 
      }

      // 2. Secondary Sort: Title Alphabetical (A -> Z)
      const titleA = (a.title || "").toLowerCase();
      const titleB = (b.title || "").toLowerCase();
      
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
  }

  return (
    <main className="bg-white min-h-screen">

     {/* A. HERO SECTION */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center bg-brand-900 overflow-hidden" id='practice'>
        <div className="absolute inset-0 z-0">
          <Image
            src="/sachambers_hero2.jpg" 
            alt="S&A Law Chambers Practice Area"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-6 w-full mt-4">
          <span className="text-brand-gold text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-2 block drop-shadow-md">
            Expertise
          </span>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-wide mb-3 drop-shadow-xl">
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

        {/* --- C. JUDGMENTS (Pass the flat, sorted list) --- */}
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
                  <summary className="flex justify-between items-center font-sans font-medium cursor-pointer list-none p-6 text-brand-900 hover:bg-slate-100 transition-colors">
                    <span>{faq.question}</span>
                    <span className="transition-transform duration-300 group-open:rotate-180 text-brand-gold">
                      <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                    </span>
                  </summary>
                  <div className="bg-white text-slate-600 font-sans text-sm leading-relaxed px-10 whitespace-pre-line border-t border-slate-100">
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