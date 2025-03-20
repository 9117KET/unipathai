"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#14171f] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="pb-12 border-b border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <Link href="/" className="text-2xl font-bold text-white">
                UniPath<span className="text-rose-500">AI</span>
              </Link>
              <p className="mt-3 text-sm text-gray-400">
                Your AI-powered college application assistant. Navigate your
                journey with confidence.
              </p>
              <div className="mt-6 flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  PRODUCT
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/features"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/testimonials"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Testimonials
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      FAQ
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  COMPANY
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/about"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                  LEGAL
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      Cookies
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} UniPathAI. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <p className="text-xs text-gray-400">
              Developed with by KET for students
              worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
