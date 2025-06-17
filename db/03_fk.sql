/* --------------------------------------------------------------
-- FOREIGN KEY ISIMLENDIRME FORMATI

-- Genel FK formati:
--   fk_<child_table>_<parent_table>_<foreign_key_column>
--   Ornek: fk_sehirler_ulkeler_ulke_id

-- Recursive FK formati (self-referencing):
--   fk_<child_table>_<foreign_key_column>
--   Ornek: fk_boyutlar_ust_boyut_id


-- ON UPDATE NO ACTION; varsayilan davranistir
-- ON DELETE RESTRICT;  üst kategori silinemezse, bağlı çevirileri korur

-- -------------------------------------------------------------- */



/*  TABLOLARIN FOREIGN KEY ALANLARININ EKLENMESİ */



/* sehirler TABLOSUNA FOREIGN KEY EKLEMEK */

--  sehirler -> ulkeler icin foreign key ekle
ALTER TABLE sehirler
  ADD CONSTRAINT fk_sehirler_ulkeler_ulke_id
  FOREIGN KEY (ulke_id) REFERENCES ulkeler(ulke_id)
  ON DELETE RESTRICT;          


/* ulke_dil TABLOSUNA FOREIGN KEY EKLEMEK 
-- ulkedil: ulke_dil tablosu icin kisaltma */

-- ulke_dil -> ulkeler için foreign key ekle
ALTER TABLE ulke_dil
ADD CONSTRAINT fk_ulkedil_ulkeler_ulke_id
FOREIGN KEY (ulke_id) REFERENCES ulkeler(ulke_id)
ON DELETE RESTRICT;

-- ulke_dil ->  diller için foreign key ekle
ALTER TABLE ulke_dil
ADD CONSTRAINT fk_ulkedil_diller_dil_id
FOREIGN KEY (dil_id) REFERENCES diller(dil_id)
ON DELETE RESTRICT;

-- ? Model turleri tablosu icin recursive baglanti gerekli mi?

/* hastane_turleri TABLOSUNA FOREIGN KEY EKLEMEK 
 hastur: hastane_turleri tablosu icin kisaltma */

-- hastane_turleri -> dil destegi icin recursive foreign key
ALTER TABLE hastane_turleri
ADD CONSTRAINT fk_hastur_ust_hastane_turu_id
FOREIGN KEY (ust_hastane_turu_id) REFERENCES hastane_turleri(hastane_turu_id)
ON DELETE RESTRICT;        

/* kullanici_turleri TABLOSUNA FOREIGN KEY EKLEMEK 
 kultur: kullanici_turleri tablosu icin kisaltma */

-- kullanici_turleri -> dil destegi icin recursive foreign key
ALTER TABLE kullanici_turleri
ADD CONSTRAINT fk_kultur_ust_kullanici_turu_id
FOREIGN KEY (ust_kullanici_turu_id) REFERENCES kullanici_turleri(kullanici_turu_id)
ON DELETE RESTRICT;       


/* seviyeler TABLOSUNA FOREIGN KEY EKLEMEK */

ALTER TABLE seviyeler
ADD CONSTRAINT fk_seviyeler_ust_seviye_id
FOREIGN KEY (ust_seviye_id) REFERENCES seviyeler(seviye_id)
ON DELETE RESTRICT;


/* modeller TABLOSUNA FOREIGN KEY EKLEMEK 
-- modtur: modeller tablosu icin kisaltma */

-- modeller -> dil destegi icin recursive foreign key
ALTER TABLE modeller
ADD CONSTRAINT fk_modeller_ust_model_id
FOREIGN KEY (ust_model_id) REFERENCES modeller(model_id)
ON DELETE RESTRICT;    

-- modeller -> model_turleri icin foreign key
ALTER TABLE modeller
ADD CONSTRAINT fk_modeller_modtur_model_turu_id
FOREIGN KEY (model_turu_id) REFERENCES model_turleri(model_turu_id)
ON DELETE RESTRICT;


/* model_ulke TABLOSUNA FOREIGN KEY EKLEMEK 
-- modulke: model_ulke tablosu icin kisaltma */

-- model_ulke -> ulkeler icin foreign key
ALTER TABLE model_ulke
  ADD CONSTRAINT fk_modulke_ulkeler_ulke_id
  FOREIGN KEY (ulke_id) REFERENCES ulkeler(ulke_id)
  ON DELETE RESTRICT;

-- model_ulke -> modeller icin foreign key
ALTER TABLE model_ulke
  ADD CONSTRAINT fk_modulke_modeller_model_id
  FOREIGN KEY (model_id) REFERENCES modeller(model_id)
  ON DELETE RESTRICT;


/* model_seviye TABLOSUNA FOREIGN KEY EKLEMEK 
-- modseviye: model_seviye tablosu icin kisaltma */

-- model_seviye -> modeller icin foreign key
ALTER TABLE model_seviye
  ADD CONSTRAINT fk_modseviye_modeller_model_id
  FOREIGN KEY (model_id) REFERENCES modeller(model_id)
  ON DELETE RESTRICT;

-- model_seviye -> seviyeler icin foreign key
ALTER TABLE model_seviye
  ADD CONSTRAINT fk_modseviye_seviyeler_seviye_id
  FOREIGN KEY (seviye_id) REFERENCES seviyeler(seviye_id)
  ON DELETE RESTRICT;


/* model_hastane_turu TABLOSUNA FOREIGN KEY EKLEMEK 
-- modhastur: model_hastane_turu tablosu icin kisaltma 
-- hastur: hastane_turleri tablosu icin kisaltma */

-- model_hastane_turu -> modeller icin foreign key
ALTER TABLE model_hastane_turu
  ADD CONSTRAINT fk_modhastur_modeller_model_id
  FOREIGN KEY (model_id) REFERENCES modeller(model_id)
  ON DELETE RESTRICT;

-- model_hastane_turu -> hastane_turleri icin foreign key
ALTER TABLE model_hastane_turu
  ADD CONSTRAINT fk_modhastur_hastur_hastane_turu_id
  FOREIGN KEY (hastane_turu_id) REFERENCES hastane_turleri(hastane_turu_id)
  ON DELETE RESTRICT;


/* model_kullanici_kapsami TABLOSUNA FOREIGN KEY EKLEMEK 
-- modkulkapsam: model_kullanici_kapsami tablosu icin kisaltma 
-- kultur: kullanici_turleri tablosu icin kisaltma */

-- model_kullanici_kapsami -> modeller icin foreign key
ALTER TABLE model_kullanici_kapsami
  ADD CONSTRAINT fk_modkulkapsam_modeller_model_id
  FOREIGN KEY (model_id) REFERENCES modeller(model_id)
  ON DELETE RESTRICT;

-- model_kullanici_kapsami -> kullanici_turleri icin foreign key
ALTER TABLE model_kullanici_kapsami
  ADD CONSTRAINT fk_modkulkapsam_kultur_kullanici_turu_id
  FOREIGN KEY (kullanici_turu_id) REFERENCES kullanici_turleri(kullanici_turu_id)
  ON DELETE RESTRICT;


/* boyutlar TABLOSUNA FOREIGN KEY EKLEMEK */

-- boyutlar -> dil destegi icin recursive foreign key
ALTER TABLE boyutlar
  ADD CONSTRAINT fk_boyutlar_ust_boyut_id
  FOREIGN KEY (ust_boyut_id) REFERENCES boyutlar(boyut_id)
  ON DELETE RESTRICT;

-- boyutlar -> hiyerarsi icin reccursive foreign key
ALTER TABLE boyutlar
  ADD CONSTRAINT fk_boyutlar_boyut_id_hiyerarsi
  FOREIGN KEY (boyut_id_hiyerarsi) REFERENCES boyutlar(boyut_id)
  ON DELETE RESTRICT;


/* kriterler TABLOSUNA FOREIGN KEY EKLEMEK */

-- kriterler -> dil destegi icin recursive foreign key
ALTER TABLE kriterler
  ADD CONSTRAINT fk_kriterler_ust_kriter_id
  FOREIGN KEY (ust_kriter_id) REFERENCES kriterler(kriter_id)
  ON DELETE RESTRICT;


/* gostergeler TABLOSUNA FOREIGN KEY EKLEMEK */

-- gostergeler -> dil destegi icin recursive foreign key
ALTER TABLE gostergeler
  ADD CONSTRAINT fk_gostergeler_self
  FOREIGN KEY (ust_gosterge_id) REFERENCES gostergeler(gosterge_id)
  ON DELETE RESTRICT;


/* gosterge_cevap_sablonlari TABLOSUNA FOREIGN KEY EKLEMEK 
-- goscvpsablon: gosterge_cevap_sablonlari tablosu icin kisaltma 
-- goscvptur: gosterge_cevap_turleri tablosu icin kisaltma */

-- gosterge_cevap_sablonu -> dil destegi icin recursive foreign key
ALTER TABLE gosterge_cevap_sablonlari
  ADD CONSTRAINT fk_goscvpsablon_ust_gosterge_cevap_sablonu_id
  FOREIGN KEY (ust_gosterge_cevap_sablonu_id)
  REFERENCES gosterge_cevap_sablonlari(gosterge_cevap_sablonu_id)
  ON DELETE RESTRICT;

-- gosterge_cevap_sablonlari -> gosterge_cevap_turleri icin foreign key
ALTER TABLE gosterge_cevap_sablonlari
  ADD CONSTRAINT fk_goscvpsablon_goscvptur_gosterge_cevap_turu_id
  FOREIGN KEY (gosterge_cevap_turu_id)
  REFERENCES gosterge_cevap_turleri(gosterge_cevap_turu_id)
  ON DELETE RESTRICT;


/* gosterge_cevaplari TABLOSUNA FOREIGN KEY EKLEMEK 
-- goscevap: gosterge_cevaplari tablosu icin kisaltma 
-- goscvptur: gosterge_cevap_turleri tablosu icin kisaltma 
-- kultur: kullanici_turleri tablosu icin kisaltma */

-- gosterge_cevaplari -> dil destegi icin recursive foreign key
ALTER TABLE gosterge_cevaplari
  ADD CONSTRAINT fk_goscevap_ust_gosterge_cevap_id
  FOREIGN KEY (ust_gosterge_cevap_id)
  REFERENCES gosterge_cevaplari(gosterge_cevap_id)
  ON DELETE RESTRICT;

-- gosterge_cevaplari -> gostergeler icin foreign key
ALTER TABLE gosterge_cevaplari
  ADD CONSTRAINT fk_goscevap_gostergeler_gosterge_id
  FOREIGN KEY (gosterge_id)
  REFERENCES gostergeler(gosterge_id)
  ON DELETE CASCADE;

-- gosterge_cevaplari -> gosterge_cevap_turleri icin foreign key
ALTER TABLE gosterge_cevaplari
  ADD CONSTRAINT fk_goscevap_goscvptur_gosterge_cevap_turu_id
  FOREIGN KEY (gosterge_cevap_turu_id)
  REFERENCES gosterge_cevap_turleri(gosterge_cevap_turu_id)
  ON DELETE RESTRICT;

-- gosterge_cevaplari -> kullanici_turleri icin foreign key
ALTER TABLE gosterge_cevaplari
  ADD CONSTRAINT fk_goscevap_kultur_kullanici_turu_id
  FOREIGN KEY (kullanici_turu_id)
  REFERENCES kullanici_turleri(kullanici_turu_id)
  ON DELETE RESTRICT;


/* gosterge_cevabina_oneriler TABLOSUNA FOREIGN KEY EKLEMEK
-- goscvponeri : gosterge_cevabina_oneriler tablosu icin kisaltma
-- kultur : kullanici_turleri tablosu icin kisaltma */

-- gosterge_cevabina_oneriler -> dil destegi icin recursive foreign key
ALTER TABLE gosterge_cevabina_oneriler
  ADD CONSTRAINT fk_goscvponeri_ust_gosterge_cevabina_oneriler_id
  FOREIGN KEY (ust_gosterge_cevabina_oneriler_id)
  REFERENCES gosterge_cevabina_oneriler(gosterge_cevabina_oneriler_id)
  ON DELETE RESTRICT;

-- gosterge_cevabina_oneriler -> gosterge_cevaplari icin foreign key
ALTER TABLE gosterge_cevabina_oneriler
  ADD CONSTRAINT fk_goscvponeri_goscevap_gosterge_cevap_id
  FOREIGN KEY (gosterge_cevap_id)
  REFERENCES gosterge_cevaplari(gosterge_cevap_id)
  ON DELETE RESTRICT;

-- gosterge_cevabina_oneriler -> kullanici_turleri icin foreign key
ALTER TABLE gosterge_cevabina_oneriler
  ADD CONSTRAINT fk_goscvponeri_kultur_kullanici_turu_id
  FOREIGN KEY (kullanici_turu_id)
  REFERENCES kullanici_turleri(kullanici_turu_id)
  ON DELETE RESTRICT;


/* eslesmeler TABLOSUNA FOREIGN KEY EKLEMEK 
-- goscevap: gosterge_cevaplari tablosu icin kisaltma 
-- goscvponeri: gosterge_cevabina_oneriler tablosu icin kisaltma 
-- kultur: kullanici_turleri tablosu icin kisaltma */

-- eslesmeler -> modeller icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_modeller_model_id
  FOREIGN KEY (model_id)
  REFERENCES modeller(model_id)
  ON DELETE RESTRICT;

-- eslesmeler -> boyutlar icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_boyutlar_boyut_id
  FOREIGN KEY (boyut_id)
  REFERENCES boyutlar(boyut_id)
  ON DELETE RESTRICT;

-- eslesmeler -> kriterler icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_kriterler_kriter_id
  FOREIGN KEY (kriter_id)
  REFERENCES kriterler(kriter_id)
  ON DELETE RESTRICT;

-- eslesmeler -> seviyeler icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_seviyeler_seviye_id
  FOREIGN KEY (seviye_id)
  REFERENCES seviyeler(seviye_id)
  ON DELETE RESTRICT;

-- eslesmeler -> gostergeler icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_gostergeler_gosterge_id
  FOREIGN KEY (gosterge_id)
  REFERENCES gostergeler(gosterge_id)
  ON DELETE RESTRICT;

-- eslesmeler -> gosterge_cevaplari icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_goscevap_gosterge_cevap_id
  FOREIGN KEY (gosterge_cevap_id)
  REFERENCES gosterge_cevaplari(gosterge_cevap_id)
  ON DELETE RESTRICT;

-- eslesmeler -> gosterge_cevabina_oneriler icin foreign key 
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_goscvponeri_gosterge_cevabina_oneriler_id
  FOREIGN KEY (gosterge_cevabina_oneriler_id)
  REFERENCES gosterge_cevabina_oneriler(gosterge_cevabina_oneriler_id)
  ON DELETE RESTRICT;

-- eslesmeler -> kullanici_turleri icin foreign key
ALTER TABLE eslesmeler
  ADD CONSTRAINT fk_eslesmeler_kultur_kullanici_turu_id
  FOREIGN KEY (kullanici_turu_id)
  REFERENCES kullanici_turleri(kullanici_turu_id)
  ON DELETE RESTRICT;

/* karsilanma_duzeyi TABLOSUNA FOREIGN KEY EKLEMEK 
-- karduzeyi: karsilanma_duzeyi tablosu icin kisaltma */

-- karsilanma_duzeyi -> dil destegi icin recursive foreign key
ALTER TABLE karsilanma_duzeyi
  ADD CONSTRAINT fk_karduzeyi_ust_karsilanma_duzeyi_id
  FOREIGN KEY (ust_karsilanma_duzeyi_id)
  REFERENCES karsilanma_duzeyi(karsilanma_duzeyi_id)
  ON DELETE RESTRICT;

-- karsilanma_duzeyi -> eslesmeler icin foreign key
ALTER TABLE karsilanma_duzeyi
  ADD CONSTRAINT fk_karduzeyi_eslesmeler_eslesme_id
  FOREIGN KEY (eslesme_id)
  REFERENCES eslesmeler(eslesme_id)
  ON DELETE RESTRICT;

-- karsilanma_duzeyi -> seviyeler icin foreign key
ALTER TABLE karsilanma_duzeyi
  ADD CONSTRAINT fk_karduzeyi_seviyeler_seviye_id
  FOREIGN KEY (seviye_id)
  REFERENCES seviyeler(seviye_id)
  ON DELETE RESTRICT;

------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------

/* kullanicilar TABLOSUNA FOREIGN KEY EKLEMEK 
kultur: kullanici_turleri tablosu icin kisaltma */

-- kullanicilar -> ulkeler icin foreign key
ALTER TABLE kullanicilar
  ADD CONSTRAINT fk_kullanicilar_ulkeler_ulke_id
  FOREIGN KEY (ulke_id)
  REFERENCES ulkeler(ulke_id)
  ON DELETE RESTRICT;

-- kullanicilar -> kullanici_turleri icin foreign key
ALTER TABLE kullanicilar
  ADD CONSTRAINT fk_kullanicilar_kultur_kullanici_turu_id
  FOREIGN KEY (kullanici_turu_id)
  REFERENCES kullanici_turleri(kullanici_turu_id)
  ON DELETE RESTRICT;


/* hastaneler TABLOSUNA FOREIGN KEY EKLEMEK 
-- hastur: hastaneler tablosu icin kisaltma */

-- hastaneler -> ulkeler icin foreign key
ALTER TABLE hastaneler
  ADD CONSTRAINT fk_hastaneler_ulkeler_ulke_id
  FOREIGN KEY (ulke_id)
  REFERENCES ulkeler(ulke_id)
  ON DELETE RESTRICT;

-- hastaneler -> sehirler icin foreign key
ALTER TABLE hastaneler
  ADD CONSTRAINT fk_hastaneler_sehirler_sehir_id
  FOREIGN KEY (sehir_id)
  REFERENCES sehirler(sehir_id)
  ON DELETE RESTRICT;

-- hastaneler -> hastane_turleri icin foreign key
ALTER TABLE hastaneler
  ADD CONSTRAINT fk_hastaneler_hastur_hastane_turu_id
  FOREIGN KEY (hastane_turu_id)
  REFERENCES hastane_turleri(hastane_turu_id)
  ON DELETE RESTRICT;

/* hastane_model TABLOSUNA FOREIGN KEY EKLEMEK
-- hasmodel: hastane_model tablosu icin kisaltma */

-- hastane_model -> hastaneler icin foreign key
ALTER TABLE hastane_model
  ADD CONSTRAINT fk_hasmodel_hastaneler_hastane_id
  FOREIGN KEY (hastane_id)
  REFERENCES hastaneler(hastane_id)
  ON DELETE RESTRICT;

-- hastane_model -> modeller icin foreign key
ALTER TABLE hastane_model
  ADD CONSTRAINT fk_hasmodel_modtur_model_id
  FOREIGN KEY (model_id)
  REFERENCES modeller(model_id)
  ON DELETE RESTRICT;

/* hastane_model_kullanicilar TABLOSUNA FOREIGN KEY EKLEMEK
-- hasmodkullanici: hastane_model_kullanicilar tablosu icin kisaltma 
-- hasmodel: hastane_model tablosu icin kisaltma */

-- hastane_model_kullanicilar -> hastane_model icin foreign key
ALTER TABLE hastane_model_kullanicilar
  ADD CONSTRAINT fk_hasmodkullanici_hasmodel_hastane_model_id
  FOREIGN KEY (hastane_model_id)
  REFERENCES hastane_model(hastane_model_id)
  ON DELETE RESTRICT;

-- hastane_model_kullanicilar -> kullanicilar icin foreign key  
ALTER TABLE hastane_model_kullanicilar
  ADD CONSTRAINT fk_hasmodkullanici_kullanicilar_kullanici_id
  FOREIGN KEY (kullanici_id)
  REFERENCES kullanicilar(kullanici_id)
  ON DELETE RESTRICT;








  







