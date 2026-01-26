// app/disclaimer/page.js

export default function TermsAndDisclaimer() {
  return (
    <main className="bg-brand-cream min-h-screen">
      {/* Header Section */}
      <section className="bg-brand-900 py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Disclaimer & Terms
          </h1>
          <p className="text-brand-gold uppercase tracking-widest text-xs font-bold">
            Important Legal Notice
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl bg-white p-8 md:p-12 shadow-sm border border-slate-200">
          
          {/* MANDATORY DISCLAIMER BOX (Your specific text) */}
          <div className="bg-brand-cream/50 border-l-4 border-brand-gold p-6 md:p-8 mb-12">
            <h3 className="text-xl font-serif font-bold text-brand-900 mb-4">
              Legal Disclaimer
            </h3>
            <div className="text-brand-900 text-sm md:text-base leading-relaxed space-y-4 font-medium">
              <p className="font-sans">
                This website contains information about our Chambers. It should not be construed as, and is not meant to be solicitation or an advertisement of our services. The contents of this website do not constitute legal advice.
              </p>
              <p className="font-sans">
                By visiting the website, the visitor confirms that they wish to access this website and have not been solicited by our Chambers to do so. The information provided on this website is true and correct.
              </p>
            </div>
          </div>

          {/* Standard Terms of Use (Below the mandatory disclaimer) */}
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-900 text-slate-600 max-w-none">
            
            <h3>1. Terms of Use</h3>
            <p className="font-sans">
              By accessing this website, you agree to be bound by these Terms and Conditions of Use, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
            </p>

            <h3>2. Intellectual Property</h3>
            <p className="font-sans">
              All materials on S&A Law Chambers' website are the intellectual property of the firm. You may view, download for caching purposes only, and print pages for your own personal use, subject to restrictions. You must not republish, sell, or reproduce material from this website for commercial purposes.
            </p>

            <h3>3. No Lawyer-Client Relationship</h3>
            <p className="font-sans">
              Accessing this website or communicating with S&A Law Chambers via email or through this site does not create an attorney-client relationship. You should not act upon any information on this website without seeking advice from professional legal counsel.
            </p>

            <h3>4. Limitation of Liability</h3>
            <p className="font-sans">
              In no event shall S&A Law Chambers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on our website.
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}