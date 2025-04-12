"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const YonetSidebar = () => {
  const pathname = usePathname();

  const links = [
    { name: "İlanlar", path: "/yonetici/ilanlar" },
    { name: "Kadro Kriterleri", path: "/yonetici/kriterler" },
    { name: "Jüri Atama", path: "/yonetici/juri-atama" },
    { name: "Başvurular", path: "/yonetici/basvurular" },
    { name: "Tablo 5", path: "/yonetici/tablo5" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      <h2 className="text-2xl font-bold mb-6">Yönetici Paneli</h2>
      <nav className="space-y-2">
        {links.map((link) => {
          const isActive = pathname === link.path;
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-4 py-2 rounded transition ${
                isActive ? "bg-gray-800" : "hover:bg-gray-700"
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

export default YonetSidebar;
