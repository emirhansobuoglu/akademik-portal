"use client";

import ModalIncele from "@/app/components/modal/BasvuruModal";
import { Basvuru } from "@/app/types/basvuru";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

interface BasvuruListesiProps {
  basvurular: Basvuru[];
  bitisTarihi: string;
  kontenjan: string;
}

const BasvuruListesi = ({
  basvurular,
  bitisTarihi,
  kontenjan,
}: BasvuruListesiProps) => {
  const [selectedBasvuru, setSelectedBasvuru] = useState<Basvuru | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [basvuruBitti, setBasvuruBitti] = useState(false);
  const kontenjanNumber = parseInt(kontenjan.toString(), 10);

  useEffect(() => {
    const today = new Date();
    const bitis = new Date(bitisTarihi);
    setBasvuruBitti(today > bitis);
  }, [bitisTarihi]);

  if (!basvurular.length) {
    return (
      <div className="bg-white shadow p-6 rounded-lg space-y-4 mb-8">
        <h2 className="text-3xl font-bold mb-4">Başvurular</h2>
        <div className="text-gray-500">Henüz başvuru bulunamadı.</div>
      </div>
    );
  }

  const sortedBasvurular = [...basvurular].sort(
    (a, b) => (b.juriOnaySayisi || 0) - (a.juriOnaySayisi || 0)
  );
  const kazananlar = sortedBasvurular.filter((b) => b.durum === "Onaylandı");

  const getOnayBgColor = (onay: number) => {
    if (onay >= 4) return "bg-green-500";
    if (onay >= 2) return "bg-yellow-400";
    return "bg-red-500";
  };

  const toplamJuriSayisi = 5;

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSecimiOnayla = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/backend-api/basvurular/kazanani-sec",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selectedIds }),
        }
      );

      if (res.ok) {
        alert("✅ Seçim başarıyla kaydedildi!");
        window.location.reload();
      } else {
        alert("❌ Bir hata oluştu.");
      }
    } catch (error) {
      console.error("🔥 Seçim kaydetme hatası:", error);
      alert("❌ Sunucu hatası!");
    }
  };
  const handleKazananlariIptalEt = async () => {
    if (!confirm("Kazananlar iptal edilecek. Emin misiniz?")) return;

    try {
      const res = await fetch(
        "http://localhost:5000/backend-api/basvurular/kazananlari-iptal-et",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ilanId: sortedBasvurular[0]?.ilanId }), // varsayım
        }
      );

      if (res.ok) {
        alert("Kazananlar başarıyla iptal edildi.");
        window.location.reload();
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("İptal hatası:", error);
      alert("Sunucu hatası!");
    }
  };

  return (
    <>
      <div className="bg-white shadow p-6 rounded-lg space-y-6 mb-8">
        {/* Kazananlar listesi */}
        {kazananlar.length > 0 && (
          <div className="bg-green-100 border border-green-300 text-green-900 px-4 py-3 rounded mb-4">
            <h3 className="font-semibold text-lg mb-1">Kazananlar:</h3>
            <ul className="list-disc list-inside">
              {kazananlar.map((k) => (
                <li key={k._id}>{k.adayAd}</li>
              ))}
            </ul>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-4">Başvurular</h2>

        <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 text-center">Seç</th>
              <th className="p-2">Ad Soyad</th>
              <th className="p-2">Jüri Onay</th>
              <th className="p-2">İncele</th>
            </tr>
          </thead>
          <tbody>
            {sortedBasvurular.map((basvuru, index) => (
              <tr key={basvuru._id} className="border-t">
                <td className="p-2 text-center">
                  {/* Sadece başvuru bitti ise ve kazananlar yoksa checkbox göster */}
                  {basvuruBitti && kazananlar.length < kontenjanNumber && (
                    <input
                      type="checkbox"
                      key={index}
                      checked={selectedIds.includes(basvuru._id)}
                      onChange={() => toggleSelect(basvuru._id)}
                      disabled={
                        selectedIds.length >= kontenjanNumber &&
                        !selectedIds.includes(basvuru._id)
                      }
                      className="w-4 h-4"
                    />
                  )}
                </td>
                <td className="p-2 flex items-center gap-1">
                  {basvuru.durum === "Yetkiliye Yönlendirildi" && (
                    <FaStar
                      title="Admin tarafından yönlendirildi"
                      className="text-yellow-500"
                      size={14}
                    />
                  )}
                  {basvuru.adayAd}
                </td>
                <td className="p-2">
                  <span
                    className={`inline-block px-3 py-1 text-white text-xs rounded ${getOnayBgColor(
                      basvuru.juriOnaySayisi || 0
                    )}`}
                  >
                    {basvuru.juriOnaySayisi || 0}/{toplamJuriSayisi}
                  </span>
                </td>
                <td className="p-2">
                  <button
                    onClick={() => setSelectedBasvuru(basvuru)}
                    className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-3 py-1 rounded text-xs"
                  >
                    İncele
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Seçimi Onaylama Butonu */}
        {basvuruBitti &&
          kazananlar.length < kontenjanNumber &&
          selectedIds.length > 0 && (
            <div className="pt-6 flex justify-end">
              <button
                onClick={handleSecimiOnayla}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold"
              >
                Seçimi Onayla
              </button>
            </div>
          )}

        {/* Başvuru süresi bitmemişse info mesajı */}
        {basvuruBitti && kazananlar.length >= kontenjanNumber && (
          <div className="pt-4 text-center text-green-700 font-semibold">
            Bu ilan için kazanan kontenjanı doldu.
            <br />
            <button
              onClick={handleKazananlariIptalEt}
              className="mt-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Kazananları İptal Et
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBasvuru && (
        <ModalIncele
          basvuru={selectedBasvuru}
          onClose={() => setSelectedBasvuru(null)}
        />
      )}
    </>
  );
};

export default BasvuruListesi;
