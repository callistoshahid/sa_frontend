import ContactForm from '@/components/contact/ContactForm';

export const metadata = {
  title: 'Contact Us | S&A Law Chambers',
  description: 'Visit our Neeti Bagh office or schedule a consultation.',
};

export default function ContactPage() {
  return (
    <main className="bg-brand-cream min-h-screen">
      
      {/* 1. HERO HEADER */}
      <section className="relative h-[40vh] bg-brand-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white tracking-wide mb-4">
            Contact Chambers
          </h1>
          <div className="h-1 w-24 bg-brand-gold mx-auto"></div>
        </div>
      </section>

      {/* 2. MAIN CONTENT GRID */}
      <section className="container mx-auto px-6 py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* COLUMN 1: Contact Information */}
          <div className="space-y-12">
            
            {/* Address Block */}
            <div className="border-l-4 border-brand-gold pl-6">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2 font-sans">
                Head Office
              </span>
              <h2 className="text-3xl font-serif text-brand-900 mb-4">Neeti Bagh, New Delhi</h2>
              <p className="text-brand-700 leading-relaxed text-lg font-serif">
                A-25, Lower Ground Floor,<br />
                Neeti Bagh, New Delhi - 110049
              </p>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group">
                <span className="text-xs text-slate-400 uppercase tracking-widest block mb-2 font-sans">Telephone</span>
                <a href="tel:01146052344" className="text-xl font-serif text-brand-900 hover:text-brand-gold transition-colors">
                  011-46052455
                </a>
              </div>
              <div className="group">
                <span className="text-xs text-slate-400 uppercase tracking-widest block mb-2 font-sans">Email</span>
                <a href="mailto:office@sachambers.in" className="text-xl font-serif text-brand-900 hover:text-brand-gold transition-colors break-all">
                  office@sachambers.in
                </a>
              </div>
            </div>

            {/* Google Map Embed */}
            <div className="w-full h-80 bg-slate-200 rounded-sm overflow-hidden shadow-inner grayscale hover:grayscale-0 transition-all duration-700 border border-slate-300">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.221568853866!2d77.2163583150811!3d28.563060982445215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce25d3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sNeeti%20Bagh%2C%20New%20Delhi%2C%20Delhi%20110049!5e0!3m2!1sen!2sin!4v1625634567890!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* COLUMN 2: Contact Form Component */}
          <div className="lg:-mt-20 relative z-10">
             <ContactForm />
          </div>

        </div>
      </section>
    </main>
  );
}