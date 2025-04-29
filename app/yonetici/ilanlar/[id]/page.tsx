"use client";

import { use, useEffect, useState } from "react"; // önemli: use hook'u eklendi!

import BasvuruListesi from "@/app/yonetici/ilanlar/comp/BasvuruListesi";
import IlanBilgileri from "@/app/yonetici/ilanlar/comp/IlanBilgileri";
import JuriAtama from "@/app/yonetici/ilanlar/comp/JuriAtama";
import { notFound } from "next/navigation";
import YoneticiPage from "../../page";
import KadroKriterEkle from "../comp/Kriterler";

import { Basvuru } from "@/app/types/basvuru";
import { Ilan } from "@/app/types/ilan";

// Tipler
interface IlanDetayPageProps {
  params: Promise<{ id: string }>; // dikkat! artık Promise olarak alıyoruz
}

export default function IlanDetayPage({ params }: IlanDetayPageProps) {
  const { id } = use(params); // params'ı çözüyoruz

  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [basvuruSuresiBitti, setBasvuruSuresiBitti] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ilanRes = await fetch(
          `http://localhost:5000/backend-api/ilanlar/${id}`
        );
        const ilanData = await ilanRes.json();

        if (!ilanRes.ok || !ilanData) {
          notFound();
        }

        setIlan(ilanData);

        // Başvuruları çek
        const basvuruRes = await fetch(
          `http://localhost:5000/backend-api/basvurular/ilan/${id}`
        );

        const basvuruData = await basvuruRes.json();
        setBasvurular(basvuruData);

        // Başvuru süresi kontrolü
        const bugun = new Date();
        const bitisTarihi = new Date(ilanData.bitis);
        setBasvuruSuresiBitti(bugun > bitisTarihi);
      } catch (error) {
        console.error("İlan Detayı Yüklenemedi:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!ilan) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <YoneticiPage>
      <div className="p-6 space-y-10">
        {/* İlan Bilgileri */}
        <IlanBilgileri ilan={ilan} />

        {/* Kadro Kriter Ekleme */}
        <KadroKriterEkle ilanId={id} basvuruSuresiBitti={basvuruSuresiBitti} />

        {/* Jüri Atama */}
        <JuriAtama ilanId={id} />

        {/* Başvuru Listesi */}
        <BasvuruListesi
          basvurular={basvurular}
          bitisTarihi={ilan.bitis}
          kontenjan={ilan.kontenjan}
        />
      </div>
    </YoneticiPage>
  );
}
