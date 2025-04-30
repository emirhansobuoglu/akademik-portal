import YonetSidebar from "@/app/components/sidebar/yoneticisidebar";
import ClientRoleGuard from "../utils/ClientRoleGuard";

const YoneticiPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClientRoleGuard allowedRoles={["yonetici"]}>
      <div className="flex min-h-screen">
        <YonetSidebar />
        <div className="flex-1 p-6 ">{children}</div>
      </div>
    </ClientRoleGuard>
  );
};

export default YoneticiPage;
