"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Ilan {
  _id: string;
  baslik: string;
  bitis: string;
}

export default function JuriAnaSayfa() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTcNo = localStorage.getItem("tcNo");
    if (!storedTcNo) {
      alert("TC kimlik numarası bulunamadı. Lütfen tekrar giriş yapın.");
      setLoading(false);
      return;
    }

    const fetchIlanlar = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/backend-api/juriler/tc/${storedTcNo}`
        );

        if (res.status === 404) {
          setIlanlar([]); // hiç atama yok
        } else if (res.ok) {
          const data = await res.json();
          setIlanlar(data);
        } else {
          throw new Error("İlanlar getirilemedi");
        }
      } catch (error) {
        console.error("İlanlar alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIlanlar();
  }, []);

  if (loading) return <div className="p-6">İlanlar yükleniyor...</div>;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Atandığınız İlanlar</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {ilanlar.length === 0 ? (
          <div className="text-gray-500">
            Henüz atandığınız bir ilan bulunmamaktadır.
          </div>
        ) : (
          ilanlar.map((ilan) => (
            <div
              key={ilan._id}
              className="bg-white p-6 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-semibold mb-2">{ilan.baslik}</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Son Başvuru Tarihi: {ilan.bitis?.slice(0, 10) || "Bilinmiyor"}
                </p>
              </div>

              <Link
                href={`/juri/ilan/${ilan._id}`}
                className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
              >
                Detayları Gör
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
