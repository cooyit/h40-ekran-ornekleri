/*                  VIEWS                      */

/* ------------------------------------------------
-- Bu dosya icerisinde calismalar devam ediyor.
-- Ilgili yapilarla ilgili gelistirmeler surmektedir.
-- Icerik, proje ilerledikce guncellenecektir.
------------------------------------------------ */

CREATE OR REPLACE VIEW vw_eslesme_ozet_default_dil AS
SELECT
    e.eslesme_id,

    m.model_id,
    m.model_adi,
    m.dil_adi AS model_dili,
    m.aktif AS model_durumu,

    b.boyut_id,
    b.boyut_adi,
    b.dil_adi AS boyut_dili,
    b.aktif AS boyut_durumu,

    k.kriter_id,
    k.kriter_adi,
    k.dil_adi AS kriter_dili,
    k.aktif AS kriter_durumu,

    g.gosterge_id,
    g.gosterge_adi,
    g.dil_adi AS gosterge_dili,
    g.aktif AS gosterge_durumu,

    s.seviye_id,
    s.seviye_adi,
    s.dil_adi AS seviye_dili,
    s.aktif AS seviye_durumu

FROM eslesmeler e

JOIN modeller m ON e.model_id = m.model_id AND m.dil_adi = 'tr'
JOIN boyutlar b ON e.boyut_id = b.boyut_id AND b.dil_adi = 'tr'
JOIN kriterler k ON e.kriter_id = k.kriter_id AND k.dil_adi = 'tr'
JOIN gostergeler g ON e.gosterge_id = g.gosterge_id AND g.dil_adi = 'tr'
LEFT JOIN seviyeler s ON e.seviye_id = s.seviye_id AND s.dil_adi = 'tr';