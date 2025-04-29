"use client";

import { Basvuru } from "@/app/types/basvuru";
import { JuriDegerlendirme } from "@/app/types/juridegerlendirme";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface BasvuruWithDegerlendirme extends Basvuru {
  juriDegerlendirme?: JuriDegerlendirme;
}

const IlanDetayPage = () => {
  const params = useParams();
  const { id } = params;
  const [basvurular, setBasvurular] = useState<BasvuruWithDegerlendirme[]>([]);
  const [loading, setLoading] = useState(true);
  const [ilanBaslik, setIlanBaslik] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Başvuruları getir
        const res = await fetch(
          `http://localhost:5000/backend-api/basvurular/ilan/${id}`
        );
        const basvuruData = await res.json();

        // İlan bilgisini getir
        const ilanRes = await fetch(
          `http://localhost:5000/backend-api/ilanlar/${id}`
        );
        const ilanData = await ilanRes.json();
        setIlanBaslik(ilanData.baslik);

        // Şu anki jürinin TC'si
        const tcNo = localStorage.getItem("tcNo");
        if (!tcNo) throw new Error("TC bilgisi bulunamadı!");

        const enrichedBasvurular = await Promise.all(
          basvuruData.map(async (basvuru: Basvuru) => {
            try {
              const degerlendirmeRes = await fetch(
                `http://localhost:5000/backend-api/degerlendirme/basvuru/${basvuru._id}/juri/${tcNo}`
              );
              if (degerlendirmeRes.ok) {
                const juriDegerlendirme = await degerlendirmeRes.json();
                return { ...basvuru, juriDegerlendirme };
              } else {
                return { ...basvuru };
              }
            } catch (error) {
              console.error("Değerlendirme çekilemedi:", error);
              return { ...basvuru };
            }
          })
        );

        setBasvurular(enrichedBasvurular);
      } catch (error) {
        console.error("Veriler getirilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const sortedBasvurular = [...basvurular].sort((a, b) => {
    const getStatusOrder = (basvuru: BasvuruWithDegerlendirme) => {
      if (!basvuru.juriDegerlendirme) return 1;
      return basvuru.juriDegerlendirme.sonuc === "onaylı" ? 2 : 3;
    };
    return getStatusOrder(a) - getStatusOrder(b);
  });

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">
        İlan Detayı: {ilanBaslik ? ilanBaslik : `#${id}`}
      </h1>

      {/* Başvuranlar */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Başvuran Adaylar</h2>

        {loading ? (
          <p className="text-gray-500">Yükleniyor...</p>
        ) : sortedBasvurular.length === 0 ? (
          <p className="text-gray-600">Bu ilana henüz başvuru yapılmadı.</p>
        ) : (
          <div className="grid gap-4">
            {sortedBasvurular.map((aday) => {
              const juriSonuc = aday.juriDegerlendirme?.sonuc;
              const durum = !juriSonuc
                ? "Beklemede"
                : juriSonuc === "onaylı"
                ? "Onaylandı"
                : "Reddedildi";

              return (
                <div
                  key={aday._id}
                  className="flex items-center justify-between bg-gray-100 p-4 rounded"
                >
                  <div>
                    <p className="font-semibold">{aday.adayAd}</p>
                    <p className="text-sm text-gray-500">{aday.aciklama}</p>
                    <span
                      className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded ${
                        durum === "Beklemede"
                          ? "bg-yellow-400 text-black"
                          : durum === "Onaylandı"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      {durum}
                    </span>
                  </div>

                  {/* Sadece Beklemede olanlarda Değerlendir butonu göster */}
                  {durum === "Beklemede" && (
                    <Link
                      href={`/juri/ilan/${id}/aday/${aday._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                    >
                      Değerlendir
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default IlanDetayPage;
