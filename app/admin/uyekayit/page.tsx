"use client";

import { useState } from "react";

const UyeKayitPage = () => {
    const [tckn, setTckn] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("aday");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:5000/backend-api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tckn, name, password, role }),
            });

            if (res.ok) {
                alert("✅ Kullanıcı başarıyla kaydedildi!");
                setTckn("");
                setName("");
                setPassword("");
                setRole("aday");
            } else {
                const errorData = await res.json();
                alert(`❌ Kayıt başarısız: ${errorData.error}`);
            }
        } catch (error) {
            console.error("Kayıt hatası:", error);
            alert("❌ Kayıt sırasında bir hata oluştu");
        }
    };

    return (
        <div className="p-8 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-6">Üye Kayıt</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={tckn}
                    onChange={(e) => setTckn(e.target.value)}
                    placeholder="T.C. Kimlik No"
                    className="border p-2 w-full"
                    required
                    maxLength={11}
                    minLength={11}
                />
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ad Soyad"
                    className="border p-2 w-full"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Şifre"
                    className="border p-2 w-full"
                    required
                />
                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border p-2 w-full"
                >
                    <option value="aday">Aday</option>
                    <option value="admin">Admin</option>
                    <option value="juri">Jüri</option>
                    <option value="yonetici">Yönetici</option>
                </select>

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded"
                >
                    Kaydet
                </button>
            </form>
        </div>
    );
};

export default UyeKayitPage;
