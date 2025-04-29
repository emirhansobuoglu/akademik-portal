"use client";

import PdfModal from "@/app/components/modal/PdfModal";
import { Basvuru } from "@/app/types/basvuru";
import { JuriDegerlendirme } from "@/app/types/juridegerlendirme";
import { useEffect, useState } from "react";

interface ModalInceleProps {
  basvuru: Basvuru;
  onClose: () => void;
}

interface KadroKriter {
  _id: string;
  aciklama: string;
}

const ModalIncele = ({ basvuru, onClose }: ModalInceleProps) => {
  const [openPdfUrl, setOpenPdfUrl] = useState<string | null>(null);
  const [degerlendirmeler, setDegerlendirmeler] = useState<
    (JuriDegerlendirme & { juriAd?: string })[]
  >([]);
  const [kadroKriterleri, setKadroKriterleri] = useState<KadroKriter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDegerlendirmeler = async () => {
      try {
        // Başvuruya ait jüri değerlendirmelerini getir
        const res = await fetch(
          `http://localhost:5000/backend-api/degerlendirme/${basvuru._id}`
        );
        const data: JuriDegerlendirme[] = await res.json();

        // Her jüri için ad soyad bilgisini çek
        const enrichedData = await Promise.all(
          data.map(async (degerlendirme) => {
            try {
              const userRes = await fetch(
                `http://localhost:5000/backend-api/auth/user?tckn=${degerlendirme.juriTc}`
              );
              const userData = await userRes.json();
              return { ...degerlendirme, juriAd: userData.name };
            } catch {
              return { ...degerlendirme, juriAd: "Bilinmeyen Jüri" };
            }
          })
        );
        setDegerlendirmeler(enrichedData);
      } catch (error) {
        console.error("Jüri değerlendirmeleri çekilemedi:", error);
      }
    };

    const fetchKadroKriterleri = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/backend-api/kriterler?ilanId=${basvuru.ilanId}`
        );
        const data = await res.json();
        setKadroKriterleri(data);
      } catch (error) {
        console.error("Kadro kriterleri çekilemedi:", error);
      }
    };

    if (basvuru._id && basvuru.ilanId) {
      fetchDegerlendirmeler();
      fetchKadroKriterleri();
      setLoading(false);
    }
  }, [basvuru._id, basvuru.ilanId]);

  const kriterAciklamaGetir = (kriterId: string) => {
    const kriter = kadroKriterleri.find((k) => k._id === kriterId);
    return kriter ? kriter.aciklama : kriterId;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 flex flex-col space-y-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-4">
          <h2 className="text-2xl font-bold">Başvuru İncele</h2>
          <button
            onClick={onClose}
            className="text-red-500 cursor-pointer font-semibold text-lg"
          >
            X
          </button>
        </div>

        {/* Modal İçerik */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol Panel - Aday Bilgileri ve Belgeler */}
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Aday Bilgileri</h3>
              <p>
                <strong>Ad Soyad:</strong> {basvuru.adayAd}
              </p>
              <p>
                <strong>Durum:</strong> {basvuru.durum}
              </p>
              <p>
                <strong>Jüri Onayı:</strong> {basvuru.juriOnaySayisi || 0}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Aday Açıklaması</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {basvuru.aciklama || "Açıklama bulunamadı."}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Belgeler</h3>
              <div className="flex flex-wrap gap-2">
                {basvuru.belgeler && basvuru.belgeler.length > 0 ? (
                  basvuru.belgeler.map((belge, idx) => (
                    <button
                      key={idx}
                      onClick={() => setOpenPdfUrl(`/belgeler/${belge}`)}
                      className="text-blue-600 hover:underline text-sm bg-gray-100 p-2 rounded"
                    >
                      {belge}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">Belge yok</p>
                )}
              </div>
            </div>
          </div>

          {/* Sağ Panel - Jüri Değerlendirmeleri */}
          <div className="flex-1 space-y-6">
            <h3 className="text-xl font-semibold mb-2">
              Jüri Değerlendirmeleri
            </h3>

            {loading ? (
              <p className="text-gray-500">Yükleniyor...</p>
            ) : (
              <div className="space-y-4">
                {degerlendirmeler.length > 0 ? (
                  degerlendirmeler.map((degerlendirme, idx) => (
                    <div
                      key={idx}
                      className="border rounded p-4 shadow-sm bg-gray-50"
                    >
                      <p>
                        <strong>Jüri Adı:</strong> {degerlendirme.juriAd}
                      </p>
                      <p>
                        <strong>Sonuç:</strong>{" "}
                        {degerlendirme.sonuc === "onaylı"
                          ? "✅ Onaylı"
                          : "❌ Reddedildi"}
                      </p>
                      <div className="mt-2">
                        <h4 className="font-semibold">Puanlar:</h4>
                        <ul className="list-disc list-inside text-sm">
                          {Object.entries(degerlendirme.puanlar).map(
                            ([kriterId, puan]) => (
                              <li key={kriterId}>
                                {kriterAciklamaGetir(kriterId)}: {puan}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                      {degerlendirme.rapor && (
                        <div className="mt-2">
                          <h4 className="font-semibold">Rapor:</h4>
                          <p className="text-gray-700 text-sm">
                            {degerlendirme.rapor}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">
                    Henüz jüri değerlendirmesi bulunamadı.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* PDF Modal */}
        {openPdfUrl && (
          <PdfModal
            isOpen={true}
            pdfUrl={openPdfUrl}
            onClose={() => setOpenPdfUrl(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ModalIncele;
