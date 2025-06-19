-- model ve model turu

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



-- model ve ulke 

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


-- model ve seviye

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


-- model ve hastane turu

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



-- ulke ve sehirler

SELECT 
    u.ulke_adi AS "Ülke",
    s.sehir_adi AS "Şehir"
FROM 
    ulkeler u
JOIN 
    sehirler s ON u.ulke_id = s.ulke_id


-- ulkeler ve diller

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



-- model ulke dil 

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




