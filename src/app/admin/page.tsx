import { redirect } from "next/navigation";
import { auth } from "../api/auth/auth";
import { TempleDashboard } from "./TempleDashboard";
import { DistrictDashboard } from "./DistrictDashboard";

export default async function AdminPage() {
  const session = (await auth()) as any;
  if (!session) redirect("/login");

  return session.user.type === "admin" ? <DistrictDashboard /> : <TempleDashboard />;
}
