"use client";
import { useEffect, useState } from "react";

type Basvuru = {
  id: number;
  ilanBaslik: string;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi";
};

export default function BasvurularimPage() {
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);

  useEffect(() => {
    const fetchBasvurular = async () => {
      const dummy: Basvuru[] = [
        { id: 1, ilanBaslik: "Bilgisayar Mühendisliği", durum: "Beklemede" },
        { id: 2, ilanBaslik: "Makine Mühendisliği", durum: "Onaylandı" },
      ];
      setBasvurular(dummy);
    };
    fetchBasvurular();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Başvurularım</h1>
      <div className="grid gap-4">
        {basvurular.map((basvuru) => (
          <div key={basvuru.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{basvuru.ilanBaslik}</h2>
            <p className="text-gray-500">Durum: {basvuru.durum}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
