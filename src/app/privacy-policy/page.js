export default function PrivacyPolicy() {
  return (
    <main className="bg-white min-h-screen">
      {/* Header Section */}
      <section className="bg-brand-900 py-20 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Privacy Policy
          </h1>
          <p className="text-brand-gold uppercase tracking-widest text-xs font-bold">
            Last Updated: January 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="prose prose-lg prose-headings:font-serif prose-headings:text-brand-900 text-slate-600 max-w-none">
            
            <p className="font-sans">
              Your privacy is important to us. It is S&A Law Chambers' policy to respect your privacy regarding any information we may collect from you across our website.
            </p>

            <h3>1. Information We Collect</h3>
            <p className="font-sans">
              We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.
            </p>
            <ul className="list-disc pl-5 space-y-2 font-sans">
              <li><strong>Personal Data:</strong> Name, email address, phone number, and other contact data.</li>
              <li><strong>Derivative Data:</strong> Information our servers automatically collect when you access the Website, such as your IP address, your browser type, your operating system, your access times, and the pages you have viewed directly before and after accessing the Website.</li>
            </ul>

            <h3>2. Use of Your Information</h3>
            <p className="font-sans"> 
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Website to:
            </p>
            <ul className="list-disc pl-5 space-y-2 font-sans">
              <li>Respond to your inquiries and offer support.</li>
              <li>Send you a newsletter (if opted in).</li>
              <li>Compile anonymous statistical data and analysis for use internally.</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Website.</li>
            </ul>

            <h3>3. Cookies and Web Beacons</h3>
            <p className="font-sans">
              We may use cookies, web beacons, tracking pixels, and other tracking technologies on the Website to help customize the Website and improve your experience. When you access the Website, your personal information is not collected through the use of tracking technology. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Website.
            </p>

            <h3>4. Third-Party Websites</h3>
            <p className="font-sans">
              The Website may contain links to third-party websites and applications of interest, including advertisements and external services, that are not affiliated with us. Once you have used these links to leave the Website, any information you provide to these third parties is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information.
            </p>

            <h3>5. Security of Your Information</h3>
            <p className="font-sans">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>

            <h3>6. Contact Us</h3>
            <p className="font-sans"> 
              If you have questions or comments about this Privacy Policy, please contact us at:<br/>
              <strong>Email:</strong> office@sachambers.in
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}