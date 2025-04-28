"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import YoneticiPage from "../page"; // Eğer dosya yapın böyleyse (yani /yonetici/page.tsx varsa) bu şekilde import et!

// Tipler
interface Ilan {
  _id: string;
  baslik: string;
  kadro: string;
  baslangic: string;
  bitis: string;
  belgeler: string[];
  kosullar: string;
}

const YoneticiIlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);

  useEffect(() => {
    const fetchIlanlar = async () => {
      const res = await fetch("http://localhost:5000/backend-api/ilanlar");
      const data = await res.json();
      setIlanlar(data);
    };
    fetchIlanlar();
  }, []);

  return (
    <YoneticiPage>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Tüm İlanlar</h1>

        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Başlık</th>
              <th className="p-2">Kadro</th>
              <th className="p-2">Kontenjan</th>
              <th className="p-2">Başlangıç</th>
              <th className="p-2">Bitiş</th>
              <th className="p-2">Koşullar</th>
              <th className="p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {ilanlar.map((ilan) => (
              <tr key={ilan._id} className="border-t">
                <td className="p-2">{ilan.baslik}</td>
                <td className="p-2">{ilan.kadro}</td>
                <td className="p-2"></td>
                <td className="p-2">{ilan.baslangic?.slice(0, 10)}</td>
                <td className="p-2">{ilan.bitis?.slice(0, 10)}</td>
                <td className="p-2">{ilan.kosullar}</td>
                <td className="p-2">
                  <Link
                    href={`/yonetici/ilanlar/${ilan._id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </YoneticiPage>
  );
};

export default YoneticiIlanlarPage;
