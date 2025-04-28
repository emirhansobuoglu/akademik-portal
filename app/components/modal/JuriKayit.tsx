"use client";

import { useState } from "react";

interface JuriKayitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JuriKayitModal: React.FC<JuriKayitModalProps> = ({ isOpen, onClose }) => {
  const [ad, setAd] = useState("");
  const [soyad, setSoyad] = useState("");
  const [unvan, setUnvan] = useState("");
  const [bolum, setBolum] = useState("");

  if (!isOpen) return null; // Modal kapalıysa hiçbir şey gösterme

  const handleSave = () => {
    console.log({
      ad,
      soyad,
      unvan,
      bolum,
    });

    // Şu anda sadece console'a basıyoruz
    // İleride buradan API'ye POST yapacağız

    onClose(); // Kayıt sonrası modal kapansın
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold">Yeni Jüri Kaydı</h2>
        <div>
          <label className="block mb-1">Ad</label>
          <input
            type="text"
            value={ad}
            onChange={(e) => setAd(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Soyad</label>
          <input
            type="text"
            value={soyad}
            onChange={(e) => setSoyad(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Ünvan</label>
          <input
            type="text"
            value={unvan}
            onChange={(e) => setUnvan(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block mb-1">Bölüm</label>
          <input
            type="text"
            value={bolum}
            onChange={(e) => setBolum(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default JuriKayitModal;
