import { Space_Grotesk, Inter, JetBrains_Mono, Big_Shoulders, Big_Shoulders_Inline } from "next/font/google";

export const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const monoTech = JetBrains_Mono({
  variable: "--font-mono-tech",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const poster = Big_Shoulders({
  variable: "--font-poster-src",
  subsets: ["latin"],
  axes: ["opsz"],
});

export const posterInline = Big_Shoulders_Inline({
  variable: "--font-poster-inline-src",
  subsets: ["latin"],
  axes: ["opsz"],
});
