import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { SmoothScroll } from "@/components/SmoothScroll";
import { DesktopSideNav } from "@/components/DesktopSideNav";
import { MobileNavbar } from "@/components/MobileNavbar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Preloader } from "@/components/Preloader";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Контент под ключ | Видеосъемка для бизнеса",
  description: "Профессиональная видеосъемка и монтаж Reels для экспертов и бизнеса. Создаем вовлекающий контент под ключ для ваших соцсетей.",
  openGraph: {
    title: "Контент под ключ | Видеосъемка для бизнеса",
    description: "Профессиональная видеосъемка и монтаж Reels для экспертов и бизнеса. Создаем вовлекающий контент под ключ для ваших соцсетей.",
    images: ["https://res.cloudinary.com/dcnwhciua/image/upload/v1772186868/%D0%BD%D1%83%D0%BA%D0%B0%D0%BA%D0%B1%D1%8B%D0%B4%D0%B0_mgvhh0.png"],
    type: "website",
    locale: "ru_RU",
    siteName: "Контент под ключ",
  },
  twitter: {
    card: "summary_large_image",
    title: "Контент под ключ | Видеосъемка для бизнеса",
    description: "Профессиональная видеосъемка и монтаж Reels для экспертов и бизнеса. Создаем вовлекающий контент под ключ для ваших соцсетей.",
    images: ["https://res.cloudinary.com/dcnwhciua/image/upload/v1772186868/%D0%BD%D1%83%D0%BA%D0%B0%D0%BA%D0%B1%D1%8B%D0%B4%D0%B0_mgvhh0.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Контент под ключ",
              "description": "Профессиональная съемка Reels для экспертов и бизнеса. 10 Reels за 1 съемочный день.",
              "provider": {
                "@type": "Person",
                "name": "Арина Целоусова",
                "jobTitle": "Продюсер видеоконтента"
              },
              "serviceType": "Видеосъемка",
              "areaServed": "RU"
            })
          }}
        />
      </head>
      <body
        className={`${oswald.variable} ${inter.variable} antialiased bg-black text-white`}
      >
        <Preloader />
        <SmoothScroll>
          <Navbar />
          <DesktopSideNav />
          <MobileNavbar />
          <ScrollToTop />
          {children}
        </SmoothScroll>

        <div
          className="fixed inset-0 z-[50] pointer-events-none opacity-[0.05] mix-blend-overlay"
          aria-hidden="true"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />
      </body>
    </html>
  );
}
