"use client";

import Link from "next/link";
import {
  Calendar,
  Clock,
  ChevronLeft,
  Tag,
  User,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientCard } from "@/components/ui/gradient-card";
import { useParams } from "next/navigation";

// Sample blog posts data (in a real app, this would come from a database or API)
const BLOG_POSTS = [
  {
    id: "1",
    title: "How AI Can Help You Craft the Perfect College Essay",
    content: `<p>For many students, writing the college application essay is one of the most challenging parts of the admissions process. It's your opportunity to show who you are beyond grades and test scores, but the pressure can be overwhelming. This is where AI tools can provide valuable assistance.</p>
    
    <h2>Understanding AI's Role in Essay Writing</h2>
    <p>AI tools like UniPathAI aren't designed to write your essay for you. Instead, they offer guidance and enhancement to your own writing. Here's how they can help:</p>
    
    <h3>Brainstorming Topics</h3>
    <p>One of the biggest challenges is deciding what to write about. AI can analyze your profile, interests, and achievements to suggest compelling topics that might resonate with admissions committees.</p>
    
    <h3>Refining Your Structure</h3>
    <p>A well-structured essay is crucial for maintaining the reader's attention. AI can analyze your draft and suggest improvements to organization, helping you create a compelling narrative arc.</p>
    
    <h3>Enhancing Language and Style</h3>
    <p>AI can identify repetitive phrases, passive voice, or awkward constructions in your writing. It can suggest more impactful alternatives while maintaining your authentic voice.</p>
    
    <h3>Providing Feedback on Impact</h3>
    <p>Will your essay resonate with admissions officers? AI can evaluate your draft from an admission officer's perspective, highlighting areas that might be strengthened to make a more memorable impression.</p>
    
    <h2>Best Practices for Using AI in Essay Writing</h2>
    
    <h3>Start with Your Own Ideas</h3>
    <p>Always begin with your own thoughts, experiences, and voice. AI should enhance, not replace, your unique perspective.</p>
    
    <h3>Use AI for Revision, Not Initial Drafting</h3>
    <p>Write your first draft without AI assistance to ensure authenticity. Then use AI tools to refine and improve your work.</p>
    
    <h3>Maintain Your Authentic Voice</h3>
    <p>Review all AI suggestions carefully to ensure they sound like you. Reject any suggestions that don't align with your natural writing style.</p>
    
    <h3>Get Human Feedback Too</h3>
    <p>AI is a powerful tool, but it shouldn't replace feedback from teachers, counselors, or peers who know you personally.</p>
    
    <h2>Ethical Considerations</h2>
    <p>Using AI responsibly means understanding the ethical boundaries. Your essay should still be your own work, reflecting your genuine thoughts and experiences. AI should serve as a writing coach, not a ghostwriter.</p>
    
    <h2>Conclusion</h2>
    <p>When used thoughtfully, AI tools can help you craft a more compelling, polished essay while reducing stress and building confidence. At UniPathAI, we're committed to helping students put their best foot forward in the college application process, providing tools that enhance rather than replace your unique voice.</p>`,
    excerpt:
      "Discover how artificial intelligence tools can help you create compelling college essays that stand out to admissions committees.",
    date: "March 10, 2023",
    readTime: "5 min read",
    category: "Essay Writing",
    author: "Dr. Sarah Johnson",
    authorRole: "Former Admissions Officer, Stanford University",
    authorImage: "/blog/authors/sarah-johnson.jpg",
    image: "/blog/essay-writing.jpg",
    relatedPosts: [2, 5, 6],
  },
  {
    id: "2",
    title: "Finding Your Perfect College Match: Beyond Rankings",
    content: `<p>When searching for colleges, many students make the mistake of focusing solely on rankings. While rankings can provide some useful information, they don't tell the whole story of whether a school is the right fit for you personally.</p>
    
    <h2>Why Rankings Don't Tell the Full Story</h2>
    <p>Rankings typically measure factors like selectivity, faculty resources, and alumni giving. While these are important institutional metrics, they don't necessarily correlate with student satisfaction or success. A highly ranked school might not offer the specific program you're interested in or the campus environment where you'll thrive.</p>
    
    <h2>What to Consider Beyond Rankings</h2>
    
    <h3>Academic Fit</h3>
    <p>Look for schools that excel in your areas of interest. A college ranked #50 overall might have a top-10 program in your intended major. Research specific departments, available courses, research opportunities, and faculty expertise in your field.</p>
    
    <h3>Learning Environment</h3>
    <p>Consider your preferred learning style. Do you thrive in discussion-based seminars or prefer larger lectures? Are you looking for hands-on practical learning or more theoretical approaches? Different colleges emphasize different teaching methods.</p>
    
    <h3>Campus Culture and Community</h3>
    <p>College is where you'll live for four years, so the community matters. Research student organizations, social life, political climate, and the types of events held on campus. Some schools have a competitive atmosphere, while others emphasize collaboration.</p>
    
    <h3>Location and Setting</h3>
    <p>Urban, suburban, or rural? Close to home or far away? Consider weather, access to internships, cultural opportunities, outdoor activities, and the surrounding community.</p>
    
    <h3>Financial Considerations</h3>
    <p>Look beyond sticker price to understand the actual cost after financial aid. Some prestigious private schools offer generous aid packages that can make them more affordable than public institutions for some students.</p>
    
    <h2>How AI Can Help Find Your Match</h2>
    <p>Tools like UniPathAI can analyze your academic profile, interests, preferences, and goals to suggest schools where you're likely to thrive. Our matching algorithm considers hundreds of factors beyond simple rankings to identify colleges that align with your unique needs.</p>
    
    <h2>Success Stories</h2>
    <p>Many students have found their perfect match at schools they might never have considered based on rankings alone. Take Maya, who turned down an Ivy League acceptance to attend a smaller liberal arts college with a stellar cognitive science program. Three years later, she's conducting graduate-level research and has presented at national conferences.</p>
    
    <h2>Conclusion</h2>
    <p>Finding your college match is about discovering where you'll learn, grow, and be happy—not just where you'll get the most prestigious name on your diploma. By looking beyond rankings and considering what truly matters to you, you're more likely to find a school where you'll thrive academically, socially, and personally.</p>`,
    excerpt:
      "Learn why college rankings shouldn't be your only criteria and how to find the right school based on your unique needs and goals.",
    date: "February 25, 2023",
    readTime: "7 min read",
    category: "College Selection",
    author: "Marcus Chen",
    authorRole: "College Counselor with 15+ years experience",
    authorImage: "/blog/authors/marcus-chen.jpg",
    image: "/blog/college-match.jpg",
    relatedPosts: [9, 3, 5],
  },
  {
    id: "3",
    title: "International Student Guide: Navigating US College Applications",
    excerpt:
      "A comprehensive guide for international students applying to universities in the United States.",
    date: "February 12, 2023",
    readTime: "10 min read",
    category: "International Students",
    author: "Elena Rodriguez",
    authorRole: "International Student Advisor",
    authorImage: "/blog/authors/elena-rodriguez.jpg",
    image: "/blog/international-students.jpg",
    content: `<p>Applying to U.S. colleges as an international student presents unique challenges but also exciting opportunities. This guide will help you navigate the process with confidence.</p>`,
    relatedPosts: [4, 2, 8],
  },
];

// More post IDs can be added as needed

export default function BlogPostPage() {
  const { id } = useParams();

  // Find the blog post with the matching ID
  const post = BLOG_POSTS.find((post) => post.id === id) || BLOG_POSTS[0];

  // Find related posts
  const relatedPosts = post.relatedPosts
    ? post.relatedPosts
        .map((relatedId) => BLOG_POSTS.find((p) => Number(p.id) === relatedId))
        .filter((post): post is (typeof BLOG_POSTS)[0] => post !== undefined)
    : [];

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section with Blog Post Header */}
        <section className="relative py-16 md:py-20 lg:py-24">
          <GradientBackground
            accentPositions={{
              accent1: { top: "10%", left: "15%" },
              accent2: { bottom: "10%", right: "15%" },
              accent3: { top: "40%", left: "5%" },
            }}
          >
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-indigo-500 hover:text-indigo-600 transition-colors mb-5"
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Blog
                </Link>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6">
                  {post.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-80 mb-6">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    {post.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1.5" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center">
                    <Tag className="h-4 w-4 mr-1.5" />
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 mr-3.5 flex items-center justify-center">
                    <User className="h-7 w-7 text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-lg">{post.author}</p>
                    <p className="text-sm opacity-70">{post.authorRole}</p>
                  </div>
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Featured Image */}
        <section className="relative -mt-12 mb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="aspect-[16/9] w-full rounded-xl bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-pink-900/30 overflow-hidden shadow-lg flex items-center justify-center">
              <span className="text-gray-500 dark:text-gray-400 text-lg">
                [Featured Image]
              </span>
              {/* Uncomment when you have actual images */}
              {/* <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover" 
              /> */}
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <section className="py-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="md:col-span-8">
                <article className="blog-content max-w-prose mx-auto">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>

                {/* Share Section */}
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 max-w-prose mx-auto">
                  <h3 className="text-xl font-semibold mb-4">
                    Share this article
                  </h3>
                  <div className="flex space-x-3">
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
                      <Facebook className="h-5 w-5 text-white" />
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-500 hover:bg-sky-600 transition-colors">
                      <Twitter className="h-5 w-5 text-white" />
                    </button>
                    <button className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-800 hover:bg-blue-900 transition-colors">
                      <Linkedin className="h-5 w-5 text-white" />
                    </button>
                  </div>
                </div>

                {/* Comments Section Placeholder */}
                <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 max-w-prose mx-auto">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Comments</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Leave a comment
                    </Button>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-8 text-center">
                    <MessageCircle className="h-10 w-10 mx-auto opacity-50 mb-3" />
                    <p className="text-lg">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-4 space-y-8">
                {/* Author Section */}
                <GradientCard className="p-6">
                  <h3 className="text-xl font-semibold mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                    About the Author
                  </h3>
                  <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 mr-3.5 flex items-center justify-center">
                      <User className="h-8 w-8 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="font-medium text-lg">{post.author}</p>
                      <p className="text-sm opacity-70">{post.authorRole}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed opacity-80">
                    An experienced educator dedicated to helping students
                    navigate the college application process with confidence and
                    clarity.
                  </p>
                </GradientCard>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                      Related Articles
                    </h3>
                    <div className="space-y-5">
                      {relatedPosts.map((relatedPost) => (
                        <div
                          key={relatedPost.id}
                          className="border-b border-gray-100 dark:border-gray-700 last:border-0 pb-4 last:pb-0"
                        >
                          <Link
                            href={`/blog/${relatedPost.id}`}
                            className="font-medium hover:text-indigo-500 transition-colors block mb-2"
                          >
                            {relatedPost.title}
                          </Link>
                          <div className="flex items-center text-xs opacity-70">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{relatedPost.date}</span>
                            <span className="mx-1.5">•</span>
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{relatedPost.readTime}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                    Categories
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    <Link
                      href="/blog/category/essay-writing"
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300 rounded-full text-sm hover:shadow-sm transition-all"
                    >
                      Essay Writing
                    </Link>
                    <Link
                      href="/blog/category/college-selection"
                      className="px-3 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/30 dark:hover:bg-purple-800/40 text-purple-700 dark:text-purple-300 rounded-full text-sm hover:shadow-sm transition-all"
                    >
                      College Selection
                    </Link>
                    <Link
                      href="/blog/category/international-students"
                      className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/30 dark:hover:bg-pink-800/40 text-pink-700 dark:text-pink-300 rounded-full text-sm hover:shadow-sm transition-all"
                    >
                      International Students
                    </Link>
                    <Link
                      href="/blog/category/test-prep"
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-800/40 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:shadow-sm transition-all"
                    >
                      Test Prep
                    </Link>
                  </div>
                </div>

                {/* Subscribe Box */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                  <h3 className="text-xl font-semibold mb-3">Subscribe</h3>
                  <p className="mb-4 opacity-90">
                    Get the latest college application tips and strategies
                    delivered to your inbox.
                  </p>
                  <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 transition-colors">
                    Sign Up for Updates
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50 mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 shadow-lg text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Get Personalized College Guidance
                </h2>
                <p className="text-lg max-w-2xl mx-auto opacity-90">
                  UniPathAI offers AI-powered assistance with essays, college
                  matching, and application management.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 transition-all px-8"
                  >
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10 transition-all px-8"
                  >
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
