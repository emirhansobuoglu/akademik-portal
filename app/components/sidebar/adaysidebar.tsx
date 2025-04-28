"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdaySidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const links = [
    { name: "İlanlar", path: "/aday/ilanlar" },
    { name: "Başvurularım", path: "/aday/basvurularim" },
  ];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white p-4 flex flex-col justify-between sticky top-0 rounded-bl-lg rounded-br-lg">

      {/* Üst kısım: Başlık ve Linkler */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Aday Paneli</h2>
        <nav className="space-y-2">
          {links.map((link) => {
            const isActive = pathname === link.path;
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
        </nav>
      </div>

      {/* Alt kısım: Kullanıcı Adı ve Çıkış */}
      <div className="border-t border-gray-700 pt-4">
        <div className="text-sm font-semibold mb-2 px-2">{name || "Bilinmeyen Aday"}</div>
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

export default AdaySidebar;
