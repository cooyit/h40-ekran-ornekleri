"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Settings, Download, Upload, RefreshCw, Eye, Edit, Trash2 } from "lucide-react"

// Ana tablo verileri (aynı veriler)
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

// Alt tablo verileri (aynı veriler)
const detailTableData: Record<number, any[]> = {
  1: [
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

export default function ModelPage3() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const getDurumColor = (durum: string) => {
    switch (durum) {
      case "Aktif":
        return "text-green-600 bg-green-50 border-green-200"
      case "Taslak":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "Pasif":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getCevapDurumColor = (durum: string) => {
    switch (durum) {
      case "Tamamlandı":
        return "text-blue-600 bg-blue-50 border-blue-200"
      case "Devam Ediyor":
        return "text-orange-600 bg-orange-50 border-orange-200"
      case "Başlanmadı":
        return "text-gray-600 bg-gray-50 border-gray-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const filteredData = mainTableData.filter((model) => model.modelAdi.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Model Yönetim Sistemi</h1>
          <p className="text-gray-600">Hastane değerlendirme modellerini modern arayüzle yönetin</p>
        </div>

        {/* Action Bar */}
        <div className="flex justify-between items-center bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Model ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Yenile
            </Button>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              İçe Aktar
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Settings className="h-4 w-4 mr-2" />
              Yeni Model
            </Button>
          </div>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white rounded-lg shadow-sm">
            <TabsTrigger
              value="models"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Ana Modeller
            </TabsTrigger>
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
            >
              Detay Bilgileri
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-4">
            <div className="grid gap-4">
              {filteredData.map((model) => (
                <Card
                  key={model.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01] ${
                    selectedModel === model.id
                      ? "ring-2 ring-blue-500 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50"
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedModel(model.id)}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-gray-900">{model.modelAdi}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Ülke:</span>
                          <span className="text-sm font-medium">{model.ulke}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Dil:</span>
                          <span className="text-sm font-medium">{model.dil}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Hiyerarşi:</span>
                          <span className="text-sm font-medium">{model.modelHiyerarsisi}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Tür:</span>
                          <span className="text-sm font-medium">{model.modelTuru}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Hastane Türleri:</span>
                        </div>
                        <p className="text-sm font-medium">{model.hastaneTurleri}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">Kapsam:</span>
                          <span className="text-sm font-medium">{model.kullaniciKapsami}</span>
                        </div>
                      </div>

                      <div className="space-y-2 flex flex-col justify-between">
                        <div className="space-y-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${getDurumColor(model.durum)}`}
                          >
                            {model.durum}
                          </span>
                          <div className="text-sm text-gray-500">Tarih: {model.tarih}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            {selectedModel && detailTableData[selectedModel] ? (
              <Card className="shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
                  <CardTitle className="text-xl">
                    {mainTableData.find((m) => m.id === selectedModel)?.modelAdi} - Detay Bilgileri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid gap-4 p-6">
                    {detailTableData[selectedModel].map((detail, index) => (
                      <Card key={index} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-bold text-lg text-gray-900">{detail.modelKisaAdi}</h4>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-500">Kullanıcı Türü:</span>
                                <span className="text-sm font-medium">{detail.kullaniciTuru}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-blue-50 rounded-lg p-2">
                                  <div className="text-lg font-bold text-blue-600">{detail.boyutSayisi}</div>
                                  <div className="text-xs text-gray-500">Boyut</div>
                                </div>
                                <div className="bg-green-50 rounded-lg p-2">
                                  <div className="text-lg font-bold text-green-600">{detail.kriterSayisi}</div>
                                  <div className="text-xs text-gray-500">Kriter</div>
                                </div>
                                <div className="bg-purple-50 rounded-lg p-2">
                                  <div className="text-lg font-bold text-purple-600">{detail.gostergeSayisi}</div>
                                  <div className="text-xs text-gray-500">Gösterge</div>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="space-y-1">
                                <span className="text-xs text-gray-500">Cevap Durumu:</span>
                                <div
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getCevapDurumColor(detail.cevapEklenmeDurumu)}`}
                                >
                                  {detail.cevapEklenmeDurumu}
                                </div>
                              </div>
                              <div className="space-y-1">
                                <span className="text-xs text-gray-500">Karşılanma Durumu:</span>
                                <div
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getCevapDurumColor(detail.karsilanmaDuzeyleriEklenmeDurumu)}`}
                                >
                                  {detail.karsilanmaDuzeyleriEklenmeDurumu}
                                </div>
                              </div>
                              <div className="flex justify-between items-center mt-2">
                                <span
                                  className={`px-2 py-1 rounded-full text-xs font-medium border ${getDurumColor(detail.durum)}`}
                                >
                                  {detail.durum}
                                </span>
                                <span className="text-xs text-gray-500">{detail.tarih}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Görüntüle
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Düzenle
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Sil
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <p className="text-gray-500 text-lg">Detay bilgilerini görmek için bir model seçin</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
