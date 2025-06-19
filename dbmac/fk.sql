/* Create Foreign Key Constraints */

ALTER TABLE "Boyutlar" ADD CONSTRAINT "FK_Boyut_Id_Hiyerarsi"
	FOREIGN KEY ("Boyut_Id_Hiyerarsi") REFERENCES "Boyutlar" ("Boyut_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Boyutlar" ADD CONSTRAINT "FK_UstBoyut_Id"
	FOREIGN KEY ("UstBoyut_Id") REFERENCES "Boyutlar" ("Boyut_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCervabinaOneriler" ADD CONSTRAINT "FK_GostergeCevap_Id"
	FOREIGN KEY ("GostergeCevap_Id") REFERENCES "GostergeCevaplari" ("GostergeCevap_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCervabinaOneriler" ADD CONSTRAINT "FK_KullanıcıTuru_Id"
	FOREIGN KEY ("KullaniciTuru_Id") REFERENCES "KullanıcıTurleri" ("KullaniciTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCervabinaOneriler" ADD CONSTRAINT "FK_UstGostergeCervabinaOneriler_Id"
	FOREIGN KEY ("UstGostergeCevabinaOneriler_Id") REFERENCES "GostergeCervabinaOneriler" ("GostergeCevabinaOneriler_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevapSablonu" ADD CONSTRAINT "FK_GostergeCevapSablonu_Id"
	FOREIGN KEY ("UstGostergeCevapSablonu_Id") REFERENCES "GostergeCevapSablonu" ("GostergeCevapSablonu_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevapSablonu" ADD CONSTRAINT "FK_GostergeCevapTuru_Id"
	FOREIGN KEY ("GostergeCevapTuru_Id") REFERENCES "GostergeCevapTuru" ("GostergeCevapTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Gostergeler" ADD CONSTRAINT "FK_GostergeCevapTuru_Id"
	FOREIGN KEY ("KriterCevapTuru_Id") REFERENCES "GostergeCevapTuru" ("GostergeCevapTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Gostergeler" ADD CONSTRAINT "FK_UstGosterge_Id"
	FOREIGN KEY ("UstGosterge_Id") REFERENCES "Gostergeler" ("Gosterge_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Hastaneler" ADD CONSTRAINT "FK_HastaneTuru_Id"
	FOREIGN KEY ("HastaneTuru_Id") REFERENCES "HastaneTurleri" ("HastaneTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Hastaneler" ADD CONSTRAINT "FK_Sehir_Id"
	FOREIGN KEY ("Sehir_Id") REFERENCES "Sehirler" ("Sehir_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Hastaneler" ADD CONSTRAINT "FK_Ulke_Id"
	FOREIGN KEY ("Ulke_Id") REFERENCES "Ulkeler" ("Ulke_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "KarsilanmaDuzeyi" ADD CONSTRAINT "FK_KarsilanmaDuzeyi_Eslesmeler"
	FOREIGN KEY ("Eslesme_Id") REFERENCES "Eslesmeler" ("Eslesme_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "KarsilanmaDuzeyi" ADD CONSTRAINT "FK_KarsilanmaDuzeyi_Seviyeler"
	FOREIGN KEY ("Seviye_Id") REFERENCES "Seviyeler" ("Seviye_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "KarsilanmaDuzeyi" ADD CONSTRAINT "FK_UstKarsilanmaDuzeyi_Id"
	FOREIGN KEY ("UstKarsilanmaDuzeyi_Id") REFERENCES "KarsilanmaDuzeyi" ("KarsilanmaDuzeyi_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Kriterler" ADD CONSTRAINT "FK_Kriter_Id"
	FOREIGN KEY ("UstKriter_Id") REFERENCES "Kriterler" ("Kriter_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Kriterler" ADD CONSTRAINT "FK_ModelSeviye_Id"
	FOREIGN KEY () REFERENCES  () ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Kullanicilar" ADD CONSTRAINT "FK_KullaniciTuru_Id"
	FOREIGN KEY ("KullaniciTuru_Id") REFERENCES "KullanıcıTurleri" ("KullaniciTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Kullanicilar" ADD CONSTRAINT "FK_Ulke_Id"
	FOREIGN KEY ("Ulke_Id") REFERENCES "Ulkeler" ("Ulke_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "KullanicilarRoller" ADD CONSTRAINT "FK_Kullanici_Id"
	FOREIGN KEY ("Kullanici_Id") REFERENCES "Kullanicilar" ("Kullanici_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "KullanicilarRoller" ADD CONSTRAINT "FK_Rol_Id"
	FOREIGN KEY ("Rol_Id") REFERENCES "Roller" ("Rol_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelHastaneTuru" ADD CONSTRAINT "FK_HastaneTuru_Id"
	FOREIGN KEY ("HastaneTuru_Id") REFERENCES "HastaneTurleri" ("HastaneTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelHastaneTuru" ADD CONSTRAINT "FK_Model_Id"
	FOREIGN KEY ("Model_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Modeller" ADD CONSTRAINT "FK_Model_Id"
	FOREIGN KEY ("UstModel_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Modeller" ADD CONSTRAINT "FK_ModelTuru_Id"
	FOREIGN KEY ("ModelTuru_Id") REFERENCES "ModelTuru" ("ModelTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelUlke" ADD CONSTRAINT "FK_Model_Id"
	FOREIGN KEY ("Model_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelUlke" ADD CONSTRAINT "FK_Ulke_Id"
	FOREIGN KEY ("Ulke_Id") REFERENCES "Ulkeler" ("Ulke_Id") ON DELETE No Action ON UPDATE No Action
;



ALTER TABLE "RolYetki" ADD CONSTRAINT "FK_Rol_Id"
	FOREIGN KEY ("Rol_Id") REFERENCES "Roller" ("Rol_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevaplari" ADD CONSTRAINT "FK_Gosterge_Id"
	FOREIGN KEY ("Gosterge_Id") REFERENCES  () ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevaplari" ADD CONSTRAINT "FK_GostergeCevapTuru_Id"
	FOREIGN KEY ("GostergeCevapTuru_Id") REFERENCES "GostergeCevapTuru" ("GostergeCevapTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevaplari" ADD CONSTRAINT "FK_KullaniciTuru_Id"
	FOREIGN KEY ("KullaniciTuru_Id") REFERENCES "KullanıcıTurleri" ("KullaniciTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevaplari" ADD CONSTRAINT "FK_ModelBoyutKriterGosterge_Id"
	FOREIGN KEY ("ModelBoyutKriterGosterge_Id") REFERENCES  () ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "GostergeCevaplari" ADD CONSTRAINT "FK_Ust_GostergeCevap_Id"
	FOREIGN KEY ("UstGostergeCevap_Id") REFERENCES "GostergeCevaplari" ("GostergeCevap_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "HastaneTurleri" ADD CONSTRAINT "FK_HastaneTuru_Id"
	FOREIGN KEY ("UstHastaneTuru_Id") REFERENCES "HastaneTurleri" ("HastaneTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "KullanıcıTurleri" ADD CONSTRAINT "FK_Ust_KullanıcıTuru_Id"
	FOREIGN KEY ("UstKullaniciTuru_Id") REFERENCES "KullanıcıTurleri" ("KullaniciTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Sehirler" ADD CONSTRAINT "FK_Ulke_Id"
	FOREIGN KEY ("Ulke_Id") REFERENCES "Ulkeler" ("Ulke_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Seviyeler" ADD CONSTRAINT "FK_Seviye_Id"
	FOREIGN KEY ("UstSeviyel_Id") REFERENCES "Seviyeler" ("Seviye_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "UlkelerDiller" ADD CONSTRAINT "FK_Dil_Id"
	FOREIGN KEY ("Dil_Id") REFERENCES "Diller" ("Dil_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "UlkelerDiller" ADD CONSTRAINT "FK_Ulke_Id"
	FOREIGN KEY ("Ulke_Id") REFERENCES "Ulkeler" ("Ulke_Id") ON DELETE No Action ON UPDATE No Action
;


ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_Boyutlar"
	FOREIGN KEY ("Boyut_Id") REFERENCES "Boyutlar" ("Boyut_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_GostergeCervabinaOneriler"
	FOREIGN KEY ("GostergeCevabinaOneriler_Id") REFERENCES "GostergeCervabinaOneriler" ("GostergeCevabinaOneriler_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_GostergeCevaplari"
	FOREIGN KEY ("GostergeCevap_Id") REFERENCES "GostergeCevaplari" ("GostergeCevap_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_Gostergeler"
	FOREIGN KEY ("Gosterge_Id") REFERENCES "Gostergeler" ("Gosterge_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_Kriterler"
	FOREIGN KEY ("Kriter_Id") REFERENCES "Kriterler" ("Kriter_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_KullanıcıTurleri"
	FOREIGN KEY ("KullaniciTuru_Id") REFERENCES "KullanıcıTurleri" ("KullaniciTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_Modeller"
	FOREIGN KEY ("Model_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "Eslesmeler" ADD CONSTRAINT "FK_Eslesmeler_Seviyeler"
	FOREIGN KEY ("Seviye_Id") REFERENCES "Seviyeler" ("Seviye_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "HastaneModel" ADD CONSTRAINT "FK_Hastane_Id"
	FOREIGN KEY ("Hastane_Id") REFERENCES "Hastaneler" ("Hastane_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "HastaneModel" ADD CONSTRAINT "FK_Model_Id"
	FOREIGN KEY ("Model_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "HastaneModelKullanicilar" ADD CONSTRAINT "FK_HastaneModel_Id"
	FOREIGN KEY ("HastaneModel_Id") REFERENCES "HastaneModel" ("HastaneModel_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "HastaneModelKullanicilar" ADD CONSTRAINT "FK_Kullanici_Id"
	FOREIGN KEY ("Kullanici_Id") REFERENCES "Kullanicilar" ("Kullanici_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "HastaneModelKullanicilar" ADD CONSTRAINT "FK_KullanıcıTuru_Id"
	FOREIGN KEY ("KullaniciTuru_Id") REFERENCES  () ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelKullaniciKapsami" ADD CONSTRAINT "FK_KullaniciTuru_Id"
	FOREIGN KEY ("KullaniciTuru_Id") REFERENCES "KullanıcıTurleri" ("KullaniciTuru_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelKullaniciKapsami" ADD CONSTRAINT "FK_Model_Id"
	FOREIGN KEY ("Model_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelSeviye" ADD CONSTRAINT "FK_Model_Id"
	FOREIGN KEY ("Model_Id") REFERENCES "Modeller" ("Model_Id") ON DELETE No Action ON UPDATE No Action
;

ALTER TABLE "ModelSeviye" ADD CONSTRAINT "FK_Seviye_Id"
	FOREIGN KEY ("Seviye_Id") REFERENCES "Seviyeler" ("Seviye_Id") ON DELETE No Action ON UPDATE No Action
;
