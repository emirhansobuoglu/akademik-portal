"use client";

import { useState } from "react";

interface JuriKayitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJuriCreated: (user: { adSoyad: string; tcNo: string }) => void; // Kayıt sonrası jüri eklemek için
  tcNo: string; // Modal açılırken TC no zaten elimizde olacak
}

const JuriKayitModal: React.FC<JuriKayitModalProps> = ({
  isOpen,
  onClose,
  onJuriCreated,
  tcNo,
}) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null; // Modal kapalıysa gösterme

  const handleSave = async () => {
    if (!name || !password) {
      alert("Lütfen tüm alanları doldurunuz!");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/backend-api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tckn: tcNo,
            name,
            password,
            role: "juri", // Burada role sabit jüri olacak
          }),
        }
      );

      if (res.ok) {
        alert("✅ Jüri başarıyla kaydedildi!");

        // Kullanıcı kaydedildiği anda juri olarak sisteme ekliyoruz:
        onJuriCreated({ adSoyad: name, tcNo });

        onClose(); // Modalı kapat
        setName("");
        setPassword("");
      } else {
        const errorData = await res.json();
        alert(`❌ Kayıt başarısız: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Jüri kayıt hatası:", error);
      alert("❌ Kayıt sırasında hata oluştu");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[400px] space-y-4 shadow-lg">
        <h2 className="text-2xl font-bold">Yeni Jüri Kaydı</h2>

        <div>
          <label className="block mb-1">Ad Soyad</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Şifre</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
