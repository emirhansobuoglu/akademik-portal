import JuriSidebar from "../components/sidebar/jurisidebar";

export default function JuriLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <JuriSidebar />
      <div className="flex-1 p-6 bg-gray-50 overflow-auto">{children}</div>
    </div>
  );
}
