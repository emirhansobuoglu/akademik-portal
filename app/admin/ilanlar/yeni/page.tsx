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
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/api/ilanlar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                alert("İlan başarıyla eklendi!");
                router.push("/admin/ilanlar");
            } else {
                alert("İlan eklenemedi!");
            }
        } catch (error) {
            console.error("Ekleme hatası", error);
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
