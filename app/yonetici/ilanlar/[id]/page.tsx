import BasvuruListesi from "@/app/yonetici/ilanlar/comp/BasvuruListesi";
import IlanBilgileri from "@/app/yonetici/ilanlar/comp/IlanBilgileri";
import JuriAtama from "@/app/yonetici/ilanlar/comp/JuriAtama";
import { notFound } from "next/navigation";
import YoneticiPage from "../../page";
import Degerlendirme from "../comp/Degerlendirme";
import KadroKriterEkle from "../comp/Kriterler";
import NihaiKarar from "../comp/NihaiKarar";

interface Ilan {
  id: string;
  baslik: string;
  kadro: string;
  baslangic: string;
  bitis: string;
  aciklama: string;
}
interface Basvuru {
  id: string;
  adSoyad: string;
  tcNo: string;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi";
}

interface IlanDetayPageProps {
  params: { id: string };
}

// Şimdilik sahte ilan verisi
const getIlanById = async (id: string): Promise<Ilan | null> => {
  const dummyIlanlar = [
    {
      id: "1",
      baslik: "Bilgisayar Mühendisliği - Dr. Öğr. Üyesi",
      kadro: "Dr. Öğr. Üyesi",
      baslangic: "2025-04-01",
      bitis: "2025-04-30",
      aciklama: "Bilgisayar bilimleri alanında uzman Dr. Öğr. Üyesi alımı.",
    },
    {
      id: "2",
      baslik: "Makine Mühendisliği - Doçent",
      kadro: "Doçent",
      baslangic: "2025-03-20",
      bitis: "2025-04-10",
      aciklama: "Bilgisayar bilimleri alanında uzman Dr. Öğr. Üyesi alımı.",
    },
    {
      id: "3",
      baslik: "Bil. Sis. Mühendisliği - Doçent",
      kadro: "Doçent",
      baslangic: "2025-03-22",
      bitis: "2025-04-13",
      aciklama: "Bilgisayar bilimleri alanında uzman Dr. Öğr. Üyesi alımı.",
    },
  ];

  return dummyIlanlar.find((ilan) => ilan.id === id) || null;
};
const dummyAdaylar = [
  {
    id: "1",
    adSoyad: "Ahmet Yılmaz",
    tcNo: "12345678901",
  },
  {
    id: "2",
    adSoyad: "Ayşe Demir",
    tcNo: "10987654321",
  },
  {
    id: "3",
    adSoyad: "Mehmet Kaya",
    tcNo: "11223344556",
  },
];

// Şimdilik sahte başvuru verisi
const dummyBasvurular: Basvuru[] = [
  {
    id: "1",
    adSoyad: "Ahmet Yılmaz",
    tcNo: "12345678901",
    durum: "Beklemede",
  },
  {
    id: "2",
    adSoyad: "Ayşe Demir",
    tcNo: "10987654321",
    durum: "Beklemede",
  },
];
export default async function IlanDetayPage({ params }: IlanDetayPageProps) {
  const ilan = await getIlanById(params.id);

  if (!ilan) {
    notFound();
  }

  const bugun = new Date();
  const bitisTarihi = new Date(ilan.bitis);
  const basvuruSuresiBitti = bugun > bitisTarihi;

  return (
    <YoneticiPage>
      <div className="p-6 space-y-10">
        {/* İlan Bilgileri */}
        <IlanBilgileri ilan={ilan} />
        <KadroKriterEkle
          ilanId={params.id}
          basvuruSuresiBitti={basvuruSuresiBitti}
        />

        {/* Jüri Atama */}
        <JuriAtama />

        {/* Başvuru Listesi */}
        <BasvuruListesi basvurular={dummyBasvurular} />

        {/* Başvuru süresi bittiyse değerlendirme ve karar adımlarını göstereceğiz */}
        {basvuruSuresiBitti && (
          <div className="bg-white shadow p-6 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold mb-4">
              <Degerlendirme />
            </h2>
            <p>
              <NihaiKarar adaylar={dummyAdaylar} kontenjan={2} />
            </p>
          </div>
        )}
      </div>
    </YoneticiPage>
  );
}
