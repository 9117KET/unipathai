"use client";

import Link from "next/link";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { useParams } from "next/navigation";

// Sample blog posts data - same as in blog/[id]/page.tsx
// In a real app, this would be fetched from a database or API
const BLOG_POSTS = [
  {
    id: "1",
    title: "How AI Can Help You Craft the Perfect College Essay",
    excerpt:
      "Discover how artificial intelligence tools can help you create compelling college essays that stand out to admissions committees.",
    date: "March 10, 2023",
    readTime: "5 min read",
    category: "essay-writing",
    categoryDisplay: "Essay Writing",
    author: "Dr. Sarah Johnson",
    image: "/blog/essay-writing.jpg",
  },
  {
    id: "2",
    title: "Finding Your Perfect College Match: Beyond Rankings",
    excerpt:
      "Learn why college rankings shouldn't be your only criteria and how to find the right school based on your unique needs and goals.",
    date: "February 25, 2023",
    readTime: "7 min read",
    category: "college-selection",
    categoryDisplay: "College Selection",
    author: "Marcus Chen",
    image: "/blog/college-match.jpg",
  },
  {
    id: "3",
    title: "International Student Guide: Navigating US College Applications",
    excerpt:
      "A comprehensive guide for international students applying to universities in the United States.",
    date: "February 12, 2023",
    readTime: "10 min read",
    category: "international-students",
    categoryDisplay: "International Students",
    author: "Elena Rodriguez",
    image: "/blog/international-students.jpg",
  },
  {
    id: "4",
    title: "Financial Aid 101: Understanding Scholarships and Grants",
    excerpt:
      "Everything you need to know about finding and applying for financial aid to fund your college education.",
    date: "January 28, 2023",
    readTime: "6 min read",
    category: "financial-aid",
    categoryDisplay: "Financial Aid",
    author: "Michael Thompson",
    image: "/blog/financial-aid.jpg",
  },
  {
    id: "5",
    title: "The Ultimate College Application Timeline for Seniors",
    excerpt:
      "Stay on track with this month-by-month guide to college applications for high school seniors.",
    date: "January 15, 2023",
    readTime: "8 min read",
    category: "application-process",
    categoryDisplay: "Application Process",
    author: "Dr. Sarah Johnson",
    image: "/blog/application-timeline.jpg",
  },
  {
    id: "6",
    title: "Extracurricular Activities That Impress Admissions Officers",
    excerpt:
      "Discover which extracurricular activities can make your college application stand out from the crowd.",
    date: "January 5, 2023",
    readTime: "4 min read",
    category: "college-admissions",
    categoryDisplay: "College Admissions",
    author: "James Wilson",
    image: "/blog/extracurricular.jpg",
  },
  {
    id: "7",
    title:
      "How to Prepare for College Interviews: Tips from Admissions Experts",
    excerpt:
      "Expert advice on how to ace your college admissions interviews and make a lasting impression.",
    date: "December 20, 2022",
    readTime: "6 min read",
    category: "interviews",
    categoryDisplay: "Interviews",
    author: "Lisa Chang",
    image: "/blog/interviews.jpg",
  },
  {
    id: "8",
    title: "SAT vs. ACT: Which Test is Right for You?",
    excerpt:
      "A detailed comparison of the SAT and ACT to help you decide which standardized test is best for your strengths.",
    date: "December 10, 2022",
    readTime: "7 min read",
    category: "test-prep",
    categoryDisplay: "Test Prep",
    author: "Alex Rodriguez",
    image: "/blog/test-prep.jpg",
  },
  {
    id: "9",
    title: "Building a College List: Safety, Target, and Reach Schools",
    excerpt:
      "How to create a balanced college list with the right mix of safety, target, and reach schools.",
    date: "November 28, 2022",
    readTime: "5 min read",
    category: "college-selection",
    categoryDisplay: "College Selection",
    author: "Marcus Chen",
    image: "/blog/college-list.jpg",
  },
];

// Map for gradient colors by category
const CATEGORY_GRADIENTS: Record<string, string> = {
  "essay-writing": "from-indigo-500 to-indigo-600",
  "college-selection": "from-purple-500 to-purple-600",
  "international-students": "from-pink-500 to-pink-600",
  "financial-aid": "from-green-500 to-green-600",
  "application-process": "from-blue-500 to-blue-600",
  "college-admissions": "from-sky-500 to-sky-600",
  interviews: "from-yellow-500 to-yellow-600",
  "test-prep": "from-orange-500 to-orange-600",
};

export default function CategoryPage() {
  const { category } = useParams() as { category: string };

  // Find posts in this category
  const categoryPosts = BLOG_POSTS.filter((post) => post.category === category);

  // Get the display name of the category
  const categoryDisplay =
    categoryPosts.length > 0
      ? categoryPosts[0].categoryDisplay
      : category
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  // Get the gradient for this category
  const gradient =
    CATEGORY_GRADIENTS[category] || "from-indigo-500 to-indigo-600";

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 md:py-28">
          <GradientBackground
            accentPositions={{
              accent1: { top: "20%", left: "15%" },
              accent2: { bottom: "10%", right: "15%" },
              accent3: { top: "45%", left: "10%" },
            }}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <Link
                  href="/blog"
                  className="inline-flex items-center text-indigo-500 hover:text-indigo-600 transition-colors mb-5"
                >
                  <ChevronLeft className="h-4 w-4 mr-1.5" />
                  Back to All Posts
                </Link>
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">
                  <span className="block mb-2">Category:</span>
                  <span
                    className={`block bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}
                  >
                    {categoryDisplay}
                  </span>
                </h1>
                <p className="mt-6 mx-auto max-w-2xl text-lg leading-8 opacity-90">
                  Browse our collection of articles about{" "}
                  {categoryDisplay.toLowerCase()} to help you navigate your
                  college application journey.
                </p>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Category Posts */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {categoryPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {categoryPosts.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative h-48 w-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                          <span className="text-gray-400">[Post Image]</span>
                        </div>
                        {/* Uncomment when you have actual images */}
                        {/* <Image 
                          src={post.image} 
                          alt={post.title} 
                          fill 
                          className="object-cover" 
                        /> */}
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 text-sm opacity-70 mb-3">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">
                          <Link
                            href={`/blog/${post.id}`}
                            className="hover:text-indigo-500 transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="opacity-80 mb-5 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="inline-flex items-center text-sm bg-gray-100 dark:bg-gray-700/50 px-3 py-1 rounded-full">
                            {post.categoryDisplay}
                          </span>
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-indigo-500 hover:text-indigo-600 transition-colors text-sm font-medium inline-flex items-center"
                          >
                            Read more
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional pagination */}
                {categoryPosts.length > 6 && (
                  <div className="mt-12 flex justify-center">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 p-0 flex items-center justify-center"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 p-0 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800"
                      >
                        1
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 p-0"
                      >
                        2
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 p-0"
                      >
                        3
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-9 h-9 p-0 flex items-center justify-center"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">
                  No posts found in this category
                </h2>
                <p className="mb-8 max-w-2xl mx-auto opacity-80">
                  We couldn&apos;t find any articles in the &quot;
                  {categoryDisplay}&quot; category. Check back soon as
                  we&apos;re constantly adding new content.
                </p>
                <Link href="/blog">
                  <Button size="lg" className="px-8">
                    View All Blog Posts
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-4">
                Browse Other Categories
              </h2>
              <p className="opacity-80 max-w-2xl mx-auto">
                Explore our content across different topics to help with every
                aspect of your college application journey.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Object.keys(CATEGORY_GRADIENTS).map((cat) => {
                if (cat === category) return null;

                const displayName =
                  BLOG_POSTS.find((post) => post.category === cat)
                    ?.categoryDisplay ||
                  cat
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ");

                return (
                  <Link
                    key={cat}
                    href={`/blog/category/${cat}`}
                    className={`bg-gradient-to-r ${CATEGORY_GRADIENTS[cat]} text-white rounded-lg p-6 text-center hover:shadow-md transition-all duration-300`}
                  >
                    <span className="font-medium">{displayName}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 shadow-lg text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Get Expert College Application Guidance
                </h2>
                <p className="text-lg max-w-2xl mx-auto opacity-90">
                  Sign up for UniPathAI and access AI-powered tools to help with
                  your essays, college matching, and application management.
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
                <Link href="/blog">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10 transition-all px-8"
                  >
                    Browse More Articles
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
