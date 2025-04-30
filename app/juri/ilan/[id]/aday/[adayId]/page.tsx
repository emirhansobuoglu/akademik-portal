"use client";

import PdfModal from "@/app/components/modal/PdfModal";
import { Basvuru } from "@/app/types/basvuru";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Kriter {
  _id: string;
  aciklama: string;
  maxPuan: number;
}

const AdayDegerlendirmePage = () => {
  const router = useRouter();
  const params = useParams() as { id: string; adayId: string };
  const { id, adayId } = params;

  const [basvuru, setBasvuru] = useState<Basvuru | null>(null);
  const [kriterler, setKriterler] = useState<Kriter[]>([]);
  const [puanlar, setPuanlar] = useState<{ [kriterId: string]: number }>({});
  const [rapor, setRapor] = useState("");
  const [sonuc, setSonuc] = useState<"Onaylı" | "Reddedildi" | null>(null);
  const [openModalUrl, setOpenModalUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Başvuru bilgisi çek
        const basvuruRes = await fetch(
          `http://localhost:5000/backend-api/basvurular/${adayId}`
        );
        const basvuruData = await basvuruRes.json();
        setBasvuru(basvuruData);

        // Kadro kriterleri çek
        const kriterRes = await fetch(
          `http://localhost:5000/backend-api/kriterler?ilanId=${id}`
        );
        const kriterData = await kriterRes.json();
        setKriterler(kriterData);
      } catch (error) {
        console.error("Veriler getirilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id && adayId) fetchData();
  }, [id, adayId]);

  const handleSave = async () => {
    if (!sonuc) {
      alert("Lütfen Onayla veya Reddet seçeneğini işaretleyin.");
      return;
    }

    const degerlendirmeSonucu = {
      juriTc: localStorage.getItem("tcNo"),
      basvuruId: adayId,
      puanlar,
      rapor,
      sonuc: sonuc.toLowerCase(),
    };

    try {
      const res = await fetch(
        "http://localhost:5000/backend-api/degerlendirme",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(degerlendirmeSonucu),
        }
      );

      if (res.ok) {
        alert("✅ Değerlendirme kaydedildi!");
        router.push(`/juri/ilan/${id}`); // ✅ İlgili ilana geri dön
      } else {
        const data = await res.json();
        alert(`❌ Hata: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Değerlendirme kaydedilirken hata oluştu.");
    }
  };

  if (loading) {
    return <div className="p-6">Yükleniyor...</div>;
  }

  if (!basvuru) {
    return <div className="p-6">Aday bilgisi bulunamadı.</div>;
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Aday Değerlendirme</h1>

      {/* Aday Bilgisi */}
      <div className="bg-white p-6 rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold mb-4">Aday</h2>
        <p>
          <span className="font-semibold">Ad Soyad:</span> {basvuru.adayAd}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Adayın Açıklaması */}
        <div className="bg-white p-6 rounded-lg shadow space-y-4 w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Adayın Açıklaması</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {basvuru.aciklama || "Açıklama yok."}
          </p>
        </div>

        {/* Başvuru Belgeleri */}
        <div className="bg-white p-6 rounded-lg shadow space-y-6 w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-4">Başvuru Belgeleri</h2>

          <div className="grid grid-cols-1 gap-4">
            {basvuru.belgeler?.length > 0 ? (
              basvuru.belgeler.map((belge, index) => (
                <div
                  key={index}
                  onClick={() => setOpenModalUrl(belge)}
                  className="bg-gray-100 p-4 rounded flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-200"
                >
                  <span className="text-blue-600 text-sm">Görüntüle</span>
                </div>
              ))
            ) : (
              <p>Belge bulunamadı.</p>
            )}
          </div>

          {openModalUrl && (
            <PdfModal
              isOpen={true}
              pdfUrl={openModalUrl}
              onClose={() => setOpenModalUrl(null)}
            />
          )}
        </div>
      </div>

      {/* Kadro Kriterleri */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold mb-4">
          Kadro Kriterlerine Göre Puanlama
        </h2>

        {kriterler.map((kriter) => (
          <div key={kriter._id} className="flex items-center gap-4">
            <label className="w-64 font-medium">{kriter.aciklama}</label>
            <input
              type="number"
              value={puanlar[kriter._id] || ""}
              onChange={(e) =>
                setPuanlar({ ...puanlar, [kriter._id]: Number(e.target.value) })
              }
              className="border p-2 rounded w-32"
              placeholder={`0 - ${kriter.maxPuan}`}
              min={0}
              max={kriter.maxPuan}
            />
          </div>
        ))}
      </div>

      {/* Değerlendirme Raporu */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Değerlendirme Raporu</h2>
        <textarea
          className="w-full border p-2 rounded min-h-[150px]"
          placeholder="Aday hakkında değerlendirme notu yazınız..."
          value={rapor}
          onChange={(e) => setRapor(e.target.value)}
        />
      </div>

      {/* Onay / Red */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSonuc("Onaylı")}
          className={`px-6 py-3 rounded text-white font-semibold cursor-pointer border-2 transition-all duration-200 ${
            sonuc === "Onaylı"
              ? "bg-green-600 border-black"
              : "bg-green-500 hover:bg-green-600 border-transparent"
          }`}
        >
          Onayla
        </button>

        <button
          onClick={() => setSonuc("Reddedildi")}
          className={`px-6 py-3 rounded text-white font-semibold cursor-pointer border-2 transition-all duration-200 ${
            sonuc === "Reddedildi"
              ? "bg-red-600 border-black"
              : "bg-red-500 hover:bg-red-600 border-transparent"
          }`}
        >
          Reddet
        </button>
      </div>

      {/* Kaydet Butonu */}
      <div className="pt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded font-semibold"
        >
          Değerlendirmeyi Kaydet
        </button>
      </div>
    </div>
  );
};

export default AdayDegerlendirmePage;
