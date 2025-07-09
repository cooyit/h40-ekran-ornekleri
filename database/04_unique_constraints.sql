/*              UNIQUE CONSTRAINT                */

/* ------------------------------------------------
-- Bu dosya icerisinde calismalar devam ediyor.
-- Ilgili yapilarla ilgili gelistirmeler surmektedir.
-- Icerik, proje ilerledikce guncellenecektir.
------------------------------------------------ */


-- UNIQUE ALANLARI EKLEMEK

  -- Aynı ülke–şehir adı tekrarını engelle (isteğe bağlı)
ALTER TABLE sehirler
  ADD CONSTRAINT unq_ulke_sehir UNIQUE (ulke_id, sehir_adi);


-- ----------------------------------------------
-- Not: Aynı ülke için sadece bir varsayılan dil olması uygulama (backend) tarafında kontrol edilmelidir.
-- Örnek kontrol için önerilen partial unique index:
-- (PostgreSQL destekler, EF ile programatik kontrol tercih edilebilir.)
-- Ancak bu yöntem(backend tarafında kontrol) "race condition" riskine açıktır. İki kullanıcı aynı anda iki farklı dili TRUE yapabilir.

CREATE UNIQUE INDEX unq_ulkeler_diller_varsayilan
 ON ulkeler_diller(ulke_id)
 WHERE varsayilan = TRUE;


-- ----------------------------------------------
-- (Opsiyonel) Aynı model_alias_adi + dil kombinasyonunun tekrar etmesini engellemek
-- Özellikle frontend’de benzersiz URL yapısı gerekiyorsa kullanılır
-- ----------------------------------------------
-- ALTER TABLE modeller
-- ADD CONSTRAINT unq_model_alias_dil UNIQUE (model_alias_adi, dil_adi);


-- ----------------------------------------------
-- Aynı ülke–model kombinasyonunun tekrarını önlemek için unique constraint
-- ----------------------------------------------
ALTER TABLE model_ulke
  ADD CONSTRAINT unq_model_ulke UNIQUE (ulke_id, model_id);


-- ----------------------------------------------
-- Aynı model ve hastane türü eşleşmesinin tekrar eklenmesini engeller
-- ----------------------------------------------
-- ALTER TABLE model_hastane_turu
 --  ADD CONSTRAINT unq_model_hastane_turu UNIQUE (model_id, hastane_turu_id);

-- -- ----------------------------------------------
-- -- Aynı model–kullanıcı türü eşleşmesinin tekrar kaydedilmesini engeller
-- -- ----------------------------------------------
-- ALTER TABLE model_kullanici_kapsami
--   ADD CONSTRAINT unq_model_kullanici_kapsami UNIQUE (model_id, kullanici_turu_id);


-- -- Boyutların hiyerarşik olarak tekrar edilmesini engellemek
-- -- ----------------------------------------------
-- ALTER TABLE boyutlar
--   ADD CONSTRAINT unq_boyutlar_hiyerarsi UNIQUE (boyut_id_hiyerarsi);

-- Gösterge, boyut ve kriterlerin tekrar edilmesini engellemek 


-- Not: Aynı cevap türü içinde aynı cevap şablon adı tekrar etmesin
ALTER TABLE gosterge_cevap_sablonu
  ADD CONSTRAINT unq_cevap_turu_adi UNIQUE (gosterge_cevap_turu_id, gosterge_cevap_sablon_adi);


-- ----------------------------------------------
-- UNIQUE constraint: unq_gosterge_kullanici_cevap
-- Amaç: Aynı gösterge + kullanıcı türü + cevap metni kombinasyonunun tekrar etmesini engellemek.
-- Bu constraint şunu garanti eder:
-- → Aynı göstergeye, aynı kullanıcı türü için, aynı cevap metni birden fazla kez eklenemez.
-- Bu sayede veri tekrarları ve olası tutarsızlıklar önlenir.
-- ----------------------------------------------
-- ALTER TABLE gosterge_cevaplari
--   ADD CONSTRAINT unq_gosterge_kullanici_cevap 
--   UNIQUE (gosterge_id, kullanici_turu_id, gosterge_cevap_adi);


-- Aynı dil içinde aynı hastane türü adının tekrarını engelle (isteğe bağlı)
ALTER TABLE hastane_turleri
  ADD CONSTRAINT unq_dil_hastane_turu UNIQUE (dil_adi, hastane_turu_adi);

-- Aynı dilde aynı kullanıcı türü adını tekrar etme (isteğe bağlı)
ALTER TABLE kullanici_turleri
  ADD CONSTRAINT unq_dil_kullanici_turu UNIQUE (dil_adi, kullanici_turu_adi);

-- Aynı dilde aynı seviye adını engelle (isteğe bağlı)
ALTER TABLE seviyeler
ADD CONSTRAINT unq_dil_seviye UNIQUE (dil_adi, seviye_adi);

-- Aynı dilde aynı model adını engelle (isteğe bağlı)
ALTER TABLE modeller
ADD CONSTRAINT unq_dil_model_adi UNIQUE (dil_adi, model_resmi_adi);

-- Aynı dilde aynı boyut adını engelle (isteğe bağlı)
ALTER TABLE boyutlar
  ADD CONSTRAINT unq_dil_boyut_adi UNIQUE (dil_adi, boyut_adi);

-- Aynı dilde aynı kriter adını engelle (isteğe bağlı)
ALTER TABLE kriterler
  ADD CONSTRAINT unq_dil_kriter_adi UNIQUE (dil_adi, kriter_adi);

-- Aynı dilde aynı gösterge adını engelle (isteğe bağlı)
ALTER TABLE gostergeler
  ADD CONSTRAINT unq_dil_gosterge_adi UNIQUE (dil_adi, gosterge_adi);


-- Aynı dilde aynı cevap türü içinde aynı cevap şablon adını engelle (isteğe bağlı)
ALTER TABLE gosterge_cevap_sablonlari
  ADD CONSTRAINT unq_dil_tur_cevap UNIQUE (dil_adi, gosterge_cevap_turu_id, gosterge_cevap_sablon_adi);

-- Aynı dilde aynı cevap türü içinde aynı cevap adını engelle (isteğe bağlı)
ALTER TABLE gosterge_cevap_sablonlari
  ADD CONSTRAINT unq_dil_tur_cevap_adi UNIQUE (dil_adi, gosterge_cevap_turu_id, gosterge_cevap_adi);

ALTER TABLE kullanicilar
  ADD CONSTRAINT unq_kullanici_eposta UNIQUE (e_posta);

e_posta_dogrulandi BOOLEAN DEFAULT FALSE

-- Aynı dilde aynı sehir içinde aynı hastane adını engelle (isteğe bağlı)
ALTER TABLE hastaneler
  ADD CONSTRAINT unq_sehir_hastane_adi UNIQUE (sehir_id, hastane_adi);

-- Kurulus yılının 1900'den büyük ve şu anki yıldan küçük olmasını engelle

kurulus_yili SMALLINT CHECK (kurulus_yili >= 1900 AND kurulus_yili <= EXTRACT(YEAR FROM CURRENT_DATE)::SMALLINT)


-- Aynı e-posta ile aynı modele tekrar atanmayı engellemek için (delege için)
CREATE UNIQUE INDEX unq_delege_eposta_model ON hastane_model_kullanicilar(delege_kullanici_eposta, hastane_model_id)
WHERE kayitli_kullanici = FALSE;


-- Çakışmayı önlemek için UNIQUE key
ALTER TABLE model_seviye
  ADD CONSTRAINT uq_model_seviye UNIQUE (model_id, seviye_id);

-- Böylece aynı model-seviye çiftini ikinci kez eklersek hata atmaz, ON CONFLICT DO NOTHING ile sessiz geçer.