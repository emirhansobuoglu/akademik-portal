import AdminSidebar from "@/app/components/sidebar/adminsidebar";
import ClientRoleGuard from "../utils/ClientRoleGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientRoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </ClientRoleGuard>
  );
}
