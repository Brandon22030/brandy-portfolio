import type { Metadata } from "next";
import { display, body, monoTech } from "@/lib/fonts";
import "./globals.css";

const siteUrl = "https://brandon-medehou.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brandon Medehou — Développeur Front-End & Data",
    template: "%s — Brandon Medehou",
  },
  description:
    "Portfolio de Brandon Daniel Medehou, développeur Front-End & Data : React / Next.js, Python & APIs, PostgreSQL, performance et SEO technique.",
  keywords: [
    "Brandon Medehou",
    "développeur front-end",
    "Next.js",
    "React",
    "Python",
    "Odoo",
    "PostgreSQL",
    "développeur data",
    "Bénin",
  ],
  authors: [{ name: "Brandon Daniel Medehou" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: "Brandon Medehou — Développeur Front-End & Data",
    description:
      "React / Next.js, Python & APIs, PostgreSQL. Développeur front-end attaché à la performance et à la lisibilité des données.",
    siteName: "Brandon Medehou",
  },
  twitter: {
    card: "summary",
    title: "Brandon Medehou — Développeur Front-End & Data",
    description:
      "React / Next.js, Python & APIs, PostgreSQL. Développeur front-end attaché à la performance et à la lisibilité des données.",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${display.variable} ${body.variable} ${monoTech.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-glow font-sans">{children}</body>
    </html>
  );
}
