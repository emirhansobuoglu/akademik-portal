# 👨‍🏫 Akademik Personel Başvuru Sistemi

Bu proje, üniversitelerdeki akademik personel alım süreçlerini dijital ortama taşıyan, modern web teknolojileriyle geliştirilmiş **rol tabanlı** bir başvuru ve değerlendirme sistemidir.

---

## 🚀 Kullanılan Teknolojiler

- **Frontend:** React.js
- **Backend:** Node.js (Express)
- **Veritabanı:** MongoDB
- **Dosya Depolama:** Firebase Storage
- **Kimlik Doğrulama:** JWT
- **Rol Tabanlı Yönlendirme:** React Router + localStorage

---

## 👥 Kullanıcı Rolleri

### 🧑 Aday
- İlanları görüntüleyebilir
- CV ve belgeleri yükleyerek başvuru yapabilir
- Başvuru durumlarını takip edebilir

### 🛠️ Admin (Sistem Yöneticisi)
- İlan oluşturma, düzenleme ve silme
- Başvuruları görüntüleme ve yöneticilere yönlendirme
- Üye kaydı yapma

### 🧑‍💼 Yönetici (Akademik Sorumlu)
- İlanlar için jüri atayabilir, Kadro Kriteri ekleyebilir
- Bildirim kutusundan başvuru süresi biten ilanları takip eder
- Jüri değerlendirmelerini inceleyerek nihai kararı verir

### 🧑‍⚖️ Jüri Üyesi
- Sadece kendisine atanan ilanları görebilir
- Adayları puanlayıp değerlendirme raporu yazar
- Karar (Onay / Red) verir

---

## 🔐 Güvenlik ve Rol Yönlendirme

- JWT ile kimlik doğrulama sağlanmaktadır
- React `useEffect` + `router.replace()` ile kullanıcı rolu tespit edilerek yönlendirme yapılır
- localStorage üzerinde oturum bilgisi tutulur

| Rol        | Yönlendirme URL'si          |
|------------|-----------------------------|
| Admin      | `/admin`                    |
| Aday       | `/aday`                     |
| Yönetici   | `/yonetici`                 |
| Jüri       | `/juri`                     |
| Yetkisiz   | `/` (giriş sayfası)         |

---

## 📷 Ekran Görüntüleri


![Ekran görüntüsü 2025-04-30 144636](https://github.com/user-attachments/assets/6498818f-5c81-4fae-a6de-92986eae152f)
![Ekran görüntüsü 2025-04-30 144708](https://github.com/user-attachments/assets/2200d248-b392-4bd9-80fc-9a3155cb892e)
![Ekran görüntüsü 2025-04-30 151229](https://github.com/user-attachments/assets/f360c4eb-4d18-4ab1-8886-32d7355b2cc5)
![Ekran görüntüsü 2025-04-30 151210](https://github.com/user-attachments/assets/8e3d8730-3c2a-4951-b6f9-815134558148)
![Ekran görüntüsü 2025-04-30 151308](https://github.com/user-attachments/assets/347455b2-325e-4d76-9abd-9f914866063c)
![Ekran görüntüsü 2025-04-30 151021](https://github.com/user-attachments/assets/fddf1bbe-57f3-46bd-ae0a-53d089e11379)
![Ekran görüntüsü 2025-04-30 151033](https://github.com/user-attachments/assets/8682378d-d35b-44d6-8b8a-31f45698d641)
![Ekran görüntüsü 2025-04-30 150943](https://github.com/user-attachments/assets/0a91bf51-2b16-48ee-b647-caf16c8adeab)
![Ekran görüntüsü 2025-04-30 150954](https://github.com/user-attachments/assets/87db9c65-9c2e-41ee-8d68-11f089213e21)

---

## 📁 Projeyi Çalıştırmak

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme sunucusunu başlat
npm run dev

# 3. MongoDB bağlantı ayarlarını .env dosyasına gir
