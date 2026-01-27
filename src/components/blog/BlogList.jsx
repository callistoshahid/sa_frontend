'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { urlFor } from '@/lib/sanity';
import Image from 'next/image';

export default function BlogList({ posts = [] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-slate-100 pb-6">
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <span className="text-brand-gold text-xs font-bold tracking-[0.2em] uppercase mb-2 block font-serif">
              Legal Insights
            </span>
            <h2 className="text-4xl font-serif text-brand-900">Latest Updates</h2>
          </motion.div>
          
          <Link 
            href="/insights" 
            className="hidden md:inline-block text-xs font-bold uppercase tracking-widest text-brand-900 hover:text-brand-gold transition-colors mt-4 md:mt-0"
          >
            View All Articles →
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col h-full bg-brand-cream border border-slate-100 hover:shadow-xl hover:border-brand-gold/30 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden">
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(800).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-brand-900 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="font-sans text-xl text-brand-900 mb-4 leading-snug group-hover:text-brand-gold transition-colors">
                  <Link href={`/insights/${post.slug.current}`}>
                    {post.title}
                  </Link>
                </h3>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 font-sans flex-grow">
                  {post.excerpt}
                </p>
                
                <Link 
                  href={`/insights/${post.slug.current}`}
                  className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-900 hover:text-brand-gold transition-colors mt-auto"
                >
                  Read Analysis <span className="ml-2">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
           <Link 
            href="/insights" 
            className="inline-block border border-brand-900 px-8 py-3 text-xs font-bold uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-colors"
          >
            View All Articles
          </Link>
        </div>

      </div>
    </section>
  );
}