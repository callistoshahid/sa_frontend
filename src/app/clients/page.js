import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { FaBuilding } from "react-icons/fa6";
import Image from 'next/image';

// Force dynamic rendering so new Sanity changes show up instantly
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Our Clientele | S&A Law Chambers',
  description: 'Trusted by leading corporations and institutions.',
};

export default async function ClientsPage() {
  // Fetch Clients sorted by 'order'
  const clients = await client.fetch(`
    *[_type == "clientele"] | order(order asc) {
      name,
      logo,
      website
    }
  `);

  return (
    <main className="bg-brand-cream min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-brand-900">
        <div className="absolute inset-0 z-0">
          <Image
            src="/sachambers_hero2.jpg" 
            alt="S&A Law Chambers Clients"
            fill
            className="object-cover object-center"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <span className="text-brand-gold font-bold tracking-[0.2em] uppercase text-sm mb-4 block drop-shadow-md">
            Trusted Partners
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-wide mb-6 drop-shadow-xl">
            Our Clientele
          </h1>
          <div className="h-1 w-20 bg-brand-gold mx-auto mb-6 shadow-lg"></div>
          <p className="text-brand-cream/90 font-sans max-w-2xl mx-auto text-lg font-light drop-shadow-md">
             We are privileged to represent a diverse portfolio of clients ranging from multinational corporations to government bodies.
          </p>
        </div>
      </section>

      {/* 2. CLIENT LOGO & NAME GRID */}
      <section className="py-24 container mx-auto px-6 max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-serif text-brand-900 mb-4">Representing Excellence</h2>
          <p className="text-brand-700 max-w-3xl mx-auto leading-relaxed font-sans">
            Our firm has established long-standing relationships with industry leaders across automotive, infrastructure, healthcare, banking, and public sectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {clients.map((item, index) => (
            <div 
              key={index}
              // UPDATED: Changed 'h-56' to 'min-h-[14rem]' so it can grow if text is long
              className="group relative bg-white border border-brand-gold/10 p-6 min-h-[14rem] flex flex-col items-center justify-center gap-4 rounded-sm hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300"
            >
              {item.logo ? (
                <>
                  <div className="relative w-full h-24 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={urlFor(item.logo).url()} 
                      alt={item.name}
                      className="w-full h-full object-contain opacity-70 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  </div>
                  
                  <div className="text-center">
                    {/* UPDATED: Removed 'line-clamp-2' so full name shows */}
                    <h3 className="text-sm font-bold text-brand-900 uppercase tracking-wider group-hover:text-brand-gold transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-3 text-brand-900/40 group-hover:text-brand-gold transition-colors">
                  <FaBuilding className="text-4xl" />
                  <span className="text-sm font-bold uppercase tracking-wider text-center">{item.name}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}