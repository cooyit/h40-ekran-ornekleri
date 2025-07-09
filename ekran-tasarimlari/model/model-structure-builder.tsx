"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Save,
  Layers,
  Target,
  BarChart3,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
} from "lucide-react"

// Örnek boyutlar
const availableDimensions = [
  "Teknolojik Altyapı",
  "İnsan Kaynakları",
  "Süreç Yönetimi",
  "Veri Güvenliği",
  "Hasta Güvenliği",
  "Kalite Yönetimi",
  "Maliyet Etkinliği",
  "Yasal Uyumluluk",
]

// Örnek kriterler (boyuta göre)
const availableCriteria: Record<string, string[]> = {
  "Teknolojik Altyapı": [
    "Donanım Yeterliliği",
    "Yazılım Entegrasyonu",
    "Ağ Altyapısı",
    "Veri Depolama",
    "Yedekleme Sistemleri",
  ],
  "İnsan Kaynakları": ["Personel Yetkinliği", "Eğitim Programları", "Teknik Destek", "Kullanıcı Memnuniyeti"],
  "Süreç Yönetimi": ["İş Akışları", "Standart Operasyon Prosedürleri", "Performans Ölçümleri", "Sürekli İyileştirme"],
}

// Örnek göstergeler (kritere göre)
const availableIndicators: Record<string, string[]> = {
  "Donanım Yeterliliği": [
    "Sunucu Kapasitesi",
    "İstemci Bilgisayar Sayısı",
    "Mobil Cihaz Desteği",
    "Yedek Donanım Mevcudiyeti",
    "Donanım Yaşı",
    "Performans Metrikleri",
    "Bakım Sıklığı",
  ],
  "Yazılım Entegrasyonu": [
    "HIS Entegrasyonu",
    "LIS Entegrasyonu",
    "RIS/PACS Entegrasyonu",
    "Üçüncü Taraf Yazılım Desteği",
    "API Entegrasyonları",
    "Veri Senkronizasyonu",
    "Sistem Uyumluluğu",
  ],
  "Ağ Altyapısı": [
    "Bant Genişliği",
    "Ağ Güvenliği",
    "Kablosuz Ağ Kapsamı",
    "Ağ Monitörleme",
    "Yedeklilik Seviyesi",
    "Gecikme Süreleri",
  ],
  "Personel Yetkinliği": [
    "IT Personel Sayısı",
    "Sertifika Durumu",
    "Deneyim Süresi",
    "Teknik Bilgi Seviyesi",
    "Eğitim Saatleri",
    "Performans Değerlendirmesi",
  ],
  "Eğitim Programları": [
    "Eğitim Sıklığı",
    "Eğitim Kalitesi",
    "Katılım Oranı",
    "Eğitim Materyalleri",
    "Online Eğitim Platformu",
  ],
  "İş Akışları": [
    "Süreç Otomasyonu",
    "İş Akışı Verimliliği",
    "Hata Oranları",
    "Süreç Standartlaşması",
    "Onay Mekanizmaları",
  ],
}

const availableResponseTypes = [
  "Evet/Hayır",
  "1-5 Likert Ölçeği",
  "1-10 Puan Ölçeği",
  "Çoktan Seçmeli",
  "Açık Uçlu",
  "Sayısal Değer",
  "Yüzde Değeri",
  "Tarih Seçimi",
]

interface Indicator {
  id: string
  name: string
  responseType: string
  weight: number
}

interface Criterion {
  id: string
  name: string
  level: string
  weight: number
  indicators: Indicator[]
}

interface Dimension {
  id: string
  name: string
  weight: number
  criteria: Criterion[]
}

export default function ModelStructureBuilder() {
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>([])
  const [dimensionSearch, setDimensionSearch] = useState("")
  const [criterionSearch, setCriterionSearch] = useState("")
  const [indicatorSearch, setIndicatorSearch] = useState("")
  const [activeSearchType, setActiveSearchType] = useState<string | null>(null)
  const [activeDimensionId, setActiveDimensionId] = useState<string | null>(null)
  const [activeCriterionId, setActiveCriterionId] = useState<string | null>(null)

  // Boyut ekleme
  const addDimension = (dimensionName: string) => {
    const newDimension: Dimension = {
      id: Date.now().toString(),
      name: dimensionName,
      weight: 0,
      criteria: [],
    }
    setSelectedDimensions([...selectedDimensions, newDimension])
    setDimensionSearch("")
    setActiveSearchType(null)
  }

  // Boyut silme
  const removeDimension = (dimensionId: string) => {
    setSelectedDimensions(selectedDimensions.filter((d) => d.id !== dimensionId))
  }

  // Kriter ekleme
  const addCriterion = (dimensionId: string, criterionName: string) => {
    const newCriterion: Criterion = {
      id: Date.now().toString(),
      name: criterionName,
      level: "",
      weight: 0,
      indicators: [],
    }

    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId ? { ...dimension, criteria: [...dimension.criteria, newCriterion] } : dimension,
      ),
    )
    setCriterionSearch("")
    setActiveSearchType(null)
    setActiveDimensionId(null)
  }

  // Kriter silme
  const removeCriterion = (dimensionId: string, criterionId: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? { ...dimension, criteria: dimension.criteria.filter((c) => c.id !== criterionId) }
          : dimension,
      ),
    )
  }

  // Kriter seviyesi güncelleme
  const updateCriterionLevel = (dimensionId: string, criterionId: string, level: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId ? { ...criterion, level } : criterion,
              ),
            }
          : dimension,
      ),
    )
  }

  // Gösterge ekleme
  const addIndicator = (dimensionId: string, criterionId: string, indicatorName: string) => {
    const newIndicator: Indicator = {
      id: Date.now().toString(),
      name: indicatorName,
      responseType: "",
      weight: 0,
    }

    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? { ...criterion, indicators: [...criterion.indicators, newIndicator] }
                  : criterion,
              ),
            }
          : dimension,
      ),
    )
    setIndicatorSearch("")
    setActiveSearchType(null)
    setActiveCriterionId(null)
  }

  // Gösterge silme
  const removeIndicator = (dimensionId: string, criterionId: string, indicatorId: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? { ...criterion, indicators: criterion.indicators.filter((i) => i.id !== indicatorId) }
                  : criterion,
              ),
            }
          : dimension,
      ),
    )
  }

  const updateIndicatorResponseType = (
    dimensionId: string,
    criterionId: string,
    indicatorId: string,
    responseType: string,
  ) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? {
                      ...criterion,
                      indicators: criterion.indicators.map((indicator) =>
                        indicator.id === indicatorId ? { ...indicator, responseType } : indicator,
                      ),
                    }
                  : criterion,
              ),
            }
          : dimension,
      ),
    )
  }

  const updateDimensionWeight = (dimensionId: string, weight: number) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) => (dimension.id === dimensionId ? { ...dimension, weight } : dimension)),
    )
  }

  const updateCriterionWeight = (dimensionId: string, criterionId: string, weight: number) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId ? { ...criterion, weight } : criterion,
              ),
            }
          : dimension,
      ),
    )
  }

  const updateIndicatorWeight = (dimensionId: string, criterionId: string, indicatorId: string, weight: number) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? {
                      ...criterion,
                      indicators: criterion.indicators.map((indicator) =>
                        indicator.id === indicatorId ? { ...indicator, weight } : indicator,
                      ),
                    }
                  : criterion,
              ),
            }
          : dimension,
      ),
    )
  }

  const normalizeWeights = () => {
    setSelectedDimensions((prevDimensions) => {
      return prevDimensions.map((dimension) => {
        // 1. Boyut ağırlıklarını normalize et
        const totalDimensionWeight = prevDimensions.reduce((sum, dim) => sum + (dim.weight || 0), 0)
        const normalizedDimensionWeight =
          totalDimensionWeight > 0
            ? Math.round((dimension.weight / totalDimensionWeight) * 100)
            : Math.round(100 / prevDimensions.length)

        // 2. Bu boyutun kriterlerinin ağırlıklarını normalize et
        const totalCriterionWeight = dimension.criteria.reduce((sum, crit) => sum + (crit.weight || 0), 0)
        const normalizedCriteria = dimension.criteria.map((criterion) => {
          const normalizedCriterionWeight =
            totalCriterionWeight > 0
              ? Math.round((criterion.weight / totalCriterionWeight) * 100)
              : Math.round(100 / dimension.criteria.length)

          // 3. Bu kriterin göstergelerinin ağırlıklarını normalize et
          const totalIndicatorWeight = criterion.indicators.reduce((sum, ind) => sum + (ind.weight || 0), 0)
          const normalizedIndicators = criterion.indicators.map((indicator) => {
            const normalizedIndicatorWeight =
              totalIndicatorWeight > 0
                ? Math.round((indicator.weight / totalIndicatorWeight) * 100)
                : Math.round(100 / criterion.indicators.length)

            return {
              ...indicator,
              weight: normalizedIndicatorWeight,
            }
          })

          return {
            ...criterion,
            weight: normalizedCriterionWeight,
            indicators: normalizedIndicators,
          }
        })

        return {
          ...dimension,
          weight: normalizedDimensionWeight,
          criteria: normalizedCriteria,
        }
      })
    })
  }

  // Detay görüntüleme fonksiyonları
  const showDimensionDetails = (dimension: Dimension) => {
    const totalIndicators = dimension.criteria.reduce((total, crit) => total + crit.indicators.length, 0)
    alert(`Boyut Detayları:
    
Adı: ${dimension.name}
Ağırlık: %${dimension.weight}
Kriter Sayısı: ${dimension.criteria.length}
Toplam Gösterge Sayısı: ${totalIndicators}
    
Kriterler:
${dimension.criteria.map((crit) => `• ${crit.name} (${crit.level}, %${crit.weight})`).join("\n")}`)
  }

  const showCriterionDetails = (dimension: Dimension, criterion: Criterion) => {
    alert(`Kriter Detayları:
    
Boyut: ${dimension.name}
Kriter Adı: ${criterion.name}
Seviye: ${criterion.level}
Ağırlık: %${criterion.weight}
Gösterge Sayısı: ${criterion.indicators.length}
    
Göstergeler:
${criterion.indicators.map((ind) => `• ${ind.name} (${ind.responseType}, %${ind.weight})`).join("\n")}`)
  }

  const showIndicatorDetails = (dimension: Dimension, criterion: Criterion, indicator: Indicator) => {
    alert(`Gösterge Detayları:
    
Boyut: ${dimension.name}
Kriter: ${criterion.name}
Gösterge Adı: ${indicator.name}
Cevaplama Türü: ${indicator.responseType}
Ağırlık: %${indicator.weight}`)
  }

  // Kopyalama fonksiyonları
  const copyDimension = (dimension: Dimension) => {
    const copiedDimension: Dimension = {
      ...dimension,
      id: Date.now().toString(),
      name: `${dimension.name} (Kopya)`,
    }
    setSelectedDimensions([...selectedDimensions, copiedDimension])
  }

  const copyCriterion = (dimensionId: string, criterion: Criterion) => {
    const copiedCriterion: Criterion = {
      ...criterion,
      id: Date.now().toString(),
      name: `${criterion.name} (Kopya)`,
    }

    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId ? { ...dimension, criteria: [...dimension.criteria, copiedCriterion] } : dimension,
      ),
    )
  }

  const copyIndicator = (dimensionId: string, criterionId: string, indicator: Indicator) => {
    const copiedIndicator: Indicator = {
      ...indicator,
      id: Date.now().toString(),
      name: `${indicator.name} (Kopya)`,
    }

    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              criteria: dimension.criteria.map((criterion) =>
                criterion.id === criterionId
                  ? { ...criterion, indicators: [...criterion.indicators, copiedIndicator] }
                  : criterion,
              ),
            }
          : dimension,
      ),
    )
  }

  const handleBack = () => {
    window.location.href = "/add-model-1"
  }

  const handleSave = () => {
    console.log("Model Structure:", selectedDimensions)
    // Kaydetme işlemi yapılacak
    alert("Model yapısı başarıyla kaydedildi!")
  }

  const handleNext = () => {
    if (selectedDimensions.length === 0) {
      alert("Lütfen en az bir boyut ekleyin!")
      return
    }

    // Model yapısını localStorage'a kaydet
    localStorage.setItem("modelStructure", JSON.stringify(selectedDimensions))
    window.location.href = "/model-compliance-levels"
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Layers className="h-6 w-6" />
                Model Yapısı Oluştur
              </CardTitle>
              <p className="text-gray-600 mt-2">Boyut - Kriter - Gösterge hiyerarşisini tanımlayın</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
              <Button
                variant="outline"
                onClick={normalizeWeights}
                className="bg-orange-50 text-orange-600 hover:bg-orange-100"
              >
                <Target className="h-4 w-4 mr-2" />
                Ağırlıkları Normalize Et
              </Button>
              <Button variant="outline" onClick={handleSave} className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                <Save className="h-4 w-4 mr-2" />
                Kaydet ve Çık
              </Button>
              <Button onClick={handleNext} className="bg-blue-600 hover:bg-blue-700">
                <ChevronRight className="h-4 w-4 ml-2" />
                İleri
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Boyut Ekleme */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-medium flex items-center gap-2">
                <Layers className="h-5 w-5" />
                Boyutlar
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveSearchType(activeSearchType === "dimension" ? null : "dimension")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Boyut Ekle
              </Button>
            </div>

            {/* Boyut Arama */}
            {activeSearchType === "dimension" && (
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Boyut ara veya yeni boyut adı yazın..."
                    value={dimensionSearch}
                    onChange={(e) => setDimensionSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {dimensionSearch && (
                  <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                    {/* Mevcut boyutlardan filtrele */}
                    {availableDimensions
                      .filter((dim) => dim.toLowerCase().includes(dimensionSearch.toLowerCase()))
                      .map((dimension) => (
                        <div
                          key={dimension}
                          className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                          onClick={() => addDimension(dimension)}
                        >
                          {dimension}
                        </div>
                      ))}
                    {/* Yeni boyut ekleme seçeneği */}
                    {!availableDimensions.some((dim) => dim.toLowerCase() === dimensionSearch.toLowerCase()) && (
                      <div
                        className="p-2 hover:bg-blue-50 cursor-pointer rounded border-t text-blue-600"
                        onClick={() => addDimension(dimensionSearch)}
                      >
                        + "{dimensionSearch}" boyutunu ekle
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Seçilen Boyutlar */}
            <div className="space-y-4">
              {selectedDimensions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Henüz boyut eklenmedi. Yukarıdaki "Boyut Ekle" butonunu kullanarak başlayın.</p>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {selectedDimensions.map((dimension) => (
                    <AccordionItem key={dimension.id} value={dimension.id} className="border rounded-lg">
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Layers className="h-4 w-4 text-blue-600" />
                            </div>
                            <span className="font-medium">{dimension.name}</span>
                            <Badge variant="secondary">{dimension.criteria.length} kriter</Badge>
                            <Badge variant="outline">
                              {dimension.criteria.reduce((total, crit) => total + crit.indicators.length, 0)} gösterge
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={(e) => e.stopPropagation()}
                                  className="h-8 w-8 p-0"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => showDimensionDetails(dimension)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Detayını Gör
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => copyDimension(dimension)}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Kopyala
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => removeDimension(dimension.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Sil
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-4">
                          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label className="text-sm font-medium">Boyut Ağırlığı (Model İçerisinde %)</Label>
                                <Input
                                  type="number"
                                  min="0"
                                  max="100"
                                  value={dimension.weight}
                                  onChange={(e) => updateDimensionWeight(dimension.id, Number(e.target.value))}
                                  placeholder="0-100 arası değer"
                                />
                              </div>
                              <div className="flex items-end">
                                <div className="text-sm text-gray-600">
                                  Bu boyutun model içerisindeki ağırlık oranını belirtin
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Kriter Ekleme */}
                          <div className="flex items-center justify-between">
                            <Label className="font-medium flex items-center gap-2">
                              <Target className="h-4 w-4" />
                              Kriterler
                            </Label>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setActiveDimensionId(dimension.id)
                                setActiveSearchType(activeSearchType === "criterion" ? null : "criterion")
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Kriter Ekle
                            </Button>
                          </div>

                          {/* Kriter Arama */}
                          {activeSearchType === "criterion" && activeDimensionId === dimension.id && (
                            <div className="space-y-2">
                              <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                <Input
                                  placeholder="Kriter ara veya yeni kriter adı yazın..."
                                  value={criterionSearch}
                                  onChange={(e) => setCriterionSearch(e.target.value)}
                                  className="pl-10"
                                />
                              </div>
                              {criterionSearch && (
                                <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                                  {/* Mevcut kriterlerden filtrele */}
                                  {(availableCriteria[dimension.name] || [])
                                    .filter((crit) => crit.toLowerCase().includes(criterionSearch.toLowerCase()))
                                    .map((criterion) => (
                                      <div
                                        key={criterion}
                                        className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                                        onClick={() => addCriterion(dimension.id, criterion)}
                                      >
                                        {criterion}
                                      </div>
                                    ))}
                                  {/* Yeni kriter ekleme seçeneği */}
                                  {!(availableCriteria[dimension.name] || []).some(
                                    (crit) => crit.toLowerCase() === criterionSearch.toLowerCase(),
                                  ) && (
                                    <div
                                      className="p-2 hover:bg-blue-50 cursor-pointer rounded border-t text-blue-600"
                                      onClick={() => addCriterion(dimension.id, criterionSearch)}
                                    >
                                      + "{criterionSearch}" kriterini ekle
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}

                          {/* Kriterler Listesi */}
                          <div className="space-y-3">
                            {dimension.criteria.map((criterion) => (
                              <Card key={criterion.id} className="border-l-4 border-l-green-500">
                                <CardContent className="p-4">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                          <Target className="h-3 w-3 text-green-600" />
                                        </div>
                                        <span className="font-medium">{criterion.name}</span>
                                        <Badge variant="outline">{criterion.indicators.length} gösterge</Badge>
                                      </div>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => showCriterionDetails(dimension, criterion)}>
                                            <Eye className="h-4 w-4 mr-2" />
                                            Detayını Gör
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => copyCriterion(dimension.id, criterion)}>
                                            <Copy className="h-4 w-4 mr-2" />
                                            Kopyala
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem
                                            onClick={() => removeCriterion(dimension.id, criterion.id)}
                                            className="text-red-600"
                                          >
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Sil
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>

                                    {/* Seviye Seçimi */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm">Seviye Seçin</Label>
                                        <Select
                                          value={criterion.level}
                                          onValueChange={(value) =>
                                            updateCriterionLevel(dimension.id, criterion.id, value)
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Seviye seçin" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {Array.from({ length: 10 }, (_, i) => (
                                              <SelectItem key={i + 1} value={`Seviye ${i + 1}`}>
                                                Seviye {i + 1}
                                              </SelectItem>
                                            ))}
                                          </SelectContent>
                                        </Select>
                                      </div>

                                      <div className="space-y-2">
                                        <Label className="text-sm">Kriter Ağırlığı (%)</Label>
                                        <Input
                                          type="number"
                                          min="0"
                                          max="100"
                                          value={criterion.weight}
                                          onChange={(e) =>
                                            updateCriterionWeight(dimension.id, criterion.id, Number(e.target.value))
                                          }
                                          placeholder="0-100"
                                        />
                                      </div>

                                      <div className="flex items-end">
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setActiveCriterionId(criterion.id)
                                            setActiveSearchType(activeSearchType === "indicator" ? null : "indicator")
                                          }}
                                          className="w-full"
                                        >
                                          <Plus className="h-4 w-4 mr-2" />
                                          Gösterge Ekle
                                        </Button>
                                      </div>
                                    </div>

                                    {/* Gösterge Arama */}
                                    {activeSearchType === "indicator" && activeCriterionId === criterion.id && (
                                      <div className="space-y-2">
                                        <div className="relative">
                                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                          <Input
                                            placeholder="Gösterge ara veya yeni gösterge adı yazın..."
                                            value={indicatorSearch}
                                            onChange={(e) => setIndicatorSearch(e.target.value)}
                                            className="pl-10"
                                          />
                                        </div>
                                        {indicatorSearch && (
                                          <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                                            {/* Mevcut göstergelerden filtrele */}
                                            {(availableIndicators[criterion.name] || [])
                                              .filter((ind) =>
                                                ind.toLowerCase().includes(indicatorSearch.toLowerCase()),
                                              )
                                              .map((indicator) => (
                                                <div
                                                  key={indicator}
                                                  className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                                                  onClick={() => addIndicator(dimension.id, criterion.id, indicator)}
                                                >
                                                  {indicator}
                                                </div>
                                              ))}
                                            {/* Yeni gösterge ekleme seçeneği */}
                                            {!(availableIndicators[criterion.name] || []).some(
                                              (ind) => ind.toLowerCase() === indicatorSearch.toLowerCase(),
                                            ) && (
                                              <div
                                                className="p-2 hover:bg-blue-50 cursor-pointer rounded border-t text-blue-600"
                                                onClick={() =>
                                                  addIndicator(dimension.id, criterion.id, indicatorSearch)
                                                }
                                              >
                                                + "{indicatorSearch}" göstergesini ekle
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}

                                    {/* Göstergeler */}
                                    {criterion.indicators.length > 0 && (
                                      <div className="space-y-3">
                                        <Label className="text-sm flex items-center gap-2">
                                          <BarChart3 className="h-4 w-4" />
                                          Göstergeler
                                        </Label>
                                        <div className="space-y-3">
                                          {criterion.indicators.map((indicator) => (
                                            <div key={indicator.id} className="border rounded-lg p-3 bg-purple-50">
                                              <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                  <BarChart3 className="h-4 w-4 text-purple-600" />
                                                  <span className="font-medium">{indicator.name}</span>
                                                </div>
                                                <DropdownMenu>
                                                  <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                      <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                  </DropdownMenuTrigger>
                                                  <DropdownMenuContent align="end">
                                                    <DropdownMenuItem
                                                      onClick={() =>
                                                        showIndicatorDetails(dimension, criterion, indicator)
                                                      }
                                                    >
                                                      <Eye className="h-4 w-4 mr-2" />
                                                      Detayını Gör
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                      onClick={() =>
                                                        copyIndicator(dimension.id, criterion.id, indicator)
                                                      }
                                                    >
                                                      <Copy className="h-4 w-4 mr-2" />
                                                      Kopyala
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                      onClick={() =>
                                                        removeIndicator(dimension.id, criterion.id, indicator.id)
                                                      }
                                                      className="text-red-600"
                                                    >
                                                      <Trash2 className="h-4 w-4 mr-2" />
                                                      Sil
                                                    </DropdownMenuItem>
                                                  </DropdownMenuContent>
                                                </DropdownMenu>
                                              </div>
                                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                  <Label className="text-sm">Cevaplama Türü</Label>
                                                  <Select
                                                    value={indicator.responseType}
                                                    onValueChange={(value) =>
                                                      updateIndicatorResponseType(
                                                        dimension.id,
                                                        criterion.id,
                                                        indicator.id,
                                                        value,
                                                      )
                                                    }
                                                  >
                                                    <SelectTrigger className="w-full">
                                                      <SelectValue placeholder="Cevaplama türü seçin" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      {availableResponseTypes.map((type) => (
                                                        <SelectItem key={type} value={type}>
                                                          {type}
                                                        </SelectItem>
                                                      ))}
                                                    </SelectContent>
                                                  </Select>
                                                </div>
                                                <div className="space-y-2">
                                                  <Label className="text-sm">Gösterge Ağırlığı (%)</Label>
                                                  <Input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={indicator.weight}
                                                    onChange={(e) =>
                                                      updateIndicatorWeight(
                                                        dimension.id,
                                                        criterion.id,
                                                        indicator.id,
                                                        Number(e.target.value),
                                                      )
                                                    }
                                                    placeholder="0-100"
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>

          {/* Özet Bilgiler */}
          {selectedDimensions.length > 0 && (
            <Card className="bg-gray-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{selectedDimensions.length}</div>
                      <div className="text-sm text-gray-600">Boyut</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {selectedDimensions.reduce((total, dim) => total + dim.criteria.length, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Kriter</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {selectedDimensions.reduce(
                          (total, dim) =>
                            total + dim.criteria.reduce((critTotal, crit) => critTotal + crit.indicators.length, 0),
                          0,
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Gösterge</div>
                    </div>
                  </div>
                  <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Model Yapısını Kaydet
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
