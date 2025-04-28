"use client";

import { useEffect, useState } from "react";

interface NihaiKararProps {
  ilanId: string;
}

interface Aday {
  _id: string;
  adSoyad: string;
  tcNo: string;
}

const NihaiKarar: React.FC<NihaiKararProps> = ({ ilanId }) => {
  const [adaylar, setAdaylar] = useState<Aday[]>([]);
  const [kontenjan, setKontenjan] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // İlan bilgilerini çekelim (kontenjanı alacağız)
        const ilanRes = await fetch(
          `http://localhost:5000/backend-api/ilanlar/${ilanId}`
        );
        const ilanData = await ilanRes.json();
        setKontenjan(ilanData.kontenjan || 1);

        // Adayları çekelim
        const adayRes = await fetch(
          `http://localhost:5000/backend-api/basvurular?ilanId=${ilanId}`
        );
        const adayData = await adayRes.json();
        setAdaylar(adayData);
      } catch (error) {
        console.error("Nihai karar verileri yüklenemedi:", error);
      }
    };

    fetchData();
  }, [ilanId]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Nihai Karar Seçimi</h3>

      {/* Adaylar Listesi */}
      <ul className="space-y-2">
        {adaylar.map((aday) => (
          <li key={aday._id} className="flex items-center gap-4">
            <input type="checkbox" id={aday._id} name="adaySecimi" />
            <label htmlFor={aday._id}>
              {aday.adSoyad} ({aday.tcNo})
            </label>
          </li>
        ))}
      </ul>

      <p className="text-sm text-gray-500">
        {kontenjan} kişilik kontenjan bulunmaktadır.
      </p>

      {/* Kaydet Butonu vs. buraya koyulabilir */}
    </div>
  );
};

export default NihaiKarar;
