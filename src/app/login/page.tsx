import { redirect } from "next/navigation";
import { fetchTemplesByDistrict, fetchUsers } from "../../actions/queries";
import { auth } from "../api/auth/auth";
import { LoginForm } from "./ui/LoginForm";

export default async function DashboardPage({ searchParams }: { searchParams: any }) {
  const session = await auth();
  if (session) redirect("/admin");
  const users = await fetchUsers();
  const temples = searchParams.d ? await fetchTemplesByDistrict(searchParams.d) : [];

  return (
    <div className="w-screen h-screen grid place-items-center bg-blue-ipuc-800 ">
      <div className="h-[400px] max-w-[90%] grid place-items-center">
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
