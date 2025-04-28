"use client";

import PdfModal from "@/app/components/modal/PdfModal";
import { useState } from "react";

interface Aday {
  id: string;
  adSoyad: string;
  tcNo: string;
  raporUrl: string;
  tablo5Url: string;
}
interface DegerlendirmeProps {
  ilanId: string;
}
const dummyAdaylar: Aday[] = [
  {
    id: "1",
    adSoyad: "Ahmet Yılmaz",
    tcNo: "12345678901",
    raporUrl: "/pdfs/ahmet-rapor.pdf",
    tablo5Url: "/pdfs/ahmet-tablo5.pdf",
  },
  {
    id: "2",
    adSoyad: "Ayşe Demir",
    tcNo: "10987654321",
    raporUrl: "/pdfs/ayse-rapor.pdf",
    tablo5Url: "/pdfs/ayse-tablo5.pdf",
  },
];

const Degerlendirme: React.FC<DegerlendirmeProps> = ({ ilanId }) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const handleOpenPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  const handleClosePdf = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Değerlendirme</h2>
      {ilanId}
      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Ad Soyad</th>
            <th className="p-2">TC No</th>
            <th className="p-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {dummyAdaylar.map((aday, index) => (
            <tr key={aday.id} className="border-t">
              <td className="p-2">
                <span className="  px-2 ">{index + 1}</span>
              </td>
              <td className="p-2">{aday.adSoyad}</td>
              <td className="p-2">{aday.tcNo}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => handleOpenPdf(aday.raporUrl)}
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                >
                  Değerlendirme Raporu
                </button>
                <button
                  onClick={() => handleOpenPdf(aday.tablo5Url)}
                  className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-3 py-1 rounded text-xs"
                >
                  Tablo 5
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PdfModal'ı kullanıyoruz */}
      <PdfModal
        isOpen={!!selectedPdf}
        pdfUrl={selectedPdf || ""}
        onClose={handleClosePdf}
      />
    </div>
  );
};

export default Degerlendirme;
