"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function IlanDetayPage() {
    const { id } = useParams();
    const [belgeler, setBelgeler] = useState<string[]>([]);
    const [aciklama, setAciklama] = useState("");

    const toggleBelge = (belge: string) => {
        if (belgeler.includes(belge)) {
            setBelgeler(belgeler.filter((b) => b !== belge));
        } else {
            setBelgeler([...belgeler, belge]);
        }
    };

    const handleBasvuru = async () => {
        console.log({
            ilanId: id,
            belgeler,
            aciklama,
        });
        alert("Başvuru yapıldı (demo)");
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">İlana Başvur (ID: {id})</h1>

            <div className="mb-4">
                <p className="font-semibold mb-2">Gerekli Belgeler:</p>
                {["Diploma", "Yabancı Dil Belgesi", "Kimlik Fotokopisi"].map((belge) => (
                    <label key={belge} className="block">
                        <input
                            type="checkbox"
                            checked={belgeler.includes(belge)}
                            onChange={() => toggleBelge(belge)}
                            className="mr-2"
                        />
                        {belge}
                    </label>
                ))}
            </div>

            <div className="mb-4">
                <p className="font-semibold mb-2">Açıklama:</p>
                <textarea
                    value={aciklama}
                    onChange={(e) => setAciklama(e.target.value)}
                    className="w-full p-2 border rounded"
                    placeholder="Başvuru açıklamanız..."
                />
            </div>

            <button
                onClick={handleBasvuru}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Başvuru Yap
            </button>
        </div>
    );
}
