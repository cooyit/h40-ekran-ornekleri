### 27 Mayıs Hastane Arayüz Tasarımları

Üst boyut alt boyut ayrımı ekranda nasıl olacak?

yeni dil ekle dediğimizde ana forma solda kalsa sağda yeni dili seçip bilgilerini doldursam dk 17

sol taraf aynı kalır sağ tarafta ileri dedikçe diğer dillerdeki kayıtlar gösterilir en son yeni dil ekleme gösterilir. 

form ve filtreleme alanı olan bir sayfa
yeni, dil ekle, filtrele filtreleri kaldır, vs..
yeni dil ekle de checkbox ile değiştirebilirim, tablı yapabilirim, ileri geri yapabilirim
öğe tanımlarken aktiflik bilgisini de yazıyoruz

o dildeki kayıtın durumu olmalı taslak mı aktif mi pasif mi
devreye alma form açılacak detayını göreceğim ondan sonra aktifleştireceğim
devreye al dediğimde hangi dildeki kayıtlarını devreye alıyorum

çoklama yapmayalım

aktif taslak silinmiş silme tarihi db de değiştirilecek

Sisteme dil ekleme ekranım da olmalı


ekranları gridlere ayır önce 


model tanımlarken model temel bilgileri ara bul seç ekle ile tablı şekilde tasarım yap

ağırlıklandırma eşit dağıt butonu

karşılanma düzeyi tablı olsun 
solda metin sağda puan 
ikinci tabda solda orjinal metin sağda çeviri metni
tablar dil isimlerinde olmalı
karşılanma düzeyinde önce kaç aralık olacağını seçeceğiz sonra min maks labelları açılacak



📁 Tanımlar
   ├─ Temel Tanımlar
   │   ├─ Diller
   │   ├─ Ülkeler
   │   ├─ Şehirler
   │   ├─ Hastaneler
   │   ├─ Kullanıcılar
   │   └─ Roller
   ├─ Sınıflandırmalar
   │   ├─ Hastane Türleri
   │   ├─ Kullanıcı Türleri
   │   ├─ Model Türleri   
   │   ├─ Seviyeler
   │   ├─ Gösterge Cevap Türleri
   │   └─ Gösterge Cevap Şablonları
   ├─ Ölçüm Yapısı
   │   ├─ Modeller
   │   ├─ Boyutlar
   │   ├─ Kriterler
   │   └─ Göstergeler


⚙️ Model Sihirbazı


🔁 Atamalar
   ├─ Model-Seviye İlişkisi
   ├─ Model-Ülke
   ├─ Model-Kullanıcı Türü
   ├─ Model-Hastane Türü
   ├─ Model Boyut Kriter Gösterge
   └─ Tüm Eşleşmeler
