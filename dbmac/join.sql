model ve model turu

SELECT 
    m.model_id,
    m.model_resmi_adi AS "Model Adı",
    m.dil_adi AS "Dili",
    m.kullanici_kapsami AS "Kullanıcı Kapsamı",
    CASE 
        WHEN m.aktif = 0 THEN 'Pasif'
        WHEN m.aktif = 1 THEN 'Aktif'
        WHEN m.aktif = 2 THEN 'Taslak'
        ELSE 'Bilinmiyor'
    END AS "Durum",
    mt.model_turu_adi AS "Türü"
FROM 
    modeller m
JOIN 
    model_turleri mt ON m.model_turu_id = mt.model_turu_id
WHERE
	m.aktif = 1
ORDER BY 
    m.model_id;



model ve ulke 

SELECT 
    m.model_id,
    m.model_resmi_adi AS "Model Adı",
    m.dil_adi AS "Dili",
    m.kullanici_kapsami AS "Kullanıcı Kapsamı",
    CASE 
        WHEN m.aktif = 0 THEN 'Pasif'
        WHEN m.aktif = 1 THEN 'Aktif'
        WHEN m.aktif = 2 THEN 'Taslak'
        ELSE 'Bilinmiyor'
    END AS "Durum",
    u.ulke_adi AS "Ülke"
FROM 
    modeller m
JOIN 
    model_ulke mu ON m.model_id = mu.model_id
JOIN 
    ulkeler u ON mu.ulke_id = u.ulke_id
WHERE
    m.aktif = 1
ORDER BY 
    m.model_id;


model ve seviye

SELECT 
    m.model_id,
    m.model_resmi_adi AS "Model Adı",
    m.dil_adi AS "Dili",
    m.kullanici_kapsami AS "Kullanıcı Kapsamı",
    CASE 
        WHEN m.aktif = 0 THEN 'Pasif'
        WHEN m.aktif = 1 THEN 'Aktif'
        WHEN m.aktif = 2 THEN 'Taslak'
        ELSE 'Bilinmiyor'  
    END AS "Durum",
    s.seviye_adi AS "Seviye"
FROM 
    modeller m
JOIN 
    model_seviye ms ON m.model_id = ms.model_id
JOIN 
    seviyeler s ON ms.seviye_id = s.seviye_id
WHERE
    m.aktif = 1
ORDER BY 
    m.model_id;


model ve hastane turu

SELECT 
    m.model_id,
    m.model_resmi_adi AS "Model Adı",
    m.dil_adi AS "Dili",
    m.kullanici_kapsami AS "Kullanıcı Kapsamı",
    CASE 
        WHEN m.aktif = 0 THEN 'Pasif'
        WHEN m.aktif = 1 THEN 'Aktif'
        WHEN m.aktif = 2 THEN 'Taslak'
        ELSE 'Bilinmiyor'  
    END AS "Durum",
    ht.hastane_turu_adi AS "Hastane Türü"
FROM 
    modeller m
JOIN 
    model_hastane_turu mht ON m.model_id = mht.model_id
JOIN 
    hastane_turleri ht ON mht.hastane_turu_id = ht.hastane_turu_id
WHERE
    m.aktif = 1
ORDER BY 
    m.model_id;

--------------------------------
--------------------------------
--------------------------------



ulke ve sehirler

SELECT 
    u.ulke_adi AS "Ülke",
    s.sehir_adi AS "Şehir"
FROM 
    ulkeler u
JOIN 
    sehirler s ON u.ulke_id = s.ulke_id


ulkeler ve diller

SELECT 
    u.ulke_adi AS "Ülke",
    d.dil_adi AS "Dil",
    CASE 
        WHEN ud.varsayilan = FALSE THEN 'Hayır'
        WHEN ud.varsayilan = TRUE THEN 'Evet'
        ELSE 'Bilinmiyor'
    END AS "Varsayılan dil mi?"
FROM 
    ulke_dil ud
JOIN 
    ulkeler u ON u.ulke_id = ud.ulke_id
JOIN 
    diller d ON d.dil_id = ud.dil_id
ORDER BY 
    u.ulke_adi, ud.varsayilan DESC;



model ulke dil 

SELECT 
    m.model_resmi_adi AS "Model Adı",
    m.dil_adi AS "Model Dili",
    u.ulke_adi AS "Ülke",
    mu.dil_adi AS "Ülkedeki Dil",
    mu.aktif AS "Aktif mi?",
    mu.devreye_alma_tarihi AS "Devreye Alındı"
FROM 
    model_ulke mu
JOIN 
    modeller m ON m.model_id = mu.model_id
JOIN 
    ulkeler u ON u.ulke_id = mu.ulke_id
ORDER BY 
    m.model_resmi_adi, u.ulke_adi;



-- hastane turleri cevirileri
--tr kayıt null
SELECT 
    ust.hastane_turu_adi AS "Türkçe Ana Ad", 
    alt.hastane_turu_adi AS "Çeviri", 
    alt.dil_adi AS "Dil"
FROM hastane_turleri AS alt
LEFT JOIN hastane_turleri AS ust
    ON alt.ust_hastane_turu_id = ust.hastane_turu_id
ORDER BY ust.hastane_turu_adi, alt.dil_adi;

-- coalesce hızlı
SELECT 
    COALESCE(ust.hastane_turu_adi, alt.hastane_turu_adi) AS "Türkçe Ana Ad",
    alt.hastane_turu_adi AS "Çeviri",
    alt.dil_adi AS "Dil"
FROM hastane_turleri AS alt
LEFT JOIN hastane_turleri AS ust
    ON alt.ust_hastane_turu_id = ust.hastane_turu_id
ORDER BY "Türkçe Ana Ad", alt.dil_adi;

-- case

SELECT 
    CASE 
        WHEN ust.hastane_turu_adi IS NOT NULL THEN ust.hastane_turu_adi
        ELSE alt.hastane_turu_adi
    END AS "Türkçe Ana Ad",
    alt.hastane_turu_adi AS "Çeviri",
    alt.dil_adi AS "Dil"
FROM hastane_turleri AS alt
 LEFT JOIN hastane_turleri AS ust
     ON alt.ust_hastane_turu_id = ust.hastane_turu_id
 ORDER BY "Türkçe Ana Ad", alt.dil_adi;


-- kullanici turleri cevirileri

SELECT
    CASE
        WHEN ust.kullanici_turu_adi IS NOT NULL THEN ust.kullanici_turu_adi
        ELSE alt.kullanici_turu_adi
    END AS "Türkçe Ana Ad",
    alt.kullanici_turu_adi AS "Çeviri",
    alt.dil_adi AS "Dil"
FROM kullanici_turleri AS alt
LEFT JOIN kullanici_turleri AS ust
    ON alt.ust_kullanici_turu_id = ust.kullanici_turu_id
ORDER BY "Türkçe Ana Ad", alt.dil_adi;

-- seviyeler cevirileri

SELECT
    CASE
        WHEN ust.seviye_adi IS NOT NULL THEN ust.seviye_adi
        ELSE alt.seviye_adi
    END AS "Türkçe Ana Ad",
    alt.seviye_adi AS "Çeviri",
    alt.dil_adi AS "Dil"
FROM seviyeler AS alt
LEFT JOIN seviyeler AS ust
    ON alt.ust_seviye_id = ust.seviye_id
ORDER BY "Türkçe Ana Ad", alt.dil_adi;


-- modeller test  

SELECT 
    m.model_alias_adi AS "Model Adı",
    m.model_aciklama AS "Açıklama",
    m.dil_adi AS "Dil",
    
    CASE m.aktif
        WHEN 1 THEN 'Yayında'
        WHEN 0 THEN 'Taslak'
        WHEN 2 THEN 'Devre Dışı'
        ELSE 'Bilinmiyor'
    END AS "Durum",

    CASE 
        WHEN m.aktif = 2 THEN TO_CHAR(m.devreden_kaldirilma_tarihi, 'DD.MM.YYYY')
        ELSE TO_CHAR(m.devreye_alma_tarihi, 'DD.MM.YYYY')
    END AS "Tarih"

FROM modeller AS m
ORDER BY "Model Adı", "Dil";


