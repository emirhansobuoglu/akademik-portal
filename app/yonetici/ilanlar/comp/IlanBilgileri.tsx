"use client";

interface Ilan {
  id: string;
  baslik: string;
  kadro: string;
  baslangic: string;
  bitis: string;
  aciklama: string;
}

const IlanBilgileri = ({ ilan }: { ilan: Ilan }) => (
  <div className="bg-white shadow p-6 rounded-lg space-y-4 mb-8">
    <h1 className="text-3xl font-bold mb-6">İlan Detayı</h1>
    <div>
      <strong>Başlık:</strong> {ilan.baslik}
    </div>
    <div>
      <strong>Kadro:</strong> {ilan.kadro}
    </div>
    <div>
      <strong>Başlangıç Tarihi:</strong> {ilan.baslangic}
    </div>
    <div>
      <strong>Bitiş Tarihi:</strong> {ilan.bitis}
    </div>
    <div>
      <strong>Açıklama:</strong> {ilan.aciklama}
    </div>
  </div>
);

export default IlanBilgileri;
