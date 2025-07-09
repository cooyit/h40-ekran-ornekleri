"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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

export default function ModelPage2() {
  const [selectedModel, setSelectedModel] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")

  const getDurumBadge = (durum: string) => {
    const colors = {
      Aktif: "bg-green-100 text-green-800 border-green-200",
      Taslak: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Pasif: "bg-red-100 text-red-800 border-red-200",
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[durum as keyof typeof colors] || colors.Pasif}`}
      >
        {durum}
      </span>
    )
  }

  const getCevapDurumBadge = (durum: string) => {
    const colors = {
      Tamamlandı: "bg-blue-100 text-blue-800 border-blue-200",
      "Devam Ediyor": "bg-orange-100 text-orange-800 border-orange-200",
      Başlanmadı: "bg-gray-100 text-gray-800 border-gray-200",
    }
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[durum as keyof typeof colors] || colors.Başlanmadı}`}
      >
        {durum}
      </span>
    )
  }

  const filteredData = mainTableData.filter(
    (model) =>
      model.modelAdi.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.ulke.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Model Yönetimi - Tasarım 2</h1>
              <p className="text-gray-600 mt-1">Hastane değerlendirme modellerini yönetin</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Yeni Model
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Model adı veya ülke ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filtrele
            </Button>
          </div>
        </div>

        {/* Ana Tablo */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Modeller ({filteredData.length})</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Model Adı
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ülke
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dil
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hiyerarşi
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tür
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hastane Türleri
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kapsam
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((model) => (
                  <tr
                    key={model.id}
                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${selectedModel === model.id ? "bg-blue-50 border-l-4 border-blue-500" : ""}`}
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{model.modelAdi}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.ulke}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.dil}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.modelHiyerarsisi}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.modelTuru}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{model.hastaneTurleri}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.kullaniciKapsami}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getDurumBadge(model.durum)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{model.tarih}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Görüntüle</DropdownMenuItem>
                          <DropdownMenuItem>Düzenle</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alt Tablo - Seçilen modelin detayları */}
        {selectedModel && detailTableData[selectedModel] && (
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b bg-blue-50">
              <h2 className="text-lg font-semibold text-gray-900">
                {mainTableData.find((m) => m.id === selectedModel)?.modelAdi} - Detay Bilgileri
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Model Kısa Adı
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kullanıcı Türü
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Boyut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kriter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gösterge
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cevap Durumu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Karşılanma Durumu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {detailTableData[selectedModel].map((detail, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{detail.modelKisaAdi}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.kullaniciTuru}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {detail.boyutSayisi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {detail.kriterSayisi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {detail.gostergeSayisi}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getCevapDurumBadge(detail.cevapEklenmeDurumu)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCevapDurumBadge(detail.karsilanmaDuzeyleriEklenmeDurumu)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getDurumBadge(detail.durum)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{detail.tarih}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Görüntüle</DropdownMenuItem>
                            <DropdownMenuItem>Düzenle</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
