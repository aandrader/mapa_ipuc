import { fetchTemplesByDistrict, fetchUsers } from "../../actions/queries";
import { LoginForm } from "./ui/LoginForm";

export default async function DashboardPage({ searchParams }: { searchParams: any }) {
  const users = await fetchUsers();
  const temples = searchParams.d ? await fetchTemplesByDistrict(searchParams.d) : [];

  return (
    <div className="w-screen h-screen grid place-items-center bg-blue-ipuc-800 ">
      <div>
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
