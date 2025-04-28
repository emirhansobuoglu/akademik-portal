"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Ilan = {
    _id: string;
    baslik: string;
    kadro: string;
    baslangic: string;
    bitis: string;
    belgeler: string[];
};

export default function IlanDetayPage() {
    const { id } = useParams();
    const router = useRouter();

    const [ilan, setIlan] = useState<Ilan | null>(null);
    const [adayAd, setAdayAd] = useState("");
    const [files, setFiles] = useState<Map<number, File | null>>(new Map());

    useEffect(() => {
        const fetchIlan = async () => {
            try {
                const res = await fetch(`http://localhost:5000/backend-api/ilanlar/${id}`);
                const data = await res.json();
                setIlan(data);
            } catch (error) {
                console.error("İlan çekilemedi", error);
            }
        };
        fetchIlan();
    }, [id]);

    const handleFileChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = new Map(files);
        if (e.target.files && e.target.files[0]) {
            newFiles.set(index, e.target.files[0]);
            setFiles(newFiles);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!adayAd.trim()) {
            alert("Adınızı yazmalısınız!");
            return;
        }

        if (!ilan) {
            alert("İlan bilgisi yüklenemedi!");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("adayAd", adayAd);
            formData.append("ilanId", ilan._id);
            formData.append("durum", "Beklemede");

            ilan.belgeler.forEach((_, index) => {
                const file = files.get(index);
                if (file) {
                    formData.append("belgeler", file, file.name);
                }
            });

            const res = await fetch("http://localhost:5000/backend-api/basvurular", {
                method: "POST",
                body: formData,
            });

            if (res.ok) {
                alert("Başvuru başarılı!");
                router.push("/aday/basvurularim");
            } else {
                alert("Başvuru başarısız!");
            }
        } catch (error) {
            console.error("Başvuru hatası", error);
        }
    };

    if (!ilan) {
        return <div className="p-8">Yükleniyor...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">{ilan.baslik} İlanına Başvur</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={adayAd}
                    onChange={(e) => setAdayAd(e.target.value)}
                    className="border p-2 w-full"
                    required
                />

                <div className="mb-4">
                    <p className="font-semibold mb-2">İstenilen Belgeler:</p>
                    {ilan.belgeler.length > 0 ? (
                        ilan.belgeler.map((belge, index) => (
                            <div key={index} className="mb-2">
                                <label className="block font-medium">{belge}</label>
                                <input
                                    type="file"
                                    onChange={(e) => handleFileChange(index, e)}
                                    className="border p-2 w-full"
                                />
                            </div>
                        ))
                    ) : (
                        <p>Bu ilan için yüklenmesi gereken belge bulunmamaktadır.</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Başvuru Yap
                </button>
            </form>
        </div>
    );
}
