import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Пинск — Городской портал",
    template: "%s | Пинск",
  },
  description: "Официальный информационный портал города Пинска. Новости, события, кибербезопасность, технологии и жизнь полесской столицы Беларуси.",
  keywords: ["Пинск", "Pinsk", "Беларусь", "новости", "кибербезопасность", "технологии"],
  authors: [{ name: "Pinsk.City" }],
  openGraph: {
    type: "website",
    locale: "ru_BY",
    url: "https://pinsk.city",
    title: "Пинск — Городской портал",
    description: "Официальный информационный портал города Пинска",
    siteName: "Пинск",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
