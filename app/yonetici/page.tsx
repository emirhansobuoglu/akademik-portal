import YonetSidebar from "@/app/components/sidebar/yoneticisidebar";

const YoneticiPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <YonetSidebar />
      <div className="flex-1 p-6 ">{children}</div>
    </div>
  );
};

export default YoneticiPage;
