"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Waves } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sea-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <Waves className="w-7 h-7 text-sea-500 group-hover:text-sea-600 transition-colors" />
            <span className="text-xl lg:text-2xl font-serif font-bold text-sea-800">
              TheSeaPride
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-sea-700 hover:text-sea-500 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-sea-500 after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-sea-500 hover:bg-sea-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:shadow-lg hover:shadow-sea-200"
            >
              Reserve a Table
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-sea-700 hover:text-sea-500"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-sea-100 animate-fadeIn">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block text-sm font-medium text-sea-700 hover:text-sea-500 py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block text-center bg-sea-500 hover:bg-sea-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              Reserve a Table
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
