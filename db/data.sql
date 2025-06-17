-- diller tablosuna veri ekle
INSERT INTO diller (dil_adi) VALUES 
('Türkçe'),
('English'),
('Español'),
('Arabic');


-- ulkeler tablosuna veri ekle
INSERT INTO ulkeler (ulke_adi) VALUES 
('Türkiye'),
('Amerika'),
('İspanya'),
('Suudi Arabistan');

-- sehirler tablosuna veri ekle
INSERT INTO sehirler (ulke_id, sehir_adi, bolge_adi, nuts_adi) VALUES 
(1, 'İstanbul', 'Marmara', 'TR10'),
(1, 'Ankara', 'İç Anadolu', 'TR51'),
(2, 'London', 'Greater London', 'UKI'),
(3, 'Madrid', 'Comunidad de Madrid', 'ES30'),
(4, 'Riyadh', 'Riyadh', 'SA10');

-- ulke_dil tablosuna veri ekle
INSERT INTO ulke_dil (ulke_id, dil_id, varsayilan) VALUES 
(1, 1, TRUE),     -- Türkiye → Türkçe
(2, 2, TRUE),     -- İngiltere → English
(3, 3, TRUE),     -- İspanya → Español
(1, 2, FALSE),    -- Türkiye → English (ikincil dil)
(4, 4, TRUE),     -- Suudi Arabistan → Arabic
(4, 2, FALSE);    -- Suudi Arabistan → English (ikincil dil)

-- model_turleri tablosuna veri ekle
INSERT INTO model_turleri (model_turu_adi) VALUES 
('Puan Esaslı'),
('Seviye Esaslı');

-- hastane_turleri tablosuna veri ekle

INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(NULL, 'Fizik Tedavi ve Rehabilitasyon Hastanesi', 'Türkçe'),
(NULL, 'Araştırma Hastanesi', 'Türkçe'),
(NULL, 'Ağız ve Diş Sağlığı Merkezi', 'Türkçe'),
(NULL, 'Göz Hastanesi', 'Türkçe'),
(NULL, 'Kadın Doğum Hastanesi', 'Türkçe');

INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(1, 'Physical Therapy and Rehabilitation Hospital', 'English'),
(2, 'Research Hospital', 'English'),
(3, 'Oral and Dental Health Center', 'English'),
(4, 'Eye Hospital', 'English'),
(5, 'Maternity Hospital', 'English');

-- Arabic (çeviriler)
INSERT INTO hastane_turleri (ust_hastane_turu_id, hastane_turu_adi, dil_adi) VALUES
(1, 'مستشفى العلاج الطبيعي وإعادة التأهيل', 'Arabic'),
(2, 'مستشفى البحوث', 'Arabic'),
(3, 'مركز صحة الفم والأسنان', 'Arabic'),
(4, 'مستشفى العيون', 'Arabic'),
(5, 'مستشفى الولادة', 'Arabic');

-- kullanici_turleri tablosuna veri ekle
-- Türkçe
INSERT INTO kullanici_turleri (ust_kullanici_turu_id, kullanici_turu_adi, aciklama, dil_adi) VALUES
(NULL, 'İdari Personel', 'İdari süreçleri yöneten personel', 'Türkçe'),
(NULL, 'Teknik Personel', 'Teknik destek ve sistem yönetimi', 'Türkçe'),
(NULL, 'Tıbbi Personel', 'Sağlık hizmeti sunan personel', 'Türkçe'),
(NULL, 'Genel', 'Genel amaçlı kullanıcı türü', 'Türkçe');

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


-- seviyeler tablosuna veri ekle
-- Türkçe (üst seviye NULL olacak)
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

-- İngilizce (ust_seviye_id Türkçe olanlarla eşleşecek: 1–10)
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

-- İspanyolca
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

-- Arapça
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


