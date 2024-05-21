import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Analytics } from "@vercel/analytics/react";

const googleFont = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "Mapa Ipuc - Iglesia Pentecostal Unida de Colombia",
    template: "%s - Mapa Ipuc",
  },
  description:
    "Mapa de las congregaciones, iglesias, templos o lugares de culto de la Iglesia Pentecostal Unida de Colombia ubicados en Medellín, Bello, Copacabana, Itagüí, Sabaneta, Envigado, San Antonio de Prado, La Estrella, San Cristobal. ",
  verification: {
    google: "ZIWk2G1TFig1rid4a1cP1CKZACSQ2ZlOci1VNbrAemM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={googleFont.className + " relative"}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
