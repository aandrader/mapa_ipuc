import { Drawer } from "@/components/Drawer/Drawer";
import MapProvider from "@/context/MapContext";
import UserLocationProvider from "@/context/UserLocationContext";

export default function MapsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children} {/* Modal */}
      <UserLocationProvider>
        <MapProvider>
          <Drawer />
        </MapProvider>
      </UserLocationProvider>
    </>
  );
}
