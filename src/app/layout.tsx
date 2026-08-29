import type { Metadata } from "next";
import { display, body, monoTech } from "@/lib/fonts";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const siteUrl = "https://brandon-medehou.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brandon Medehou - Développeur Fullstack",
    template: "%s - Brandon Medehou",
  },
  description:
    "Portfolio de Brandon Daniel Medehou, développeur fullstack : React / Next.js, Python, AWS & CI/CD, du cadrage du besoin au déploiement en production.",
  keywords: [
    "Brandon Medehou",
    "développeur fullstack",
    "Next.js",
    "React",
    "Python",
    "AWS",
    "CI/CD",
    "Odoo",
    "PostgreSQL",
    "Bénin",
  ],
  authors: [{ name: "Brandon Daniel Medehou" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    title: "Brandon Medehou - Développeur Fullstack",
    description:
      "React / Next.js, Python, AWS & CI/CD. Développeur fullstack couvrant toute la chaîne, du cadrage du besoin au déploiement en production.",
    siteName: "Brandon Medehou",
  },
  twitter: {
    card: "summary",
    title: "Brandon Medehou - Développeur Fullstack",
    description:
      "React / Next.js, Python, AWS & CI/CD. Développeur fullstack couvrant toute la chaîne, du cadrage du besoin au déploiement en production.",
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
      <body className="min-h-full flex flex-col font-sans">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
