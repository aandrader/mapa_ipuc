import { Drawer } from "@/app/(map)/ui/Drawer";
import { fetchTemples } from "../../actions/queries";
import UserLocationProvider from "@/map/UserLocationProvider";
import MapProvider from "@/map/MapProvider";

export default async function MapsLayout({ children }: { children: React.ReactNode }) {
  const temples = await fetchTemples();
  return (
    <>
      {children} {/* Modal */}
      <UserLocationProvider>
        <MapProvider temples={temples}>
          <Drawer temples={temples} />
        </MapProvider>
      </UserLocationProvider>
    </>
  );
}
