-- ON DELETE RESTRICT:
-- Ana tabloda bir kayıt silinmek istendiğinde, bu kayda bağlı alt tablolarda veri varsa silmeye izin verilmez.
-- Veritabanı anında hata döner. Kullanıcı önce bağlı kayıtları silmek zorundadır.
-- Bu davranış veri bütünlüğünü korumak için en güvenli yöntemlerden biridir.
-- ON DELETE NO ACTION ile benzerdir; farkı, kontrolün anında yapılmasıdır.

-- ON DELETE NO ACTION:
-- Ana tabloda bir kayıt silinmek istendiğinde, eğer bu kayda bağlı alt tabloda veri varsa silmeye izin verilmez.
-- Ancak hata, işlem sonlandığında verilir (örneğin transaction commit aşamasında).
-- Bu da veri bütünlüğünü korur ama RESTRICT'e göre biraz geç kontrol eder.

-- ON DELETE CASCADE:
-- Ana tabloda (örneğin ulkeler) bir kayıt silindiğinde,
-- bu kayda bağlı olan alt tablodaki (örneğin sehirler) kayıtlar da otomatik olarak silinir.
-- Bu davranış zincirleme (cascade) silmeye olanak tanır. Kullanımı dikkat gerektirir.

-- ON DELETE SET NULL:
-- Ana tablo silindiğinde, bağlı alt tablodaki foreign key alanı NULL yapılır.
-- Bu durumda FK alanı NULL olabilecek şekilde tanımlanmalıdır (nullable).
-- Verinin boşa düşmesini engellemek için dikkatli kullanılmalıdır.

-- -------------------------------------------------------------
-- ON UPDATE RESTRICT:
-- Ana tabloda bir ID güncellenmek istenirse ve bu değer alt tablolarda kullanılıyorsa, güncellemeye izin verilmez.
-- Hata anında döner. ON UPDATE NO ACTION ile işlevi aynıdır, sadece hata zamanlaması farklıdır.

-- ON UPDATE NO ACTION:
-- Ana tabloda bir ID güncellenirse ve bu ID alt tablolarda kullanılıyorsa, işlem sonunda hata verilir.
-- Varsayılan ve güvenli davranıştır. Genellikle RESTRICT ile aynı sonucu verir.

-- ON UPDATE CASCADE:
-- Ana tabloda (örneğin ulkeler) bir ID değeri değiştirildiğinde,
-- bu değeri kullanan tüm alt tablolardaki FK alanları da otomatik güncellenir.
-- ID alanları nadiren değiştiği için kullanımı önerilmez.

-- ON UPDATE SET NULL:
-- Ana tablo güncellenirse, alt tablodaki FK alanı NULL yapılır.
-- FK sütununun nullable olması gerekir. Pratikte çok nadir kullanılır.


/*
--------------------------------------------------------------------
-- VERİTABANI OBJE İSİMLENDİRME STANDARTLARI VE KISALTMA MANTIĞI --
--------------------------------------------------------------------

-- 📜 AMAÇ VE GEREKÇE:
-- Bu standartların temel amacı, veritabanı genelinde tutarlı, okunabilir ve yönetilebilir
-- bir isimlendirme yapısı oluşturmaktır. PostgreSQL gibi sistemlerde objelerin
-- (constraint, index vb.) isim uzunluğu limitleri (örn: 63 karakter) bulunmaktadır.
-- Uzun tablo isimleri bu limitlerin aşılmasına neden olabilir. Bu strateji,
-- hem bu teknik kısıtlamalara takılmamayı hem de isimlerin anlamını korumayı hedefler.

-- 📐 TABLO ADI KISALTMA KURALLARI:
-- Uygulanan kısaltma mantığı aşağıdaki iki ana kurala dayanmaktadır:

-- 1. Tek Kelimeden Oluşan Tablo Adları:
--    Anlam bütünlüğünü ve netliği korumak için tek kelimelik tablo adlarında
--    genellikle kısaltma YAPILMAZ.
--    Örnek: `diller`, `ulkeler`, `sehirler`, `modeller`

-- 2. Bileşik (Compound) Tablo Adları:
--    Alt çizgi (_) ile ayrılmış birden fazla kelimeden oluşan adlar için şu adımlar izlenir:
--      a) İsim, alt çizgilerden parçalara ayrılır (örn: `model_kullanici_kapsami` -> "model", "kullanici", "kapsami").
--      b) Her parça, anlamını yansıtacak şekilde sezgisel olarak kısaltılır. Bu genellikle kelimenin
--         ilk 3-4 harfi veya yaygın bilinen bir kısaltmasıdır.
--         - `model`     -> `mod`
--         - `hastane`   -> `has`
--         - `kullanici` -> `kul`
--         - `gosterge`  -> `gos`
--         - `cevap`     -> `cvp`
--      c) Elde edilen kısaltmalar, aralarında alt çizgi olmadan birleştirilir.

--    Uygulamalı Örnekler:
--    - `model_turleri`           -> `mod` + `tur`   -> `modtur`
--    - `hastane_model_kullanici` -> `has` + `mod` + `kullanici` -> `hasmodkullanici`
--    - `gosterge_cevap_turleri`  -> `gos` + `cvp` + `tur` -> `goscvptur`
--    - `karsilanma_duzeyleri`    -> `kar` + `duzeyi` -> `karduzeyi`


--  FOREIGN KEY (FK) İSİMLENDİRME FORMATI:
-- Foreign Key constraint'leri için aşağıdaki standart format kullanılacaktır:
-- Format: fk_{kaynak_tablo_kısaltması}_{hedef_tablo_kısaltması}

-- Örnekler:
-- 1. `hastane_model` tablosundan `hastaneler` tablosuna olan ilişki:
--    - Kaynak: `hastane_model` (Kısaltma: `hasmodel`)
--    - Hedef: `hastaneler` (Kısaltma: `hastaneler` - tek kelime olduğu için aynı)
--    - FK Adı: fk_hasmodel_hastaneler

-- 2. `model_kullanici_kapsami` tablosundan `kullanici_turleri` tablosuna olan ilişki:
--    - Kaynak: `model_kullanici_kapsami` (Kısaltma: `modkulkapsam`)
--    - Hedef: `kullanici_turleri` (Kısaltma: `kultur`)
--    - FK Adı: fk_modkulkapsam_kultur

--  ÖZYİNELİ (RECURSIVE) FOREIGN KEY'LER:
-- Bir tablonun kendi kendine referans verdiği durumlarda (parent-child ilişkisi),
-- hedef tablo yine kendisi olduğu için isimlendirme şu şekilde yapılır:
-- Format: fk_{tablo_adı}_{sütun_adı}

-- Örnek: `modeller` tablosundaki `ust_model_id` için:
--    - FK Adı: fk_modeller_ust_model_id



--------------------------------------------------------------------
-- TABLO ADI KISALTMA REFERANS LİSTESİ                            --
--------------------------------------------------------------------
-- Foreign Key ve diğer veritabanı objelerinin isimlendirilmesinde
-- tutarlılığı sağlamak için aşağıdaki kısaltma listesi kullanılır.

-- Tam İsim                    -> Kısaltma
-- --------------------------- -> --------------------
-- diller                      -> diller
-- ulkeler                     -> ulkeler
-- sehirler                    -> sehirler
-- ulke_dil                    -> ulkedil
-- model_turleri               -> modtur
-- hastane_turleri             -> hastur
-- kullanici_turleri           -> kultur
-- seviyeler                   -> seviyeler
-- modeller                    -> modeller
-- model_ulke                  -> modulke
-- model_seviye                -> modseviye
-- model_hastane_turu          -> modhastur
-- model_kullanici_kapsami     -> modkulkapsam
-- boyutlar                    -> boyutlar
-- kriterler                   -> kriterler
-- gostergeler                 -> gostergeler
-- gosterge_cevap_turleri      -> goscvptur
-- gosterge_cevap_sablonlari   -> goscvpsablon
-- gosterge_cevaplari          -> goscevap
-- gosterge_cevabina_oneriler  -> goscvponeri
-- eslesmeler                  -> eslesmeler
-- karsilanma_duzeyleri        -> karduzeyi
-- kullanicilar                -> kullanicilar
-- hastaneler                  -> hastaneler
-- hastane_model               -> hasmodel
-- hastane_model_kullanici     -> hasmodkullanici

*/

