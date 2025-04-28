"use client";

import JuriKayitModal from "@/app/components/modal/JuriKayit";
import { useState } from "react";

const JuriAtama = () => {
  const [tcNo, setTcNo] = useState("");
  const [juriler, setJuriler] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddJuri = () => {
    if (tcNo.length !== 11) {
      alert("Geçerli bir TC Kimlik Numarası giriniz.");
      return;
    }

    if (tcNo === "12345678901") {
      if (!juriler.includes(tcNo)) {
        setJuriler([...juriler, tcNo]);
        setTcNo("");
      } else {
        alert("Bu jüri zaten ekli.");
      }
    } else {
      setIsModalOpen(true);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTcNo("");
  };

  return (
    <div className="bg-white shadow p-6 rounded-lg space-y-4 mb-8">
      <h2 className="text-2xl font-bold mb-4">Jüri Atama</h2>

      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Jüri TC Kimlik No"
          value={tcNo}
          onChange={(e) => setTcNo(e.target.value)}
          className="border p-2 rounded w-64"
          maxLength={11}
        />
        <button
          onClick={handleAddJuri}
          className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded"
        >
          Jüri Ekle
        </button>
      </div>

      <div className="space-y-2">
        {juriler.length === 0 ? (
          <p className="text-gray-500">Henüz jüri atanmadı.</p>
        ) : (
          juriler.map((juri, index) => (
            <div
              key={index}
              className="p-2 border rounded flex justify-between items-center"
            >
              <span>{juri}</span>
              <span className="text-xs text-gray-400">
                Jüri Üyesi {index + 1}
              </span>
            </div>
          ))
        )}
      </div>

      <JuriKayitModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
};

export default JuriAtama;
