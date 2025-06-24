/* ------------------------------------------------

Bu SQL dosyasi asagidaki islemleri yapmaktadir:

1 Veritabani olusturma (opsiyonel)
   - `hastane40` adli veritabanini olusturur.

2 Mevcut tablolarin silinmesi
   - Onceden olusturulmus ayni isimdeki tum tablolari `CASCADE` ile siler.
   - Bu islem iliskili alt tablolarda da temizleme saglar.
   - Amac: Temiz bir baslangic yapmak.

Not: Bu script’in amaci, sifirdan bir veritabani semasi kurmadan once 
onceki kalintilari temizlemektir.

------------------------------------------------ */

/* Veritabani Olusturma (opsiyonel)              */

-- CREATE DATABASE hastane40;

/* Tablolari Silme (Varsa)                       */

DROP TABLE IF EXISTS diller CASCADE;
DROP TABLE IF EXISTS ulkeler CASCADE;
DROP TABLE IF EXISTS sehirler CASCADE;
DROP TABLE IF EXISTS ulke_dil CASCADE;
DROP TABLE IF EXISTS model_turleri CASCADE;
DROP TABLE IF EXISTS hastane_turleri CASCADE;
DROP TABLE IF EXISTS kullanici_turleri CASCADE;
DROP TABLE IF EXISTS seviyeler CASCADE;
DROP TABLE IF EXISTS modeller CASCADE;
DROP TABLE IF EXISTS model_ulke CASCADE;
DROP TABLE IF EXISTS model_seviye CASCADE;
DROP TABLE IF EXISTS model_hastane_turu CASCADE;
DROP TABLE IF EXISTS model_kullanici_kapsami CASCADE;
DROP TABLE IF EXISTS boyutlar CASCADE;
DROP TABLE IF EXISTS kriterler CASCADE;
DROP TABLE IF EXISTS gostergeler CASCADE;
DROP TABLE IF EXISTS gosterge_cevap_turleri CASCADE;
DROP TABLE IF EXISTS gosterge_cevap_sablonlari CASCADE;
DROP TABLE IF EXISTS gosterge_cevaplari CASCADE;
DROP TABLE IF EXISTS gosterge_cevabina_oneriler CASCADE;
DROP TABLE IF EXISTS eslesmeler CASCADE;
DROP TABLE IF EXISTS karsilanma_duzeyi CASCADE;

------------------------------------------------ 
------------------------------------------------ 
------------------------------------------------ 
DROP TABLE IF EXISTS kullanicilar CASCADE;
DROP TABLE IF EXISTS hastaneler CASCADE;
DROP TABLE IF EXISTS hastane_model CASCADE;
DROP TABLE IF EXISTS hastane_model_kullanicilar CASCADE;
DROP TABLE IF EXISTS roller CASCADE;
DROP TABLE IF EXISTS yetkiler CASCADE;
DROP TABLE IF EXISTS rol_yetki CASCADE;
DROP TABLE IF EXISTS kullanici_rol CASCADE;



