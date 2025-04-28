"use client";

import PdfModal from "@/app/components/modal/PdfModal";
import { useParams } from "next/navigation";
import { useState } from "react";

const dummyBelgeler = [
  { id: "1", ad: "Özgeçmiş", url: "/belgeler/ozgecmis.pdf" },
  { id: "2", ad: "Diploma", url: "/belgeler/diploma.pdf" },
];

const dummyKriterler = [
  { id: "1", ad: "Bilimsel Yayınlar" },
  { id: "2", ad: "Proje Yürütücülüğü" },
  { id: "3", ad: "Patent" },
];

const dummyAciklama = `
- SCI Expanded dergilerinde 2 makalem yayımlandı.
- TÜBİTAK destekli 1 proje yürüttüm.
- Uluslararası bir konferansta bildiri sundum.
`;

const AdayDegerlendirmePage = () => {
  const params = useParams() as { id: string; adayId: string };
  const { id, adayId } = params;

  const [puanlar, setPuanlar] = useState<{ [kriterId: string]: number }>({});
  const [rapor, setRapor] = useState("");
  const [sonuc, setSonuc] = useState<"Onaylı" | "Reddedildi" | null>(null);
  const [openModalUrl, setOpenModalUrl] = useState<string | null>(null);

  const handleSave = () => {
    const degerlendirmeSonucu = {
      ilanId: id,
      adayId: adayId,
      puanlar,
      rapor,
      sonuc,
    };

    console.log("Kaydedilecek Değerlendirme:", degerlendirmeSonucu);

    // Burada ileride backend API'ye POST yapılacak
  };

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-8">Aday Değerlendirme</h1>

      {/* Aday Bilgisi */}
      <div className="bg-white p-6 rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold mb-4">Aday Bilgileri</h2>
        <p>
          <span className="font-semibold">Aday TC:</span> {adayId}
        </p>
        <p>
          <span className="font-semibold">Aday İsim:</span> Emirhan Söbüoğlu
        </p>
        <p>
          <span className="font-semibold">Aday TC:</span> {adayId}
        </p>
        <p>
          <span className="font-semibold">İlan ID:</span> {id}
        </p>
      </div>

      {/* Başvuru Belgeleri */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold mb-4">Başvuru Belgeleri</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dummyBelgeler.map((belge) => (
            <div
              key={belge.id}
              onClick={() => setOpenModalUrl(belge.url)}
              className="bg-gray-100 p-4 rounded flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-200"
            >
              <p className="font-medium mb-2 truncate">{belge.ad}</p>
              <span className="text-blue-600 text-sm">Görüntüle</span>
            </div>
          ))}
        </div>

        {/* Pdf Modal */}
        {openModalUrl && (
          <PdfModal
            isOpen={true}
            pdfUrl={openModalUrl}
            onClose={() => setOpenModalUrl(null)}
          />
        )}
      </div>

      {/* Adayın Açıklaması */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-4">Adayın Açıklaması</h2>
        <p className="text-gray-700 whitespace-pre-line">{dummyAciklama}</p>
      </div>

      {/* Kadro Kriterleri */}
      <div className="bg-white p-6 rounded-lg shadow space-y-6">
        <h2 className="text-xl font-semibold mb-4">
          Kadro Kriterlerine Göre Puanlama
        </h2>

        {dummyKriterler.map((kriter) => (
          <div key={kriter.id} className="flex items-center gap-4">
            <label className="w-64 font-medium">{kriter.ad}</label>
            <input
              type="number"
              value={puanlar[kriter.id] || ""}
              onChange={(e) =>
                setPuanlar({ ...puanlar, [kriter.id]: Number(e.target.value) })
              }
              className="border p-2 rounded w-32"
              placeholder="Puan"
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
