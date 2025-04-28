export interface Basvuru {
  _id: string;
  adSoyad: string;
  tcNo: string;
  durum: "Beklemede" | "Onaylandı" | "Reddedildi";
}
