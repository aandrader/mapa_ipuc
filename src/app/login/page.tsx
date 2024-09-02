import { redirect } from "next/navigation";
import { fetchTemplesByDistrict, fetchUsers } from "../../actions/queries";
import { auth } from "../api/auth/auth";
import { LoginForm } from "./ui/LoginForm";
import { MapsIcon } from "@/components/Icons";
import Link from "next/link";

export default async function DashboardPage({ searchParams }: { searchParams: any }) {
  const session = await auth();
  if (session) redirect("/admin");
  const users = await fetchUsers();
  const temples = searchParams.d ? await fetchTemplesByDistrict(searchParams.d) : [];

  return (
    <div className="w-screen h-screen grid place-items-center bg-blue-ipuc-800 ">
      <Link
        href={"/"}
        className=" absolute top-2 left-2 rounded-2xl flex font-medium bg-blue-700 text-white text-nowrap w-fit gap-2 py-2 px-3 text-xl"
      >
        <h1>Mapa Ipuc</h1>
        <MapsIcon className="size-[28px]" />
      </Link>
      <div className="h-[400px] max-w-[90vw] grid place-items-center">
        <LoginForm
          users={users}
          temples={temples}
          initialDistrict={searchParams.d}
          initialTemple={searchParams.temple}
        />
      </div>
    </div>
  );
}
