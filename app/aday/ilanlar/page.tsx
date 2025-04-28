"use client";

import { useEffect, useState } from "react";

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

const AdayIlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [basvuranAd, setBasvuranAd] = useState(""); // Başvuranın ismi
  const [selectedIlan, setSelectedIlan] = useState<Ilan | null>(null); // Seçilen ilan
  const [files, setFiles] = useState<Map<number, File | null>>(new Map()); // Yüklenen dosyalar

  useEffect(() => {
    const fetchIlanlar = async () => {
      const res = await fetch("http://localhost:5000/backend-api/ilanlar");
      const data = await res.json();
      setIlanlar(data);
    };
    fetchIlanlar();
  }, []);

  const handleBasvur = async (ilanId: string) => {
    if (!basvuranAd.trim()) {
      alert("Lütfen adınızı girin!");
      return;
    }

    if (!selectedIlan) {
      alert("Lütfen başvurduğunuz ilana tıklayın ve belgelerinizi girin.");
      return;
    }

    // Dosyaları FormData'ya ekle
    const formData = new FormData();
    formData.append("adayAd", basvuranAd);
    formData.append("ilanId", ilanId);
    formData.append("durum", "Beklemede");

    // Belgeleri FormData'ya ekle
    if (files) {
      selectedIlan.belgeler.forEach((belge, index) => {
        const file = files.get(index);
        if (file) {
          formData.append("belgeler", file, file.name);
        }
      });
    }

    try {
      const res = await fetch("http://localhost:5000/backend-api/basvurular", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("✅ Başvurunuz başarıyla yapıldı!");
      } else {
        alert("❌ Başvuru başarısız oldu.");
      }
    } catch (error) {
      console.error("Başvuru hatası:", error);
      alert("❌ Başvuru sırasında hata oluştu.");
    }
  };

  const handleIlanSec = (ilan: Ilan) => {
    setSelectedIlan(ilan); // Seçilen ilanı kaydediyoruz
  };

  const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = new Map(files);
    if (event.target.files && event.target.files[0]) {
      newFiles.set(index, event.target.files[0]);
      setFiles(newFiles);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Açık İlanlar</h1>

      {/* Başvuran adı */}
      <div className="mb-6">
        <input
          type="text"
          value={basvuranAd}
          onChange={(e) => setBasvuranAd(e.target.value)}
          placeholder="Adınızı yazın"
          className="border p-2 w-full"
        />
      </div>

      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Başlık</th>
            <th className="p-2">Kadro</th>
            <th className="p-2">Başlangıç</th>
            <th className="p-2">Bitiş</th>
            <th className="p-2">Belgeler</th>
            <th className="p-2">Koşullar</th>
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
              <td className="p-2">
                <button
                  onClick={() => handleIlanSec(ilan)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Başvur
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Seçilen ilan bilgileri */}
      {selectedIlan && (
        <div className="mt-8 p-4 border border-gray-300 rounded">
          <h3 className="font-semibold mb-4">Başvurmak İstediğiniz İlan</h3>
          <div>
            <h4 className="font-semibold">Başlık:</h4>
            <p>{selectedIlan.baslik}</p>
          </div>
          <div>
            <h4 className="font-semibold">Belgeler:</h4>
            <ul className="list-disc ml-4">
              {selectedIlan.belgeler.map((belge, i) => (
                <li key={i}>
                  {belge}
                  <input
                    type="file"
                    onChange={(e) => handleFileChange(i, e)}
                    className="border p-2 w-full mt-2"
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Başvuru Koşulları:</h4>
            <p>{selectedIlan.kosullar}</p>
          </div>

          <button
            onClick={() => handleBasvur(selectedIlan._id)}
            className="bg-blue-600 text-white px-6 py-2 rounded mt-4"
          >
            Başvur
          </button>
        </div>
      )}
    </div>
  );
};

export default AdayIlanlarPage;
