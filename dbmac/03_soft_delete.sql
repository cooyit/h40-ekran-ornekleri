
/* Silme işlemleri için backend'de yapılacaklar:

| Yöntem / Yardımcı Kod         | Ne İşe Yarar?                                               |
| ----------------------------- | ----------------------------------------------------------- |
| `.RemoveRange()`              | Liste olarak tüm bağlı kayıtları siler                      |
| `TransactionScope`            | Hepsi silinirse kaydet → hata varsa hiçbirini kaydetme      |
| `Include()` + `ThenInclude()` | EF ile bağlı verileri beraber çekmek                        |
| `CascadeDeleteService`        | Ortak silme mantığı için sınıf yazabilirsin (zorunlu değil) |

*/

-- SOFT DELETE ALANLARINI EKLEMEK

-- ----------------------------------------------
-- diller tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE diller
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,   -- Yumuşak silme için işaret kolonu
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                      -- Silinme tarihi (nullable)

-- ----------------------------------------------
--  ulkeler tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE ulkeler
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN silinme_tarihi TIMESTAMPTZ;

-- ----------------------------------------------
--  sehirler tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE sehirler
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN silinme_tarihi TIMESTAMPTZ;

-- ----------------------------------------------
-- ulkeler_diller tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE ulkeler_diller
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,   -- Yumuşak silme için işaret kolonu
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                  -- Silinme tarihi (nullable)

-- ----------------------------------------------
-- model_turleri tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE model_turleri
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,    -- Yumuşak silme için işaret kolonu
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                   -- Silinme tarihi (nullable)


-- ----------------------------------------------
-- hastane_turleri tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE hastane_turleri
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN silinme_tarihi TIMESTAMPTZ;

-- ----------------------------------------------
-- kullanici_turleri tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE kullanici_turleri
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,       -- Yumuşak silme için işaret kolonu
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                      -- Silinme tarihi (nullable)

-- ----------------------------------------------
-- seviyeler tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE seviyeler
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN silinme_tarihi TIMESTAMPTZ;

-- ----------------------------------------------
-- modeller tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE modeller
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,     -- Yumuşak silme için işaret kolonu
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                    -- Silinme tarihi (nullable)


-- ----------------------------------------------
-- model_ulke tablosuna soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE model_ulke
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,   -- Yumuşak silme için işaret
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                  -- Silinme zamanı (nullable)

-- ----------------------------------------------
-- model_seviye tablosu soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE model_seviye
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,   -- Yumuşak silme için işaret
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                  -- Silinme zamanı (nullable)


-- ----------------------------------------------
-- model_hastane_turu tablosu soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE model_hastane_turu
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,   -- Yumuşak silme için işaret
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                  -- Silinme zamanı (nullable)


-- ----------------------------------------------
-- model_kullanici_kapsami tablosu soft delete alanları ekle
-- ----------------------------------------------
ALTER TABLE model_kullanici_kapsami
ADD COLUMN silindi_mi BOOLEAN NOT NULL DEFAULT FALSE,   -- Yumuşak silme için işaret
ADD COLUMN silinme_tarihi TIMESTAMPTZ;                  -- Silinme zamanı (nullable)






