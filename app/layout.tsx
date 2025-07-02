import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MedEx - Онлайн инструмент для клиник",
  icons: { icon: "/favicon.ico" },
  description:
    "Онлайн-система записи на приём к врачам. Удобно, быстро, безопасно.",
  keywords: ["MedEx", "клиника", "врачи", "запись", "медицина", "онлайн приём"],
  authors: [{ name: "MedEx Team" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "MedEx — Комфорт для клиник",
    description:
      "MedEx - Упрощение записей к докторам для клиник. Упрощаем медицинские визиты.",
    url: "https://www.med-ex.uz",
    siteName: "MedEx",
    locale: "ru_UZ",
    type: "website",
  },
  other: {
    name: "MedEx - Онлайн инструмент для клиник",
  },
  metadataBase: new URL("https://www.med-ex.uz"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        {/* Optional extra meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
