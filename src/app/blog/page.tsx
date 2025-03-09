"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ChevronRight, Search, Tag, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GradientBackground } from "@/components/ui/gradient-background";
import { GradientCard } from "@/components/ui/gradient-card";
import { Input } from "@/components/ui/input";

// Sample blog post data
const FEATURED_POSTS = [
  {
    id: 1,
    title: "How AI Can Help You Craft the Perfect College Essay",
    excerpt:
      "Discover how artificial intelligence tools can help you create compelling college essays that stand out to admissions committees.",
    date: "March 10, 2023",
    readTime: "5 min read",
    category: "Essay Writing",
    author: "Dr. Sarah Johnson",
    image: "/blog/essay-writing.jpg",
  },
  {
    id: 2,
    title: "Finding Your Perfect College Match: Beyond Rankings",
    excerpt:
      "Learn why college rankings shouldn't be your only criteria and how to find the right school based on your unique needs and goals.",
    date: "February 25, 2023",
    readTime: "7 min read",
    category: "College Selection",
    author: "Marcus Chen",
    image: "/blog/college-match.jpg",
  },
  {
    id: 3,
    title: "International Student Guide: Navigating US College Applications",
    excerpt:
      "A comprehensive guide for international students applying to universities in the United States.",
    date: "February 12, 2023",
    readTime: "10 min read",
    category: "International Students",
    author: "Elena Rodriguez",
    image: "/blog/international-students.jpg",
  },
];

const RECENT_POSTS = [
  {
    id: 4,
    title: "Financial Aid 101: Understanding Scholarships and Grants",
    excerpt:
      "Everything you need to know about finding and applying for financial aid to fund your college education.",
    date: "January 28, 2023",
    readTime: "6 min read",
    category: "Financial Aid",
    author: "Michael Thompson",
    image: "/blog/financial-aid.jpg",
  },
  {
    id: 5,
    title: "The Ultimate College Application Timeline for Seniors",
    excerpt:
      "Stay on track with this month-by-month guide to college applications for high school seniors.",
    date: "January 15, 2023",
    readTime: "8 min read",
    category: "Application Process",
    author: "Dr. Sarah Johnson",
    image: "/blog/application-timeline.jpg",
  },
  {
    id: 6,
    title: "Extracurricular Activities That Impress Admissions Officers",
    excerpt:
      "Discover which extracurricular activities can make your college application stand out from the crowd.",
    date: "January 5, 2023",
    readTime: "4 min read",
    category: "College Admissions",
    author: "James Wilson",
    image: "/blog/extracurricular.jpg",
  },
  {
    id: 7,
    title:
      "How to Prepare for College Interviews: Tips from Admissions Experts",
    excerpt:
      "Expert advice on how to ace your college admissions interviews and make a lasting impression.",
    date: "December 20, 2022",
    readTime: "6 min read",
    category: "Interviews",
    author: "Lisa Chang",
    image: "/blog/interviews.jpg",
  },
  {
    id: 8,
    title: "SAT vs. ACT: Which Test is Right for You?",
    excerpt:
      "A detailed comparison of the SAT and ACT to help you decide which standardized test is best for your strengths.",
    date: "December 10, 2022",
    readTime: "7 min read",
    category: "Test Prep",
    author: "Alex Rodriguez",
    image: "/blog/test-prep.jpg",
  },
  {
    id: 9,
    title: "Building a College List: Safety, Target, and Reach Schools",
    excerpt:
      "How to create a balanced college list with the right mix of safety, target, and reach schools.",
    date: "November 28, 2022",
    readTime: "5 min read",
    category: "College Selection",
    author: "Marcus Chen",
    image: "/blog/college-list.jpg",
  },
];

const CATEGORIES = [
  "Essay Writing",
  "College Selection",
  "Financial Aid",
  "Application Process",
  "Test Prep",
  "International Students",
  "Interviews",
  "College Admissions",
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 md:py-28">
          <GradientBackground
            accentPositions={{
              accent1: { top: "15%", left: "25%" },
              accent2: { bottom: "10%", right: "10%" },
              accent3: { top: "50%", left: "8%" },
            }}
          >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6">
                  <span className="block">The UniPathAI</span>
                  <span className="block bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    College Admissions Blog
                  </span>
                </h1>
                <p className="mt-4 mx-auto max-w-2xl text-lg leading-8 opacity-90">
                  Expert insights, tips, and strategies to help you navigate the
                  college application process with confidence.
                </p>

                {/* Search Bar */}
                <div className="mt-8 max-w-xl mx-auto">
                  <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search blog posts..."
                      className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
                    />
                    <Button size="sm" className="rounded-full px-5">
                      Search
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </GradientBackground>
        </section>

        {/* Featured Posts */}
        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Featured Posts
              </h2>
              <p className="mt-2 mx-auto max-w-3xl text-lg opacity-90">
                Our most popular and informative articles to help you with your
                college journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {FEATURED_POSTS.map((post) => (
                <GradientCard
                  key={post.id}
                  className="p-0 overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative h-52 w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/40 dark:to-purple-900/40 flex items-center justify-center">
                      <span className="text-gray-400">[Featured Image]</span>
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
                      <span className="inline-flex items-center text-sm bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300 px-3 py-1 rounded-full">
                        <Tag className="h-3.5 w-3.5 mr-1" />
                        {post.category}
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
                </GradientCard>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts and Sidebar */}
        <section className="py-16 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Main Content - Recent Posts */}
              <div className="lg:col-span-2 order-2 lg:order-1">
                <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                  {RECENT_POSTS.map((post) => (
                    <div
                      key={post.id}
                      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="relative h-44 w-full">
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
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-1 text-xs opacity-70 mb-2">
                          <Calendar className="h-3 w-3" />
                          <span>{post.date}</span>
                          <span className="mx-1">•</span>
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">
                          <Link
                            href={`/blog/${post.id}`}
                            className="hover:text-indigo-500 transition-colors line-clamp-2"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm opacity-80 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto flex items-center justify-between">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {post.category}
                          </span>
                          <Link
                            href={`/blog/${post.id}`}
                            className="text-indigo-500 hover:text-indigo-600 transition-colors text-sm font-medium inline-flex items-center"
                          >
                            Read article
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 text-center">
                  <Button variant="outline" size="lg" className="px-8">
                    Load More Articles
                  </Button>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 order-1 lg:order-2 flex flex-col gap-8">
                {/* Categories */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-2">
                  <h3 className="text-xl font-semibold mb-5 border-b border-gray-100 dark:border-gray-700 pb-3">
                    Categories
                  </h3>
                  <ul className="space-y-3">
                    {CATEGORIES.map((category) => (
                      <li
                        key={category}
                        className="border-b border-gray-50 dark:border-gray-700/50 pb-2 last:border-0 last:pb-0"
                      >
                        <Link
                          href={`/blog/category/${category
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="flex items-center justify-between text-gray-700 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors py-1 group"
                        >
                          <span>{category}</span>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-400 transition-colors opacity-70" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Newsletter Signup */}
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 text-white mb-2">
                  <h3 className="text-xl font-semibold mb-3">
                    Subscribe to Our Newsletter
                  </h3>
                  <p className="mb-5 opacity-90">
                    Get the latest tips and insights on college admissions
                    delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <Input
                      type="email"
                      placeholder="Your email address"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                    />
                    <Button className="w-full bg-white text-indigo-600 hover:bg-gray-100 transition-colors">
                      Subscribe
                    </Button>
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-4">Popular Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href="/blog/tag/college-essays"
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-indigo-900/30 rounded-full text-sm transition-colors"
                    >
                      College Essays
                    </Link>
                    <Link
                      href="/blog/tag/admission-tips"
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-indigo-900/30 rounded-full text-sm transition-colors"
                    >
                      Admission Tips
                    </Link>
                    <Link
                      href="/blog/tag/financial-aid"
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-indigo-900/30 rounded-full text-sm transition-colors"
                    >
                      Financial Aid
                    </Link>
                    <Link
                      href="/blog/tag/sat-prep"
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-indigo-900/30 rounded-full text-sm transition-colors"
                    >
                      SAT Prep
                    </Link>
                    <Link
                      href="/blog/tag/international"
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-indigo-900/30 rounded-full text-sm transition-colors"
                    >
                      International
                    </Link>
                    <Link
                      href="/blog/tag/scholarships"
                      className="px-3 py-1.5 bg-gray-100 hover:bg-indigo-100 dark:bg-gray-700 dark:hover:bg-indigo-900/30 rounded-full text-sm transition-colors"
                    >
                      Scholarships
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl p-8 md:p-12 shadow-lg text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                  Ready to Start Your College Journey?
                </h2>
                <p className="text-lg max-w-2xl mx-auto opacity-90">
                  Join thousands of students who use UniPathAI to find their
                  perfect college match and create standout applications.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-indigo-600 hover:bg-gray-100 transition-all px-8"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-white text-white hover:bg-white/10 transition-all px-8"
                  >
                    Explore Features
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
