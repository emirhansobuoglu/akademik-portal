"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { name: "İlan Yönetimi", path: "/admin/ilanlar" },
    { name: "Üye Kayıt", path: "/admin/uyekayit" },
  ];

  const handleLogout = () => {
    // İstersen burada localStorage temizliği gibi işlemler de ekleyebilirsin
    console.log("Admin Çıkış Yap");
    router.push("/"); // Anasayfaya yönlendir
  };

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col justify-start sticky top-0 rounded-bl-lg rounded-br-lg">
      <h2 className="text-2xl font-bold mb-6">Admin Paneli</h2>

      {/* ✅ Menü Linklerini Üste Aldık */}
      <div className="space-y-2 mb-8">
        {links.map((link) => {
          const isActive = pathname.startsWith(link.path);
          return (
            <Link
              key={link.path}
              href={link.path}
              className={`block px-4 py-2 rounded transition ${isActive ? "bg-gray-800" : "hover:bg-gray-700"}`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>

      {/* ✅ Çıkış butonunu alta sabitlemek için 'mt-auto' kullandık */}
      <div className="border-t border-gray-700 pt-4 px-2 mt-auto">
        <div className="text-sm font-semibold mb-2">Admin</div>
        <button
          onClick={handleLogout}
          className="w-full text-left cursor-pointer bg-red-600 hover:bg-red-700 transition-all duration-300 text-white py-2 px-3 rounded text-sm"
        >
          Çıkış Yap
        </button>
      </div>
    </aside>

  );
};

export default AdminSidebar;
