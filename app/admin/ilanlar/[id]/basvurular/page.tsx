"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Basvuru = {
  id: number;
  adayAd: string;
  belgeler: string[];
  durum: "Beklemede" | "Onaylandı" | "Reddedildi";
};

const BasvurularPage = () => {
  const { id } = useParams(); // ilan id
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);

  useEffect(() => {
    // Simülasyon (normalde API'den gelir)
    const dummy: Basvuru[] = [
      {
        id: 1,
        adayAd: "Ahmet Yılmaz",
        belgeler: ["Diploma", "Kimlik Fotokopisi", "Yayın Listesi"],
        durum: "Beklemede",
      },
      {
        id: 2,
        adayAd: "Zeynep Kara",
        belgeler: ["Diploma", "Yabancı Dil Belgesi"],
        durum: "Onaylandı",
      },
      {
        id: 3,
        adayAd: "Mert Demir",
        belgeler: ["Diploma"],
        durum: "Reddedildi",
      },
    ];
    setBasvurular(dummy);
  }, [id]);

  const durumRenk = (durum: string) => {
    switch (durum) {
      case "Onaylandı":
        return "bg-green-500";
      case "Reddedildi":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  const durumDegistir = (id: number, yeniDurum: "Onaylandı" | "Reddedildi") => {
    setBasvurular((prev) =>
      prev.map((b) =>
        b.id === id ? { ...b, durum: yeniDurum } : b
      )
    );
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        İlan #{id} - Başvurular
      </h1>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Aday</th>
            <th className="p-2">Belgeler</th>
            <th className="p-2">Durum</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {basvurular.map((b, index) => (
            <tr key={b.id} className="border-t">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{b.adayAd}</td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {b.belgeler.map((belge, i) => (
                    <li key={i}>{belge}</li>
                  ))}
                </ul>
              </td>
              <td className="p-2">
                <span
                  className={`text-white text-xs px-2 py-1 rounded ${durumRenk(
                    b.durum
                  )}`}
                >
                  {b.durum}
                </span>
              </td>
              <td className="p-2 space-x-2">
                {b.durum === "Beklemede" && (
                  <>
                    <button
                      onClick={() => durumDegistir(b.id, "Onaylandı")}
                      className="bg-green-600 text-white px-2 py-1 rounded"
                    >
                      Onayla
                    </button>
                    <button
                      onClick={() => durumDegistir(b.id, "Reddedildi")}
                      className="bg-red-600 text-white px-2 py-1 rounded"
                    >
                      Reddet
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasvurularPage;
