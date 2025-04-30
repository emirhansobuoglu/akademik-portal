export interface Basvuru {
  _id: string;
  ilanId: string;
  adayAd: string;
  belgeler: string[]; // boş dizi olabilir ama her zaman array
  aciklama: string;
  juriOnaySayisi: number;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi"; // enum gibi belirgin
}
