import { client } from '@/lib/sanity';
import JudgmentsList from '@/components/judgments/JudgmentsList';

export const metadata = {
  title: 'Judgments & Precedents | S&A Law Chambers',
  description: 'Archive of reported judgments and significant precedents set by S&A Law Chambers before the Supreme Court and High Courts.',
};

export const dynamic = 'force-dynamic';

export default async function JudgmentsPage() {

  const judgments = await client.fetch(`
    *[_type == "judgment"] | order(year desc) {
      _id,
      title,
      citation,
      court,
      summary,
      link
    }
  `);

  return (
    <main className="bg-white min-h-screen">
      
      <section className="relative h-[45vh] bg-brand-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        
        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            Legal Precedents
          </span>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-wide mb-6">
            Notable Judgments
          </h1>
          <div className="h-1 w-24 bg-brand-gold mx-auto shadow-[0_0_15px_rgba(197,160,89,0.6)]"></div>
          
          <p className="text-brand-cream/80 mt-6 max-w-2xl mx-auto font-light">
            A selection of reported cases and significant rulings secured by the firm across various forums.
          </p>
        </div>
      </section>

      <JudgmentsList data={judgments} />
      
    </main>
  );
}