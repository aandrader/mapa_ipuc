import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";

const googleFont = Poppins({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: {
    default: "Mapa Ipuc",
    template: "Mapa Ipuc %s",
  },
  description:
    "Mapa de las congregaciones, iglesias, templos o lugares de culto de la Iglesia Pentecostal Unida de Colombia ubicados en Medellín, Bello, Copacabana, Itagüí, Sabaneta, Envigado, San Antonio de Prado, La Estrella, San Cristobal. ",
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
      </body>
    </html>
  );
}
