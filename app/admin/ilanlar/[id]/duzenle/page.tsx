"use client";

import { useParams } from "next/navigation";
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

const IlanDuzenlePage = () => {
  const { id } = useParams();
  const [form, setForm] = useState<Omit<Ilan, "_id">>({
    baslik: "",
    kadro: "",
    baslangic: "",
    bitis: "",
    belgeler: [""],
    kosullar: "",
  });

  useEffect(() => {
    const fetchIlan = async () => {
      if (!id) return;
      try {
        const res = await fetch(`http://localhost:5000/backend-api/ilanlar/${id}`);
        const data = await res.json();
        setForm({
          baslik: data.baslik,
          kadro: data.kadro,
          baslangic: data.baslangic?.slice(0, 10),
          bitis: data.bitis?.slice(0, 10),
          belgeler: data.belgeler || [""],
          kosullar: data.kosullar || "",
        });
      } catch (error) {
        console.error("İlan verisi çekilemedi", error);
      }
    };

    fetchIlan();
  }, [id]);

  const handleGuncelle = async () => {
    try {
      const res = await fetch(`http://localhost:5000/backend-api/ilanlar/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("✅ İlan başarıyla güncellendi!");
      } else {
        alert("❌ Güncelleme başarısız!");
      }
    } catch (error) {
      console.error("Güncelleme hatası", error);
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
      <h1 className="text-2xl font-bold mb-6">İlanı Düzenle</h1>

      <div className="space-y-4">
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
          onClick={handleGuncelle}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Kaydet
        </button>
      </div>
    </div>
  );
};

export default IlanDuzenlePage;
