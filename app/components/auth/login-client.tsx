"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
  const router = useRouter();
  const [tckn, setTckn] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/backend-api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tckn, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Giriş başarılı!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        localStorage.setItem("role", data.role);

        if (data.role === "aday") {
          router.push("/aday");
        } else if (data.role === "admin") {
          router.push("/admin");
        } else {
          alert("❌ Geçersiz rol tanımı.");
        }
      } else {
        alert(`❌ Hata: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("❌ Giriş sırasında hata oluştu.");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-gray-100 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center">Giriş Yap</h2>

        <input
          type="text"
          placeholder="TCKN"
          value={tckn}
          onChange={(e) => setTckn(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Giriş Yap
        </button>
      </form>
    </div>
  );
}
