

const AdminPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 ">{children}</div>
    </div>
  );
};

export default AdminPage;
