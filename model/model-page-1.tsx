"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash2 } from "lucide-react"

// Ana tablo verileri
const mainTableData = [
  {
    id: 1,
    modelAdi: "EMRAM",
    ulke: "ABD",
    dil: "İngilizce",
    modelHiyerarsisi: "Boyut-Kriter-Gösterge",
    modelTuru: "Seviyeli (7 Seviye)",
    hastaneTurleri: "Genel Hastane, Özel Hastane",
    kullaniciKapsami: "Çoklu Anket",
    durum: "Aktif",
    tarih: "2024-01-15",
  },
  {
    id: 2,
    modelAdi: "HIMSS Analytics",
    ulke: "ABD",
    dil: "İngilizce",
    modelHiyerarsisi: "Boyut-Gösterge",
    modelTuru: "Puanlı",
    hastaneTurleri: "Tüm Hastane Türleri",
    kullaniciKapsami: "Tekli Anket",
    durum: "Aktif",
    tarih: "2024-02-10",
  },
  {
    id: 3,
    modelAdi: "NEHTA",
    ulke: "Avustralya",
    dil: "İngilizce",
    modelHiyerarsisi: "Boyut-Kriter-Gösterge",
    modelTuru: "Seviyeli (5 Seviye)",
    hastaneTurleri: "Kamu Hastanesi",
    kullaniciKapsami: "Tekli Anket",
    durum: "Taslak",
    tarih: "2024-03-05",
  },
]

// Alt tablo verileri
const detailTableData: Record<number, any[]> = {
  1: [
    // EMRAM - Çoklu anket
    {
      modelKisaAdi: "EMRAM Tıbbi",
      kullaniciTuru: "Tıbbi Personel",
      boyutSayisi: 8,
      kriterSayisi: 32,
      gostergeSayisi: 164,
      cevapEklenmeDurumu: "Tamamlandı",
      karsilanmaDuzeyleriEklenmeDurumu: "Tamamlandı",
      durum: "Aktif",
      tarih: "2024-01-15",
    },
    {
      modelKisaAdi: "EMRAM Teknik",
      kullaniciTuru: "Teknik Personel",
      boyutSayisi: 6,
      kriterSayisi: 24,
      gostergeSayisi: 128,
      cevapEklenmeDurumu: "Tamamlandı",
      karsilanmaDuzeyleriEklenmeDurumu: "Devam Ediyor",
      durum: "Aktif",
      tarih: "2024-01-15",
    },
  ],
  2: [
    // HIMSS Analytics - Tekli anket
    {
      modelKisaAdi: "HIMSS Analytics",
      kullaniciTuru: "Genel Kullanıcı",
      boyutSayisi: 7,
      kriterSayisi: 0,
      gostergeSayisi: 89,
      cevapEklenmeDurumu: "Tamamlandı",
      karsilanmaDuzeyleriEklenmeDurumu: "Tamamlandı",
      durum: "Aktif",
      tarih: "2024-02-10",
    },
  ],
  3: [
    // NEHTA - Tekli anket
    {
      modelKisaAdi: "NEHTA",
      kullaniciTuru: "Hastane Yöneticisi",
      boyutSayisi: 5,
      kriterSayisi: 18,
      gostergeSayisi: 95,
      cevapEklenmeDurumu: "Devam Ediyor",
      karsilanmaDuzeyleriEklenmeDurumu: "Başlanmadı",
      durum: "Taslak",
      tarih: "2024-03-05",
    },
  ],
}

export default function ModelPage1() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)

  const getDurumBadge = (durum: string) => {
    const variant = durum === "Aktif" ? "default" : durum === "Taslak" ? "secondary" : "destructive"
    return <Badge variant={variant}>{durum}</Badge>
  }

  const getCevapDurumBadge = (durum: string) => {
    const variant = durum === "Tamamlandı" ? "default" : durum === "Devam Ediyor" ? "secondary" : "outline"
    return <Badge variant={variant}>{durum}</Badge>
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Model Yönetimi - Tasarım 1</h1>
        <Button>Yeni Model Ekle</Button>
      </div>

      {/* Ana Tablo */}
      <Card>
        <CardHeader>
          <CardTitle>Modeller</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model Adı</TableHead>
                <TableHead>Ülke</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead>Model Hiyerarşisi</TableHead>
                <TableHead>Model Türü</TableHead>
                <TableHead>Hastane Türleri</TableHead>
                <TableHead>Kullanıcı Kapsamı</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mainTableData.map((model) => (
                <TableRow
                  key={model.id}
                  className={`cursor-pointer hover:bg-muted/50 ${selectedModel === model.id ? "bg-muted" : ""}`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <TableCell className="font-medium">{model.modelAdi}</TableCell>
                  <TableCell>{model.ulke}</TableCell>
                  <TableCell>{model.dil}</TableCell>
                  <TableCell>{model.modelHiyerarsisi}</TableCell>
                  <TableCell>{model.modelTuru}</TableCell>
                  <TableCell>{model.hastaneTurleri}</TableCell>
                  <TableCell>{model.kullaniciKapsami}</TableCell>
                  <TableCell>{getDurumBadge(model.durum)}</TableCell>
                  <TableCell>{model.tarih}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alt Tablo - Seçilen modelin detayları */}
      {selectedModel && detailTableData[selectedModel] && (
        <Card>
          <CardHeader>
            <CardTitle>{mainTableData.find((m) => m.id === selectedModel)?.modelAdi} - Detay Bilgileri</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model Kısa Adı</TableHead>
                  <TableHead>Kullanıcı Türü</TableHead>
                  <TableHead>Boyut Sayısı</TableHead>
                  <TableHead>Kriter Sayısı</TableHead>
                  <TableHead>Gösterge Sayısı</TableHead>
                  <TableHead>Cevap Eklenme Durumu</TableHead>
                  <TableHead>Karşılanma Düzeyleri</TableHead>
                  <TableHead>Durum</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead>İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailTableData[selectedModel].map((detail, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{detail.modelKisaAdi}</TableCell>
                    <TableCell>{detail.kullaniciTuru}</TableCell>
                    <TableCell>{detail.boyutSayisi}</TableCell>
                    <TableCell>{detail.kriterSayisi}</TableCell>
                    <TableCell>{detail.gostergeSayisi}</TableCell>
                    <TableCell>{getCevapDurumBadge(detail.cevapEklenmeDurumu)}</TableCell>
                    <TableCell>{getCevapDurumBadge(detail.karsilanmaDuzeyleriEklenmeDurumu)}</TableCell>
                    <TableCell>{getDurumBadge(detail.durum)}</TableCell>
                    <TableCell>{detail.tarih}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
