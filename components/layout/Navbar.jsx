'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-base shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 py-2">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <img
                src="/images/PHI9.SPACE.svg"
                alt="PHI9.SPACE Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="flex space-x-6 md:space-x-8">
            <Link
              href="/manifesto"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname === '/manifesto'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Manifesto
            </Link>
            <Link
              href="/case-studies"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                pathname === '/case-studies'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Case Studies
            </Link>
            <a
              href="mailto:founders@phi9.space"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Logo Centered */}
          <div className="flex justify-center py-4">
            <Link href="/" className="flex items-center">
              <img
                src="/images/PHI9.SPACE.svg"
                alt="PHI9.SPACE Logo"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Menu Items Below Logo */}
          <div className="flex flex-col space-y-2 pb-4">
            <Link
              href="/manifesto"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 text-center ${
                pathname === '/manifesto'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Manifesto
            </Link>
            <Link
              href="/case-studies"
              className={`px-3 py-2 text-sm font-medium transition-colors duration-200 text-center ${
                pathname === '/case-studies'
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              Case Studies
            </Link>
            <a
              href="mailto:founders@phi9.space"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors duration-200 text-center"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
