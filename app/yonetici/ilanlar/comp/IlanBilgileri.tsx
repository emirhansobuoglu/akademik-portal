"use client";

import { Ilan } from "@/app/types/ilan";

const IlanBilgileri = ({ ilan }: { ilan: Ilan }) => (
  <div className="bg-white shadow p-6 rounded-lg space-y-6 mb-8">
    <h1 className="text-3xl font-bold mb-6">İlan Detayı</h1>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Sol Sütun */}
      <div className="space-y-4">
        <div>
          <strong>Başlık:</strong> {ilan.baslik}
        </div>
        <div>
          <strong>Kadro:</strong> {ilan.kadro}
        </div>
        <div>
          <strong>Kontenjan:</strong> {ilan.kontenjan}
        </div>
      </div>

      {/* Sağ Sütun */}
      <div className="space-y-4">
        <div>
          <strong>Başlangıç Tarihi:</strong> {ilan.baslangic?.slice(0, 10)}
        </div>
        <div>
          <strong>Bitiş Tarihi:</strong> {ilan.bitis?.slice(0, 10)}
        </div>
        <div>
          <strong>Koşullar:</strong> {ilan.kosullar}
        </div>
      </div>
    </div>
  </div>
);

export default IlanBilgileri;
