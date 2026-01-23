import { client } from '@/lib/sanity';
import Hero from '@/components/home/Hero';
import CourtsTicker from '@/components/home/CourtsTicker';
import AboutFirm from '@/components/home/AboutFirm';
import PracticeAreas from '@/components/home/PracticeAreas'; // Client Component
import NotableJudgments from '@/components/home/NotableJudgments';
import Partners from '@/components/home/Partners';
import CoreValues from '@/components/CoreValues';
import ForumsOfPractice from '@/components/ForumsOfPractice';
import LatestInsights from '@/components/LatestInsights';
// Fetch all necessary data on the Server
async function getData() {
  const judgments = await client.fetch(`*[_type == "judgment"] | order(year desc)[0...5] {title, citation, court, summary}`);
  const team = await client.fetch(`*[_type == "teamMember"] | order(order asc) {name, designation, image, "bio": bio[0].children[0].text}`);
  
  // NEW: Fetch Practice Areas (Title + Slug)
  const practices = await client.fetch(`
    *[_type == "practiceArea"] | order(title asc) {
      title,
      slug,
      iconName
    }
  `);

  const posts = await client.fetch(`
    *[_type == "linkedInPost"] | order(date desc) [0...3] {
      _id,
      embedCode
    }
  `);

  return { judgments, team, practices, posts };
}

export default async function Home() {
  const { judgments, team, practices, posts } = await getData();

  return (
    <main>
      <Hero />
      <ForumsOfPractice />
      {/* <CourtsTicker /> */}
      <AboutFirm />
      <CoreValues />
      
      {/* Pass the real practices data here */}
      <PracticeAreas practices={practices} />
      
      {/* <NotableJudgments judgments={judgments} /> */}
      <LatestInsights posts={posts} />
      <Partners team={team} />
    </main>
  );
}