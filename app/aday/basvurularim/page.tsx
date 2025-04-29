"use client";

import { useEffect, useState } from "react";

type Basvuru = {
  _id: string;
  ilanId: string;
  adayAd: string;
  belgeler: string[];
  aciklama: string;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi" | "Yetkiliye Yönlendirildi";
};

type Ilan = {
  _id: string;
  baslik: string;
  kadro: string;
  kontenjan: number;
  kosullar: string;
};

export default function BasvurularimPage() {
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [ilanlarMap, setIlanlarMap] = useState<Record<string, Ilan>>({});

  useEffect(() => {
    const fetchBasvurular = async () => {
      const adayAd = localStorage.getItem("name");

      if (!adayAd) {
        alert("Giriş bilgisi bulunamadı. Lütfen tekrar giriş yapın!");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/backend-api/basvurular/aday/${adayAd}`);
        const basvurularData = await res.json();
        setBasvurular(basvurularData);

        const ilanPromises = basvurularData.map((b: Basvuru) =>
          fetch(`http://localhost:5000/backend-api/ilanlar/${b.ilanId}`)
            .then((r) => r.json())
            .then((ilan: Ilan) => ({ [ilan._id]: ilan }))
        );

        const ilanArray = await Promise.all(ilanPromises);
        const ilanMap = Object.assign({}, ...ilanArray);
        setIlanlarMap(ilanMap);
      } catch (error) {
        console.error("Veriler getirilemedi:", error);
      }
    };

    fetchBasvurular();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Başvurularım</h1>

      {basvurular.length === 0 ? (
        <p>Henüz başvuru yapılmamış.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">İlan Başlığı</th>
              <th className="p-2">Kadro</th>
              <th className="p-2">Kontenjan</th>
              <th className="p-2">Koşullar</th>
              <th className="p-2">Durum</th>
              <th className="p-2">Açıklama</th>
              <th className="p-2">Belgeler</th>
            </tr>
          </thead>
          <tbody>
            {basvurular.map((b) => {
              const ilan = ilanlarMap[b.ilanId];
              return (
                <tr key={b._id} className="border-t">
                  <td className="p-2">{ilan?.baslik || "Bilinmiyor"}</td>
                  <td className="p-2">{ilan?.kadro || "-"}</td>
                  <td className="p-2">{ilan?.kontenjan ?? "-"}</td>
                  <td className="p-2">{ilan?.kosullar || "-"}</td>
                  <td className="p-2 font-semibold text-sm">
                    <span
                      className={`${b.durum === "Beklemede"
                          ? "text-yellow-500"
                          : b.durum === "Onaylandı"
                            ? "text-green-600"
                            : b.durum === "Reddedildi"
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}
                    >
                      {b.durum}
                    </span>
                  </td>
                  <td className="p-2 text-gray-600 text-sm">{b.aciklama}</td>
                  <td className="p-2 text-xs">
                    <ul className="list-disc ml-4">
                      {b.belgeler.map((belge, i) => (
                        <li key={i}>
                          <a href={belge} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                            Belge {i + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
