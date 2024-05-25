import { Drawer } from "@/components/Drawer/Drawer";
import MapProvider from "@/context/MapContext";
import UserLocationProvider from "@/context/UserLocationContext";
import { publish } from "@/utils/events";

export default function MapsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      {children} {/* Modal */}
      <UserLocationProvider>
        <MapProvider>
          <Drawer />
        </MapProvider>
      </UserLocationProvider>
    </div>
  );
}
