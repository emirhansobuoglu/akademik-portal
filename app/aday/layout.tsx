import AdaySidebar from "@/app/components/sidebar/adaysidebar";
import ClientRoleGuard from "../utils/ClientRoleGuard";

export default function AdayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientRoleGuard allowedRoles={["aday"]}>
      <div className="flex min-h-screen">
        <AdaySidebar />
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </ClientRoleGuard>
  );
}
