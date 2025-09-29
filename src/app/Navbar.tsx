"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/profile', label: 'Profile' },
  { href: '/tests', label: 'Tests' },
  { href: '/flashcards', label: 'Flashcards' },
  { href: '/chatbot', label: 'AI Tutor' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/profile" className="text-xl font-bold text-ink">
          Mocksplainer
        </Link>
        <div className="relative group">
          <button className="flex items-center space-x-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover">
            <span>Start Studying</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <nav className="absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <div className="py-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 text-sm transition-colors hover:bg-gray-100 ${
                    pathname === link.href ? 'text-accent' : 'text-muted'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}