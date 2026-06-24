import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "TheSeaPride | Premium Seafood Restaurant",
  description:
    "Experience the finest seafood dining at TheSeaPride. Fresh catches, bold flavors, and unforgettable coastal cuisine in Ibadan.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  verification: {
    google: "0USCBeAtG8R5zfzLyo-SncDPMtMjUYagzEA09hZ-K6M",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} dark`}>
      <body className="antialiased font-sans bg-site text-site">
        {children}
      </body>
    </html>
  );
}
