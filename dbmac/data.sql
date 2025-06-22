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


/*
----------------------------------------------------------------------------------------------------
-- GENEL AÇIKLAMA:
-- Bu sorgunun amacı, `modeller` tablosundaki HER BİR model için, o modelin kendi dilinde (`m.dil_adi`)
-- mevcut olan hastane türlerinden rastgele 2 tanesini seçip `model_hastane_turu` tablosuna eklemektir.
-- Bu sayede her model, kendi diline uygun hastane türleriyle otomatik olarak ilişkilendirilmiş olur.
-- Eğer eklenecek kayıt zaten varsa (aynı model_id ve hastane_turu_id ikilisi), `ON CONFLICT DO NOTHING`
-- komutu sayesinde hata vermeden işlemi atlar.
----------------------------------------------------------------------------------------------------
*/

INSERT INTO model_hastane_turu (model_id, hastane_turu_id)
SELECT  m.model_id,
        pick.root_id
FROM   modeller m
JOIN   LATERAL (
        SELECT DISTINCT ON (COALESCE(ht.ust_hastane_turu_id, ht.hastane_turu_id))
               COALESCE(ht.ust_hastane_turu_id, ht.hastane_turu_id) AS root_id
        FROM   hastane_turleri ht
        WHERE  ht.dil_adi = m.dil_adi
        ORDER  BY COALESCE(ht.ust_hastane_turu_id, ht.hastane_turu_id), random()
        LIMIT  2
      ) AS pick ON TRUE
ON CONFLICT DO NOTHING;


/*
----------------------------------------------------------------------------------------------------


-- -- Bu sorgu, `model_hastane_turu` tablosundaki mevcut eşleşmeleri kullanarak, hangi modelin hangi
-- hastane türüne ve hangi ülkeye atandığını gösteren temel bir rapor çeker.
-- DİKKAT: Bu sorgu, çeviri mantığını (root/lang) kullanmaz. `model_hastane_turu` tablosundaki
-- `hastane_turu_id` ne ise, doğrudan o ID'ye sahip hastane türünün adını getirir.
-- Bu, genellikle verinin doğru eklenip eklenmediğini hızlıca kontrol etmek için kullanılır.
----------------------------------------------------------------------------------------------------


--  Model ile ilişkilendirilmiş hastane türlerini, ama sadece root ID'leri üzerinden gösterir.
   Yani modelin diline göre çeviri gelmez.

SELECT
    m.model_resmi_adi,      -- Modelin resmi adını getir
    m.dil_adi,              -- Modelin dilini getir
    h.hastane_turu_adi,     -- Hastane türünün adını getir
    u.ulke_adi              -- Ülkenin adını getir

FROM    model_hastane_turu mh                           -- Ana eşleşme tablosundan başla
JOIN    modeller         m ON m.model_id = mh.model_id  -- Model detaylarını almak için `modeller` tablosunu bağla
JOIN    hastane_turleri  h ON h.hastane_turu_id = mh.hastane_turu_id -- Hastane türü adını almak için `hastane_turleri`ni bağla
JOIN    model_ulke       mu ON mu.model_id = m.model_id -- Ülke ID'sini bulmak için `model_ulke`yi bağla
JOIN    ulkeler          u ON u.ulke_id = mu.ulke_id   -- Ülke adını almak için `ulkeler`i bağla
ORDER BY m.model_resmi_adi, m.dil_adi;                   -- Sonuçları model adı ve diline göre sırala



-- Modelin diline karşılık gelen hastane türü çevirisini bulur.
   Çeviri yoksa root adı döner (fallback).
   
-- Bu sorgu, bir önceki sorgunun gelişmiş halidir ve doğru raporlamayı sağlar.
-- Hangi modelin hangi hastane türüyle ilişkili olduğunu gösterirken, hastane türünün adını
-- ÖNCELİKLE modelin kendi dilinde (`m.dil_adi`) getirmeye çalışır. Eğer o dilde bir çeviri yoksa,
-- o zaman hastane türünün ana (varsayılan) adını getirir. Bu, `COALESCE` ve `LEFT JOIN` ile yapılır.

SELECT
    m.model_resmi_adi,                                                  -- Modelin resmi adı
    m.dil_adi,                                                          -- Modelin dili
    COALESCE(ht_lang.hastane_turu_adi, ht_root.hastane_turu_adi) AS hastane_turu_adi, -- Sihir burada: Önce çevrilmiş adı (`ht_lang`) al, eğer boşsa (NULL) ana adı (`ht_root`) al.
    u.ulke_adi                                                          -- Modelin bulunduğu ülke

FROM    model_hastane_turu mh                                           -- Model-Hastane Türü eşleşme tablosundan başla
JOIN    modeller m ON m.model_id = mh.model_id                          -- Model detaylarını (`dil_adi` önemli) almak için `modeller`i bağla
JOIN    hastane_turleri ht_root ON ht_root.hastane_turu_id = mh.hastane_turu_id -- Eşleşmedeki ID'yi kullanarak hastane türünün ana kaydını (`ht_root`) bul
LEFT    JOIN hastane_turleri ht_lang                                    -- Şimdi aynı tabloyu çeviriyi (`ht_lang`) bulmak için TEKRAR bağla (LEFT JOIN ile)
        ON ht_lang.ust_hastane_turu_id = ht_root.hastane_turu_id         -- Şart 1: Çeviri, ana kayda bağlı olmalı
       AND ht_lang.dil_adi = m.dil_adi                                  -- Şart 2: Çevirinin dili, modelin diliyle aynı olmalı
JOIN    model_ulke mu ON mu.model_id = m.model_id                       -- Ülke ID'sini bulmak için `model_ulke`yi bağla
JOIN    ulkeler u ON u.ulke_id = mu.ulke_id                             -- Ülke adını almak için `ulkeler`i bağla
ORDER BY m.model_resmi_adi, m.dil_adi;                                   -- Sonuçları model adı ve diline göre sırala


-- Belirli bir modele (`AMAM`) ve dile (`Arabic`) göre ilişkili hastane türü çevirilerini getir.
   Çeviri yoksa fallback root kullanılır.

SELECT
    m.model_resmi_adi,
    m.dil_adi,
    COALESCE(ht_lang.hastane_turu_adi, ht_root.hastane_turu_adi) AS hastane_turu_adi,
    u.ulke_adi
FROM   model_hastane_turu mh
JOIN   modeller m ON m.model_id = mh.model_id
JOIN   hastane_turleri ht_root ON ht_root.hastane_turu_id = mh.hastane_turu_id
LEFT   JOIN hastane_turleri ht_lang 
       ON ht_lang.ust_hastane_turu_id = ht_root.hastane_turu_id
      AND ht_lang.dil_adi = m.dil_adi
JOIN   model_ulke mu ON mu.model_id = m.model_id
JOIN   ulkeler u ON u.ulke_id = mu.ulke_id
WHERE  m.model_resmi_adi = 'AMAM'
  AND  m.dil_adi = 'Arabic'
ORDER  BY hastane_turu_adi;


-- Hangi root hastane türünün hangi dillerde çevirisi olduğunu göster.
   Veri kalitesini denetlemek için kullanılır.

SELECT 
    ht_root.hastane_turu_id AS root_id,
    ht_root.hastane_turu_adi AS default_adi,
    ht_lang.dil_adi,
    ht_lang.hastane_turu_adi AS ceviri
FROM   hastane_turleri ht_root
LEFT   JOIN hastane_turleri ht_lang ON ht_lang.ust_hastane_turu_id = ht_root.hastane_turu_id
WHERE  ht_root.ust_hastane_turu_id IS NULL
ORDER BY ht_root.hastane_turu_id, ht_lang.dil_adi;

*/


/* --------------------------------

-- elle veri girme


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

----------------------------- */


-- model kullanici kapsami veri ekleme

-- `map` adında geçici bir sanal tablo oluşturur.
-- Hangi modelin hangi kullanıcı türüyle ilişkilendirileceğini burada hard-coded olarak belirtiriz.
WITH map(model_key, user_key) AS (
    VALUES
      ('EMRAM'   , 'Genel'),
      ('O-EMRAM' , 'İdari Personel'),
      ('O-EMRAM' , 'Tıbbi Personel'),
      ('CCMM'    , 'Tıbbi Personel'),
      ('AMAM'    , 'Genel'),
      ('SKS'     , 'Genel'),
      ('SAS'     , 'Genel'),
      ('InnoPerf', 'İdari Personel')
)
-- Yukarıdaki `map`'i kullanarak model ve kullanıcı türü ilişkilerini `model_kullanici_kapsami` tablosuna ekler.
INSERT INTO model_kullanici_kapsami (model_id, kullanici_turu_id)
SELECT  m.model_id,
        kt.kullanici_turu_id     -- Eklenecek olan, kullanici_turu'nün ana (kök) ID'sidir.
FROM   modeller m
JOIN   map        mp ON mp.model_key = m.model_resmi_adi -- `map` ile modelleri, model adına göre birleştirir.
JOIN   kullanici_turleri kt
       ON  kt.kullanici_turu_adi       = mp.user_key
       AND kt.ust_kullanici_turu_id IS NULL             -- Sadece ana (kök) kayıtları bulur, çevirileri göz ardı eder.
ON CONFLICT DO NOTHING;                                 -- Eğer bu ilişki zaten varsa, hata verme, işlemi atla.
/*----------------------------------------------------------------*/


/*
/* ==========================================
   MODELLER × KULLANICI TÜRLERİ (UI dilinde)
   ==========================================*/
-- Kullanıcı türü adını SADECE 'Türkçe' olarak getirmeye çalışan sorgu.
SELECT m.model_resmi_adi           AS model,
       m.dil_adi                   AS model_dili,
       -- Önce Türkçe çeviriyi (`kt_lang`) arar, bulamazsa ana (`kt_root`) adı gösterir.
       COALESCE(kt_lang.kullanici_turu_adi,
                kt_root.kullanici_turu_adi)    AS kullanici_turu_adi
FROM   model_kullanici_kapsami mk
JOIN   modeller          m       ON m.model_id            = mk.model_id
JOIN   kullanici_turleri kt_root ON kt_root.kullanici_turu_id = mk.kullanici_turu_id -- İlişkideki ana (kök) kullanıcı türünü bulur.
-- FARK BURADA BAŞLIYOR:
LEFT   JOIN kullanici_turleri kt_lang
       ON  kt_lang.ust_kullanici_turu_id = kt_root.kullanici_turu_id
       AND kt_lang.dil_adi = 'Türkçe'   -- DİKKAT: Dil burada 'Türkçe' olarak sabitlenmiştir.
ORDER  BY model, kullanici_turu_adi;


-- UI Kullanıcı türü adını, modelin kendi diline göre dinamik olarak getirir.
SELECT m.model_resmi_adi        AS model,
       m.dil_adi                AS model_dili,
       -- Önce modelin dilindeki çeviriyi (`kt_lang`) arar, bulamazsa ana (`kt_root`) adı gösterir.
       COALESCE(kt_lang.kullanici_turu_adi,
                kt_root.kullanici_turu_adi)  AS kullanici_turu_adi,
       COALESCE(kt_lang.dil_adi, kt_root.dil_adi) AS tur_dili
FROM   model_kullanici_kapsami mk
JOIN   modeller                m       ON m.model_id = mk.model_id
JOIN   kullanici_turleri       kt_root ON kt_root.kullanici_turu_id = mk.kullanici_turu_id
-- FARK VE DOĞRU YÖNTEM BURADA:
LEFT   JOIN kullanici_turleri       kt_lang
       ON  kt_lang.ust_kullanici_turu_id = kt_root.kullanici_turu_id
       AND kt_lang.dil_adi = m.dil_adi  -- DİKKAT: Çevirinin dili, modelin diliyle (`m.dil_adi`) eşleşmeli.
ORDER  BY model, model_dili, kullanici_turu_adi;



-- TEŞHİS SORGUSU: Bir modelin ilişkili olduğu kullanıcı türünün ana adını ve TÜM çevirilerini listeler.
-- Bu sorgu, her çeviri için bir satır oluşturarak veriyi "çoğaltır".
SELECT m.model_resmi_adi           AS model,
       m.dil_adi                   AS model_dili,
       kt_root.kullanici_turu_adi    AS root_adi_tr,  -- Kullanıcı türünün ana (kök) adını gösterir.
       kt_lang.kullanici_turu_adi    AS ceviri_adi,   -- Bulunan çevirinin adını gösterir. Boş olabilir.
       COALESCE(kt_lang.dil_adi,'Türkçe') AS ceviri_dili -- Çevirinin dilini, çeviri yoksa 'Türkçe' olarak gösterir.
FROM   model_kullanici_kapsami mk
JOIN   modeller          m  ON m.model_id = mk.model_id
JOIN   kullanici_turleri kt_root
       ON kt_root.kullanici_turu_id = mk.kullanici_turu_id
-- FARK BURADA: Dil filtresi olmadan JOIN yapılır.
LEFT   JOIN kullanici_turleri kt_lang
       ON  kt_lang.ust_kullanici_turu_id = kt_root.kullanici_turu_id -- DİKKAT: Dil filtresi KASITLI olarak yoktur. Amaç, mevcut tüm çevirileri bulmaktır.
ORDER  BY model, ceviri_dili; -- Her bir modelin tüm çevirilerini gruplu görmek için sıralama yapılır.



/*
----------------------------------------------------------------------------------------------------
-- GENEL AÇIKLAMA (İDEAL SORGUDUR):
-- Bu sorgu, modellerin ilişkili olduğu kullanıcı türlerini listeler.
-- LEFT JOIN'e `AND kt_lang.dil_adi = m.dil_adi` koşulu eklenerek,
-- kullanıcı türü adının HER ZAMAN modelin kendi dilinde getirilmesi sağlanmıştır.
-- Eğer o dilde çeviri yoksa, COALESCE sayesinde ana (kök) isim gösterilir.
----------------------------------------------------------------------------------------------------

SELECT m.model_resmi_adi        AS model,
       m.dil_adi                AS model_dili,
       -- Önce modelin dilindeki çeviriyi (`kt_lang`) arar, bulamazsa ana (`kt_root`) adı gösterir.
       COALESCE(kt_lang.kullanici_turu_adi,
                kt_root.kullanici_turu_adi)  AS kullanici_turu_adi,
       -- Üstteki mantığın aynısı, bu sefer türün dilini doğru göstermek için.
       COALESCE(kt_lang.dil_adi, kt_root.dil_adi) AS tur_dili
FROM   model_kullanici_kapsami mk
JOIN   modeller                m       ON m.model_id = mk.model_id
JOIN   kullanici_turleri       kt_root ON kt_root.kullanici_turu_id = mk.kullanici_turu_id -- İlişkideki ana (kök) kullanıcı türünü bulur.
-- FARK VE DOĞRU YÖNTEM BURADA:
LEFT   JOIN kullanici_turleri       kt_lang
       ON  kt_lang.ust_kullanici_turu_id = kt_root.kullanici_turu_id
       AND kt_lang.dil_adi = m.dil_adi  -- <<-- SİHİR BURADA: Çevirinin dili, modelin diliyle (`m.dil_adi`) eşleşmek zorunda.
ORDER  BY model, model_dili, kullanici_turu_adi;
*/



/* ============================================================
   BOYUT (Dimension) VERİLERİNİ ÇOK-DİLLİ VE HİYERARŞİK EKLEME
   ============================================================ */

-- 1) KÖK (TÜRKÇE) BOYUTLAR  -----------------------------------
WITH tr_roots AS (
  INSERT INTO boyutlar (
      ust_boyut_id, boyut_id_hiyerarsi, boyut_adi,
      boyut_allias, boyut_etiketleri, hiyerarsi, aktif, dil_adi
  )
  VALUES
    -- Ana kategoriler (hiyerarsi seviye = 1)
    (NULL, NULL, 'Dijital Sağlık Altyapısı' , 'Dijital SA',  'Altyapı',          1, 1, 'Türkçe'),
    (NULL, NULL, 'Hasta Deneyimi ve Katılımı', 'Hasta DK',   'Hasta, Katılım',   1, 1, 'Türkçe'),
    (NULL, NULL, 'Afet ve Güvenlik Hazırlığı', 'Afet GH',    'Afet, Güvenlik',   1, 1, 'Türkçe')
  ON CONFLICT DO NOTHING
  RETURNING boyut_id, boyut_adi,boyut_id_hiyerarsi 
),

tr_leafs AS (
  /* Ebeveyn ID’lerini aldığımız için alt boyutları rahatça ekleriz */
  INSERT INTO boyutlar (
      ust_boyut_id, boyut_id_hiyerarsi, boyut_adi,
      boyut_allias, boyut_etiketleri, hiyerarsi, aktif, dil_adi
  )
  SELECT
      NULL,                                    -- dil bağlamı için daha sonra kullanılacak
      parent.boyut_id,                         -- <<< boyut_id_hiyerarsi = üst kategori
      leaf.tr_adi,
      leaf.alias,
      leaf.etiket,
      2,                                       -- hiyerarşik seviye (sub)
      1,
      'Türkçe'
  FROM (VALUES
          ('1.1 Veri Yönetimi ve Paylaşımı'     , 'Data Capture' , 'Veri',       'Dijital Sağlık Altyapısı'),
          ('1.2 Sağlık Bilişimi Planlaması'     , 'Analytics'    , 'Analitik',   'Dijital Sağlık Altyapısı'),
          ('2.1 Hasta Katılımı'                 , 'Engagement'   , 'Hasta',      'Hasta Deneyimi ve Katılımı'),
          ('2.2 Klinik Kullanıcı Benimsemesi'   , 'Adoption'     , 'Klinik',     'Hasta Deneyimi ve Katılımı'),
          ('3.1 Felaket Kurtarma ve İş Sürekliliği','DRP'       , 'Felaket',     'Afet ve Güvenlik Hazırlığı'),
          ('3.2 Teknoloji Altyapısı'            , 'Tech Facility', 'Altyapı',    'Afet ve Güvenlik Hazırlığı'),
          ('3.3 Teknoloji Planları'             , 'Tech Plan'   , 'Planlama',    'Afet ve Güvenlik Hazırlığı')
       ) AS leaf(tr_adi, alias, etiket, parent_tr_adi)
  JOIN tr_roots parent
       ON parent.boyut_adi = leaf.parent_tr_adi
  ON CONFLICT DO NOTHING
  RETURNING boyut_id, boyut_adi, boyut_id_hiyerarsi
),

all_tr AS (   -- kök + yaprak -> dil çevirisine lazım
  SELECT boyut_id, boyut_adi, boyut_id_hiyerarsi FROM tr_roots
  UNION ALL
  SELECT boyut_id, boyut_adi, boyut_id_hiyerarsi FROM tr_leafs
),

-- 2) DİL ÇEVİRİLERİ  -------------------------------------------
ins_lang AS (
  /* Dil = İngilizce, İspanyolca, Arapça  */
  INSERT INTO boyutlar (
      ust_boyut_id, boyut_id_hiyerarsi, boyut_adi,
      boyut_allias, boyut_etiketleri, hiyerarsi, aktif, dil_adi
  )
  SELECT
      tr.boyut_id,                    -- <<< ust_boyut_id = TR satırı (dil bağı)
      tr.boyut_id_hiyerarsi,          -- hiyerarşi aynen miras
      cv.lang_adi,
      cv.alias,
      cv.etiket,
      CASE WHEN tr.boyut_id_hiyerarsi IS NULL THEN 1 ELSE 2 END,
      1,
      cv.dil
  FROM all_tr tr
  JOIN LATERAL (
      /* Çeviri sözlüğü (TR ↔ EN/ES/AR) --------------------------
         boyut_adi_tr, dil, lang_adi, alias, etiket
         --------------------------------------------------------*/
      VALUES
        -- --------------- Dijital Sağlık Altyapısı --------------
        ('Dijital Sağlık Altyapısı', 'English', 'Digital Health Infrastructure' , 'Digital HI', 'Infrastructure'),
        ('Dijital Sağlık Altyapısı', 'Español', 'Infraestructura de Salud Digital', 'Salud Digital', 'Infraestructura'),
        ('Dijital Sağlık Altyapısı', 'Arabic' , 'البنية التحتية للصحة الرقمية',    'الصحة الرقمية', 'بنية تحتية'),

        ('1.1 Veri Yönetimi ve Paylaşımı', 'English', 'Data Capture & Health Information Exchange', 'Data Capture', 'Data'),
        ('1.1 Veri Yönetimi ve Paylaşımı', 'Español', 'Captura de Datos e Intercambio de Información Sanitaria', 'Captura de Datos', 'Datos'),
        ('1.1 Veri Yönetimi ve Paylaşımı', 'Arabic' , 'اكتساب البيانات وتبادل المعلومات الصحية', 'اكتساب البيانات', 'بيانات'),

        ('1.2 Sağlık Bilişimi Planlaması', 'English', 'Healthcare Analytics & Outcomes Measurement', 'Analytics', 'Analytics'),
        ('1.2 Sağlık Bilişimi Planlaması', 'Español', 'Analítica de Salud y Medición de Resultados', 'Analítica', 'Analítica'),
        ('1.2 Sağlık Bilişimi Planlaması', 'Arabic' , 'تحليلات الرعاية الصحية وقياس النتائج', 'تحليلات', 'تحليلات'),

        -- --------------- Hasta Deneyimi ve Katılımı ------------
        ('Hasta Deneyimi ve Katılımı', 'English', 'Patient Experience & Engagement', 'Patient EE', 'Patient'),
        ('Hasta Deneyimi ve Katılımı', 'Español', 'Experiencia y Participación del Paciente', 'Paciente PE', 'Paciente'),
        ('Hasta Deneyimi ve Katılımı', 'Arabic' , 'تجربة المريض ومشاركته',          'المريض', 'مريض'),

        ('2.1 Hasta Katılımı', 'English', 'Patient Engagement',  'Engagement',  'Patient'),
        ('2.1 Hasta Katılımı', 'Español', 'Participación del Paciente', 'Participación', 'Paciente'),
        ('2.1 Hasta Katılımı', 'Arabic' , 'مشاركة المريض',       'المريض', 'مريض'),

        ('2.2 Klinik Kullanıcı Benimsemesi', 'English', 'Clinical User Adoption', 'User Adoption', 'Clinical'),
        ('2.2 Klinik Kullanıcı Benimsemesi', 'Español', 'Adopción de Usuarios Clínicos', 'Adopción', 'Clínico'),
        ('2.2 Klinik Kullanıcı Benimsemesi', 'Arabic' , 'تبني المستخدمين الإكلينيكيين', 'تبني', 'إكلينيكي'),

        -- --------------- Afet ve Güvenlik Hazırlığı ------------
        ('Afet ve Güvenlik Hazırlığı', 'English', 'Disaster & Safety Readiness', 'Disaster SR', 'Safety'),
        ('Afet ve Güvenlik Hazırlığı', 'Español', 'Preparación ante Desastres y Seguridad', 'Desastre', 'Seguridad'),
        ('Afet ve Güvenlik Hazırlığı', 'Arabic' , 'الاستعداد للكوارث والسلامة',    'الكوارث', 'سلامة'),

        ('3.1 Felaket Kurtarma ve İş Sürekliliği', 'English', 'Disaster Recovery & Business Continuity', 'DR/BC', 'Disaster'),
        ('3.1 Felaket Kurtarma ve İş Sürekliliği', 'Español', 'Recuperación ante Desastres y Continuidad del Negocio', 'Recuperación', 'Desastre'),
        ('3.1 Felaket Kurtarma ve İş Sürekliliği', 'Arabic' , 'استعادة البيانات بعد الكوارث واستمرار الأعمال', 'استعادة', 'كوارث'),

        ('3.2 Teknoloji Altyapısı', 'English', 'Technology Facilities', 'Tech Facility', 'Technology'),
        ('3.2 Teknoloji Altyapısı', 'Español', 'Instalaciones Tecnológicas', 'Instalaciones', 'Tecnología'),
        ('3.2 Teknoloji Altyapısı', 'Arabic' , 'مرافق التكنولوجيا',          'مرافق التكنولوجيا', 'تكنولوجيا'),

        ('3.3 Teknoloji Planları', 'English', 'Technology Planning', 'Tech Planning', 'Planning'),
        ('3.3 Teknoloji Planları', 'Español', 'Planificación Tecnológica', 'Planificación', 'Planificación'),
        ('3.3 Teknoloji Planları', 'Arabic' , 'تخطيط التكنولوجيا',           'تخطيط التكنولوجيا', 'تخطيط')
      ) AS cv(tr_adi, dil, lang_adi, alias, etiket)
      ON cv.tr_adi = tr.boyut_adi      -- hangi TR satırın çevirisi?
  ON CONFLICT DO NOTHING
)
SELECT 'Boyutlar eklendi';

/*
/* 3) RAPOR: Ağaç yapıyı kontrol için ---------------------------*/
SELECT b_tr.boyut_adi      AS turkce_kök,
       b_tr.boyut_id       AS tr_id,
       b_tr.hiyerarsi      AS seviye,
       b_en.boyut_adi      AS en_adi
FROM   boyutlar b_tr
LEFT   JOIN boyutlar b_en
       ON b_en.ust_boyut_id = b_tr.boyut_id
       AND b_en.dil_adi = 'English'
WHERE  b_tr.dil_adi = 'Türkçe'
ORDER  BY b_tr.hiyerarsi, b_tr.boyut_adi;
*/



/* ============================================================
   ÇOK DİLLİ KRİTER EKLEME BETİĞİ
   ============================================================ */

/* ------------------------------------------------------------
   1) TÜRKÇE KÖK KRİTERLER
   ------------------------------------------------------------ */
WITH tr_criteria AS (
  INSERT INTO kriterler (
      ust_kriter_id, kriter_adi, kriter_alias,
      kriter_etiketleri, dil_adi, aktif
  )
  VALUES
    (NULL, 'Klinik kullanıcıların %95''inden fazlası elektronik hasta kaydını aktif şekilde kullanmaktadır.',
           'KR01', 'kullanım, EHR, oran', 'Türkçe', 1),
    (NULL, 'Tüm ilaç uygulamaları barkod ile doğrulama sistemi üzerinden yapılmaktadır.',
           'KR02', 'ilaç, barkod, doğrulama', 'Türkçe', 1),
    (NULL, 'Hemşireler ilaç vermeden önce hastanın kimliğini barkod ile doğrulamaktadır.',
           'KR03', 'hemşire, barkod, kimlik', 'Türkçe', 1),
    (NULL, 'Klinik notların %90’ı yapılandırılmış alanlara girilmektedir.',
           'KR04', 'not, yapılandırılmış, yüzde', 'Türkçe', 1),
    (NULL, 'Doktorlar, order-entry sistemini kullanarak ilaçları doğrudan reçetelendirmektedir.',
           'KR05', 'doktor, order-entry, reçete', 'Türkçe', 1),
    (NULL, 'Hatalı hasta-ilaç eşleşmelerini önlemek için “time-out” kontrol listeleri kullanılmaktadır.',
           'KR06', 'hata, ilaç, time-out', 'Türkçe', 1),
    (NULL, 'Klinik personelin %90''ından fazlası elektronik dokümantasyonu tamamlamaktadır.',
           'KR07', 'dökümantasyon, elektronik, personel', 'Türkçe', 1),
    (NULL, 'Hasta kimlik bileklikleri hasta kabul sırasında sistemden otomatik basılmaktadır.',
           'KR08', 'bileklik, otomatik, kabul', 'Türkçe', 1),
    (NULL, 'Klinik kullanıcılar sisteme günlük ortalama 5''ten fazla giriş yapmaktadır.',
           'KR09', 'günlük giriş, kullanıcı, sıklık', 'Türkçe', 1),
    (NULL, 'Her hastaya özel klinik izlem planı dijital ortamda kaydedilmektedir.',
           'KR10', 'izlem planı, dijital, hasta', 'Türkçe', 1),
    (NULL, 'Doktorlar tedavi planlarını doğrudan sistem üzerinden oluşturmakta ve izlemektedir.',
           'KR11', 'tedavi planı, doktor, sistem', 'Türkçe', 1),
    (NULL, 'Kullanıcılar elektronik sistemler üzerinde uyarı/hatırlatma bildirimlerini dikkate almaktadır.',
           'KR12', 'uyarı, hatırlatma, sistem', 'Türkçe', 1),
    (NULL, 'Klinik karar destek sistemi, ilaç etkileşimlerini otomatik olarak bildirmektedir.',
           'KR13', 'karar destek, ilaç, etkileşim', 'Türkçe', 1),
    (NULL, 'Tüm görüntüleme sonuçları sistem üzerinden klinik kullanıcıya anlık sunulmaktadır.',
           'KR14', 'görüntüleme, anlık, sonuç', 'Türkçe', 1),
    (NULL, 'Yatan hasta birimleri günlük vizit notlarını tamamen dijital olarak kaydetmektedir.',
           'KR15', 'vizit, dijital, yatan hasta', 'Türkçe', 1),
    (NULL, 'Hemşire gözlemleri belirlenmiş veri alanlarına göre elektronik kaydedilmektedir.',
           'KR16', 'hemşire, gözlem, elektronik', 'Türkçe', 1),
    (NULL, 'Sistem üzerinde tanımlı roller doğrultusunda sadece yetkili kişiler veri girişine sahiptir.',
           'KR17', 'rol, yetki, veri girişi', 'Türkçe', 1),
    (NULL, 'Laboratuvar sonuçları, order sistemine entegre şekilde doğrudan hastaya atanır.',
           'KR18', 'laboratuvar, entegrasyon, order', 'Türkçe', 1),
    (NULL, 'Klinisyenler arasında konsültasyon talepleri sistem üzerinden yapılmaktadır.',
           'KR19', 'konsültasyon, talep, klinisyen', 'Türkçe', 1),
    (NULL, 'Klinik eğitim programları, sistem kullanımına dair modülleri de içermektedir.',
           'KR20', 'eğitim, modül, sistem', 'Türkçe', 1),
    (NULL, 'Kullanıcılar klinik sistem hatalarını bildirmek için elektronik bildirim modülünü kullanmaktadır.',
           'KR21', 'hata, bildirim, kullanıcı', 'Türkçe', 1),
    (NULL, 'Klinik sistem performansı düzenli olarak kullanıcı anketleri ile izlenmektedir.',
           'KR22', 'performans, anket, sistem', 'Türkçe', 1),
    (NULL, 'Elektronik order sisteminde ilaç doz hataları için uyarı algoritmaları mevcuttur.',
           'KR23', 'order, doz, uyarı', 'Türkçe', 1),
    (NULL, 'Mobil cihazlar üzerinden klinik bilgi girişi yapılabilmektedir.',
           'KR24', 'mobil, bilgi girişi, cihaz', 'Türkçe', 1),
    (NULL, 'Klinik kullanıcılar sisteme 2 adımlı kimlik doğrulama ile giriş yapmaktadır.',
           'KR25', '2FA, kimlik, giriş', 'Türkçe', 1),
    (NULL, 'Hasta çıkış epikrizleri sistem üzerinden yapılandırılmış şekilde doldurulmaktadır.',
           'KR26', 'epikriz, çıkış, yapılandırılmış', 'Türkçe', 1),
    (NULL, 'Yoğun bakım veri seti sistemde yapılandırılmış olarak tutulmaktadır.',
           'KR27', 'yoğun bakım, veri seti, yapılandırılmış', 'Türkçe', 1),
    (NULL, 'Hemşireler vital bulguları mobil cihazlar üzerinden doğrudan sisteme girer.',
           'KR28', 'vital, mobil, hemşire', 'Türkçe', 1),
    (NULL, 'Hasta takibi için klinik skorlamalar otomatik olarak hesaplanmaktadır.',
           'KR29', 'skorlama, otomatik, takip', 'Türkçe', 1),
    (NULL, 'Sistem, medikal cihazlardan gelen verileri hasta dosyasına otomatik işler.',
           'KR30', 'cihaz entegrasyonu, otomatik, veri', 'Türkçe', 1)
  ON CONFLICT DO NOTHING
  RETURNING kriter_id, kriter_alias, kriter_adi, kriter_etiketleri
),

/* ------------------------------------------------------------
   2) İNG-ES-AR ÇEVİRİLERİ
   ------------------------------------------------------------ */
ins_lang AS (
  INSERT INTO kriterler (
      ust_kriter_id, kriter_adi, kriter_alias,
      kriter_etiketleri, dil_adi, aktif
  )
  SELECT
      tr.kriter_id,                     -- >>> dil bağı
      cv.lang_adi,                      -- kriter_adi
      tr.kriter_alias,                  -- alias aynı
      tr.kriter_etiketleri,             -- etiketler TR’den kopya (opsiyonel)
      cv.dil,                           -- dil_adi
      1
  FROM tr_criteria tr
  JOIN LATERAL (
      /* --------------- ÇEVİRİ SÖZLÜĞÜ -------------------------
         alias, dil, çeviri
         (yalnızca KR01…KR05 örnek, devamını aynı kalıpla ekleyebilirsin)
         -------------------------------------------------------*/
      VALUES
-- KR01
      ('KR01','English','More than 95% of clinical users actively use the EHR.'),
      ('KR01','Español','Más del 95 % de los usuarios clínicos utilizan activamente la HCE.'),
      ('KR01','Arabic' ,'أكثر من ‎95‎٪ من المستخدمين السريريين يستخدمون سجل المريض الإلكتروني بنشاط.'),
      -- KR02
      ('KR02','English','All medication administrations are verified via barcode.'),
      ('KR02','Español','Todas las administraciones de medicamentos se verifican mediante código de barras.'),
      ('KR02','Arabic' ,'يتم التحقق من جميع إعطاءات الأدوية باستخدام نظام الباركود.'),
      -- KR03
      ('KR03','English','Nurses verify patient identity with barcode before medication.'),
      ('KR03','Español','Las enfermeras verifican la identidad del paciente con código de barras antes de administrar medicamentos.'),
      ('KR03','Arabic' ,'تتحقق الممرضات من هوية المريض بالباركود قبل إعطاء الدواء.'),
      -- KR04
      ('KR04','English','90% of clinical notes are entered into structured fields.'),
      ('KR04','Español','El 90 % de las notas clínicas se ingresan en campos estructurados.'),
      ('KR04','Arabic' ,'يتم إدخال ‎90‎٪ من الملاحظات السريرية في حقول مُهيكلة.'),
      -- KR05
      ('KR05','English','Physicians e-prescribe directly via order-entry.'),
      ('KR05','Español','Los médicos prescriben directamente a través del sistema de órdenes.'),
      ('KR05','Arabic' ,'يصف الأطباء الأدوية مباشرة عبر نظام إدخال الأوامر.'),
      -- KR06
      ('KR06','English','"Time-out" checklists are used to prevent incorrect patient-medication pairings.'),
      ('KR06','Español','Se utilizan listas de verificación de "tiempo muerto" para evitar emparejamientos incorrectos de paciente-medicamento.'),
      ('KR06','Arabic' ,'تُستخدم قوائم التحقق "الوقت المستقطع" لمنع الاقتران الخاطئ بين المريض والدواء.'),
      -- KR07
      ('KR07','English','More than 90% of clinical staff complete electronic documentation.'),
      ('KR07','Español','Más del 90 % del personal clínico completa la documentación electrónica.'),
      ('KR07','Arabic' ,'أكثر من 90٪ من الموظفين السريريين يكملون التوثيق الإلكتروني.'),
      -- KR08
      ('KR08','English','Patient identification wristbands are automatically printed from the system upon admission.'),
      ('KR08','Español','Las pulseras de identificación del paciente se imprimen automáticamente desde el sistema al momento del ingreso.'),
      ('KR08','Arabic' ,'تتم طباعة أساور تعريف المريض تلقائيًا من النظام عند القبول.'),
      -- KR09
      ('KR09','English','Clinical users log into the system more than 5 times on average daily.'),
      ('KR09','Español','Los usuarios clínicos inician sesión en el sistema más de 5 veces en promedio al día.'),
      ('KR09','Arabic' ,'يقوم المستخدمون السريريون بتسجيل الدخول إلى النظام أكثر من 5 مرات في المتوسط يوميًا.'),
      -- KR10
      ('KR10','English','A specific clinical monitoring plan for each patient is recorded digitally.'),
      ('KR10','Español','Se registra digitalmente un plan de seguimiento clínico específico para cada paciente.'),
      ('KR10','Arabic' ,'يتم تسجيل خطة متابعة سريرية خاصة بكل مريض رقميًا.'),
      -- KR11
      ('KR11','English','Physicians create and monitor treatment plans directly through the system.'),
      ('KR11','Español','Los médicos crean y supervisan los planes de tratamiento directamente a través del sistema.'),
      ('KR11','Arabic' ,'يقوم الأطباء بإنشاء ومراقبة خطط العلاج مباشرة عبر النظام.'),
      -- KR12
      ('KR12','English','Users pay attention to alert/reminder notifications on electronic systems.'),
      ('KR12','Español','Los usuarios prestan atención a las notificaciones de alerta/recordatorio en los sistemas electrónicos.'),
      ('KR12','Arabic' ,'ينتبه المستخدمون إلى إشعارات التنبيه/التذكير على الأنظمة الإلكترونية.'),
      -- KR13
      ('KR13','English','The clinical decision support system automatically reports drug interactions.'),
      ('KR13','Español','El sistema de soporte de decisiones clínicas informa automáticamente sobre las interacciones de medicamentos.'),
      ('KR13','Arabic' ,'يقوم نظام دعم القرار السريري بالإبلاغ عن التفاعلات الدوائية تلقائيًا.'),
      -- KR14
      ('KR14','English','All imaging results are instantly presented to the clinical user via the system.'),
      ('KR14','Español','Todos los resultados de imágenes se presentan instantáneamente al usuario clínico a través del sistema.'),
      ('KR14','Arabic' ,'يتم تقديم جميع نتائج التصوير فورًا للمستخدم السريري عبر النظام.'),
      -- KR15
      ('KR15','English','Inpatient units record daily visit notes completely digitally.'),
      ('KR15','Español','Las unidades de hospitalización registran las notas de visita diarias de forma completamente digital.'),
      ('KR15','Arabic' ,'تسجل وحدات المرضى الداخليين ملاحظات الزيارة اليومية بشكل رقمي بالكامل.'),
      -- KR16
      ('KR16','English','Nurse observations are recorded electronically according to defined data fields.'),
      ('KR16','Español','Las observaciones de las enfermeras se registran electrónicamente de acuerdo con campos de datos definidos.'),
      ('KR16','Arabic' ,'يتم تسجيل ملاحظات الممرضات إلكترونيًا وفقًا لحقول البيانات المحددة.'),
      -- KR17
      ('KR17','English','Only authorized personnel have data entry rights according to roles defined in the system.'),
      ('KR17','Español','Solo el personal autorizado tiene derechos de entrada de datos según los roles definidos en el sistema.'),
      ('KR17','Arabic' ,'فقط الموظفون المصرح لهم لديهم حقوق إدخال البيانات وفقًا للأدوار المحددة في النظام.'),
      -- KR18
      ('KR18','English','Laboratory results are directly assigned to the patient, integrated with the order system.'),
      ('KR18','Español','Los resultados de laboratorio se asignan directamente al paciente, integrados con el sistema de órdenes.'),
      ('KR18','Arabic' ,'يتم تعيين نتائج المختبر مباشرة للمريض، متكاملة مع نظام الطلبات.'),
      -- KR19
      ('KR19','English','Consultation requests among clinicians are made through the system.'),
      ('KR19','Español','Las solicitudes de consulta entre clínicos se realizan a través del sistema.'),
      ('KR19','Arabic' ,'تتم طلبات الاستشارة بين الأطباء عبر النظام.'),
      -- KR20
      ('KR20','English','Clinical training programs also include modules on system usage.'),
      ('KR20','Español','Los programas de formación clínica también incluyen módulos sobre el uso del sistema.'),
      ('KR20','Arabic' ,'تتضمن برامج التدريب السريري أيضًا وحدات حول استخدام النظام.'),
      -- KR21
      ('KR21','English','Users use the electronic notification module to report clinical system errors.'),
      ('KR21','Español','Los usuarios utilizan el módulo de notificación electrónica para informar errores del sistema clínico.'),
      ('KR21','Arabic' ,'يستخدم المستخدمون وحدة الإشعارات الإلكترونية للإبلاغ عن أخطاء النظام السريري.'),
      -- KR22
      ('KR22','English','Clinical system performance is regularly monitored with user surveys.'),
      ('KR22','Español','El rendimiento del sistema clínico se supervisa regularmente con encuestas a los usuarios.'),
      ('KR22','Arabic' ,'يتم مراقبة أداء النظام السريري بانتظام من خلال استطلاعات رأي المستخدمين.'),
      -- KR23
      ('KR23','English','Warning algorithms for medication dosage errors are available in the electronic order system.'),
      ('KR23','Español','Existen algoritmos de advertencia para errores de dosificación de medicamentos en el sistema de órdenes electrónicas.'),
      ('KR23','Arabic' ,'تتوفر خوارزميات تحذير لأخطاء جرعات الأدوية في نظام الطلبات الإلكتروني.'),
      -- KR24
      ('KR24','English','Clinical information can be entered via mobile devices.'),
      ('KR24','Español','Se puede ingresar información clínica a través de dispositivos móviles.'),
      ('KR24','Arabic' ,'يمكن إدخال المعلومات السريرية عبر الأجهزة المحمولة.'),
      -- KR25
      ('KR25','English','Clinical users log into the system with 2-step authentication.'),
      ('KR25','Español','Los usuarios clínicos inician sesión en el sistema con autenticación de 2 pasos.'),
      ('KR25','Arabic' ,'يقوم المستخدمون السريريون بتسجيل الدخول إلى النظام من خلال المصادقة الثنائية.'),
      -- KR26
      ('KR26','English','Patient discharge summaries are filled out in a structured way through the system.'),
      ('KR26','Español','Los resúmenes de alta del paciente se completan de forma estructurada a través del sistema.'),
      ('KR26','Arabic' ,'يتم ملء ملخصات خروج المرضى بطريقة منظمة عبر النظام.'),
      -- KR27
      ('KR27','English','The intensive care data set is maintained in a structured format in the system.'),
      ('KR27','Español','El conjunto de datos de cuidados intensivos se mantiene en un formato estructurado en el sistema.'),
      ('KR27','Arabic' ,'يتم الاحتفاظ بمجموعة بيانات العناية المركزة بتنسيق منظم في النظام.'),
      -- KR28
      ('KR28','English','Nurses enter vital signs directly into the system via mobile devices.'),
      ('KR28','Español','Las enfermeras ingresan los signos vitales directamente en el sistema a través de dispositivos móviles.'),
      ('KR28','Arabic' ,'تقوم الممرضات بإدخال العلامات الحيوية مباشرة في النظام عبر الأجهزة المحمولة.'),
      -- KR29
      ('KR29','English','Clinical scores for patient monitoring are calculated automatically.'),
      ('KR29','Español','Las puntuaciones clínicas para el seguimiento del paciente se calculan automáticamente.'),
      ('KR29','Arabic' ,'يتم حساب الدرجات السريرية لمراقبة المريض تلقائيًا.'),
      -- KR30
      ('KR30','English','The system automatically processes data from medical devices into the patient file.'),
      ('KR30','Español','El sistema procesa automáticamente los datos de los dispositivos médicos en el archivo del paciente.'),
      ('KR30','Arabic' ,'يقوم النظام تلقائيًا بمعالجة البيانات من الأجهزة الطبية وإدخالها في ملف المريض.')
  ) AS cv(alias, dil, lang_adi)
     ON cv.alias = tr.kriter_alias
  ON CONFLICT DO NOTHING
)


/* 3) Hızlı Kontrol ------------------------------------------------*/
SELECT dil_adi, COUNT(*) AS kriter_sayisi
FROM   kriterler
GROUP  BY dil_adi
ORDER  BY dil_adi;




/* ============================================================
   GÖSTERGE EKLEME BETİĞİ  
   ============================================================ */

/* 1) Türkçe kök göstergeleri ekle
   ------------------------------------------------------------ */
INSERT INTO gostergeler (
    ust_gosterge_id, gosterge_adi,       gosterge_allias,
    gosterge_etiketleri, gosterge_aciklamasi,
    gosterge_ornek_uygulama, dil_adi, aktif
)
VALUES
 (NULL, 'Klinikte tüm hastalar için elektronik hasta kaydı (EHR) sistemi düzenli olarak kullanılıyor mu?',
        'GS01', 'EHR, kullanım, düzenli', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcıların %95’inden fazlası hasta verisini sistem üzerinden mi giriyor?',
        'GS02', 'kullanıcı, %95, veri girişi', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Elektronik sistem dışında elle tutulan kayıtlar halen mevcut mu?',
        'GS03', 'elle kayıt, kağıt, manuel', NULL, NULL, 'Türkçe', 1),

 (NULL, 'İlaç uygulamaları öncesi hasta kimlik doğrulaması barkod ile yapılıyor mu?',
        'GS04', 'kimlik doğrulama, barkod, ilaç', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Hemşireler ilaç verirken sistem tarafından otomatik uyarı alıyor mu?',
        'GS05', 'hemşire, uyarı, ilaç', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Barkod sisteminin hatalı okuma oranı izleniyor mu?',
        'GS06', 'barkod, hata, izleme', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik personel barkod okutmadan ilaç verebiliyor mu?',
        'GS07', 'barkod, atlama, risk', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Elektronik sistemde barkod okutma zorunlu hale getirildi mi?',
        'GS08', 'barkod, zorunlu, sistem', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik notlar genelde serbest metin olarak mı, yoksa yapılandırılmış alanlarla mı giriliyor?',
        'GS09', 'serbest metin, yapılandırılmış', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Yapılandırılmış veri alanları (örneğin şablonlar, seçmeli kutular) düzenli kullanılıyor mu?',
        'GS10', 'şablon, kutu seçimi, yapılandırılmış', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Doktorlar reçete yazarken CPOE sistemini mi kullanıyor, yoksa manuel giriş var mı?',
        'GS11', 'CPOE, reçete, doktor', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Doktorlar sistem üzerinden verilen order’lara uyarı aldıklarında geri bildirimde bulunuyor mu?',
        'GS12', 'order, uyarı, geri bildirim', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Sistem, doktorun order verirken ilaç etkileşim uyarılarını gösteriyor mu?',
        'GS13', 'ilaç etkileşim, uyarı, order', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Prosedür öncesi “doğru hasta / doğru işlem” kontrolü yapılmakta mı?',
        'GS14', 'check-list, doğru hasta, işlem', NULL, NULL, 'Türkçe', 1),

 (NULL, '“Time-out” kontrol listesi sistemde işaretlenmeden işlem başlatılabiliyor mu?',
        'GS15', 'time-out, check-list, bypass', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Time-out kayıtları sistem tarafından geriye dönük denetlenebiliyor mu?',
        'GS16', 'time-out, denetim, kayıt', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcılar hasta kaydı işlemlerini ortalama ne kadar sürede tamamlıyor?',
        'GS17', 'süre, kayıt, kullanıcı', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik personel her vardiyada en az bir kez hasta bilgisi girişi yapıyor mu?',
        'GS18', 'vardiya, bilgi girişi, sıklık', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Hasta bileklikleri sistemden otomatik olarak mı yazdırılıyor?',
        'GS19', 'bileklik, otomatik, yazdırma', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcılar kendi şifreleri ile sisteme giriş yapıyor mu?',
        'GS20', 'kimlik doğrulama, şifre, kullanıcı', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Hemşireler sisteme düzenli olarak vital bulgu girişini yapıyor mu?',
        'GS21', 'vital, hemşire, giriş', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Hasta izlem planları sistem üzerinden şablonlaştırılmış olarak kaydediliyor mu?',
        'GS22', 'izlem planı, şablon, hasta', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Doktorlar tedavi planlarını sistem üzerinden dijital olarak oluşturabiliyor mu?',
         'GS23', 'tedavi planı, dijital, oluşturma', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik izlem planları hastaya özgü olacak şekilde sistemde tanımlanabiliyor mu?',
         'GS24', 'izlem planı, hasta, tanımlama', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Tedavi sürecindeki değişiklikler doğrudan sistem üzerinde güncelleniyor mu?',
         'GS25', 'tedavi süreci, güncelleme, sistem', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcılar sistemden gelen hatırlatma ve uyarıları dikkate alıyor mu?',
         'GS26', 'hatırlatma, uyarı, dikkate alma', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Bildirim sistemleri (ör. ilaç zamanı uyarısı) kullanıcılar tarafından kapatılabiliyor mu?',
         'GS27', 'bildirim, uyarı, kapatma', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik karar destek sistemi kullanılıyor mu?',
         'GS28', 'karar destek, sistem, kullanım', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Sistem, reçetelenen ilaçlarla hastanın mevcut ilaçları arasında etkileşim kontrolü yapıyor mu?',
         'GS29', 'ilaç etkileşim, kontrol, reçete', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcılar sistemde çıkan uyarılar nedeniyle tedavi planlarını değiştirdi mi?',
         'GS30', 'uyarı, tedavi planı, değişiklik', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Görüntüleme sonuçları PACS gibi sistemlerden otomatik olarak klinik bilgi sistemine aktarılıyor mu?',
         'GS31', 'görüntüleme, PACS, aktarım', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Tüm görüntüleme sonuçlarına klinik sistem üzerinden kolayca erişilebiliyor mu?',
         'GS32', 'görüntüleme, erişim, kolaylık', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Doktorlar görüntüleme sonuçlarını sistem içinden görüntüleyebiliyor mu?',
         'GS33', 'görüntüleme, doktor, erişim', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Yatan hastalarda günlük vizit notları doğrudan sisteme mi yazılıyor?',
         'GS34', 'vizit notu, günlük, sistem', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Vizit notları yapılandırılmış alanlar ile mi dolduruluyor?',
         'GS35', 'vizit notu, yapılandırılmış, alan', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Hemşire gözlemleri belirli şablonlar üzerinden mi giriliyor?',
         'GS36', 'hemşire, gözlem, şablon', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Serbest metin kullanımı dışında sistemde belirlenmiş seçenekler kullanılabiliyor mu?',
         'GS37', 'serbest metin, seçenek, kullanım', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Veri giriş ekranlarında yapılandırılmış alanlar yeterli düzeyde sunuluyor mu?',
         'GS38', 'veri girişi, yapılandırılmış, ekran', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Sistem kullanıcı rolleri doğrultusunda yetki sınırlaması uyguluyor mu?',
         'GS39', 'yetki, rol, sınırlama', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcıların sistemdeki yetkileri rollerine göre otomatik tanımlanıyor mu?',
         'GS40', 'yetki, otomatik, tanımlama', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Kullanıcılar yalnızca kendi yetkileri dahilinde veri girişi yapabiliyor mu?',
         'GS41', 'veri girişi, yetki, kısıtlama', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Laboratuvar sonuçları doğrudan hastanın sistem dosyasına otomatik düşüyor mu?',
         'GS42', 'laboratuvar, sonuç, otomatik', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcılar laboratuvar sonuçlarını sistem içinden görüntüleyebiliyor mu?',
         'GS43', 'laboratuvar, sonuç, görüntüleme', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Konsültasyon talepleri sistem üzerinden gönderilip takip edilebiliyor mu?',
         'GS44', 'konsültasyon, talep, takip', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Konsültasyon kayıtları hasta dosyasına sistem tarafından otomatik bağlanıyor mu?',
         'GS45', 'konsültasyon, kayıt, otomatik', NULL, NULL, 'Türkçe', 1),

(NULL, 'Klinik kullanıcılar sistem üzerinden eğitim modüllerine erişebiliyor mu?',
         'GS46', 'eğitim, modül, erişim', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik bilgi sistemine dair eğitimler kurumsal olarak planlı şekilde veriliyor mu?',
         'GS47', 'eğitim, kurumsal, planlı', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Yeni başlayan sağlık personeline sistem kullanımı eğitimi zorunlu mu?',
         'GS48', 'eğitim, zorunlu, yeni personel', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Kullanıcılar sistemde karşılaştıkları sorunları dijital olarak bildirebiliyor mu?',
         'GS49', 'sorun, bildirim, dijital', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik sistemle ilgili hata ya da öneri bildirimleri elektronik ortamda alınıyor mu?',
         'GS50', 'hata, öneri, bildirim, elektronik', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Bildirilen hatalar sistematik olarak değerlendirilip kayıt altına alınıyor mu?',
         'GS51', 'hata, değerlendirme, kayıt', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Kullanıcı geri bildirimlerine dayanarak sistem güncellemeleri yapılıyor mu?',
         'GS52', 'geri bildirim, güncelleme, sistem', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcı memnuniyeti düzenli anketlerle ölçülüyor mu?',
         'GS53', 'memnuniyet, anket, ölçüm', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Sistem memnuniyeti analiz raporları yönetimle paylaşılıyor mu?',
         'GS54', 'memnuniyet, rapor, yönetim', NULL, NULL, 'Türkçe', 1),

 (NULL, 'İlaç doz hatalarına karşı sistemde uyarı algoritmaları mevcut mu?',
         'GS55', 'doz hatası, uyarı, algoritma', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Kullanıcılar ilaç order’ı verirken sistemden doz sınırı uyarısı alabiliyor mu?',
         'GS56', 'doz sınırı, uyarı, order', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Sistemde yaşa, kiloya veya klinik protokole göre doz önerileri çıkıyor mu?',
         'GS57', 'doz önerisi, yaş, kilo, protokol', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik kullanıcılar mobil cihazlar üzerinden hasta bilgilerine erişebiliyor mu?',
         'GS58', 'mobil, erişim, hasta bilgisi', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Mobil uygulama üzerinden hasta takibi ve veri girişi yapılabiliyor mu?',
         'GS59', 'mobil uygulama, takip, veri girişi', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Mobil sistemlerde de kimlik doğrulama güvenli şekilde uygulanıyor mu?',
         'GS60', 'mobil, kimlik doğrulama, güvenlik', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Klinik sistemlere erişimde iki faktörlü kimlik doğrulama zorunlu mu?',
         'GS61', 'iki faktörlü, kimlik doğrulama, zorunlu', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Kullanıcıların sisteme giriş işlemleri loglanıyor mu?',
         'GS62', 'giriş, işlem, loglama', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Çıkış özeti (epikriz) sistem üzerinden standart şablonla hazırlanıyor mu?',
         'GS63', 'epikriz, şablon, hazırlama', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Epikriz içeriği zorunlu alanlar ile yapılandırılmış şekilde giriliyor mu?',
         'GS64', 'epikriz, zorunlu alan, yapılandırılmış', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Yoğun bakım hastalarına özel veri giriş alanları sistemde mevcut mu?',
         'GS65', 'yoğun bakım, veri girişi, özel alan', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Vital bulgular hemşireler tarafından mobil cihazlarla anlık girilebiliyor mu?',
         'GS66', 'vital bulgu, mobil, anlık giriş', NULL, NULL, 'Türkçe', 1),

 (NULL, 'Hasta skorlamaları sistem tarafından otomatik hesaplanabiliyor mu?',
         'GS67', 'hasta skorlama, otomatik, hesaplama', NULL, NULL, 'Türkçe', 1)

ON CONFLICT DO NOTHING;   -- idempotent


/* ============================================================
   GÖSTERGE ÇEVİRİLERİ  (EN · ES · AR)
   ============================================================ */

WITH tr AS (
  /* Türkçe kök satırları alias ile çekiyoruz */
  SELECT gosterge_id, gosterge_allias
  FROM   gostergeler
  WHERE  dil_adi = 'Türkçe'
)

/* ------------------------------------------------------------
   ÇEVİRİ EKLE
   ------------------------------------------------------------ */
INSERT INTO gostergeler (
    ust_gosterge_id,         -- Türkçe satırın ID’si
    gosterge_adi,            -- Çeviri metni
    gosterge_allias,         -- Alias aynen
    gosterge_etiketleri,     -- Etiketleri TR’den kopyalayabiliriz
    dil_adi,
    aktif
)
SELECT
    tr.gosterge_id,          -- dil bağı
    cv.lang_adi,
    tr.gosterge_allias,
    NULL,                    -- (İstersen tr’den kopya için JOIN yap)
    cv.dil,
    1
FROM tr
JOIN LATERAL (
  /* ============== ÇEVİRİ SÖZLÜĞÜ ===========================
     alias , dil      , çeviri
     ---------------------------------------------------------*/
  VALUES
    -- GS01
    ('GS01','English','Is the electronic health record (EHR) system used routinely for all patients in the clinic?'),
    ('GS01','Español','¿Se utiliza de forma rutinaria el sistema de historia clínica electrónica (HCE) para todos los pacientes de la clínica?'),
    ('GS01','Arabic' ,'هل يُستخدم نظام السجل الطبي الإلكتروني ‎(EHR)‎ بشكل منتظم لجميع المرضى في العيادة؟'),

    -- GS02
    ('GS02','English','Do more than 95% of clinical users enter patient data through the system?'),
    ('GS02','Español','¿Más del 95 % de los usuarios clínicos introduce los datos del paciente a través del sistema?'),
    ('GS02','Arabic' ,'هل يُدخل أكثر من ‎95‎٪ من المستخدمين السريريين بيانات المريض عبر النظام؟'),

    -- GS03
    ('GS03','English','Are paper or manual records still kept outside the electronic system?'),
    ('GS03','Español','¿Se mantienen todavía registros en papel o manuales fuera del sistema electrónico?'),
    ('GS03','Arabic' ,'هل لا تزال توجد سجلات يدوية أو ورقية خارج النظام الإلكتروني؟'),

    -- GS04
    ('GS04','English','Is patient identity verified with a barcode before medication administration?'),
    ('GS04','Español','¿Se verifica la identidad del paciente con un código de barras antes de la administración de medicamentos?'),
    ('GS04','Arabic' ,'هل يتم التحقق من هوية المريض باستخدام الباركود قبل إعطاء الدواء؟'),

    -- GS05
    ('GS05','English','Do nurses receive automatic alerts from the system when administering medication?'),
    ('GS05','Español','¿Reciben las enfermeras alertas automáticas del sistema al administrar medicamentos?'),
    ('GS05','Arabic' ,'هل يتلقى الممرضون تنبيهات تلقائية من النظام عند إعطاء الأدوية؟'),

    -- GS06
    ('GS06','English','Is the barcode system''s mis-read rate monitored?'),
    ('GS06','Español','¿Se supervisa la tasa de lecturas erróneas del sistema de códigos de barras?'),
    ('GS06','Arabic' ,'هل تتم مراقبة معدل قراءات الباركود الخاطئة؟'),

    -- GS07
    ('GS07','English','Can clinical staff administer medication without scanning the barcode?'),
    ('GS07','Español','¿Puede el personal clínico administrar medicamentos sin escanear el código de barras?'),
    ('GS07','Arabic' ,'هل يمكن للطاقم السريري إعطاء الدواء من دون مسح الباركود؟'),

    -- GS08
    ('GS08','English','Has barcode scanning been made mandatory in the electronic system?'),
    ('GS08','Español','¿Se ha hecho obligatorio el escaneo de códigos de barras en el sistema electrónico?'),
    ('GS08','Arabic' ,'هل أصبح مسح الباركود إلزاميًا في النظام الإلكتروني؟'),

    -- GS09
    ('GS09','English','Are clinical notes generally entered as free text or using structured fields?'),
    ('GS09','Español','¿Las notas clínicas se introducen generalmente como texto libre o mediante campos estructurados?'),
    ('GS09','Arabic' ,'هل تُدخل الملاحظات السريرية عادة كنص حر أم عبر حقول مُهيكلة؟'),

    -- GS10
    ('GS10','English','Are structured data elements (e.g., templates, pick-lists) used regularly?'),
    ('GS10','Español','¿Se utilizan regularmente los elementos de datos estructurados (p. ej., plantillas, listas desplegables)?'),
    ('GS10','Arabic' ,'هل تُستخدم بانتظام حقول البيانات المُهيكلة (مثل القوالب وقوائم الاختيار)؟'),

    -- GS11
    ('GS11','English','Do physicians use the CPOE system when prescribing, or is there manual entry?'),
    ('GS11','Español','¿Los médicos utilizan el sistema CPOE al prescribir o existe entrada manual?'),
    ('GS11','Arabic' ,'هل يستخدم الأطباء نظام CPOE عند وصف الدواء أم توجد إدخالات يدوية؟'),

    -- GS12
    ('GS12','English','Do physicians provide feedback when they receive alerts on system orders?'),
    ('GS12','Español','¿Los médicos proporcionan retroalimentación cuando reciben alertas en las órdenes del sistema?'),
    ('GS12','Arabic' ,'هل يقدم الأطباء ملاحظات عند تلقيهم تنبيهات على الأوامر في النظام؟'),

    -- GS13
    ('GS13','English','Does the system display drug-interaction alerts while the physician is ordering?'),
    ('GS13','Español','¿El sistema muestra alertas de interacción medicamentosa mientras el médico ingresa la orden?'),
    ('GS13','Arabic' ,'هل يعرض النظام تنبيهات تداخل الأدوية أثناء إدخال الطبيب للطلب؟'),

    -- GS14
    ('GS14','English','Is the ‘‘right patient / right procedure’’ check performed before procedures?'),
    ('GS14','Español','¿Se realiza la verificación de ''paciente correcto / procedimiento correcto'' antes de los procedimientos?'),
    ('GS14','Arabic' ,'هل يتم إجراء فحص "المريض الصحيح / الإجراء الصحيح" قبل الإجراءات؟'),

    -- GS15
    ('GS15','English','Can a procedure start without the time-out checklist being confirmed in the system?'),
    ('GS15','Español','¿Puede iniciarse un procedimiento sin que se marque la lista de verificación de time-out en el sistema?'),
    ('GS15','Arabic' ,'هل يمكن بدء الإجراء من دون تأكيد قائمة التحقق time-out في النظام؟'),

    -- GS16
    ('GS16','English','Can time-out records be audited retrospectively by the system?'),
    ('GS16','Español','¿Puede el sistema auditar retrospectivamente los registros de time-out?'),
    ('GS16','Arabic' ,'هل يستطيع النظام تدقيق سجلات time-out بأثر رجعي؟'),

    -- GS17
    ('GS17','English','On average, how long do clinical users take to complete patient registration?'),
    ('GS17','Español','¿Cuánto tiempo tardan en promedio los usuarios clínicos en completar el registro del paciente?'),
    ('GS17','Arabic' ,'ما متوسط الوقت الذي يستغرقه المستخدمون السريريين لإتمام تسجيل المريض؟'),

    -- GS18
    ('GS18','English','Does clinical staff enter patient information at least once per shift?'),
    ('GS18','Español','¿El personal clínico introduce información del paciente al menos una vez por turno?'),
    ('GS18','Arabic' ,'هل يقوم الطاقم السريري بإدخال معلومات المريض مرة واحدة على الأقل في كل نوبة؟'),

    -- GS19
    ('GS19','English','Are patient wristbands printed automatically from the system?'),
    ('GS19','Español','¿Las pulseras de identificación del paciente se imprimen automáticamente desde el sistema?'),
    ('GS19','Arabic' ,'هل تُطبع أساور تعريف المريض تلقائيًا من النظام؟'),

    -- GS20
    ('GS20','English','Do clinical users log in to the system with their own passwords?'),
    ('GS20','Español','¿Los usuarios clínicos acceden al sistema con sus propias contraseñas?'),
    ('GS20','Arabic' ,'هل يسجل المستخدمون السريريين الدخول بكلمات المرور الخاصة بهم؟'),

    -- GS21
    ('GS21','English','Do nurses regularly enter vital signs into the system?'),
    ('GS21','Español','¿Las enfermeras registran regularmente los signos vitales en el sistema?'),
    ('GS21','Arabic' ,'هل تقوم الممرضات بإدخال العلامات الحيوية بانتظام في النظام؟'),

    -- GS22
    ('GS22','English','Are patient care plans stored as templated records in the system?'),
    ('GS22','Español','¿Los planes de seguimiento del paciente se guardan como registros con plantillas en el sistema?'),
    ('GS22','Arabic' ,'هل يتم حفظ خطط متابعة المريض كقوالب في النظام؟'),

    -- GS23
    ('GS23', 'English', 'Can physicians digitally create treatment plans through the system?'),
    ('GS23', 'Español', '¿Pueden los médicos crear planes de tratamiento digitalmente a través del sistema?'),
    ('GS23', 'Arabic', 'هل يستطيع الأطباء إنشاء خطط علاج رقميًا عبر النظام؟'),

    -- GS24
    ('GS24', 'English', 'Can clinical monitoring plans be defined in the system to be patient-specific?'),
    ('GS24', 'Español', '¿Se pueden definir los planes de seguimiento clínico en el sistema para que sean específicos del paciente?'),
    ('GS24', 'Arabic', 'هل يمكن تعريف خطط المراقبة السريرية في النظام لتكون خاصة بالمريض؟'),

    -- GS25
    ('GS25', 'English', 'Are changes in the treatment process updated directly within the system?'),
    ('GS25', 'Español', '¿Se actualizan directamente en el sistema los cambios en el proceso de tratamiento?'),
    ('GS25', 'Arabic', 'هل يتم تحديث التغييرات في عملية العلاج مباشرة داخل النظام؟'),

    -- GS26
    ('GS26', 'English', 'Do clinical users take into account reminders and alerts from the system?'),
    ('GS26', 'Español', '¿Tienen en cuenta los usuarios clínicos los recordatorios y alertas del sistema?'),
    ('GS26', 'Arabic', 'هل يأخذ المستخدمون السريريون التذكيرات والتنبيهات من النظام في الاعتبار؟'),

    -- GS27
    ('GS27', 'English', 'Can notification systems (e.g., medication time alerts) be turned off by users?'),
    ('GS27', 'Español', '¿Pueden los usuarios desactivar los sistemas de notificación (por ejemplo, alertas de horario de medicación)?'),
    ('GS27', 'Arabic', 'هل يمكن للمستخدمين إيقاف تشغيل أنظمة الإشعارات (مثل تنبيهات وقت الدواء)؟'),

    -- GS28
    ('GS28', 'English', 'Is a clinical decision support system used?'),
    ('GS28', 'Español', '¿Se utiliza un sistema de apoyo a la toma de decisiones clínicas?'),
    ('GS28', 'Arabic', 'هل يتم استخدام نظام دعم القرار السريري؟'),

    -- GS29
    ('GS29', 'English', 'Does the system check for interactions between prescribed medications and the patient''s current medications?'),
    ('GS29', 'Español', '¿El sistema verifica las interacciones entre los medicamentos recetados y los medicamentos actuales del paciente?'),
    ('GS29', 'Arabic', 'هل يتحقق النظام من التفاعلات بين الأدوية الموصوفة والأدوية الحالية للمريض؟'),

    -- GS30
    ('GS30', 'English', 'Have clinical users changed their treatment plans due to alerts from the system?'),
    ('GS30', 'Español', '¿Los usuarios clínicos han cambiado sus planes de tratamiento debido a las alertas del sistema?'),
    ('GS30', 'Arabic', 'هل قام المستخدمون السريريون بتغيير خطط العلاج الخاصة بهم بسبب التنبيهات من النظام؟'),

    -- GS31
    ('GS31', 'English', 'Are imaging results automatically transferred from systems like PACS to the clinical information system?'),
    ('GS31', 'Español', '¿Se transfieren automáticamente los resultados de imágenes de sistemas como PACS al sistema de información clínica?'),
    ('GS31', 'Arabic', 'هل يتم نقل نتائج التصوير تلقائيًا من أنظمة مثل PACS إلى نظام المعلومات السريرية؟'),

    -- GS32
    ('GS32', 'English', 'Are all imaging results easily accessible through the clinical system?'),
    ('GS32', 'Español', '¿Se puede acceder fácilmente a todos los resultados de imágenes a través del sistema clínico?'),
    ('GS32', 'Arabic', 'هل يمكن الوصول بسهولة إلى جميع نتائج التصوير من خلال النظام السريري؟'),

    -- GS33
    ('GS33', 'English', 'Can physicians view imaging results within the system?'),
    ('GS33', 'Español', '¿Pueden los médicos ver los resultados de las imágenes dentro del sistema?'),
    ('GS33', 'Arabic', 'هل يمكن للأطباء عرض نتائج التصوير من داخل النظام؟'),

    -- GS34
    ('GS34', 'English', 'Are daily visit notes for inpatients written directly into the system?'),
    ('GS34', 'Español', '¿Las notas de visita diarias para pacientes hospitalizados se escriben directamente en el sistema?'),
    ('GS34', 'Arabic', 'هل تُسجل ملاحظات الزيارة اليومية للمرضى المقيمين مباشرة في النظام؟'),

    -- GS35
    ('GS35', 'English', 'Are visit notes filled using structured fields?'),
    ('GS35', 'Español', '¿Las notas de visita se rellenan utilizando campos estructurados?'),
    ('GS35', 'Arabic', 'هل تُملأ ملاحظات الزيارة باستخدام حقول مُهيكلة؟'),

    -- GS36
    ('GS36', 'English', 'Are nursing observations entered through specific templates?'),
    ('GS36', 'Español', '¿Las observaciones de enfermería se introducen a través de plantillas específicas?'),
    ('GS36', 'Arabic', 'هل تُدخل ملاحظات التمريض عبر قوالب محددة؟'),

    -- GS37
    ('GS37', 'English', 'Can predefined options be used in the system, aside from free text entry?'),
    ('GS37', 'Español', '¿Se pueden utilizar opciones predefinidas en el sistema, además de la entrada de texto libre?'),
    ('GS37', 'Arabic', 'هل يمكن استخدام خيارات محددة في النظام، بخلاف إدخال النص الحر؟'),

    -- GS38
    ('GS38', 'English', 'Are structured fields sufficiently provided on data entry screens?'),
    ('GS38', 'Español', '¿Se proporcionan suficientes campos estructurados en las pantallas de entrada de datos?'),
    ('GS38', 'Arabic', 'هل يتم توفير حقول مُهيكلة بشكل كافٍ في شاشات إدخال البيانات؟'),

    -- GS39
    ('GS39', 'English', 'Does the system apply authorization restrictions based on user roles?'),
    ('GS39', 'Español', '¿El sistema aplica restricciones de autorización según los roles de usuario?'),
    ('GS39', 'Arabic', 'هل يطبق النظام قيود الصلاحيات بناءً على أدوار المستخدمين؟'),

    -- GS40
    ('GS40', 'English', 'Are clinical users'' system authorizations automatically defined according to their roles?'),
    ('GS40', 'Español', '¿Se definen automáticamente las autorizaciones del sistema para los usuarios clínicos según sus roles?'),
    ('GS40', 'Arabic', 'هل تُعرف صلاحيات مستخدمي النظام السريريين تلقائيًا وفقًا لأدوارهم؟'),

    -- GS41
    ('GS41', 'English', 'Can users only enter data within their authorized permissions?'),
    ('GS41', 'Español', '¿Pueden los usuarios ingresar datos solo dentro de sus permisos autorizados?'),
    ('GS41', 'Arabic', 'هل يمكن للمستخدمين إدخال البيانات ضمن صلاحياتهم المصرح بها فقط؟'),

    -- GS42
    ('GS42', 'English', 'Are laboratory results automatically entered directly into the patient''s system file?'),
    ('GS42', 'Español', '¿Los resultados de laboratorio se ingresan automáticamente directamente en el archivo del sistema del paciente?'),
    ('GS42', 'Arabic', 'هل تسجل نتائج المختبر تلقائيًا مباشرة في ملف المريض في النظام؟'),

    -- GS43
    ('GS43', 'English', 'Can clinical users view laboratory results within the system?'),
    ('GS43', 'Español', '¿Pueden los usuarios clínicos ver los resultados de laboratorio dentro del sistema?'),
    ('GS43', 'Arabic', 'هل يمكن للمستخدمين السريريين عرض نتائج المختبر من داخل النظام؟'),

    -- GS44
    ('GS44', 'English', 'Can consultation requests be sent and tracked through the system?'),
    ('GS44', 'Español', '¿Se pueden enviar y seguir las solicitudes de consulta a través del sistema?'),
    ('GS44', 'Arabic', 'هل يمكن إرسال طلبات الاستشارة وتتبعها عبر النظام؟'),

    -- GS45
    ('GS45', 'English', 'Are consultation records automatically linked to the patient file by the system?'),
    ('GS45', 'Español', '¿Los registros de consulta se vinculan automáticamente al archivo del paciente por el sistema?'),
    ('GS45', 'Arabic', 'هل يتم ربط سجلات الاستشارة تلقائيًا بملف المريض بواسطة النظام؟'),

    -- GS46
    ('GS46', 'English', 'Can clinical users access training modules through the system?'),
    ('GS46', 'Español', '¿Pueden los usuarios clínicos acceder a los módulos de capacitación a través del sistema?'),
    ('GS46', 'Arabic', 'هل يستطيع المستخدمون السريريون الوصول إلى وحدات التدريب عبر النظام؟'),

    -- GS47
    ('GS47', 'English', 'Are trainings related to the clinical information system provided institutionally and in a planned manner?'),
    ('GS47', 'Español', '¿Se ofrecen capacitaciones relacionadas con el sistema de información clínica de manera institucional y planificada?'),
    ('GS47', 'Arabic', 'هل يتم تقديم تدريبات متعلقة بنظام المعلومات السريرية بشكل مؤسسي ومخطط؟'),

    -- GS48
    ('GS48', 'English', 'Is system usage training mandatory for newly hired healthcare personnel?'),
    ('GS48', 'Español', '¿Es obligatorio el entrenamiento en el uso del sistema para el personal de salud recién incorporado?'),
    ('GS48', 'Arabic', 'هل التدريب على استخدام النظام إلزامي للموظفين الصحيين الجدد؟'),

    -- GS49
    ('GS49', 'English', 'Can users digitally report problems they encounter in the system?'),
    ('GS49', 'Español', '¿Pueden los usuarios reportar digitalmente los problemas que encuentran en el sistema?'),
    ('GS49', 'Arabic', 'هل يستطيع المستخدمون الإبلاغ رقميًا عن المشاكل التي يواجهونها في النظام؟'),

    -- GS50
    ('GS50', 'English', 'Are error or suggestion notifications related to the clinical system received electronically?'),
    ('GS50', 'Español', '¿Se reciben electrónicamente las notificaciones de errores o sugerencias relacionadas con el sistema clínico?'),
    ('GS50', 'Arabic', 'هل يتم تلقي إشعارات الأخطاء أو الاقتراحات المتعلقة بالنظام السريري إلكترونيًا؟'),

	-- GS51
    ('GS51', 'English', 'Are reported errors systematically evaluated and recorded?'),
    ('GS51', 'Español', '¿Se evalúan y registran sistemáticamente los errores reportados?'),
    ('GS51', 'Arabic', 'هل يتم تقييم الأخطاء المبلغ عنها وتسجيلها بشكل منهجي؟'),

    -- GS52
    ('GS52', 'English', 'Are system updates made based on user feedback?'),
    ('GS52', 'Español', '¿Se realizan actualizaciones del sistema basadas en los comentarios de los usuarios?'),
    ('GS52', 'Arabic', 'هل يتم تحديث النظام بناءً على ملاحظات المستخدمين؟'),

    -- GS53
    ('GS53', 'English', 'Is clinical user satisfaction measured with regular surveys?'),
    ('GS53', 'Español', '¿Se mide la satisfacción del usuario clínico con encuestas regulares?'),
    ('GS53', 'Arabic', 'هل يتم قياس رضا المستخدمين السريريين من خلال استبيانات منتظمة؟'),

    -- GS54
    ('GS54', 'English', 'Are system satisfaction analysis reports shared with management?'),
    ('GS54', 'Español', '¿Se comparten los informes de análisis de satisfacción del sistema con la dirección?'),
    ('GS54', 'Arabic', 'هل تتم مشاركة تقارير تحليل رضا النظام مع الإدارة؟'),

    -- GS55
    ('GS55', 'English', 'Are there warning algorithms in the system against medication dosage errors?'),
    ('GS55', 'Español', '¿Existen algoritmos de advertencia en el sistema contra errores en la dosificación de medicamentos?'),
    ('GS55', 'Arabic', 'هل توجد خوارزميات تحذير في النظام ضد أخطاء جرعات الأدوية؟'),

    -- GS56
    ('GS56', 'English', 'Can users receive dosage limit warnings from the system when ordering medication?'),
    ('GS56', 'Español', '¿Pueden los usuarios recibir advertencias de límite de dosis del sistema al solicitar medicamentos?'),
    ('GS56', 'Arabic', 'هل يمكن للمستخدمين تلقي تنبيهات حدود الجرعات من النظام عند طلب الأدوية؟'),

    -- GS57
    ('GS57', 'English', 'Does the system provide dosage recommendations based on age, weight, or clinical protocol?'),
    ('GS57', 'Español', '¿El sistema proporciona recomendaciones de dosis basadas en la edad, el peso o el protocolo clínico?'),
    ('GS57', 'Arabic', 'هل يقدم النظام توصيات للجرعات بناءً على العمر، الوزن أو البروتوكول السريري؟'),

    -- GS58
    ('GS58', 'English', 'Can clinical users access patient information via mobile devices?'),
    ('GS58', 'Español', '¿Pueden los usuarios clínicos acceder a la información del paciente a través de dispositivos móviles?'),
    ('GS58', 'Arabic', 'هل يستطيع المستخدمون السريريون الوصول إلى معلومات المريض عبر الأجهزة المحمولة؟'),

    -- GS59
    ('GS59', 'English', 'Can patient tracking and data entry be done via the mobile application?'),
    ('GS59', 'Español', '¿Se puede realizar el seguimiento de pacientes y la entrada de datos a través de la aplicación móvil?'),
    ('GS59', 'Arabic', 'هل يمكن تتبع المرضى وإدخال البيانات عبر تطبيق الجوال؟'),

    -- GS60
    ('GS60', 'English', 'Is identity verification securely implemented in mobile systems as well?'),
    ('GS60', 'Español', '¿Se implementa la verificación de identidad de forma segura también en los sistemas móviles?'),
    ('GS60', 'Arabic', 'هل يتم تطبيق التحقق من الهوية بشكل آمن في الأنظمة المحمولة أيضًا؟'),

    -- GS61
    ('GS61', 'English', 'Is two-factor authentication mandatory for accessing clinical systems?'),
    ('GS61', 'Español', '¿Es obligatoria la autenticación de dos factores para acceder a los sistemas clínicos?'),
    ('GS61', 'Arabic', 'هل المصادقة الثنائية إلزامية للوصول إلى الأنظمة السريرية؟'),

    -- GS62
    ('GS62', 'English', 'Are user login activities to the system logged?'),
    ('GS62', 'Español', '¿Se registran las actividades de inicio de sesión de los usuarios en el sistema?'),
    ('GS62', 'Arabic', 'هل يتم تسجيل عمليات تسجيل دخول المستخدمين إلى النظام؟'),

    -- GS63
    ('GS63', 'English', 'Is the discharge summary (epicrisis) prepared using a standard template through the system?'),
    ('GS63', 'Español', '¿El resumen de alta (epicrisis) se prepara utilizando una plantilla estándar a través del sistema?'),
    ('GS63', 'Arabic', 'هل يتم إعداد ملخص الخروج (التقارير الطبية) عبر النظام باستخدام قالب قياسي؟'),

    -- GS64
    ('GS64', 'English', 'Is the epicrisis content entered in a structured way with mandatory fields?'),
    ('GS64', 'Español', '¿El contenido de la epicrisis se ingresa de forma estructurada con campos obligatorios?'),
    ('GS64', 'Arabic', 'هل يتم إدخال محتوى التقرير الطبي بشكل مهيكل مع حقول إلزامية؟'),

    -- GS65
    ('GS65', 'English', 'Are there specific data entry fields in the system for intensive care patients?'),
    ('GS65', 'Español', '¿Existen campos de entrada de datos específicos en el sistema para pacientes de cuidados intensivos?'),
    ('GS65', 'Arabic', 'هل توجد حقول إدخال بيانات خاصة بمرضى العناية المركزة في النظام؟'),

    -- GS66
    ('GS66', 'English', 'Can vital signs be entered instantly by nurses using mobile devices?'),
    ('GS66', 'Español', '¿Pueden las enfermeras ingresar los signos vitales al instante utilizando dispositivos móviles?'),
    ('GS66', 'Arabic', 'هل يمكن للممرضات إدخال العلامات الحيوية فورًا باستخدام الأجهزة المحمولة؟'),

    -- GS67
    ('GS67', 'English', 'Can patient scores be automatically calculated by the system?'),
    ('GS67', 'Español', '¿El sistema puede calcular automáticamente las puntuaciones de los pacientes?'),
    ('GS67', 'Arabic', 'هل يمكن للنظام حساب درجات المرضى تلقائيًا؟')
  /* ---------------------------------------------------------- */
) AS cv(alias, dil, lang_adi)
   ON cv.alias = tr.gosterge_allias
ON CONFLICT DO NOTHING;

/* ------------------------------------------------------------
   KONTROL: dil başına gösterge sayısı
   ------------------------------------------------------------ */
SELECT dil_adi, COUNT(*) AS gosterge_sayisi
FROM   gostergeler
GROUP  BY dil_adi
ORDER  BY dil_adi;


select * from gostergeler



/* ============================================================
   GÖSTERGE CEVAP ŞABLONLARI  –  TR kök  +  EN çeviri
   ============================================================ */

/* ------------------------------------------------------------
    1) TÜRKÇE KÖK ŞABLONLAR
    ------------------------------------------------------------ */
/* 1) Yardımcı CTE – cevap türü ID’lerini çeker (E/H = 1, Likert = 2 ...) */
WITH cvt AS (
    SELECT
        gosterge_cevap_turu_id,
        gosterge_cevap_turu
    FROM gosterge_cevap_turleri
),

tr AS (
    INSERT INTO gosterge_cevap_sablonlari (
        ust_gosterge_cevap_sablonu_id,    -- kök: NULL
        gosterge_cevap_turu_id,
        gosterge_cevap_sablon_adi,
        gosterge_cevap_adi,
        gosterge_cevap_puani,
        dil_adi
    )
    /* ---- İKİLİ CEVAP -----------------------------------------*/
    SELECT CAST(NULL AS INTEGER), -- Burası düzeltildi!
           (SELECT gosterge_cevap_turu_id FROM cvt WHERE gosterge_cevap_turu = 'Evet / Hayır'),
           'İkili Cevap',
           txt,
           puan,
           'Türkçe'
    FROM (VALUES ('Evet',100),('Hayır',0)) AS eh(txt,puan)

    UNION ALL
    /* ---- LİKERT 5’Lİ -----------------------------------------*/
    SELECT CAST(NULL AS INTEGER), -- Burası düzeltildi!
           (SELECT gosterge_cevap_turu_id FROM cvt WHERE gosterge_cevap_turu = 'Likert 5’li'),
           'Likert 5''li',
           txt,
           puan,
           'Türkçe'
    FROM (VALUES
             ('Kesinlikle Katılıyorum',100),
             ('Katılıyorum',75),
             ('Kararsızım',50),
             ('Katılmıyorum',25),
             ('Kesinlikle Katılmıyorum',0)
        ) AS lk(txt,puan)
    ON CONFLICT DO NOTHING
    RETURNING gosterge_cevap_sablonu_id, gosterge_cevap_sablon_adi,
              gosterge_cevap_adi, gosterge_cevap_puani, gosterge_cevap_turu_id
),

/* ------------------------------------------------------------
    2) İNGİLİZCE ÇEVİRİLER
    ------------------------------------------------------------ */
ins_translations AS (
    INSERT INTO gosterge_cevap_sablonlari (
        ust_gosterge_cevap_sablonu_id,
        gosterge_cevap_turu_id,
        gosterge_cevap_sablon_adi,
        gosterge_cevap_adi,
        gosterge_cevap_puani,
        dil_adi
    )
    SELECT
        tr.gosterge_cevap_sablonu_id,      -- dil bağı
        tr.gosterge_cevap_turu_id,
        CASE tr.gosterge_cevap_sablon_adi
            WHEN 'İkili Cevap'  THEN 'Two-Answer'
            WHEN 'Likert 5''li' THEN 'Likert-5'
        END                                         AS sablon_en,
        cv.en_txt                                   AS cevap_en,
        tr.gosterge_cevap_puani,
        'English'
    FROM tr
    JOIN LATERAL (
        VALUES
            ('Evet','Yes'),
            ('Hayır','No'),
            ('Kesinlikle Katılıyorum','Strongly Agree'),
            ('Katılıyorum','Agree'),
            ('Kararsızım','Neutral'),
            ('Katılmıyorum','Disagree'),
            ('Kesinlikle Katılmıyorum','Strongly Disagree')
    ) AS cv(tr_txt,en_txt)
        ON cv.tr_txt = tr.gosterge_cevap_adi

    UNION ALL

    SELECT
        tr.gosterge_cevap_sablonu_id,      -- dil bağı
        tr.gosterge_cevap_turu_id,
        CASE tr.gosterge_cevap_sablon_adi
            WHEN 'İkili Cevap'  THEN 'Respuesta Doble'
            WHEN 'Likert 5''li' THEN 'Likert-5'
        END                                         AS sablon_es,
        cv.es_txt                                   AS cevap_es,
        tr.gosterge_cevap_puani,
        'Español'
    FROM tr
    JOIN LATERAL (
        VALUES
            ('Evet','Sí'),
            ('Hayır','No'),
            ('Kesinlikle Katılıyorum','Totalmente de acuerdo'),
            ('Katılıyorum','De acuerdo'),
            ('Kararsızım','Neutral'),
            ('Katılmıyorum','En desacuerdo'),
            ('Kesinlikle Katılmıyorum','Totalmente en desacuerdo')
    ) AS cv(tr_txt,es_txt)
        ON cv.tr_txt = tr.gosterge_cevap_adi

    UNION ALL

    SELECT
        tr.gosterge_cevap_sablonu_id,      -- dil bağı
        tr.gosterge_cevap_turu_id,
        CASE tr.gosterge_cevap_sablon_adi
            WHEN 'İkili Cevap'  THEN 'إجابة ثنائية'
            WHEN 'Likert 5''li' THEN 'ليكرت-5'
        END                                         AS sablon_ar,
        cv.ar_txt                                   AS cevap_ar,
        tr.gosterge_cevap_puani,
        'Arabic'
    FROM tr
    JOIN LATERAL (
        VALUES
            ('Evet','نعم'),
            ('Hayır','لا'),
            ('Kesinlikle Katılıyorum','أتفق بشدة'),
            ('Katılıyorum','أتفق'),
            ('Kararsızım','محايد'),
            ('Katılmıyorum','لا أتفق'),
            ('Kesinlikle Katılmıyorum','لا أتفق بشدة')
    ) AS cv(tr_txt,ar_txt)
        ON cv.tr_txt = tr.gosterge_cevap_adi
    ON CONFLICT DO NOTHING
)

/* ------------------------------------------------------------
    3) KONTROL – Dil başına şablon sayısı
    ------------------------------------------------------------ */
SELECT dil_adi, COUNT(*) AS sablon_sayisi
FROM    gosterge_cevap_sablonlari
GROUP BY dil_adi
ORDER BY dil_adi;


