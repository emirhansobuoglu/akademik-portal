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
};

export default function BasvurularimPage() {
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [ilanBasliklari, setIlanBasliklari] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchBasvurular = async () => {
      const adayAd = localStorage.getItem("name");

      if (!adayAd) {
        alert("Giriş bilgisi bulunamadı. Lütfen tekrar giriş yapın!");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/backend-api/basvurular/aday/${adayAd}`);
        if (!res.ok) {
          throw new Error("Başvurular alınamadı");
        }
        const basvurularData = await res.json();
        setBasvurular(basvurularData);

        // Başvurulan ilanların başlıklarını çekelim
        const ilanPromises = basvurularData.map((basvuru: Basvuru) =>
          fetch(`http://localhost:5000/backend-api/ilanlar/${basvuru.ilanId}`)
            .then((res) => res.json())
            .then((ilan: Ilan) => ({ id: ilan._id, baslik: ilan.baslik }))
            .catch(() => ({ id: basvuru.ilanId, baslik: "Başlık bulunamadı" }))
        );

        const ilanResults = await Promise.all(ilanPromises);

        const yeniBasliklar: Record<string, string> = {};
        ilanResults.forEach((ilan) => {
          yeniBasliklar[ilan.id] = ilan.baslik;
        });

        setIlanBasliklari(yeniBasliklar);
      } catch (error) {
        console.error("Başvurular getirilemedi:", error);
        setBasvurular([]);
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
        <div className="grid gap-4">
          {basvurular.map((basvuru) => (
            <div key={basvuru._id} className="p-4 border rounded shadow">
              <h2 className="text-lg font-semibold">
                {/* İlan başlığı varsa gösterelim */}
                İlan Başlığı: {ilanBasliklari[basvuru.ilanId] || "Başlık yükleniyor..."}
              </h2>
              <p>Durum:
                <span className={`ml-2 font-semibold ${basvuru.durum === "Beklemede"
                  ? "text-yellow-500"
                  : basvuru.durum === "Onaylandı"
                    ? "text-green-600"
                    : basvuru.durum === "Reddedildi"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}>
                  {basvuru.durum}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-2">Açıklama: {basvuru.aciklama}</p>
              <p className="text-sm text-gray-500 mt-1">
                Belgeler: {basvuru.belgeler.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
