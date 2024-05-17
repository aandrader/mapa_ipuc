"use client";
import { Drawer } from "@/components/ui/Drawer/Drawer";
import dynamicImport from "next/dynamic";
import { useMemo } from "react";
import { MapProvider } from "@/context/MapContext";

export default function MapsLayout({ children }: { children: React.ReactNode }) {
  const MapWrapper = useMemo(
    () =>
      dynamicImport(() => import("@/components/maps/MapWrapper"), {
        loading: () => (
          <div className="w-screen h-screen">
            <p>Cargando mapa...</p>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return (
    <div className="relative">
      {children} {/* Modal */}
      <MapProvider>
        <MapWrapper />
        <Drawer />
      </MapProvider>
    </div>
  );
}
