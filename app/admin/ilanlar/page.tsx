"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Tipler
interface Ilan {
  _id: string;
  baslik: string;
  kadro: string;
  baslangic: string;
  bitis: string;
  belgeler: string[];
  kosullar: string;
}

const IlanlarPage = () => {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);
  const [form, setForm] = useState<Omit<Ilan, "_id">>({
    baslik: "",
    kadro: "",
    baslangic: "",
    bitis: "",
    belgeler: [""],
    kosullar: "",
  });

  useEffect(() => {
    const fetchIlanlar = async () => {
      try {
        const res = await fetch("http://localhost:5000/backend-api/ilanlar");
        const data = await res.json();
        if (Array.isArray(data)) {
          setIlanlar(data);
        } else {
          console.error("Gelen veri dizi değil:", data);
          setIlanlar([]);
        }
      } catch (error) {
        console.error("İlanlar çekilemedi:", error);
        setIlanlar([]);
      }
    };

    fetchIlanlar();
  }, []);

  const handleEkle = async () => {
    try {
      const res = await fetch("http://localhost:5000/backend-api/ilanlar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("✅ İlan başarıyla eklendi!");
        setForm({ baslik: "", kadro: "", baslangic: "", bitis: "", belgeler: [""], kosullar: "" });
        const data = await res.json();
        setIlanlar((prev) => [...prev, data]);
      } else {
        alert("❌ Sunucu hatası!");
      }
    } catch (error) {
      console.error("İlan ekleme hatası:", error);
      alert("❌ İlan eklenemedi");
    }
  };

  const handleSil = async (id: string) => {
    const onay = confirm("Bu ilanı silmek istediğinize emin misiniz?");
    if (!onay) return;

    try {
      await fetch(`http://localhost:5000/backend-api/ilanlar/${id}`, {
        method: "DELETE",
      });
      setIlanlar((prev) => prev.filter((ilan) => ilan._id !== id));
      alert("İlan silindi!");
    } catch (error) {
      console.error("Silme hatası", error);
      alert("İlan silinemedi!");
    }
  };

  const belgeEkle = () => {
    setForm({ ...form, belgeler: [...form.belgeler, ""] });
  };

  const belgeDegistir = (index: number, value: string) => {
    const yeniBelgeler = [...form.belgeler];
    yeniBelgeler[index] = value;
    setForm({ ...form, belgeler: yeniBelgeler });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">İlanlar</h1>

      {/* Yeni İlan Ekleme Formu */}
      <div className="bg-white shadow p-4 rounded mb-6 space-y-4">
        <input
          type="text"
          value={form.baslik}
          onChange={(e) => setForm({ ...form, baslik: e.target.value })}
          placeholder="İlan Başlığı"
          className="border p-2 w-full"
        />

        <input
          type="text"
          value={form.kadro}
          onChange={(e) => setForm({ ...form, kadro: e.target.value })}
          placeholder="Kadro"
          className="border p-2 w-full"
        />

        <div className="flex gap-4">
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

        <div className="space-y-2">
          <h2 className="font-semibold">Gerekli Belgeler</h2>
          {form.belgeler.map((belge, index) => (
            <input
              key={index}
              type="text"
              value={belge}
              onChange={(e) => belgeDegistir(index, e.target.value)}
              placeholder={`Belge ${index + 1}`}
              className="border p-2 w-full"
            />
          ))}
          <button
            onClick={belgeEkle}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            ➕ Belge Ekle
          </button>
        </div>

        <div className="space-y-2">
          <h2 className="font-semibold">Başvuru Koşulları</h2>
          <textarea
            value={form.kosullar}
            onChange={(e) => setForm({ ...form, kosullar: e.target.value })}
            placeholder="Başvuru koşullarını buraya yazın"
            className="border p-2 w-full h-24"
          ></textarea>
        </div>

        <button
          onClick={handleEkle}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          İlan Ekle
        </button>
      </div>

      {/* İlanlar Tablosu */}
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Başlık</th>
            <th className="p-2">Kadro</th>
            <th className="p-2">Başlangıç</th>
            <th className="p-2">Bitiş</th>
            <th className="p-2">Belgeler</th>
            <th className="p-2">Koşullar</th>
            <th className="p-2">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {ilanlar.map((ilan) => (
            <tr key={ilan._id} className="border-t">
              <td className="p-2">{ilan.baslik}</td>
              <td className="p-2">{ilan.kadro}</td>
              <td className="p-2">{ilan.baslangic?.slice(0, 10)}</td>
              <td className="p-2">{ilan.bitis?.slice(0, 10)}</td>
              <td className="p-2">
                <ul className="list-disc ml-4">
                  {ilan.belgeler?.map((belge, i) => (
                    <li key={i}>{belge}</li>
                  ))}
                </ul>
              </td>
              <td className="p-2">{ilan.kosullar}</td>
              <td className="p-2 space-y-1 space-x-1 flex flex-col">
                <Link href={`/admin/ilanlar/${ilan._id}/duzenle`}>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded w-full">Düzenle</button>
                </Link>
                <Link href={`/admin/ilanlar/${ilan._id}/basvurular`}>
                  <button className="bg-purple-500 text-white px-2 py-1 rounded w-full">Başvurular</button>
                </Link>
                <button
                  onClick={() => handleSil(ilan._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded w-full"
                >
                  Sil
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IlanlarPage;