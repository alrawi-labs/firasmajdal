import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import SmoothScrollProvider from "@/components/scroll-system/providers/SmoothScrollProvider";
import ScrollProgressBar from "@/components/scroll-system/components/ScrollProgressBar";
import "../globals.css";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Firas Real Estate",
  description:
    "Lüks gayrimenkul yatırımları, hukuki danışmanlık ve Arapça-Türkçe yeminli tercümanlık.",
  icons: { icon: "/favicon.png" },
};

const vazirmatn = localFont({
  src: [
    { path: "../../../public/fonts/vazirmatn/Vazirmatn-Thin.ttf",    weight: "100" },
    { path: "../../../public/fonts/vazirmatn/Vazirmatn-Light.ttf",   weight: "300" },
    { path: "../../../public/fonts/vazirmatn/Vazirmatn-Regular.ttf", weight: "400" },
    { path: "../../../public/fonts/vazirmatn/Vazirmatn-Medium.ttf",  weight: "500" },
    { path: "../../../public/fonts/vazirmatn/Vazirmatn-Bold.ttf",    weight: "700" },
    { path: "../../../public/fonts/vazirmatn/Vazirmatn-Black.ttf",   weight: "900" },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "ar" | "fa")) {
    notFound();
  }

  

  const messages = await getMessages();

  const isRTL = locale === "ar" || locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRTL ? "rtl" : "ltr"}
  className={`${inter.variable} ${playfair.variable} ${vazirmatn.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          {/*
           * SmoothScrollProvider — Lenis ile tüm sayfaya yumuşak momentum kaydırma sağlar.
           *
           * lerp          → kaydırma yumuşaklığı  (0.06 ağır ↔ 0.15 hafif)
           * wheelMultiplier → fare tekerleği hassasiyeti
           * touchMultiplier → dokunmatik ekran hassasiyeti
           */}
          <SmoothScrollProvider
            lerp={0.08}
            wheelMultiplier={1.2}
            touchMultiplier={1.4}
          >
            {/* Sayfanın üstünde ince scroll ilerleme çubuğu */}
            <ScrollProgressBar
              color="var(--color-gold, #C9A96E)"
              height={3}
              position="top"
            />
            {children}
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}