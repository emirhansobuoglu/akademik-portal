"use client";

import Link from "next/link";

const dummyIlanlar = [
  {
    id: "1",
    baslik: "Bilgisayar Mühendisliği Dr. Öğr. Üyesi",
    sonBasvuruTarihi: "2025-06-30",
  },
  {
    id: "2",
    baslik: "Makine Mühendisliği Doçent",
    sonBasvuruTarihi: "2025-07-15",
  },
];

const JuriAnaSayfa = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Atandığınız İlanlar</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {dummyIlanlar.map((ilan) => (
          <div
            key={ilan.id}
            className="bg-white p-6 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold mb-2">{ilan.baslik}</h2>
              <p className="text-sm text-gray-600 mb-4">
                Son Başvuru Tarihi: {ilan.sonBasvuruTarihi}
              </p>
            </div>

            <Link
              href={`/juri/ilan/${ilan.id}`}
              className="mt-auto inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
            >
              Detayları Gör
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JuriAnaSayfa;
