import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Temos um Rolê Pendente 🎯",
  description:
    "Comida boa, risada garantida e zero perrengue. Bora montar o nosso roteiro?",
  keywords: ["rolê", "encontro", "date", "sem perrengue", "comida boa"],
  authors: [{ name: "Operação Rolê" }],
  openGraph: {
    title: "Temos um rolê pendente. 🎯",
    description: "Comida boa, risada garantida e zero perrengue. Bora montar o roteiro?",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#faf6f5",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased selection:bg-rose-200 selection:text-rose-950">
        {children}
      </body>
    </html>
  );
}
