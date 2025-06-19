-- diller tablosu verileri

INSERT INTO diller (dil_adi) VALUES
('Türkçe'),
('English'),
('German'),
('French'),
('Spanish'),
('Arabic'),
('Russian');

SELECT * FROM diller;

-- ulkeler tablosu verileri

INSERT INTO ulkeler (ulke_adi) VALUES
('Türkiye'),
('United Kingdom'),
('Germany'),
('France'),
('Spain'),
('Egypt'),
('Russia');

select * from ulkeler;

-- sehirler tablosu verileri


INSERT INTO sehirler (ulke_id, sehir_adi, bolge_adi, nuts_adi) VALUES
(1, 'Ankara', 'İç Anadolu', 'TR51'),
(1, 'İstanbul', 'Marmara', 'TR10'),
(2, 'Berlin', NULL, 'DE30'),
(3, 'Paris', NULL, 'FR10');

select* from sehirler

-- sehir ülke tabloları join

SELECT
    s.sehir_id,
    s.sehir_adi,
    u.ulke_adi
FROM
    sehirler s
INNER JOIN
    ulkeler u ON s.ulke_id = u.ulke_id;

