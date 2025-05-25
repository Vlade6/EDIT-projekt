//ode san implementirao stil stranice te pomoću SEO, napravili metadata objekt kojeg će Next.js automatski pretvoriti u odgovarajuće HTML oznake
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata = {
  title: "TV Serije | JuniorDev",
  description: "Pogledaj najpopularnije TV serije, pronađi detalje, epizode i glumce.",
  keywords: ["TV", "serije", "Next.js", "React", "TVmaze"],
  icons: {
    icon: "/favicon.ico",
  },
  authors: [{ name: "JuniorDev", url: "https://junior.dev.example" }],
  twitter: {
    card: "summary_large_image",
    site: "@JuniorDev",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

