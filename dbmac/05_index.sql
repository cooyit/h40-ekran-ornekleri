-- INDEX ALANLARI EKLEMEK

-- ----------------------------------------------
-- Bu indeks, aktif (silinmemiş) şehirlerin belirli bir ülkeye göre sorgulanmasını hızlandırmak için tanımlanır.
-- Özellikle "silindi_mi = FALSE AND ulke_id = ?" filtreli sorgularda performans kazancı sağlar.
-- Partial index olduğu için yalnızca aktif verileri kapsar ve disk alanı/işlem yükü açısından daha verimlidir.
-- Not: Şehir tablosu büyükse (örneğin > 5.000 kayıt) ve bu tür filtreli sorgular sık kullanılıyorsa eklenmesi önerilir.

-- CREATE INDEX idx_sehirler_ulke_aktif
-- ON sehirler(ulke_id)
-- WHERE silindi_mi = FALSE;
-- ----------------------------------------------


----------------------------------------------
-- Recursive yapılar için indeks önerisi:
-- CREATE INDEX idx_hastane_turleri_dil_adi
-- ON hastane_turleri(dil_adi)
-- WHERE silindi_mi = FALSE;

-- Not: 5+ dilde filtre yapılacaksa veya admin panelde dil geçişi sık kullanılıyorsa bu index performans sağlar.