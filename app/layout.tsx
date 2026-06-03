import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jack Wolf | Plataforma SaaS de Trade Marketing e Inteligência Comercial",

  description:
    "Plataforma SaaS para Trade Marketing, gestão de distribuidores, execução de campo, inteligência comercial e aumento de sell-out.",

  keywords: [
    "trade marketing",
    "software trade marketing",
    "inteligência comercial",
    "gestão de distribuidores",
    "sell out",
    "go to market",
    "execução no pdv",
    "equipe de campo",
    "força de vendas",
    "plataforma comercial",
  ],

  verification: {
    google: "mJW6rYspyvc17dUkzi797hvLhgMJYkvXoOEzfmJ_JB8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GZH2SCN5BE"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-GZH2SCN5BE');
          `}
        </Script>

        {children}

      </body>
    </html>
  );
}