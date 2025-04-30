import Link from "next/link";
import { useEffect, useState } from "react";
import { AiFillBell } from "react-icons/ai";

interface Bildirim {
  ilanId: string;
  baslik: string;
  basvuruSayisi: number;
}

const BildirimKutucugu = () => {
  const [bildirimler, setBildirimler] = useState<Bildirim[]>([]);
  const [acik, setAcik] = useState(false);

  useEffect(() => {
    const fetchBildirimler = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/backend-api/ilanlar/bildirim"
        );
        const data = await res.json();
        setBildirimler(data);
      } catch (error) {
        console.error("Bildirim verisi alınamadı", error);
      }
    };

    fetchBildirimler();
  }, []);

  if (!bildirimler.length) return null;

  return (
    <div className="bg-gray-800 rounded-lg mt-4">
      <button
        onClick={() => setAcik(!acik)}
        className="w-full cursor-pointer flex items-center justify-between px-3 py-2 text-white text-sm font-semibold hover:bg-gray-700 transition rounded-t-lg"
      >
        <div className="flex items-center gap-2">
          <AiFillBell size={18} className="text-yellow-400" />
          Bildirimler
        </div>
        <span className="text-xs">{acik ? "▲" : "▼"}</span>
      </button>

      {acik && (
        <div className="overflow-hidden">
          <ul className="text-sm text-gray-300 px-3 py-2 space-y-2 border-t border-gray-700">
            {bildirimler.map((item) => (
              <li key={item.ilanId}>
                <Link
                  href={`/yonetici/ilanlar/${item.ilanId}`}
                  className="block hover:underline"
                >
                  <span className="text-gray-200">
                    {item.baslik} ilanının süresi doldu ve {item.basvuruSayisi}{" "}
                    başvuru mevcut.
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BildirimKutucugu;
