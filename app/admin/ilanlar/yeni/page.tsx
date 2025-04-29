"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const IlanEklePage = () => {
    const router = useRouter();

    const [form, setForm] = useState({
        baslik: "",
        kadro: "",
        baslangic: "",
        bitis: "",
        kontenjan: 1,
        belgeler: [""],
        kosullar: "",
        kadroKriterleri: [{ aciklama: "", maxPuan: 0 }],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleBelgeChange = (index: number, value: string) => {
        const newBelgeler = [...form.belgeler];
        newBelgeler[index] = value;
        setForm({ ...form, belgeler: newBelgeler });
    };

    const belgeEkle = () => {
        setForm({ ...form, belgeler: [...form.belgeler, ""] });
    };

    const handleKriterChange = (index: number, field: string, value: string | number) => {
        const yeniKriterler = [...form.kadroKriterleri];
        yeniKriterler[index] = {
            ...yeniKriterler[index],
            [field]: value,
        };
        setForm({ ...form, kadroKriterleri: yeniKriterler });
    };

    const kriterEkle = () => {
        setForm({
            ...form,
            kadroKriterleri: [...form.kadroKriterleri, { aciklama: "", maxPuan: 0 }],
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // İlan oluştur
            const ilanRes = await fetch("http://localhost:5000/backend-api/ilanlar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    baslik: form.baslik,
                    kadro: form.kadro,
                    baslangic: form.baslangic,
                    bitis: form.bitis,
                    kontenjan: form.kontenjan,
                    belgeler: form.belgeler,
                    kosullar: form.kosullar,
                }),
            });

            if (!ilanRes.ok) {
                alert("❌ İlan eklenemedi!");
                return;
            }

            const ilanData = await ilanRes.json();

            // Kadro kriterlerini ayrı kaydet
            for (const kriter of form.kadroKriterleri) {
                await fetch("http://localhost:5000/backend-api/kriterler", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        ilanId: ilanData._id,
                        aciklama: kriter.aciklama,
                        maxPuan: kriter.maxPuan,
                    }),
                });
            }

            alert("✅ İlan başarıyla eklendi!");
            router.push("/admin/ilanlar");
        } catch (error) {
            console.error("Ekleme hatası:", error);
        }
    };

    return (
        <div className="max-w-xl mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6">Yeni İlan Ekle</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="baslik"
                    value={form.baslik}
                    onChange={handleChange}
                    placeholder="Başlık"
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="text"
                    name="kadro"
                    value={form.kadro}
                    onChange={handleChange}
                    placeholder="Kadro"
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="date"
                    name="baslangic"
                    value={form.baslangic}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="date"
                    name="bitis"
                    value={form.bitis}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="number"
                    name="kontenjan"
                    value={form.kontenjan}
                    onChange={handleChange}
                    className="border p-2 w-full"
                    placeholder="Kontenjan"
                    min={1}
                    required
                />

                <div>
                    <label className="font-semibold block mb-2">Belgeler</label>
                    {form.belgeler.map((belge, index) => (
                        <input
                            key={index}
                            type="text"
                            value={belge}
                            onChange={(e) => handleBelgeChange(index, e.target.value)}
                            placeholder={`Belge ${index + 1}`}
                            className="border p-2 w-full mb-2"
                            required
                        />
                    ))}
                    <button type="button" onClick={belgeEkle} className="text-blue-600 text-sm">
                        ➕ Belge Ekle
                    </button>
                </div>

                <textarea
                    name="kosullar"
                    value={form.kosullar}
                    onChange={handleChange}
                    placeholder="Başvuru Koşulları"
                    className="border p-2 w-full h-24"
                />

                <div>
                    <label className="font-semibold block mb-2">Kadro Kriterleri</label>
                    {form.kadroKriterleri.map((kriter, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type="text"
                                placeholder="Kriter Açıklaması"
                                value={kriter.aciklama}
                                onChange={(e) => handleKriterChange(index, "aciklama", e.target.value)}
                                className="border p-2 w-full mb-2"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Maksimum Puan"
                                value={kriter.maxPuan}
                                onChange={(e) => handleKriterChange(index, "maxPuan", Number(e.target.value))}
                                className="border p-2 w-full"
                                min={0}
                                required
                            />
                        </div>
                    ))}
                    <button type="button" onClick={kriterEkle} className="text-blue-600 text-sm">
                        ➕ Kriter Ekle
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Ekle
                </button>
            </form>
        </div>
    );
};

export default IlanEklePage;
