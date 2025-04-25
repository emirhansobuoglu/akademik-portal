"use client";
import Link from "next/link";
import { useEffect, useState } from "react";


type Ilan = {
  id: number;
  baslik: string;
  kadro: string;
  basvuru: number;
  baslangic: string;
  bitis: string;
};

const IlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [form, setForm] = useState<Omit<Ilan, "id" | "basvuru">>({
    baslik: "",
    kadro: "",
    baslangic: "",
    bitis: "",
  });
  const [duzenlenenId, setDuzenlenenId] = useState<number | null>(null);

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        baslik: "Bilgisayar Mühendisliği - Dr. Öğr. Üyesi",
        kadro: "Dr. Öğr. Üyesi",
        basvuru: 12,
        baslangic: "2025-04-01",
        bitis: "2025-04-30",
      },
    ];
    setIlanlar(dummy);
  }, []);

  const formTemizle = () => {
    setForm({ baslik: "", kadro: "", baslangic: "", bitis: "" });
    setDuzenlenenId(null);
  };

  const handleEkleGuncelle = () => {
    if (!form.baslik || !form.kadro) return;

    if (duzenlenenId !== null) {
      // GÜNCELLE
      const guncellenmis = ilanlar.map((i) =>
        i.id === duzenlenenId ? { ...i, ...form } : i
      );
      setIlanlar(guncellenmis);
    } else {
      // YENİ EKLE
      const yeni: Ilan = {
        id: ilanlar.length + 1,
        ...form,
        basvuru: 0,
      };
      setIlanlar([...ilanlar, yeni]);
    }

    formTemizle();
  };

  const handleDuzenle = (ilan: Ilan) => {
    setForm({
      baslik: ilan.baslik,
      kadro: ilan.kadro,
      baslangic: ilan.baslangic,
      bitis: ilan.bitis,
    });
    setDuzenlenenId(ilan.id);
  };

  const handleSil = (id: number) => {
    setIlanlar(ilanlar.filter((i) => i.id !== id));
    if (duzenlenenId === id) formTemizle();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">İlanlar</h1>

      {/* Ekle / Güncelle Formu */}
      <div className="bg-white shadow p-4 rounded mb-6 space-y-2">
        <h2 className="font-semibold">
          {duzenlenenId ? "İlanı Güncelle" : "Yeni İlan Ekle"}
        </h2>
        <input
          type="text"
          placeholder="İlan Başlığı"
          value={form.baslik}
          onChange={(e) => setForm({ ...form, baslik: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Kadro (ör: Doçent)"
          value={form.kadro}
          onChange={(e) => setForm({ ...form, kadro: e.target.value })}
          className="border p-2 w-full"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={form.baslangic}
            onChange={(e) => setForm({ ...form, baslangic: e.target.value })}
            className="border p-2 w-full"
          />
          <input
            type="date"
            value={form.bitis}
            onChange={(e) => setForm({ ...form, bitis: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEkleGuncelle}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {duzenlenenId ? "Güncelle" : "Ekle"}
          </button>
          {duzenlenenId && (
            <button
              onClick={formTemizle}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              İptal
            </button>
          )}
        </div>
      </div>

      {/* Tablo */}
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">No</th>
            <th className="p-2">Başlık</th>
            <th className="p-2">Kadro</th>
            <th className="p-2">Başvuru</th>
            <th className="p-2">Başlangıç</th>
            <th className="p-2">Bitiş</th>
            <th className="p-2">Durum</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan, index) => {
            const aktif = new Date(ilan.bitis) >= new Date();
            return (
              <tr key={ilan.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{ilan.baslik}</td>
                <td className="p-2">{ilan.kadro}</td>
                <td className="p-2">{ilan.basvuru}</td>
                <td className="p-2">{ilan.baslangic}</td>
                <td className="p-2">{ilan.bitis}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${aktif ? "bg-green-600" : "bg-red-600"}`}>
                    {aktif ? "Aktif" : "Süresi Doldu"}
                  </span>
                </td>
                <td className="p-2 space-x-2">
                  <Link href={`/admin/ilanlar/${ilan.id}/duzenle`}>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded">Düzenle</button>
                  </Link>
                  <Link href={`/admin/ilanlar/${ilan.id}/basvurular`}>
                    <button className="bg-purple-500 text-white px-2 py-1 rounded">Başvurular</button>
                  </Link>
                  <button
                    onClick={() => handleSil(ilan.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Sil
                  </button>
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default IlanlarPage;
