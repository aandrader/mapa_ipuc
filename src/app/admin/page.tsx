import { redirect } from "next/navigation";
import { auth } from "../api/auth/auth";
import { fetchTempleId, fetchTemplesByDistrictAdmin } from "@/actions/queries";
import { Header } from "./ui/Header";
import { DistrictTable } from "./district/DistrictTable";
import { TempleTable } from "./temple/TempleTable";
import { PasswordDialog } from "./ui/PasswordDialog";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = (await auth()) as any;
  if (!session) redirect("/login");
  const id = session.user.id;

  if (session.user.type === "admin") {
    const temples = await fetchTemplesByDistrictAdmin(id);
    return (
      <>
        <Header title={"Distrito " + id + " Panel administrativo"} />
        <DistrictTable temples={temples} userId={id} />
        <PasswordDialog session={session} />
      </>
    );
  } else {
    const temple = await fetchTempleId(id);
    return (
      <>
        <Header title={"Panel administrativo"} />
        <TempleTable temple={temple} />
        <PasswordDialog session={session} />
      </>
    );
  }
}
