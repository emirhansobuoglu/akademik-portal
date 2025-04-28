"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const dummyBasvuranlar = [
  { id: "1", adSoyad: "Ahmet Yılmaz", tcNo: "12345678901" },
  { id: "2", adSoyad: "Ayşe Demir", tcNo: "10987654321" },
];

const IlanDetayPage = () => {
  const params = useParams();
  const { id } = params;

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-4">İlan Detayı - ID: {id}</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Başvuran Adaylar</h2>

        {dummyBasvuranlar.length === 0 ? (
          <p className="text-gray-600">Bu ilana henüz başvuru yapılmadı.</p>
        ) : (
          <div className="grid gap-4">
            {dummyBasvuranlar.map((aday) => (
              <div
                key={aday.id}
                className="flex items-center justify-between bg-gray-100 p-4 rounded"
              >
                <div>
                  <p className="font-semibold">{aday.adSoyad}</p>
                  <p className="text-sm text-gray-500">TC: {aday.tcNo}</p>
                </div>
                <Link
                  href={`/juri/ilan/${id}/aday/${aday.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded"
                >
                  Değerlendir
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default IlanDetayPage;
