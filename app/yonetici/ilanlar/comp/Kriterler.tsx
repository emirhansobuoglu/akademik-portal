"use client";

import { useState } from "react";

interface KadroKriterEkleProps {
  ilanId: string;
  basvuruSuresiBitti: boolean;
}

interface Kriter {
  id: string;
  kategori: string;
  aciklama: string;
  puan: number;
}

const kategoriOptions = [
  "Bilimsel Yayınlar",
  "Projeler",
  "Patentler",
  "Atıflar",
  "İdari Görevler",
  "Jüri Üyelikleri",
  "Sanatsal Etkinlikler",
  "Uluslararası Projeler",
  "Üniversite-Sanayi İşbirlikleri",
  "Danışmanlıklar",
];

const KadroKriterEkle: React.FC<KadroKriterEkleProps> = ({
  ilanId,
  basvuruSuresiBitti,
}) => {
  const [kriterler, setKriterler] = useState<Kriter[]>([
    {
      id: "1",
      kategori: "Bilimsel Yayınlar",
      aciklama: "SCI Expanded dergilerde en az 2 yayın yapmış olmak.",
      puan: 30,
    },
    {
      id: "2",
      kategori: "Projeler",
      aciklama: "Uluslararası proje yürütmüş olmak.",
      puan: 20,
    },
    {
      id: "3",
      kategori: "Patentler",
      aciklama: "Ulusal patent sahibi olmak.",
      puan: 15,
    },
  ]);

  const [kategori, setKategori] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [puan, setPuan] = useState<number | "">("");

  const handleEkle = () => {
    if (!kategori || !aciklama || puan === "") {
      alert("Tüm alanları doldurunuz.");
      return;
    }

    const yeniKriter: Kriter = {
      id: Date.now().toString(),
      kategori,
      aciklama,
      puan: Number(puan),
    };

    setKriterler([...kriterler, yeniKriter]);
    setKategori("");
    setAciklama("");
    setPuan("");
  };
  const handleSil = (id: string) => {
    const yeniKriterler = kriterler.filter((kriter) => kriter.id !== id);
    setKriterler(yeniKriterler);
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Kadro Kriterleri - {ilanId} -</h2>

      {!basvuruSuresiBitti && (
        <div className="flex flex-col gap-4">
          {/* Kategori Seçimi */}
          <select
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Kategori Seçin</option>
            {kategoriOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          {/* Açıklama */}
          <textarea
            placeholder="Kriter Açıklaması"
            value={aciklama}
            onChange={(e) => setAciklama(e.target.value)}
            className="border p-2 rounded"
          />

          {/* Puan */}
          <input
            type="number"
            placeholder="Puan"
            value={puan}
            onChange={(e) =>
              setPuan(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="border p-2 rounded"
          />

          {/* Ekle Butonu */}
          <button
            onClick={handleEkle}
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Kriter Ekle
          </button>
        </div>
      )}

      {/* Eklenen Kriterler Listesi */}
      {kriterler.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Eklenen Kriterler</h3>

          <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">Kategori</th>
                <th className="p-2">Açıklama</th>
                <th className="p-2">Puan</th>
                <th className="p-2 text-center">İşlem</th> {/* Yeni başlık */}
              </tr>
            </thead>
            <tbody>
              {kriterler.map((kriter, index) => (
                <tr key={kriter.id} className="border-t">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{kriter.kategori}</td>
                  <td className="p-2">{kriter.aciklama}</td>
                  <td className="p-2">{kriter.puan}</td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => handleSil(kriter.id)}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-2 py-1 rounded text-xs"
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
