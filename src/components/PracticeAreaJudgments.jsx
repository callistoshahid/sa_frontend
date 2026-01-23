import Link from 'next/link';

export default function PracticeAreaJudgments({ judgments }) {
  // 1. Safety Check
  if (!judgments || judgments.length === 0) return null;

  return (
    <div className="py-12 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl font-serif font-bold mb-8 text-brand-900">
          Related Judgments
        </h2>
        
        <div className="flex flex-col gap-6">
          {judgments.map((item, idx) => {
            if (!item.title) return null;
            
            // Determine if there is a link (External PDF or Internal Slug)
            // const linkTarget = item.link || (item.slug?.current ? `/judgments/${item.slug.current}` : null);
            const linkTarget = "#"

            return (
              <div 
                key={item._id || idx} 
                className="group bg-white border border-slate-200 p-8 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Decorative Side Line */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-900 group-hover:bg-brand-gold transition-colors duration-300" />

                <div className="flex flex-col gap-4">
                  
                  {/* Metadata Row (Court & Citation) */}
                  <div className="flex flex-wrap gap-3 items-center">
                    {item.court && (
                      <span className="bg-brand-cream text-brand-900 text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                        {item.court}
                      </span>
                    )}
                    {item.citation && (
                      <span className="text-brand-gold font-serif italic text-sm">
                        {item.citation}
                      </span>
                    )}
                  </div>
                  
                  {/* Title (Linked if URL exists, otherwise plain text) */}
                  <h3 className="text-xl font-serif font-semibold text-brand-900">
                    {linkTarget ? (
                     
                      
                      <span className='hover:text-brand-gold transition-colors'>{item.title}</span>
                    ) : (
                      item.title
                    )}
                  </h3>
                  
                  {/* Full Summary Text (No truncation) */}
                  {item.summary && (
                    <div className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {item.summary}
                    </div>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}