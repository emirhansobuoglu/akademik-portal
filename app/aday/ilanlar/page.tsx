"use client";

import uploadFileToFirebase from "@/app/utils/firebaseUpload";
import { useEffect, useState } from "react";

interface Ilan {
  _id: string;
  baslik: string;
  kadro: string;
  baslangic: string;
  bitis: string;
  belgeler: string[];
  kosullar: string;
  kontenjan: number;
  kadroKriteri?: string;
}

const AdayIlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [kadroKriterleri, setKadroKriterleri] = useState<Record<string, string>>({});
  const [selectedIlan, setSelectedIlan] = useState<Ilan | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [ekDosya, setEkDosya] = useState<File | null>(null);
  const [ekAciklama, setEkAciklama] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ilanRes = await fetch("http://localhost:5000/backend-api/ilanlar");
        const ilanData = await ilanRes.json();
        setIlanlar(ilanData);

        const kriterMap: Record<string, string> = {};
        for (const ilan of ilanData) {
          const kriterRes = await fetch(`http://localhost:5000/backend-api/kriterler?ilanId=${ilan._id}`);
          const kriterData = await kriterRes.json();
          kriterMap[ilan._id] = Array.isArray(kriterData) && kriterData.length > 0
            ? kriterData.map((k) => k.aciklama).join(", ")
            : "-";
        }

        setKadroKriterleri(kriterMap);
      } catch (error) {
        console.error("Veriler getirilemedi", error);
      }
    };

    fetchData();
  }, []);

  const handleBasvur = async (ilanId: string) => {
    console.log("handleBasvur çağrıldı:", ilanId);

    const basvuranAd = localStorage.getItem("name");
    console.log("Aday adı:", basvuranAd);
    console.log("Seçilen ilan:", selectedIlan);
    console.log("CV dosyası:", cvFile);

    if (!basvuranAd || !selectedIlan || !cvFile) {
      alert("Lütfen gerekli bilgileri ve dosyaları giriniz!");
      return;
    }

    try {
      const cvUrl = await uploadFileToFirebase(cvFile);
      console.log("CV Firebase URL:", cvUrl);

      let ekDosyaUrl = "";
      if (ekDosya) {
        ekDosyaUrl = await uploadFileToFirebase(ekDosya);
        console.log("Ek Dosya Firebase URL:", ekDosyaUrl);
      }

      const body = {
        adayAd: basvuranAd,
        ilanId,
        durum: "Beklemede",
        belgeler: [cvUrl, ekDosyaUrl].filter(Boolean),
        cv: cvUrl,
        ekDosya: ekDosyaUrl || "",
        ekAciklama,
        aciklama: ekAciklama,
      };

      console.log("Başvuru POST verisi:", body);

      const res = await fetch("http://localhost:5000/backend-api/basvurular", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        alert("✅ Başvurunuz başarıyla yapıldı!");
        setCvFile(null);
        setEkDosya(null);
        setEkAciklama("");
        setSelectedIlan(null);
      } else {
        const data = await res.json();
        console.log("Sunucu cevabı (başarısız):", data);
        alert(`❌ Başvuru başarısız oldu: ${data.error || "Bilinmeyen hata"}`);
      }
    } catch (error) {
      console.error("❌ Başvuru sırasında beklenmeyen hata:", error);
      alert("❌ Başvuru sırasında hata oluştu.");
    }
  };


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Açık İlanlar</h1>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Başlık</th>
            <th className="p-2">Kadro</th>
            <th className="p-2">Başlangıç</th>
            <th className="p-2">Bitiş</th>
            <th className="p-2">Belgeler</th>
            <th className="p-2">Koşullar</th>
            <th className="p-2">Kontenjan</th>
            <th className="p-2">Kadro Kriteri</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan._id} className="border-t">
              <td className="p-2">{ilan.baslik}</td>
              <td className="p-2">{ilan.kadro}</td>
              <td className="p-2">{ilan.baslangic?.slice(0, 10)}</td>
              <td className="p-2">{ilan.bitis?.slice(0, 10)}</td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {ilan.belgeler?.map((belge, i) => (
                    <li key={i}>{belge}</li>
                  ))}
                </ul>
              </td>
              <td className="p-2">{ilan.kosullar}</td>
              <td className="p-2">{ilan.kontenjan}</td>
              <td className="p-2">{kadroKriterleri[ilan._id] || "-"}</td>
              <td className="p-2">
                <button
                  onClick={() => setSelectedIlan(ilan)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Başvur
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedIlan && (
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h3 className="font-semibold mb-4">Başvurmak İstediğiniz İlan</h3>

          <div className="mb-4">
            <h4 className="font-semibold">İlan Başlığı:</h4>
            <p>{selectedIlan.baslik}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Başvuru Koşulları:</h4>
            <p>{selectedIlan.kosullar || "Koşul belirtilmemiş."}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Kadro Kriteri:</h4>
            <p>{kadroKriterleri[selectedIlan._id] || "Belirtilmemiş."}</p>
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">CV Yükle:</h4>
            <input
              type="file"
              onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              className="border p-2 w-full"
              required
            />
          </div>

          <div className="mb-4">
            <h4 className="font-semibold">Ek Belgeler:</h4>
            <input
              type="file"
              onChange={(e) => setEkDosya(e.target.files?.[0] || null)}
              className="border p-2 w-full"
            />
            <textarea
              placeholder="Ek belge açıklaması"
              value={ekAciklama}
              onChange={(e) => setEkAciklama(e.target.value)}
              className="border p-2 w-full mt-2"
            ></textarea>
          </div>

          <button
            onClick={() => handleBasvur(selectedIlan._id)}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
          >
            Başvuruyu Gönder
          </button>
        </div>
      )}
    </div>
  );
};

export default AdayIlanlarPage;
