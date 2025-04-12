"use client";
import { useEffect, useState } from "react";
import YoneticiPage from "../page";

const IlanlarPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ilanlar, setIlanlar] = useState<any[]>([]);

  // Simülasyon
  useEffect(() => {
    const dummyIlanlar = [
      {
        id: 1,
        baslik: "Bilgisayar Mühendisliği - Dr. Öğr. Üyesi",
        kadro: "Dr. Öğr. Üyesi",
        basvuru: "12",
        baslangic: "2025-04-01",
        bitis: "2025-04-30",
      },
      {
        id: 2,
        baslik: "Makine Mühendisliği - Doçent",
        kadro: "Doçent",
        basvuru: "23",
        baslangic: "2025-03-20",
        bitis: "2025-04-10",
      },
      {
        id: 3,
        baslik: "Bil. Sis. Mühendisliği - Doçent",
        kadro: "Doçent",
        basvuru: "8",
        baslangic: "2025-03-22",
        bitis: "2025-04-13",
      },
    ];
    setIlanlar(dummyIlanlar);
  }, []);
  return (
    <YoneticiPage>
      <div>
        <h1 className="text-2xl font-bold mb-6">İlan Listesi</h1>
        <h1 className="text-l font-semibold mb-6">
          İlanı düzenlemek için ilgili ilan noya basın.
        </h1>
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">No</th>
              <th className="p-2">Başlık</th>
              <th className="p-2">Kadro</th>
              <th className="p-2">Başvuru Sayısı</th>
              <th className="p-2">Başlangıç</th>
              <th className="p-2">Bitiş</th>
              <th className="p-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {ilanlar.map((ilan, index) => {
              const bugun = new Date();
              const bitisTarihi = new Date(ilan.bitis);
              const aktif = bitisTarihi >= bugun;

              return (
                <tr key={ilan.id} className="border-t">
                  <td className="p-2">
                    <button className="cursor-pointer bg-amber-300 rounded px-2">
                      {index + 1}
                    </button>
                  </td>
                  <td className="p-2">{ilan.baslik}</td>
                  <td className="p-2">{ilan.kadro}</td>
                  <td className="p-2">{ilan.basvuru}</td>
                  <td className="p-2">{ilan.baslangic}</td>
                  <td className="p-2">{ilan.bitis}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        aktif ? "bg-green-600" : "bg-red-600"
                      }`}
                    >
                      {aktif ? "Aktif" : "Süresi Doldu"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </YoneticiPage>
  );
};

export default IlanlarPage;
