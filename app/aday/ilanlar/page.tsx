"use client";
import { useEffect, useState } from "react";

type Ilan = {
  id: number;
  baslik: string;
  kadro: string;
  baslangic: string;
  bitis: string;
};

export default function IlanlarPage() {
  const [ilanlar, setIlanlar] = useState<Ilan[]>([]);

  useEffect(() => {
    const fetchIlanlar = async () => {
      const res = await fetch("http://localhost:3001/api/ilanlar");
      const data = await res.json();
      setIlanlar(data);
    };
    fetchIlanlar();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Açık İlanlar</h1>
      <div className="grid gap-4">
        {ilanlar.map((ilan) => (
          <div key={ilan.id} className="p-4 border rounded shadow hover:bg-gray-50">
            <h2 className="text-xl font-semibold">{ilan.baslik}</h2>
            <p className="text-gray-600">{ilan.kadro}</p>
            <p className="text-gray-500 text-sm">
              Başlangıç: {ilan.baslangic} - Bitiş: {ilan.bitis}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
