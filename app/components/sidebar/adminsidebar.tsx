"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "İlan Yönetimi", path: "/admin/ilanlar" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Admin Paneli</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-4 py-2 rounded transition ${isActive ? "bg-gray-800" : "hover:bg-gray-700"
                }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;
