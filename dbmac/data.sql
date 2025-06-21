/* diller tablosuna veri ekle */
INSERT INTO diller (dil_adi) VALUES 
('Türkçe'),
('English'),
('Español'),
('Arabic');


/* ulkeler tablosuna veri ekle */
INSERT INTO ulkeler (ulke_adi) VALUES 
('Türkiye'),
('USA'),
('Spain'),
('Saudi Arabia');


/* sehirler tablosuna veri ekle */
INSERT INTO sehirler (ulke_id, sehir_adi, bolge_adi, nuts_adi) VALUES 
(1, 'İstanbul', 'Marmara', 'TR10'),
(1, 'Ankara', 'İç Anadolu', 'TR51'),
(2, 'London', 'Greater London', 'UKI'),
(3, 'Madrid', 'Comunidad de Madrid', 'ES30'),
(4, 'Riyadh', 'Riyadh', 'SA10');


/* ulke_dil tablosuna veri ekle */
INSERT INTO ulke_dil (ulke_id, dil_id, varsayilan) VALUES 
(1, 1, TRUE),     -- Türkiye → Türkçe
(2, 2, TRUE),     -- İngiltere → English
(3, 3, TRUE),     -- İspanya → Español
(4, 4, TRUE),     -- Suudi Arabistan → Arabic
(1, 2, FALSE),    -- Türkiye → English (ikincil dil)
(3, 2, FALSE), -- İspanya → English (ikincil dil)
(4, 2, FALSE);    -- Suudi Arabistan → English (ikincil dil)


/* model_turleri tablosuna veri ekle */
INSERT INTO model_turleri (model_turu_adi) VALUES 
('Puan Esaslı'),
('Seviye Esaslı');





--------------------------------


/* hastane_turleri tablosuna veri ekle */

-- turkce verileri ekle
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(NULL, 'Fizik Tedavi ve Rehabilitasyon Hastanesi', 'Türkçe'),
(NULL, 'Araştırma Hastanesi', 'Türkçe'),
(NULL, 'Ağız ve Diş Sağlığı Merkezi', 'Türkçe'),
(NULL, 'Göz Hastanesi', 'Türkçe'),
(NULL, 'Kadın Doğum Hastanesi', 'Türkçe');


-- 'Fizik Tedavi ve Rehabilitasyon Hastanesi'
WITH base AS (
  SELECT hastane_turu_id
  FROM hastane_turleri
  WHERE hastane_turu_adi = 'Fizik Tedavi ve Rehabilitasyon Hastanesi'
    AND dil_adi = 'Türkçe'
)

INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi)
SELECT base.hastane_turu_id, tr.adi, tr.dil
FROM base,
     (VALUES
        ('Physical Therapy and Rehabilitation Hospital', 'English'),
        ('Hospital de Fisioterapia y Rehabilitación', 'Español'),
        ('مستشفى العلاج الطبيعي وإعادة التأهيل', 'Arabic')
     ) AS tr(adi, dil);

-- ARAŞTIRMA HASTANESİ çevirileri
WITH base AS (
  SELECT hastane_turu_id
  FROM hastane_turleri
  WHERE hastane_turu_adi = 'Araştırma Hastanesi' AND dil_adi = 'Türkçe'
)
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi)
SELECT base.hastane_turu_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Research Hospital', 'English'),
        ('Hospital de Investigación', 'Español'),
        ('مستشفى البحوث', 'Arabic')
     ) AS val(adi, dil);

-- AĞIZ VE DİŞ SAĞLIĞI MERKEZİ çevirileri
WITH base AS (
  SELECT hastane_turu_id
  FROM hastane_turleri
  WHERE hastane_turu_adi = 'Ağız ve Diş Sağlığı Merkezi' AND dil_adi = 'Türkçe'
)
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi)
SELECT base.hastane_turu_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Oral and Dental Health Center', 'English'),
        ('Centro de Salud Oral y Dental', 'Español'),
        ('مركز صحة الفم والأسنان', 'Arabic')
     ) AS val(adi, dil);

-- GÖZ HASTANESİ çevirileri
WITH base AS (
  SELECT hastane_turu_id
  FROM hastane_turleri
  WHERE hastane_turu_adi = 'Göz Hastanesi' AND dil_adi = 'Türkçe'
)
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi)
SELECT base.hastane_turu_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Eye Hospital', 'English'),
        ('Hospital de Ojos', 'Español'),
        ('مستشفى العيون', 'Arabic')
     ) AS val(adi, dil);

-- KADIN DOĞUM HASTANESİ çevirileri
WITH base AS (
  SELECT hastane_turu_id
  FROM hastane_turleri
  WHERE hastane_turu_adi = 'Kadın Doğum Hastanesi' AND dil_adi = 'Türkçe'
)
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi)
SELECT base.hastane_turu_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Maternity Hospital', 'English'),
        ('Hospital de Maternidad', 'Español'),
        ('مستشفى الولادة', 'Arabic')
     ) AS val(adi, dil);


/* --------------------------------
-- elle veri ekleme id kullanarak hastane turleri

-- ingilizce verileri ekle
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(1, 'Physical Therapy and Rehabilitation Hospital', 'English'),
(2, 'Research Hospital', 'English'),
(3, 'Oral and Dental Health Center', 'English'),
(4, 'Eye Hospital', 'English'),
(5, 'Maternity Hospital', 'English');

-- ispanyolca verileri ekle
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(1, 'Hospital de Fisioterapia y Rehabilitación', 'Español'),
(2, 'Hospital de Investigación', 'Español'),
(3, 'Centro de Salud Oral y Dental', 'Español'),
(4, 'Hospital de Ojos', 'Español'),
(5, 'Hospital de Maternidad', 'Español');

-- arapca verileri ekle
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(1, 'مستشفى العلاج الطبيعي وإعادة التأهيل', 'Arabic'),
(2, 'مستشفى البحوث', 'Arabic'),
(3, 'مركز صحة الفم والأسنان', 'Arabic'),
(4, 'مستشفى العيون', 'Arabic'),
(5, 'مستشفى الولادة', 'Arabic');

-------------------------------- */



/* kullanici_turleri tablosuna veri ekle */

-- Türkçe
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi) VALUES
(NULL, 'İdari Personel', 'İdari süreçleri yöneten personel', 'Türkçe'),
(NULL, 'Teknik Personel', 'Teknik destek ve sistem yönetimi', 'Türkçe'),
(NULL, 'Tıbbi Personel', 'Sağlık hizmeti sunan personel', 'Türkçe'),
(NULL, 'Genel', 'Tüm kullanıcı türleri', 'Türkçe');


-- idari personel çevirileri
WITH base AS (
  SELECT kullanici_turu_id FROM kullanici_turleri
  WHERE kullanici_turu_adi = 'İdari Personel' AND dil_adi = 'Türkçe'
)
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi)
SELECT base.kullanici_turu_id, val.adi, val.aciklama, val.dil
FROM base,
     (VALUES
        ('Administrative Staff', 'Staff managing administrative processes', 'English'),
        ('Personal Administrativo', 'Personal que gestiona procesos administrativos', 'Español'),
        ('الموظفون الإداريون', 'الموظفون الذين يديرون العمليات الإدارية', 'Arabic')
     ) AS val(adi, aciklama, dil);



-- teknik personel çevirileri
WITH base AS (
  SELECT kullanici_turu_id FROM kullanici_turleri
  WHERE kullanici_turu_adi = 'Teknik Personel' AND dil_adi = 'Türkçe'
)
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi)
SELECT base.kullanici_turu_id, val.adi, val.aciklama, val.dil
FROM base,
     (VALUES
        ('Technical Staff', 'Responsible for technical support and systems', 'English'),
        ('Personal Técnico', 'Responsable de soporte técnico y sistemas', 'Español'),
        ('الموظفون الفنيون', 'المسؤولون عن الدعم الفني وإدارة النظام', 'Arabic')
     ) AS val(adi, aciklama, dil);


-- tıbbi personel çevirileri
WITH base AS (
  SELECT kullanici_turu_id FROM kullanici_turleri
  WHERE kullanici_turu_adi = 'Tıbbi Personel' AND dil_adi = 'Türkçe'
)
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi)
SELECT base.kullanici_turu_id, val.adi, val.aciklama, val.dil
FROM base,
     (VALUES
        ('Medical Staff', 'Staff providing healthcare services', 'English'),
        ('Personal Médico', 'Personal que presta servicios sanitarios', 'Español'),
        ('الطاقم الطبي', 'الموظفون الذين يقدمون خدمات الرعاية الصحية', 'Arabic')
     ) AS val(adi, aciklama, dil);


-- genel çevirileri
WITH base AS (
  SELECT kullanici_turu_id FROM kullanici_turleri
  WHERE kullanici_turu_adi = 'Genel' AND dil_adi = 'Türkçe'
)
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi)
SELECT base.kullanici_turu_id, val.adi, val.aciklama, val.dil
FROM base,
     (VALUES
        ('General', 'Includes all user types', 'English'),
        ('General', 'Incluye todos los tipos de usuarios', 'Español'),
        ('عام', 'يشمل جميع أنواع المستخدمين', 'Arabic')
     ) AS val(adi, aciklama, dil);


/* --------------------------------

-- elle veri ekleme id kullanarak


-- İngilizce
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi) VALUES
(1, 'Administrative Staff', 'Personnel managing administrative processes', 'English'),
(2, 'Technical Staff', 'Technical support and system administration', 'English'),
(3, 'Medical Staff', 'Personnel providing healthcare services', 'English'),
(4, 'General', 'General-purpose user type', 'English');

-- İspanyolca
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi) VALUES
(1, 'Personal Administrativo', 'Personal que gestiona procesos administrativos', 'Español'),
(2, 'Personal Técnico', 'Soporte técnico y administración del sistema', 'Español'),
(3, 'Personal Médico', 'Personal que brinda servicios de salud', 'Español'),
(4, 'General', 'Tipo de usuario de propósito general', 'Español');

-- Arapça
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi) VALUES
(1, 'الموظفون الإداريون', 'الموظفون الذين يديرون العمليات الإدارية', 'Arabic'),
(2, 'الموظفون الفنيون', 'الدعم الفني وإدارة النظام', 'Arabic'),
(3, 'الموظفون الطبيون', 'الموظفون الذين يقدمون خدمات الرعاية الصحية', 'Arabic'),
(4, 'عام', 'نوع مستخدم للأغراض العامة', 'Arabic');

-------------------------------- */



/* seviyeler tablosuna veri ekle */

-- turkce verileri ekle
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi) VALUES
(NULL, 'Seviye 1', 'Türkçe'),
(NULL, 'Seviye 2', 'Türkçe'),
(NULL, 'Seviye 3', 'Türkçe'),
(NULL, 'Seviye 4', 'Türkçe'),
(NULL, 'Seviye 5', 'Türkçe'),
(NULL, 'Seviye 6', 'Türkçe'),
(NULL, 'Seviye 7', 'Türkçe'),
(NULL, 'Seviye 8', 'Türkçe'),
(NULL, 'Seviye 9', 'Türkçe'),
(NULL, 'Seviye 10', 'Türkçe');

-- loop ile cevirileri ekleme

DO $$
DECLARE
    i INT;
    tr_adi TEXT;
    tr_id INT;
BEGIN
    FOR i IN 1..10 LOOP
        -- 1. Türkçe kaydın ID'sini al
        SELECT seviye_id INTO tr_id
        FROM seviyeler
        WHERE seviye_adi = 'Seviye ' || i AND dil_adi = 'Türkçe';

        -- 2. İngilizce, İspanyolca, Arapça çevirileri ekle
        INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi)
        VALUES
            (tr_id, 'Level ' || i, 'English'),
            (tr_id, 'Nivel ' || i, 'Español'),
            (tr_id, 'المستوى ' || i, 'Arabic');
    END LOOP;
END $$;


/* --------------------------------

-- seviye 1 çevirileri
WITH base AS (
  SELECT seviye_id FROM seviyeler
  WHERE seviye_adi = 'Seviye 1' AND dil_adi = 'Türkçe'
)
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi)
SELECT base.seviye_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Level 1', 'English'),
        ('Nivel 1', 'Español'),
        ('المستوى 1', 'Arabic')
     ) AS val(adi, dil);


-- seviye 2 çevirileri
WITH base AS (
  SELECT seviye_id FROM seviyeler
  WHERE seviye_adi = 'Seviye 2' AND dil_adi = 'Türkçe'
)
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi)
SELECT base.seviye_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Level 2', 'English'),
        ('Nivel 2', 'Español'),
        ('المستوى 2', 'Arabic')
     ) AS val(adi, dil);


-- seviye 3 çevirileri
WITH base AS (
  SELECT seviye_id FROM seviyeler
  WHERE seviye_adi = 'Seviye 3' AND dil_adi = 'Türkçe'
)
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi)
SELECT base.seviye_id, val.adi, val.dil
FROM base,
     (VALUES
        ('Level 3', 'English'),
        ('Nivel 3', 'Español'),
        ('المستوى 3', 'Arabic')
     ) AS val(adi, dil);

-- elle veri ekleme id kullanarak

-- ingilizce verileri ekle
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi) VALUES
(1, 'Level 1', 'English'),
(2, 'Level 2', 'English'),
(3, 'Level 3', 'English'),
(4, 'Level 4', 'English'),
(5, 'Level 5', 'English'),
(6, 'Level 6', 'English'),
(7, 'Level 7', 'English'),
(8, 'Level 8', 'English'),
(9, 'Level 9', 'English'),
(10, 'Level 10', 'English');

-- ispanyolca verileri ekle
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi) VALUES
(1, 'Nivel 1', 'Español'),
(2, 'Nivel 2', 'Español'),
(3, 'Nivel 3', 'Español'),
(4, 'Nivel 4', 'Español'),
(5, 'Nivel 5', 'Español'),
(6, 'Nivel 6', 'Español'),
(7, 'Nivel 7', 'Español'),
(8, 'Nivel 8', 'Español'),
(9, 'Nivel 9', 'Español'),
(10, 'Nivel 10', 'Español');

-- arapca verileri ekle
INSERT INTO seviyeler (ust_seviye_id, seviye_adi, dil_adi) VALUES
(1, 'المستوى 1', 'Arabic'),
(2, 'المستوى 2', 'Arabic'),
(3, 'المستوى 3', 'Arabic'),
(4, 'المستوى 4', 'Arabic'),
(5, 'المستوى 5', 'Arabic'),
(6, 'المستوى 6', 'Arabic'),
(7, 'المستوى 7', 'Arabic'),
(8, 'المستوى 8', 'Arabic'),
(9, 'المستوى 9', 'Arabic'),
(10, 'المستوى 10', 'Arabic');


-------------------------------- */

/* modeller tablosuna veri ekle */

-- turkce verileri ekle
INSERT INTO modeller (
    ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi, model_aciklama,
    kullanici_kapsami, aktif, devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
) VALUES
(NULL, 2, 'EMRAM', 'EMRAM TR GENEL', 'Elektronik Sağlık Kaydı Modeli', 'Tek', 1, '2022-01-01', NULL, 'Türkçe'),

(NULL, 2, 'O-EMRAM', 'O-EMRAM TR I+T', 'Ayaktan Tedavi EMRAM', 'Tek', 1, '2022-06-15', NULL, 'Türkçe'),

(NULL, 2, 'CCMM', 'CCMM TR TEK', 'Süreklilik Olgunluk Modeli', 'Tek', 1, '2023-01-10', NULL, 'Türkçe'),

(NULL, 2, 'AMAM', 'AMAM TR GENEL', 'Analitik Olgunluk Modeli', 'Coklu', 1, '2023-05-01', NULL, 'Türkçe'),

(NULL, 1, 'SKS', 'SKS TR GENEL', 'Sağlıkta Kalite Standartları', 'Tek', 1, '2021-11-01', NULL, 'Türkçe'),

(NULL, 1, 'SAS', 'SAS TR TASLAK', 'Sağlıkta Akreditasyon Setleri', 'Coklu', 0, '2021-12-01', NULL, 'Türkçe'),

(NULL, 1, 'InnoPerf', 'InnoPerf TR V.1', 'Performans ve Yenilikçilik Modeli', 'Coklu', 2, '2024-01-01', '2025-01-01', 'Türkçe');




-- oto script ile veri ekleme

DO $$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT * FROM modeller
        WHERE model_resmi_adi IN ('EMRAM', 'O-EMRAM', 'CCMM', 'AMAM', 'InnoPerf')
          AND dil_adi = 'Türkçe'
    LOOP
        IF rec.model_resmi_adi = 'EMRAM' THEN
            INSERT INTO modeller (
                ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi,
                model_aciklama, kullanici_kapsami, aktif,
                devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
            ) VALUES
                (rec.model_id, rec.model_turu_id, 'EMRAM', 'EMRAM EN GENEL', 'Electronic Medical Record Adoption Model', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'English'),
                (rec.model_id, rec.model_turu_id, 'EMRAM', 'EMRAM ES GENEL', 'Modelo de Adopción de Registros Médicos Electrónicos', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Español'),
                (rec.model_id, rec.model_turu_id, 'EMRAM', 'EMRAM AR GENEL', 'نموذج تبني السجل الطبي الإلكتروني', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Arabic');

        ELSIF rec.model_resmi_adi = 'O-EMRAM' THEN
            INSERT INTO modeller (
                ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi,
                model_aciklama, kullanici_kapsami, aktif,
                devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
            ) VALUES
                (rec.model_id, rec.model_turu_id, 'O-EMRAM', 'O-EMRAM EN I+T', 'Outpatient EMRAM', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'English'),
                (rec.model_id, rec.model_turu_id, 'O-EMRAM', 'O-EMRAM ES I+T', 'EMRAM para atención ambulatoria', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Español'),
                (rec.model_id, rec.model_turu_id, 'O-EMRAM', 'O-EMRAM AR I+T', 'إي إم رام للعيادات الخارجية', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Arabic');

        ELSIF rec.model_resmi_adi = 'CCMM' THEN
            INSERT INTO modeller (
                ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi,
                model_aciklama, kullanici_kapsami, aktif,
                devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
            ) VALUES
                (rec.model_id, rec.model_turu_id, 'CCMM', 'CCMM EN T', 'Continuity Care Maturity Model', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'English'),
                (rec.model_id, rec.model_turu_id, 'CCMM', 'CCMM ES T', 'Modelo de Madurez para la Continuidad del Cuidado', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Español'),
                (rec.model_id, rec.model_turu_id, 'CCMM', 'CCMM AR T', 'نموذج نضج رعاية الاستمرارية', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Arabic');

        ELSIF rec.model_resmi_adi = 'AMAM' THEN
            INSERT INTO modeller (
                ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi,
                model_aciklama, kullanici_kapsami, aktif,
                devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
            ) VALUES
                (rec.model_id, rec.model_turu_id, 'AMAM', 'AMAM EN GENEL', 'Analytics Maturity Assessment Model', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'English'),
                (rec.model_id, rec.model_turu_id, 'AMAM', 'AMAM ES GENEL', 'Modelo de Evaluación de Madurez Analítica', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Español'),
                (rec.model_id, rec.model_turu_id, 'AMAM', 'AMAM AR GENEL', 'نموذج تقييم نضج التحليلات', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Arabic');

        ELSIF rec.model_resmi_adi = 'InnoPerf' THEN
            INSERT INTO modeller (
                ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi,
                model_aciklama, kullanici_kapsami, aktif,
                devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
            ) VALUES
                (rec.model_id, rec.model_turu_id, 'InnoPerf', 'InnoPerf EN V.1', 'Innovation & Performance Maturity Model', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'English'),
                (rec.model_id, rec.model_turu_id, 'InnoPerf', 'InnoPerf ES V.1', 'Modelo de Madurez en Rendimiento e Innovación', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Español'),
                (rec.model_id, rec.model_turu_id, 'InnoPerf', 'InnoPerf AR V.1', 'نموذج النضج في الأداء والابتكار', rec.kullanici_kapsami, rec.aktif, rec.devreye_alma_tarihi, rec.devreden_kaldirilma_tarihi, 'Arabic');
        END IF;
    END LOOP;
END $$;


/* --------------------------------

-- EMRAM çevirileri
WITH base AS (
  SELECT model_id FROM modeller
  WHERE model_resmi_adi = 'EMRAM' AND dil_adi = 'Türkçe'
)
INSERT INTO modeller (
  ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi, model_aciklama,
  kullanici_kapsami, aktif, devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
)
SELECT 
  base.model_id, 2, val.adi, val.alias, val.aciklama, 'Tek', 1, '2022-01-01', NULL, val.dil
FROM base,
     (VALUES
        ('EMRAM', 'EMRAM EN GENEL'', 'Electronic Medical Record Adoption Model', 'English'),
        ('EMRAM', 'EMRAM ES GENEL', 'Modelo de Adopción de Registros Médicos Electrónicos', 'Español'),
        ('EMRAM', 'EMRAM AR GENEL', 'نموذج تبني السجل الطبي الإلكتروني', 'Arabic')
     ) AS val(adi, alias, aciklama, dil);

-- elle veri ekleme id kullanarak

-- ingilizce verileri ekle
INSERT INTO modeller (
    ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi, model_aciklama,
    kullanici_kapsami, aktif, devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
) VALUES
(1, 2, 'EMRAM', 'EMRAM EN GENEL', 'Electronic Medical Record Adoption Model', 'Tek', 1, '2023-01-01', NULL, 'English'),

(2, 2, 'O-EMRAM', 'O-EMRAM EN TIBBİ ve İDARİ', 'Outpatient EMRAM', 'Tek', 1, '2023-01-01', NULL, 'English'),

(3, 2, 'CCMM', 'CCMM EN TEK', 'Continuity of Care Maturity Model', 'Tek', 1, '2023-01-01', NULL, 'English'),

(4, 2, 'AMAM', 'AMAM EN GENEL', 'Analytics Maturity Model', 'Coklu', 1, '2023-01-01', NULL, 'English'),

(7, 1, 'InnoPerf', 'InnoPerf EN PASİF', 'Innovation and Performance Model', 'Coklu', 2, '2024-01-01', '2025-01-01', 'English');

-- ispanyolca verileri ekle
INSERT INTO modeller (
    ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi, model_aciklama,
    kullanici_kapsami, aktif, devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
) VALUES
(1, 2, 'EMRAM', 'EMRAM ES GENEL', 'Modelo de Adopción del Registro Médico Electrónico', 'Tek', 1, '2023-01-01', NULL, 'Español'),

(2, 2, 'O-EMRAM', 'O-EMRAM ES TIBBİ ve İDARİ', 'EMRAM Ambulatorio', 'Tek', 1, '2023-01-01', NULL, 'Español'),

(3, 2, 'CCMM', 'CCMM ES PASİF', 'Modelo de Madurez de Continuidad Asistencial', 'Tek', 1, '2023-01-01', NULL, 'Español'),

(4, 2, 'AMAM', 'AMAM ES TASLAK', 'Modelo de Madurez Analítica', 'Coklu', 1, '2023-01-01', NULL, 'Español'),

(7, 1, 'InnoPerf', 'InnoPerf ES PASİF', 'Modelo de Innovación y Rendimiento', 'Coklu', 2, '2024-01-01', '2025-01-01', 'Espanol');


-- arapca verileri ekle
INSERT INTO modeller (
    ust_model_id, model_turu_id, model_resmi_adi, model_alias_adi, model_aciklama,
    kullanici_kapsami, aktif, devreye_alma_tarihi, devreden_kaldirilma_tarihi, dil_adi
) VALUES
(1, 2, 'EMRAM', 'EMRAM AR GENEL', 'نموذج اعتماد السجل الطبي الإلكتروني', 'Tek', 1, '2023-01-01', NULL, 'Arabic'),

(2, 2, 'O-EMRAM', 'O-EMRAM AR TIBBİ ve İDARİ', 'EMRAM للمرضى الخارجيين', 'Tek', 1, '2023-01-01', NULL, 'Arabic'),

(3, 2, 'CCMM', 'CCMM AR PASİF', 'نموذج نضج استمرارية الرعاية', 'Tek', 1, '2023-01-01', NULL, 'Arabic'),

(4, 2, 'AMAM', 'AMAM AR TASLAK', 'نموذج النضج التحليلي', 'Coklu', 1, '2023-01-01', NULL, 'Arabic'),

(7, 1, 'InnoPerf', 'InnoPerf AR PASİF', 'نموذج الابتكار والأداء', 'Coklu', 2, '2024-01-01', '2025-01-01', 'Arabic');


-------------------------------- */


/* model_ulke tablosuna test verileri ekle */

-- ingilizce modelleri ekle
INSERT INTO model_ulke (ulke_id, model_id, devreye_alma_tarihi, dil_adi, aktif)
SELECT  u.ulke_id,
        m.model_id,
        COALESCE(m.devreye_alma_tarihi, CURRENT_DATE),
        'English',
        TRUE                                -- İngilizce global atama hep aktif
FROM    ulkeler         u                  -- tüm ülkeler
JOIN    modeller        m  ON m.dil_adi = 'English'
WHERE   m.aktif = 1                         -- sadece Yayında olanlar
ON CONFLICT DO NOTHING;                     -- tekrar çalıştırıldığında çakışma yok


-- ülke dil tablosu ile model_ulke tablosunu birleştir
WITH dil_map AS (
    SELECT dil_id, dil_adi FROM diller
)
INSERT INTO model_ulke (ulke_id, model_id, devreye_alma_tarihi, dil_adi, aktif)
SELECT  ud.ulke_id,
        m.model_id,
        COALESCE(m.devreye_alma_tarihi, CURRENT_DATE),
        m.dil_adi,
        (m.aktif = 1)               -- Yayında → TRUE, Devre Dışı/Taslak → FALSE
FROM    modeller      m
JOIN    dil_map       d   ON d.dil_adi = m.dil_adi
JOIN    ulke_dil      ud  ON ud.dil_id  = d.dil_id
WHERE   m.dil_adi <> 'English'       -- İngilizceler zaten eklendi
ON CONFLICT DO NOTHING;


-- modeller ülkeler ve dilleri joinleme
SELECT u.ulke_adi,
       m.model_resmi_adi,
       m.dil_adi,
       mu.aktif
FROM   model_ulke mu
JOIN   ulkeler   u ON u.ulke_id  = mu.ulke_id
JOIN   modeller  m ON m.model_id = mu.model_id
ORDER  BY u.ulke_adi, m.model_resmi_adi, m.dil_adi;

/* -------------------------------- 

-- elle veri ekleme
-- Türkiye için aktif olan modeller
INSERT INTO model_ulke (ulke_id, model_id, devreye_alma_tarihi, dil_adi, aktif) VALUES
(1, 1, '2022-02-01', 'Türkçe', TRUE),      -- EMRAM
(1, 2, '2022-07-01', 'Türkçe', TRUE),      -- O-EMRAM
(1, 3, '2023-02-01', 'Türkçe', TRUE),      -- CCMM
(1, 4, '2023-06-01', 'Türkçe', TRUE),      -- AMAM
(1, 5, '2021-12-01', 'Türkçe', TRUE),      -- SKS
(1, 6, '2022-01-01', 'Türkçe', FALSE),     -- SAS (taslak)
(1, 7, '2024-02-01', 'Türkçe', FALSE);     -- InnoPerf (kaldırılmış)


-- Amerika için İngilizce modeller
INSERT INTO model_ulke (ulke_id, model_id, devreye_alma_tarihi, dil_adi, aktif) VALUES
(2, 8, '2023-03-01', 'English', TRUE),     -- EMRAM EN
(2, 9, '2023-03-01', 'English', TRUE),     -- O-EMRAM EN
(2, 10, '2023-03-01', 'English', TRUE),    -- CCMM EN
(2, 11, '2023-04-01', 'English', TRUE),    -- AMAM EN
(2, 12, '2024-03-01', 'English', FALSE);   -- InnoPerf EN

-- İspanya için İspanyolca modeller
INSERT INTO model_ulke (ulke_id, model_id, devreye_alma_tarihi, dil_adi, aktif) VALUES
(3, 13, '2023-03-01', 'Español', TRUE),    -- EMRAM ES
(3, 14, '2023-03-01', 'Español', TRUE),    -- O-EMRAM ES
(3, 15, '2023-03-01', 'Español', FALSE),   -- CCMM ES (pasif)
(3, 16, '2023-04-01', 'Español', FALSE),   -- AMAM ES (taslak)
(3, 17, '2024-03-01', 'Español', FALSE);   -- InnoPerf ES (pasif)

-- Suudi Arabistan için Arapça modeller
INSERT INTO model_ulke (ulke_id, model_id, devreye_alma_tarihi, dil_adi, aktif) VALUES
(4, 18, '2023-03-01', 'Arabic', TRUE),     -- EMRAM AR
(4, 19, '2023-03-01', 'Arabic', TRUE),     -- O-EMRAM AR
(4, 20, '2023-03-01', 'Arabic', FALSE),    -- CCMM AR (pasif)
(4, 21, '2023-04-01', 'Arabic', FALSE),    -- AMAM AR (taslak)
(4, 22, '2024-03-01', 'Arabic', FALSE);    -- InnoPerf AR (pasif)

-------------------------------- */

/* model_seviye tablosuna veri ekle (SKS ve SAS hariç) */


-- seviyelilere tum seviyeleri ekleme

INSERT INTO model_seviye (model_id, seviye_id)
SELECT m.model_id,
       s.seviye_id
FROM   modeller      m
JOIN   model_turleri t ON t.model_turu_id = m.model_turu_id
JOIN   seviyeler     s ON s.dil_adi      = m.dil_adi
WHERE  t.model_turu_adi = 'Seviye Esaslı'               -- sadece level-based
  AND (  s.ust_seviye_id IS NOT NULL                    -- çeviri satırları
      OR (s.ust_seviye_id IS NULL AND m.dil_adi = 'Türkçe') )  -- kök TR
ON CONFLICT DO NOTHING;


/* -------------------------------- 
-- model seviye join


SELECT
    m.model_resmi_adi,
    m.dil_adi,
    s.seviye_adi,
    u.ulke_adi,
CASE WHEN mu.aktif THEN 'Yayında' ELSE 'Taslak' END AS Durum
          -- son satırda VİRGÜL YOK
FROM   model_seviye ms
JOIN   modeller    m ON m.model_id  = ms.model_id
JOIN   seviyeler   s ON s.seviye_id = ms.seviye_id
JOIN   model_ulke  mu ON mu.model_id = m.model_id
JOIN   ulkeler     u ON u.ulke_id   = mu.ulke_id
ORDER  BY m.model_resmi_adi, m.dil_adi, s.seviye_id;

-- model seviye sayısı
SELECT m.model_resmi_adi,
       t.model_turu_adi,
       count(*) AS seviye_sayisi
FROM   model_seviye ms
JOIN   modeller      m ON m.model_id   = ms.model_id
JOIN   model_turleri t ON t.model_turu_id = m.model_turu_id
GROUP  BY m.model_resmi_adi, t.model_turu_adi
ORDER  BY m.model_resmi_adi;

-------------------------------- */



/* --------------------------------
-- elle veri girme

-- EMRAM (id=1), Seviye 1–7
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6), (1, 7);

-- O-EMRAM (id=2), Seviye 1–6
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 6);

-- CCMM (id=3), Seviye 1–5
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(3, 1), (3, 2), (3, 3), (3, 4), (3, 5);

-- AMAM (id=4), Seviye 1–8
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(4, 1), (4, 2), (4, 3), (4, 4), (4, 5), (4, 6), (4, 7), (4, 8);


-- EMRAM EN (id=8)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(8, 1), (8, 2), (8, 3), (8, 4), (8, 5), (8, 6), (8, 7);

-- O-EMRAM EN (id=9)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 6);

-- CCMM EN (id=10)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(10, 1), (10, 2), (10, 3), (10, 4), (10, 5);

-- AMAM EN (id=11)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(11, 1), (11, 2), (11, 3), (11, 4), (11, 5), (11, 6), (11, 7), (11, 8);


-- EMRAM ES (id=13)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(13, 1), (13, 2), (13, 3), (13, 4), (13, 5), (13, 6), (13, 7);

-- O-EMRAM ES (id=14)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(14, 1), (14, 2), (14, 3), (14, 4), (14, 5), (14, 6);

-- CCMM ES (id=15)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(15, 1), (15, 2), (15, 3), (15, 4), (15, 5);

-- AMAM ES (id=16)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(16, 1), (16, 2), (16, 3), (16, 4), (16, 5), (16, 6), (16, 7), (16, 8);

-- EMRAM AR (id=18)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(18, 1), (18, 2), (18, 3), (18, 4), (18, 5), (18, 6), (18, 7);

-- O-EMRAM AR (id=19)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(19, 1), (19, 2), (19, 3), (19, 4), (19, 5), (19, 6);

-- CCMM AR (id=20)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(20, 1), (20, 2), (20, 3), (20, 4), (20, 5);

-- AMAM AR (id=21)
INSERT INTO model_seviye (model_id, seviye_id) VALUES
(21, 1), (21, 2), (21, 3), (21, 4), (21, 5), (21, 6), (21, 7), (21, 8);

-------------------------------- */






/* model_hastane_turu tablosuna veri ekle */

-- EMRAM → tümüne
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(1,1), (1,2), (1,3), (1,4), (1,5);

-- O-EMRAM → 1, 2, 4, 5
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(2,1), (2,2), (2,4), (2,5);

-- CCMM → tümüne
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(3,1), (3,2), (3,3), (3,4), (3,5);

-- AMAM → 1, 2, 3
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(4,1), (4,2), (4,3);

-- SKS, SAS, InnoPerf → sadece 1 ve 2
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(5,1), (5,2),
(6,1), (6,2),
(7,1), (7,2);


-- EMRAM EN
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(8,6), (8,7), (8,8), (8,9), (8,10);

-- O-EMRAM EN
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(9,6), (9,7), (9,9), (9,10);

-- CCMM EN
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(10,6), (10,7), (10,8), (10,9), (10,10);

-- AMAM EN
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(11,6), (11,7), (11,8);

-- InnoPerf EN
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(12,6), (12,7);


-- EMRAM ES
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(13,11), (13,12), (13,13), (13,14), (13,15);

-- O-EMRAM ES
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(14,11), (14,12), (14,14), (14,15);

-- CCMM ES
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(15,11), (15,12), (15,13), (15,14), (15,15);

-- AMAM ES
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(16,11), (16,12), (16,13);

-- InnoPerf ES
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(17,11), (17,12);


-- EMRAM AR
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(18,16), (18,17), (18,18), (18,19), (18,20);

-- O-EMRAM AR
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(19,16), (19,17), (19,19), (19,20);

-- CCMM AR
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(20,16), (20,17), (20,18), (20,19), (20,20);

-- AMAM AR
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(21,16), (21,17), (21,18);

-- InnoPerf AR
INSERT INTO model_hastane_turu (model_id, hastane_turu_id) VALUES
(22,16), (22,17);

