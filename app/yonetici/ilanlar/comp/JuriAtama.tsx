"use client";

import JuriKayitModal from "@/app/components/modal/JuriKayit";
import { useEffect, useState } from "react";

interface JuriAtamaProps {
  ilanId: string;
}

interface Juri {
  _id: string;
  adSoyad: string;
  tcNo: string;
}

const JuriAtama: React.FC<JuriAtamaProps> = ({ ilanId }) => {
  const [tcNo, setTcNo] = useState("");
  const [juriler, setJuriler] = useState<Juri[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [girilenTcNo, setGirilenTcNo] = useState("");

  useEffect(() => {
    const fetchJuriler = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/backend-api/juriler?ilanId=${ilanId}`
        );
        const data = await res.json();
        setJuriler(data);
      } catch (error) {
        console.error("Jüri listesi yüklenemedi:", error);
      }
    };

    fetchJuriler();
  }, [ilanId]);

  const handleAddJuri = async () => {
    if (tcNo.length !== 11) {
      alert("Geçerli bir TC Kimlik Numarası giriniz.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/backend-api/auth/user?tckn=${tcNo}`
      );
      if (res.ok) {
        const user = await res.json();

        // Kullanıcı varsa direkt veritabanına juri kaydı yap
        const juriKayit = await fetch(
          "http://localhost:5000/backend-api/juriler",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ilanId,
              adSoyad: user.name,
              tcNo: user.tckn,
            }),
          }
        );

        if (juriKayit.ok) {
          const yeniJuri = await juriKayit.json();
          setJuriler((prev) => [...prev, yeniJuri]);
          setTcNo("");
        } else {
          alert("Jüri kaydedilemedi.");
        }
      } else if (res.status === 404) {
        setGirilenTcNo(tcNo);
        setIsModalOpen(true);
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Jüri ekleme hatası:", error);
      alert("Sunucu hatası oluştu.");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTcNo("");
  };

  const handleJuriCreated = async (user: { adSoyad: string; tcNo: string }) => {
    try {
      const juriKayit = await fetch(
        "http://localhost:5000/backend-api/juriler",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ilanId,
            adSoyad: user.adSoyad,
            tcNo: user.tcNo,
          }),
        }
      );

      if (juriKayit.ok) {
        const yeniJuri = await juriKayit.json();
        setJuriler((prev) => [...prev, yeniJuri]);
      } else {
        alert("Jüri kaydedilemedi!");
      }
    } catch (error) {
      console.error("Modal jüri kayıt hatası:", error);
    }

    setIsModalOpen(false);
    setTcNo("");
  };

  const handleJuriSil = async (juriId: string) => {
    const onay = window.confirm("Bu jüriyi kaldırmak istiyor musun?");
    if (!onay) return;

    try {
      const res = await fetch("http://localhost:5000/backend-api/juriler", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ juriId }),
      });

      if (res.ok) {
        setJuriler((prev) => prev.filter((j) => j._id !== juriId));
      } else {
        alert("Jüri silinemedi!");
      }
    } catch (error) {
      console.error("Jüri silme hatası:", error);
    }
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
              key={juri._id}
              className="p-2 border rounded flex justify-between items-center"
            >
              <div>
                <span className="font-medium">{juri.adSoyad}</span> -{" "}
                {juri.tcNo}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">
                  Jüri Üyesi {index + 1}
                </span>
                <button
                  onClick={() => handleJuriSil(juri._id)}
                  className="text-red-600 text-xs hover:underline"
                >
                  Kaldır
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal çağırımı */}
      <JuriKayitModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        tcNo={girilenTcNo}
        onJuriCreated={handleJuriCreated}
      />
    </div>
  );
};

export default JuriAtama;
