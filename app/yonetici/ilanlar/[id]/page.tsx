"use client";

import BasvuruListesi from "@/app/yonetici/ilanlar/comp/BasvuruListesi";
import IlanBilgileri from "@/app/yonetici/ilanlar/comp/IlanBilgileri";
import JuriAtama from "@/app/yonetici/ilanlar/comp/JuriAtama";
import { notFound } from "next/navigation";
import YoneticiPage from "../../page";
import Degerlendirme from "../comp/Degerlendirme";
import KadroKriterEkle from "../comp/Kriterler";
import NihaiKarar from "../comp/NihaiKarar";

import { Basvuru } from "@/app/types/basvuru";
import { Ilan } from "@/app/types/ilan";
import { useEffect, useState } from "react";

// Tipler

interface IlanDetayPageProps {
  params: { id: string };
}

export default function IlanDetayPage({ params }: IlanDetayPageProps) {
  const [ilan, setIlan] = useState<Ilan | null>(null);
  const [basvurular, setBasvurular] = useState<Basvuru[]>([]);
  const [basvuruSuresiBitti, setBasvuruSuresiBitti] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ilanRes = await fetch(
          `http://localhost:5000/backend-api/ilanlar/${params.id}`
        );
        const ilanData = await ilanRes.json();

        if (!ilanRes.ok || !ilanData) {
          notFound();
        }

        setIlan(ilanData);

        // Başvuruları çek
        const basvuruRes = await fetch(
          `http://localhost:5000/backend-api/basvurular?ilanId=${params.id}`
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
  }, [params.id]);

  if (!ilan) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <YoneticiPage>
      <div className="p-6 space-y-10">
        {/* İlan Bilgileri */}
        <IlanBilgileri ilan={ilan} />

        {/* Kadro Kriter Ekleme */}
        <KadroKriterEkle
          ilanId={params.id}
          basvuruSuresiBitti={basvuruSuresiBitti}
        />

        {/* Jüri Atama */}
        <JuriAtama ilanId={params.id} />

        {/* Başvuru Listesi */}
        <BasvuruListesi basvurular={basvurular} />

        {/* Değerlendirme ve Nihai Karar */}
        {basvuruSuresiBitti && (
          <div className="bg-white shadow p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              <Degerlendirme ilanId={params.id} />
            </h2>
            <p>
              <NihaiKarar ilanId={params.id} />
            </p>
          </div>
        )}
      </div>
    </YoneticiPage>
  );
}
