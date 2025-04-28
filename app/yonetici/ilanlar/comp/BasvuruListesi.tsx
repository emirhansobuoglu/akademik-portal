"use client";

import { Basvuru } from "@/app/types/basvuru";

const BasvuruListesi = ({ basvurular }: { basvurular: Basvuru[] }) => {
  return (
    <div className="bg-white shadow p-6 rounded-lg space-y-4 mb-8">
      <h2 className="text-2xl font-bold mb-4">Başvurular</h2>

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Ad Soyad</th>
            <th className="p-2">TC No</th>
            <th className="p-2">Durum</th>
            <th className="p-2">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {basvurular.map((basvuru, index) => (
            <tr key={basvuru._id} className="border-t">
              <td className="p-2">
                <span className="px-2 ">{index + 1}</span>
              </td>
              <td className="p-2">{basvuru.adSoyad}</td>
              <td className="p-2">{basvuru.tcNo}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-white text-xs ${
                    basvuru.durum === "Beklemede"
                      ? "bg-yellow-500"
                      : basvuru.durum === "Onaylandı"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {basvuru.durum}
                </span>
              </td>
              <td className="p-2">
                <button className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white px-3 py-1 rounded text-xs">
                  Tablo 5 Görüntüle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BasvuruListesi;
