"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const GEREKLI_BELGELER_LISTESI = [
  "Diploma",
  "Yabancı Dil Belgesi",
  "Kimlik Fotokopisi",
  "Yayın Listesi",
  "Özgeçmiş",
];

const IlanDuzenlePage = () => {
  const params = useParams();
  const ilanId = params?.id;

  const [baslik, setBaslik] = useState("");
  const [kadro, setKadro] = useState("");
  const [baslangic, setBaslangic] = useState("");
  const [bitis, setBitis] = useState("");
  const [belgeler, setBelgeler] = useState<string[]>([]);
  const [kosullar, setKosullar] = useState("");

  useEffect(() => {
    // Simülasyon: API'den ilan bilgisi çekiliyormuş gibi
    const dummy = {
      baslik: "Bilgisayar Mühendisliği - Dr. Öğr. Üyesi",
      kadro: "Dr. Öğr. Üyesi",
      baslangic: "2025-04-01",
      bitis: "2025-04-30",
      belgeler: ["Diploma", "Yabancı Dil Belgesi"],
      kosullar: "Aday en az 2 A1 yayın sunmalıdır.",
    };

    // Formu doldur
    setBaslik(dummy.baslik);
    setKadro(dummy.kadro);
    setBaslangic(dummy.baslangic);
    setBitis(dummy.bitis);
    setBelgeler(dummy.belgeler);
    setKosullar(dummy.kosullar);
  }, [ilanId]);

  const toggleBelge = (belge: string) => {
    if (belgeler.includes(belge)) {
      setBelgeler(belgeler.filter((b) => b !== belge));
    } else {
      setBelgeler([...belgeler, belge]);
    }
  };

  const handleKaydet = () => {
    // Burada API isteği gönderilecek (PUT / PATCH)
    const duzenlenmisIlan = {
      baslik,
      kadro,
      baslangic,
      bitis,
      belgeler,
      kosullar,
    };
    console.log("Kaydedilen İlan:", duzenlenmisIlan);
    alert("İlan başarıyla güncellendi!");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md p-6 rounded">
      <h1 className="text-2xl font-bold mb-4">İlan Düzenle (ID: {ilanId})</h1>

      <div className="space-y-3">
        <input
          type="text"
          value={baslik}
          onChange={(e) => setBaslik(e.target.value)}
          placeholder="İlan Başlığı"
          className="w-full border p-2"
        />
        <input
          type="text"
          value={kadro}
          onChange={(e) => setKadro(e.target.value)}
          placeholder="Kadro (ör: Doçent)"
          className="w-full border p-2"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={baslangic}
            onChange={(e) => setBaslangic(e.target.value)}
            className="w-full border p-2"
          />
          <input
            type="date"
            value={bitis}
            onChange={(e) => setBitis(e.target.value)}
            className="w-full border p-2"
          />
        </div>

        <div>
          <p className="font-semibold mb-2">Gerekli Belgeler:</p>
          <div className="flex flex-wrap gap-2">
            {GEREKLI_BELGELER_LISTESI.map((belge) => (
              <label key={belge} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={belgeler.includes(belge)}
                  onChange={() => toggleBelge(belge)}
                />
                {belge}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Başvuru Koşulları:</p>
          <textarea
            value={kosullar}
            onChange={(e) => setKosullar(e.target.value)}
            className="w-full border p-2 min-h-[100px]"
          />
        </div>

        <button
          onClick={handleKaydet}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default IlanDuzenlePage;
