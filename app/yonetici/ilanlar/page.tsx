"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import YoneticiPage from "../page";

// Tipler
interface Ilan {
  _id: string;
  baslik: string;
  kadro: string;
  baslangic: string;
  kontenjan: string;
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

  const getBasvuruDurumuBadge = (bitisTarihi: string) => {
    const today = new Date();
    const bitis = new Date(bitisTarihi);

    if (bitis < today) {
      return (
        <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded">
          Başvuru Süresi Bitti
        </span>
      );
    } else {
      return (
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
          Başvuru Devam Ediyor
        </span>
      );
    }
  };

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
              <th className="p-2">Başvuru Durumu</th> {/* YENİ */}
              <th className="p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {[...ilanlar]
              .sort((a, b) => {
                const now = new Date();
                const aBitis = new Date(a.bitis);
                const bBitis = new Date(b.bitis);

                const aDevamEdiyor = aBitis > now;
                const bDevamEdiyor = bBitis > now;

                if (aDevamEdiyor && !bDevamEdiyor) return -1;
                if (!aDevamEdiyor && bDevamEdiyor) return 1;

                // İkisi de aynıysa bitiş tarihine göre yakın olan üste gelsin
                return aBitis.getTime() - bBitis.getTime();
              })
              .map((ilan) => (
                <tr key={ilan._id} className="border-t">
                  <td className="p-2">{ilan.baslik}</td>
                  <td className="p-2">{ilan.kadro}</td>
                  <td className="p-2">{ilan.kontenjan}</td>
                  <td className="p-2">{ilan.baslangic?.slice(0, 10)}</td>
                  <td className="p-2">{ilan.bitis?.slice(0, 10)}</td>
                  <td className="p-2">{ilan.kosullar}</td>
                  <td className="p-2">
                    {ilan.bitis
                      ? getBasvuruDurumuBadge(ilan.bitis)
                      : "Bilinmiyor"}
                  </td>
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
