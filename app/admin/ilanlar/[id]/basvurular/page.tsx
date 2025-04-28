"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Basvuru {
  _id: string;
  adayAd: string;
  belgeler: string[];
  durum: string;
}

const BasvurularPage = () => {
  const { id } = useParams();
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);

  useEffect(() => {
    const fetchBasvurular = async () => {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:5000/backend-api/basvurular/ilan/${id}/basvurular`);
        const data = await res.json();
        setBasvurular(data);
      } catch (error) {
        console.error("Başvurular getirilemedi", error);
      }
    };

    fetchBasvurular();
  }, [id]);

  const yetkiliyeYolla = async (basvuruId: string) => {
    try {
      const res = await fetch(`http://localhost:5000/backend-api/basvurular/${basvuruId}/yonlendir`, {
        method: "PUT",
      });
      if (res.ok) {
        alert("✅ Başvuru yetkiliye yönlendirildi!");
        const updated = await res.json();
        setBasvurular((prev) =>
          prev.map((b) => (b._id === updated._id ? updated : b))
        );
      } else {
        alert("❌ Yönlendirme başarısız!");
      }
    } catch (error) {
      console.error("Yönlendirme hatası", error);
      alert("❌ Bir hata oluştu");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">İlan Başvuruları</h1>

      {basvurular.length === 0 ? (
        <p>Henüz bu ilana başvuru yapılmamış.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Aday Adı</th>
              <th className="p-2">Belgeler</th>
              <th className="p-2">Durum</th>
              <th className="p-2">İşlem</th>
            </tr>
          </thead>
          <tbody>
            {basvurular.map((b) => (
              <tr key={b._id} className="border-t">
                <td className="p-2">{b.adayAd}</td>
                <td className="p-2">
                  <ul className="list-disc ml-4">
                    {b.belgeler.map((belge, i) => (
                      <li key={i}>{belge}</li>
                    ))}
                  </ul>
                </td>
                <td className="p-2">{b.durum}</td>
                <td className="p-2">
                  {b.durum !== "Yetkiliye Yönlendirildi" && (
                    <button
                      onClick={() => yetkiliyeYolla(b._id)}
                      className="bg-blue-600 text-white px-2 py-1 rounded"
                    >
                      Yetkiliye Yönlendir
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BasvurularPage;
