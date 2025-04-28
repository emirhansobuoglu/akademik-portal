"use client";
import { useState } from "react";

type Basvuru = {
  _id: string;
  ilanId: string;
  adayAd: string;
  belgeler: string[];
  aciklama: string;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi";
};

export default function BasvurularimPage() {
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [adayAd, setAdayAd] = useState("");

  const handleFetch = async () => {
    if (!adayAd.trim()) {
      alert("Adınızı yazınız!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/aday/${adayAd}/basvurular`);
      const data = await res.json();
      setBasvurular(data);
    } catch (error) {
      console.error("Başvurular getirilemedi", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Başvurularım</h1>

      {/* Aday adını yazıp başvuruları çekme */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Adınız"
          value={adayAd}
          onChange={(e) => setAdayAd(e.target.value)}
          className="border p-2 flex-1"
        />
        <button
          onClick={handleFetch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Başvurularımı Getir
        </button>
      </div>

      {/* Başvurular listesi */}
      <div className="grid gap-4">
        {basvurular.map((basvuru) => (
          <div key={basvuru._id} className="p-4 border rounded shadow">
            <h2 className="text-lg font-semibold">İlan ID: {basvuru.ilanId}</h2>
            <p>Durum:
              <span className={`ml-2 font-semibold ${basvuru.durum === "Beklemede"
                  ? "text-yellow-500"
                  : basvuru.durum === "Onaylandı"
                    ? "text-green-600"
                    : "text-red-600"
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
    </div>
  );
}
