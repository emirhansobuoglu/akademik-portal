import JuriSidebar from "../components/sidebar/jurisidebar";
import ClientRoleGuard from "../utils/ClientRoleGuard";

export default function JuriLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientRoleGuard allowedRoles={["juri"]}>
      <div className="flex min-h-screen">
        <JuriSidebar />
        <div className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</div>
      </div>
    </ClientRoleGuard>
  );
}
