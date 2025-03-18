import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vroom Auto | Achetez votre véhicule depuis votre canapé",
  description: "Des véhicules d'occasion contrôlés et garantis, livrés à domicile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Display:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}