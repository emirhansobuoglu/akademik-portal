export interface JuriDegerlendirme {
  _id: string;
  juriTc: string;
  basvuruId: string;
  puanlar: {
    [kriter: string]: number;
  };
  rapor: string;
  sonuc: "onaylı" | "reddedildi";
  createdAt: string;
  updatedAt: string;
}
