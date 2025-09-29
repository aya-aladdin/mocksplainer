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
        <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors hover:text-accent ${
                pathname === link.href ? 'text-accent' : 'text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/api/auth/logout" className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover">Logout</Link>
        </div>
      </div>
    </header>
  );
}