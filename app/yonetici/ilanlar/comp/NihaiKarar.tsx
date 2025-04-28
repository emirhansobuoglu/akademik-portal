"use client";

import { useState } from "react";

interface Aday {
  id: string;
  adSoyad: string;
  tcNo: string;
}

interface NihaiKararProps {
  adaylar: Aday[];
  kontenjan: number;
}

const NihaiKarar: React.FC<NihaiKararProps> = ({ adaylar, kontenjan }) => {
  const [seciliAdaylar, setSeciliAdaylar] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (seciliAdaylar.includes(id)) {
      // Seçili ise kaldır
      setSeciliAdaylar(seciliAdaylar.filter((seciliId) => seciliId !== id));
    } else {
      // Seçili değilse ekle
      if (seciliAdaylar.length < kontenjan) {
        setSeciliAdaylar([...seciliAdaylar, id]);
      }
    }
  };

  const handleOnayla = () => {
    console.log("Seçilen Adaylar:", seciliAdaylar);
    alert(`Seçilen adaylar onaylandı: ${seciliAdaylar.join(", ")}`);
    // İleride buradan backend'e seçilen adayları göndereceğiz.
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg space-y-6 mb-8">
      <h2 className="text-2xl font-bold mb-4">Nihai Karar Ver</h2>
      <p className="text-gray-600 mb-4">
        Kontenjan: {kontenjan} kişi alınacak.
      </p>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Seç</th>
            <th className="p-2">Ad Soyad</th>
            <th className="p-2">TC No</th>
          </tr>
        </thead>
        <tbody>
          {adaylar.map((aday) => {
            const isSelected = seciliAdaylar.includes(aday.id);
            const isDisabled = !isSelected && seciliAdaylar.length >= kontenjan;

            return (
              <tr key={aday.id} className="border-t">
                <td className="p-2 border">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    disabled={isDisabled}
                    onChange={() => handleSelect(aday.id)}
                    className="accent-blue-600 cursor-pointer"
                  />
                </td>
                <td className="p-2 border">{aday.adSoyad}</td>
                <td className="p-2 border">{aday.tcNo}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-end">
        <button
          onClick={handleOnayla}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          disabled={seciliAdaylar.length !== kontenjan}
        >
          Seçilenleri Onayla
        </button>
      </div>
    </div>
  );
};

export default NihaiKarar;
