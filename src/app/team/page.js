import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import Link from 'next/link';

// Force dynamic rendering so new Sanity changes show up instantly
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Team | S&A Law Chambers',
  description: 'Meet the partners and advocates of S&A Law Chambers.',
};

export default async function TeamPage() {
  // 1. Fetch Partners from Sanity
  const team = await client.fetch(`
    *[_type == "teamMember"] | order(order asc) {
      name,
      designation,
      education,
      image,
      bio
    }
  `);

  return (
    <main className="bg-brand-cream min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[40vh] bg-brand-900 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-4">
            The Partners
          </h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-brand-cream/80 font-sans max-w-2xl mx-auto text-lg font-light">
            Distinguished Advocates with expertise in Supreme Court litigation and commercial dispute resolution.
          </p>
        </div>
      </section>

      {/* 2. CORE VALUES SECTION (NEW) */}
      <section className="bg-white py-20 border-b border-brand-gold/20">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-900 mb-8">
            Our Core Values
          </h2>
          <div className="text-lg md:text-xl text-brand-700 font-light leading-relaxed font-sans">
            <p>
              We uphold honesty and integrity while providing solution-based approaches. 
              Our advice is based on thorough legal research, experience, and specialised knowledge. 
              Most importantly, we believe in an unwavering dedication to the legal system to serve the ends of justice.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PARTNER PROFILES */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <div className="space-y-24">
          
          {team.map((partner, index) => (
            <div 
              key={partner.name} 
              className={`flex flex-col ${index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-start`}
            >
              
              {/* IMAGE COLUMN (40%) */}
              <div className="w-full md:w-5/12 relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm shadow-2xl border-b-4 border-brand-gold">
                  {partner.image && (
                    <img 
                      src={urlFor(partner.image).url()} 
                      alt={partner.name}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  {/* Fallback if image is missing in Sanity */}
                  {!partner.image && (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                      No Image Uploaded
                    </div>
                  )}
                </div>
                
                {/* Decorative Box behind image */}
                <div className={`absolute -z-10 top-6 ${index % 2 === 1 ? '-right-6' : '-left-6'} w-full h-full border-2 border-brand-900/10`}></div>
              </div>

              {/* TEXT COLUMN (60%) */}
              <div className="w-full md:w-7/12 pt-4">
                
                {/* Name & Designation */}
                <h2 className="text-4xl font-serif font-bold text-brand-900 mb-2">
                  {partner.name}
                </h2>
                <div className="inline-block bg-brand-900 text-brand-gold text-xs font-bold uppercase tracking-widest px-3 py-1 mb-6">
                  {partner.designation}
                </div>

                {/* Education */}
                <div className="mb-8 border-l-2 border-brand-gold pl-4">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-1">Education</h4>
                  <p className="text-lg font-serif text-brand-800 italic whitespace-pre-line">
                    {partner.education}
                  </p>
                </div>

                {/* Bio (Rich Text Rendering) */}
                <div className="text-brand-700 font-sans leading-relaxed text-lg space-y-4 text-justify">
                  {partner.bio && partner.bio.map((block, i) => (
                    <p key={i}>
                      {block.children && block.children[0].text}
                    </p>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>
    </main>
  );
}