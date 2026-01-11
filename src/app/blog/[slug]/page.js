// src/app/blog/[slug]/page.js
import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export default async function BlogPost({ params }) {
  // FIX: In Next.js 15, params is a Promise. You must await it.
  const { slug } = await params; 

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  );

  if (!post) {
    return <div className="p-10">Post not found</div>;
  }

  return (
    <main className="p-10 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
      <div className="prose lg:prose-xl">
        <PortableText value={post.content} />
      </div>
    </main>
  );
}