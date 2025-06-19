/*  
Bu SQL dosyası aşağıdaki işlemleri yapmaktadır:

1 Veritabanı oluşturma (opsiyonel)
   - `hastane40` adlı veritabanını oluşturur.

2 Mevcut tabloların silinmesi
   - Önceden oluşturulmuş aynı isimdeki tüm tabloları `CASCADE` ile siler.
   - Bu işlem ilişkili alt tablolarda da temizleme sağlar.
   - Amaç: Temiz bir başlangıç yapmak.

Not: Bu script’in amacı, sıfırdan bir veritabanı şeması kurmadan önce 
önceki kalıntıları temizlemektir.

============================================================
*/

/* Veritabanı Oluşturma (opsiyonel)              */

CREATE DATABASE hastane40;

/* Tabloları Silme (Varsa)                        */

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






