"use client";

import { useEffect, useState } from "react";

interface KadroKriterEkleProps {
  ilanId: string;
  basvuruSuresiBitti: boolean;
}

interface Kriter {
  _id: string;
  aciklama: string;
  maxPuan: number;
}

const KadroKriterEkle: React.FC<KadroKriterEkleProps> = ({
  ilanId,
  basvuruSuresiBitti,
}) => {
  const [aciklama, setAciklama] = useState("");
  const [maxPuan, setMaxPuan] = useState<number>(0);
  const [kriterler, setKriterler] = useState<Kriter[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchKriterler = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/backend-api/kriterler?ilanId=${ilanId}`
        );
        const data = await res.json();
        setKriterler(data);
      } catch (error) {
        console.error("Kriterler yüklenemedi:", error);
      }
    };

    fetchKriterler();
  }, [ilanId]);

  const handleEkle = async () => {
    if (!aciklama || maxPuan <= 0) {
      alert("Açıklama ve Puan boş olamaz!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/backend-api/kriterler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ilanId, aciklama, maxPuan }),
      });

      if (res.ok) {
        const yeniKriter = await res.json();
        setKriterler((prev) => [...prev, yeniKriter]);
        setAciklama("");
        setMaxPuan(0);
      } else {
        alert("Kriter eklenemedi!");
      }
    } catch (error) {
      console.error("Kriter ekleme hatası:", error);
    }
    setLoading(false);
  };

  const handleSil = async (kriterId: string) => {
    const onay = window.confirm("Bu kriteri silmek istiyor musun?");
    if (!onay) return;

    try {
      const res = await fetch("http://localhost:5000/backend-api/kriterler", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kriterId }),
      });

      if (res.ok) {
        setKriterler((prev) => prev.filter((k) => k._id !== kriterId));
      } else {
        alert("Kriter silinemedi!");
      }
    } catch (error) {
      console.error("Kriter silme hatası:", error);
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Kadro Kriterleri</h2>

      {/* Kriter Ekleme Alanı */}
      {!basvuruSuresiBitti && (
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Açıklama"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="number"
            placeholder="Maksimum Puan"
            value={maxPuan}
            onChange={(e) => setMaxPuan(parseInt(e.target.value))}
            className="border p-2 rounded w-40"
          />
          <button
            onClick={handleEkle}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {loading ? "Ekleniyor..." : "Ekle"}
          </button>
        </div>
      )}

      {/* Eklenen Kriterler Tablosu */}
      {kriterler.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Eklenen Kriterler</h3>

          <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Açıklama</th>
                <th className="p-2">Puan</th>
                <th className="p-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {kriterler.map((kriter, index) => (
                <tr key={kriter._id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{kriter.aciklama}</td>
                  <td className="p-2">{kriter.maxPuan}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleSil(kriter._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default KadroKriterEkle;
