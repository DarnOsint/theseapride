import Link from "next/link";
import { Waves, MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-sea-900 text-sea-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Waves className="w-6 h-6 text-sea-400" />
              <span className="text-xl font-serif font-bold text-white">
                TheSeaPride
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-sea-300">
              Where the ocean&apos;s finest catches meet culinary artistry. Every
              dish tells a story of the sea.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-sea-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-sea-400 transition-colors">Menu</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sea-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sea-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Hours</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sea-400 shrink-0" />
                <span>Mon–Thu: 11am – 10pm</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sea-400 shrink-0" />
                <span>Fri–Sat: 11am – 11pm</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sea-400 shrink-0" />
                <span>Sun: 10am – 9pm</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sea-400 shrink-0 mt-0.5" />
                <span>123 Ocean Boulevard, Coastal City</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sea-400 shrink-0" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sea-400 shrink-0" />
                <span>hello@theseapride.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-sea-800 text-center text-sm text-sea-400">
          <p>&copy; {new Date().getFullYear()} TheSeaPride. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
