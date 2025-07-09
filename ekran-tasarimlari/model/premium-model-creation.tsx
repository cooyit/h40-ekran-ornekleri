"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  X,
  Search,
  Plus,
  Layers,
  BarChart3,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
  Globe,
  Users,
  Award,
  TrendingUp,
  Star,
  Crown,
  Sparkles,
  Target,
  Zap,
} from "lucide-react"

const languages = ["Türkçe", "İngilizce", "Almanca", "Fransızca", "İspanyolca"]
const hospitalTypes = [
  "Genel Hastane",
  "Özel Hastane",
  "Branş Hastanesi",
  "Eğitim Araştırma Hastanesi",
  "Devlet Hastanesi",
  "Üniversite Hastanesi",
]
const userTypes = ["İdari Personel", "Tıbbi Personel", "Teknik Personel", "Hemşire", "Doktor", "Yönetici"]

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

// Örnek göstergeler (boyuta göre)
const availableIndicators: Record<string, string[]> = {
  "Teknolojik Altyapı": [
    "Sunucu Kapasitesi",
    "İstemci Bilgisayar Sayısı",
    "Mobil Cihaz Desteği",
    "Yedek Donanım Mevcudiyeti",
    "Donanım Yaşı",
    "Performans Metrikleri",
    "Bakım Sıklığı",
    "Ağ Hızı",
    "Güvenlik Duvarı",
    "Veri Yedekleme",
  ],
  "İnsan Kaynakları": [
    "IT Personel Sayısı",
    "Sertifika Durumu",
    "Deneyim Süresi",
    "Teknik Bilgi Seviyesi",
    "Eğitim Saatleri",
    "Performans Değerlendirmesi",
    "Kullanıcı Memnuniyeti",
    "Destek Hızı",
  ],
  "Süreç Yönetimi": [
    "İş Akışları",
    "Standart Operasyon Prosedürleri",
    "Performans Ölçümleri",
    "Sürekli İyileştirme",
    "Dokümantasyon",
    "Kalite Kontrol",
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

const availableLevels = ["Seviye 1", "Seviye 2", "Seviye 3", "Seviye 4", "Seviye 5"]

interface Indicator {
  id: string
  name: string
  responseType: string
  weight: number
  selectedLevels: string[]
}

interface Dimension {
  id: string
  name: string
  weight: number
  indicators: Indicator[]
}

export default function PremiumModelCreation() {
  const [activeTab, setActiveTab] = useState("tab1")

  // Tab 1 - Temel Bilgiler
  const [formData, setFormData] = useState({
    language: "",
    modelName: "",
    modelShortName: "",
    modelTags: "",
    modelType: "", // Make this selectable
    hierarchy: "", // Make this selectable
    userScope: "", // Make this selectable
  })
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedHospitalTypes, setSelectedHospitalTypes] = useState<string[]>([])
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([])
  const [selectedUserForContinue, setSelectedUserForContinue] = useState("")
  const [levelSearch, setLevelSearch] = useState("")
  const [hospitalSearch, setHospitalSearch] = useState("")
  const [userTypeSearch, setUserTypeSearch] = useState("")

  // Tab 2 - Model Yapısı
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>([])
  const [dimensionSearch, setDimensionSearch] = useState("")
  const [indicatorSearch, setIndicatorSearch] = useState("")
  const [activeSearchType, setActiveSearchType] = useState<string | null>(null)
  const [activeDimensionId, setActiveDimensionId] = useState<string | null>(null)

  // Tab 1 Functions
  const addLevel = (level: string) => {
    if (!selectedLevels.includes(level)) {
      setSelectedLevels([...selectedLevels, level])
    }
    setLevelSearch("")
  }

  const removeLevel = (level: string) => {
    setSelectedLevels(selectedLevels.filter((l) => l !== level))
  }

  const addHospitalType = (type: string) => {
    if (!selectedHospitalTypes.includes(type)) {
      setSelectedHospitalTypes([...selectedHospitalTypes, type])
    }
    setHospitalSearch("")
  }

  const removeHospitalType = (type: string) => {
    setSelectedHospitalTypes(selectedHospitalTypes.filter((t) => t !== type))
  }

  const addUserType = (userType: string) => {
    if (!selectedUserTypes.includes(userType)) {
      setSelectedUserTypes([...selectedUserTypes, userType])
    }
    setUserTypeSearch("")
  }

  const removeUserType = (userType: string) => {
    setSelectedUserTypes(selectedUserTypes.filter((t) => t !== userType))
    if (selectedUserForContinue === userType) {
      setSelectedUserForContinue("")
    }
  }

  // Tab 2 Functions
  const addDimension = (dimensionName: string) => {
    const newDimension: Dimension = {
      id: Date.now().toString(),
      name: dimensionName,
      weight: 0,
      indicators: [],
    }
    setSelectedDimensions([...selectedDimensions, newDimension])
    setDimensionSearch("")
    setActiveSearchType(null)
  }

  const removeDimension = (dimensionId: string) => {
    setSelectedDimensions(selectedDimensions.filter((d) => d.id !== dimensionId))
  }

  const addIndicator = (dimensionId: string, indicatorName: string) => {
    const newIndicator: Indicator = {
      id: Date.now().toString(),
      name: indicatorName,
      responseType: "",
      weight: 0,
      selectedLevels: [],
    }

    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? { ...dimension, indicators: [...dimension.indicators, newIndicator] }
          : dimension,
      ),
    )
    setIndicatorSearch("")
    setActiveSearchType(null)
    setActiveDimensionId(null)
  }

  const removeIndicator = (dimensionId: string, indicatorId: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? { ...dimension, indicators: dimension.indicators.filter((i) => i.id !== indicatorId) }
          : dimension,
      ),
    )
  }

  const updateIndicatorResponseType = (dimensionId: string, indicatorId: string, responseType: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              indicators: dimension.indicators.map((indicator) =>
                indicator.id === indicatorId ? { ...indicator, responseType } : indicator,
              ),
            }
          : dimension,
      ),
    )
  }

  const updateIndicatorLevels = (dimensionId: string, indicatorId: string, levels: string[]) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              indicators: dimension.indicators.map((indicator) =>
                indicator.id === indicatorId ? { ...indicator, selectedLevels: levels } : indicator,
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

  const updateIndicatorWeight = (dimensionId: string, indicatorId: string, weight: number) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? {
              ...dimension,
              indicators: dimension.indicators.map((indicator) =>
                indicator.id === indicatorId ? { ...indicator, weight } : indicator,
              ),
            }
          : dimension,
      ),
    )
  }

  const normalizeWeights = () => {
    setSelectedDimensions((prevDimensions) => {
      return prevDimensions.map((dimension) => {
        const totalDimensionWeight = prevDimensions.reduce((sum, dim) => sum + (dim.weight || 0), 0)
        const normalizedDimensionWeight =
          totalDimensionWeight > 0
            ? Math.round((dimension.weight / totalDimensionWeight) * 100)
            : Math.round(100 / prevDimensions.length)

        const totalIndicatorWeight = dimension.indicators.reduce((sum, ind) => sum + (ind.weight || 0), 0)
        const normalizedIndicators = dimension.indicators.map((indicator) => {
          const normalizedIndicatorWeight =
            totalIndicatorWeight > 0
              ? Math.round((indicator.weight / totalIndicatorWeight) * 100)
              : Math.round(100 / dimension.indicators.length)

          return {
            ...indicator,
            weight: normalizedIndicatorWeight,
          }
        })

        return {
          ...dimension,
          weight: normalizedDimensionWeight,
          indicators: normalizedIndicators,
        }
      })
    })
  }

  // Navigation Functions
  const canGoNext = (currentTab: string): boolean => {
    switch (currentTab) {
      case "tab1":
        return (
          formData.language !== "" &&
          formData.modelName !== "" &&
          formData.userScope !== "" &&
          formData.modelType !== "" &&
          formData.hierarchy !== "" &&
          selectedLevels.length > 0 &&
          selectedHospitalTypes.length > 0 &&
          selectedUserTypes.length > 0 &&
          selectedUserForContinue !== ""
        )
      case "tab2":
        return selectedDimensions.length > 0
      default:
        return false
    }
  }

  const handleNext = () => {
    switch (activeTab) {
      case "tab1":
        if (canGoNext("tab1")) {
          setActiveTab("tab2")
          // Diğer kullanıcı türleri için taslak oluşturulduğunu bildir
          const otherUsers = selectedUserTypes.filter((u) => u !== selectedUserForContinue)
          if (otherUsers.length > 0) {
            setTimeout(() => {
              alert(
                `${otherUsers.join(", ")} kullanıcı türleri için taslak modeller oluşturuldu. Şimdi ${selectedUserForContinue} için detaylı model yapısını oluşturabilirsiniz.`,
              )
            }, 500)
          }
        } else {
          alert("Lütfen tüm zorunlu alanları doldurun ve devam edilecek kullanıcı türünü seçin!")
        }
        break
      case "tab2":
        if (canGoNext("tab2")) {
          alert("Model başarıyla tamamlandı!")
        } else {
          alert("Lütfen en az bir boyut ekleyin!")
        }
        break
    }
  }

  const handlePrevious = () => {
    switch (activeTab) {
      case "tab2":
        setActiveTab("tab1")
        break
    }
  }

  const handleSaveAndExit = () => {
    console.log("Saving premium data:", {
      formData,
      selectedLevels,
      selectedHospitalTypes,
      selectedUserTypes,
      selectedUserForContinue,
      selectedDimensions,
    })
    alert("Model verileri başarıyla kaydedildi!")
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card className="border-2 border-gradient-to-r from-purple-500 to-pink-500 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
          <CardTitle className="text-3xl flex items-center gap-3">
            <Crown className="h-8 w-8" />
             Model Oluşturma
            <Badge className="bg-yellow-400 text-yellow-900 ml-2">
              <Sparkles className="h-4 w-4 mr-1" />
              Model
            </Badge>
          </CardTitle>
          <p className="text-purple-100 mt-2">Gelişmiş seviyeli değerlendirme modeli - Boyut-Gösterge hiyerarşisi</p>
          {selectedUserForContinue && (
            <div className="mt-3">
              <Badge className="bg-white/20 text-white border-white/30 px-3 py-1">
                <Users className="h-4 w-4 mr-2" />
                Aktif Kullanıcı Türü: {selectedUserForContinue}
              </Badge>
            </div>
          )}
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg">
              <TabsTrigger
                value="tab1"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Temel Bilgiler
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white flex items-center gap-2"
                disabled={!selectedUserForContinue}
              >
                <Zap className="h-4 w-4" />
                Değerlendirme Yapısı
              </TabsTrigger>
            </TabsList>

            {/* Tab 1 - Temel Bilgiler */}
            <TabsContent value="tab1" className="space-y-6">
              <Card className="border-2 border-purple-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-purple-600" />
                    Model Temel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Model için dil seçiniz *</Label>
                      <Select
                        value={formData.language}
                        onValueChange={(value) => setFormData({ ...formData, language: value })}
                      >
                        <SelectTrigger className="border-purple-200 focus:border-purple-500">
                          <SelectValue placeholder="Dil seçiniz" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                              {lang}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelName">Model Adı *</Label>
                      <Input
                        id="modelName"
                        placeholder="Örn:  Dijital Sağlık Değerlendirmesi"
                        value={formData.modelName}
                        onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelShortName">Model Kısa Adı</Label>
                      <Input
                        id="modelShortName"
                        placeholder="Örn: PDSD TR"
                        value={formData.modelShortName}
                        onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelTags">Model Etiketleri</Label>
                      <Input
                        id="modelTags"
                        placeholder="Örn: , seviyeli, boyut-gösterge"
                        value={formData.modelTags}
                        onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                        className="border-purple-200 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {/* Seçilebilir Premium Seçenekler */}
                  <div className="space-y-6">
                    {/* Kullanıcı Kapsamı Seçimi */}
                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Kullanıcı Kapsamı Seçiniz *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            formData.userScope === "tekli"
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setFormData({ ...formData, userScope: "tekli" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Users className="h-8 w-8 text-blue-600" />
                              <div>
                                <Label className="font-medium text-blue-900 cursor-pointer">Tek Anket</Label>
                                <p className="text-sm text-blue-700">Tek kullanıcı türü için anket</p>
                                {formData.userScope === "tekli" && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">✓ Seçili</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            formData.userScope === "coklu"
                              ? "border-purple-500 bg-purple-50 shadow-lg"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          onClick={() => setFormData({ ...formData, userScope: "coklu" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Users className="h-8 w-8 text-purple-600" />
                              <div>
                                <Label className="font-medium text-purple-900 cursor-pointer">Çoklu Anket</Label>
                                <p className="text-sm text-purple-700">Birden fazla kullanıcı türü</p>
                                {formData.userScope === "coklu" && (
                                  <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">
                                    ✓ Seçili (Önerilen)
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Model Türü Seçimi */}
                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Model Türü Seçiniz *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            formData.modelType === "puanli"
                              ? "border-green-500 bg-green-50 shadow-lg"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          onClick={() => setFormData({ ...formData, modelType: "puanli" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <BarChart3 className="h-8 w-8 text-green-600" />
                              <div>
                                <Label className="font-medium text-green-900 cursor-pointer">Puan Esaslı</Label>
                                <p className="text-sm text-green-700">Toplam puan hesaplama</p>
                                {formData.modelType === "puanli" && (
                                  <Badge className="bg-green-100 text-green-800 text-xs mt-1">✓ Seçili</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            formData.modelType === "seviyeli"
                              ? "border-orange-500 bg-orange-50 shadow-lg"
                              : "border-gray-200 hover:border-orange-300"
                          }`}
                          onClick={() => setFormData({ ...formData, modelType: "seviyeli" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Award className="h-8 w-8 text-orange-600" />
                              <div>
                                <Label className="font-medium text-orange-900 cursor-pointer">Seviye Esaslı</Label>
                                <p className="text-sm text-orange-700">Seviye belirleme sistemi</p>
                                {formData.modelType === "seviyeli" && (
                                  <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">
                                    ✓ Seçili (Önerilen)
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    {/* Hiyerarşi Seçimi */}
                    <div className="space-y-3">
                      <Label className="text-lg font-medium">Hiyerarşi Seçiniz *</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            formData.hierarchy === "kriter-altkriter"
                              ? "border-indigo-500 bg-indigo-50 shadow-lg"
                              : "border-gray-200 hover:border-indigo-300"
                          }`}
                          onClick={() => setFormData({ ...formData, hierarchy: "kriter-altkriter" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Layers className="h-8 w-8 text-indigo-600" />
                              <div>
                                <Label className="font-medium text-indigo-900 cursor-pointer">
                                  Kriter - Alt Kriter
                                </Label>
                                <p className="text-sm text-indigo-700">Geleneksel hiyerarşi</p>
                                {formData.hierarchy === "kriter-altkriter" && (
                                  <Badge className="bg-indigo-100 text-indigo-800 text-xs mt-1">✓ Seçili</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className={`cursor-pointer transition-all border-2 ${
                            formData.hierarchy === "boyut-gosterge"
                              ? "border-blue-500 bg-blue-50 shadow-lg"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                          onClick={() => setFormData({ ...formData, hierarchy: "boyut-gosterge" })}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <Layers className="h-8 w-8 text-blue-600" />
                              <div>
                                <Label className="font-medium text-blue-900 cursor-pointer">Boyut - Gösterge</Label>
                                <p className="text-sm text-blue-700">Gelişmiş hiyerarşi</p>
                                {formData.hierarchy === "boyut-gosterge" && (
                                  <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">✓ Seçili (Önerilen)</Badge>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-medium">Model için Seviye Ekleyiniz *</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Seviye Ara"
                        value={levelSearch}
                        onChange={(e) => setLevelSearch(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    
                    {levelSearch && (
                        <div className="border rounded-md p-2 bg-white shadow-sm max-h-48 overflow-auto">
                          {availableLevels
                            .filter((lvl) =>
                              lvl.toLowerCase().includes(levelSearch.toLowerCase())
                            )
                            .map((lvl) => (
                              <div
                                key={lvl}
                                className="p-2 hover:bg-purple-50 cursor-pointer rounded"
                                onClick={() => {
                                  // tıklanan elemanın availableLevels içindeki index'ini al
                                  const idx = availableLevels.findIndex((x) => x === lvl)
                                  if (idx === -1) return
                      
                                  // 0'dan idx'e kadar slice al
                                  const range = availableLevels.slice(0, idx + 1)
                      
                                  // önceki seçilileri de koru ve duplicate'ları at
                                  setSelectedLevels((prev) =>
                                    Array.from(new Set([...prev, ...range]))
                                  )
                      
                                  // istersen aramayı temizle, listeyi kapatmak için
                                  setLevelSearch("")
                                }}
                              >
                                {lvl}
                              </div>
                            ))}
                        </div>
                    )}
                      
                    
                    <div className="flex flex-wrap gap-2">
                      {selectedLevels.map((level) => (
                        <Badge
                          key={level}
                          className="bg-purple-100 text-purple-800 border-purple-200 flex items-center gap-1"
                        >
                          {level}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeLevel(level)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-medium">Model için Hastane Türleri Ekleyiniz *</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Hastane Türü Ara"
                        value={hospitalSearch}
                        onChange={(e) => setHospitalSearch(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    {hospitalSearch && (
                      <div className="border rounded-md p-2 bg-white shadow-sm">
                        {hospitalTypes
                          .filter((type) => type.toLowerCase().includes(hospitalSearch.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="p-2 hover:bg-purple-50 cursor-pointer rounded"
                              onClick={() => addHospitalType(type)}
                            >
                              {type}
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {selectedHospitalTypes.map((type) => (
                        <Badge
                          key={type}
                          className="bg-indigo-100 text-indigo-800 border-indigo-200 flex items-center gap-1"
                        >
                          {type}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeHospitalType(type)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Yeni Kullanıcı Türleri Bölümü - Arama ile Ekleme */}
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Kullanıcı Türlerini Ekleyiniz *</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Kullanıcı Türü Ara"
                        value={userTypeSearch}
                        onChange={(e) => setUserTypeSearch(e.target.value)}
                        className="pl-10 border-purple-200 focus:border-purple-500"
                      />
                    </div>
                    {userTypeSearch && (
                      <div className="border rounded-md p-2 bg-white shadow-sm">
                        {userTypes
                          .filter((type) => type.toLowerCase().includes(userTypeSearch.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="p-2 hover:bg-purple-50 cursor-pointer rounded"
                              onClick={() => addUserType(type)}
                            >
                              {type}
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {selectedUserTypes.map((type) => (
                        <Badge
                          key={type}
                          className="bg-green-100 text-green-800 border-green-200 flex items-center gap-1"
                        >
                          {type}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeUserType(type)} />
                        </Badge>
                      ))}
                    </div>

                    {/* Devam Edilecek Kullanıcı Türü Seçimi */}
                    {selectedUserTypes.length > 0 && (
                      <div className="space-y-3 mt-6">
                        <Label className="text-lg font-medium">Hangi Kullanıcı Türü ile Devam Edilecek? *</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedUserTypes.map((userType) => (
                            <Card
                              key={userType}
                              className={`cursor-pointer transition-all border-2 ${
                                selectedUserForContinue === userType
                                  ? "border-green-500 bg-green-50 shadow-lg"
                                  : "border-gray-200 hover:border-green-300"
                              }`}
                              onClick={() => setSelectedUserForContinue(userType)}
                            >
                              <CardContent className="p-4">
                                <div className="flex items-center gap-3">
                                  <Checkbox
                                    checked={selectedUserForContinue === userType}
                                    onChange={() => setSelectedUserForContinue(userType)}
                                    className="border-green-500"
                                  />
                                  <div>
                                    <Label className="font-medium cursor-pointer text-green-900">{userType}</Label>
                                    <p className="text-sm text-green-700">Bu kullanıcı türü ile devam et</p>
                                    {selectedUserForContinue === userType && (
                                      <Badge className="bg-green-100 text-green-800 text-xs mt-1">
                                        ✓ Devam Edilecek
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>

                        {selectedUserForContinue && (
                          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <Target className="h-5 w-5 text-green-600" />
                                <div>
                                  <p className="font-medium text-green-800">
                                    Seçilen Devam Türü: {selectedUserForContinue}
                                  </p>
                                  <p className="text-sm text-green-700">
                                    Diğer seçili türler (
                                    {selectedUserTypes.filter((u) => u !== selectedUserForContinue).join(", ")}) için
                                    taslak modeller oluşturulacak.
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2 - Değerlendirme Yapısı */}
            <TabsContent value="tab2" className="space-y-6">
              <Card className="border-2 border-indigo-200 shadow-lg bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
                <CardHeader className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                         Değerlendirme Yapısı - Boyut-Gösterge
                      </CardTitle>
                      <p className="text-indigo-100 mt-1">
                        {selectedUserForContinue} kullanıcı türü için seviyeli boyut-gösterge yapısını oluşturun
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={normalizeWeights}
                        className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                      >
                        <TrendingUp className="h-4 w-4 mr-2" />
                        Ağırlıkları Normalize Et
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  {/* Boyut Ekleme Bölümü */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-lg font-medium flex items-center gap-2">
                        <Layers className="h-5 w-5 text-indigo-600" />
                        Değerlendirme Boyutları
                      </Label>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveSearchType(activeSearchType === "dimension" ? null : "dimension")}
                        className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 border-indigo-200"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Boyut Ekle
                      </Button>
                    </div>

                    {activeSearchType === "dimension" && (
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Input
                            placeholder="Boyut ara veya yeni boyut adı yazın..."
                            value={dimensionSearch}
                            onChange={(e) => setDimensionSearch(e.target.value)}
                            className="pl-10 border-indigo-200 focus:border-indigo-500"
                          />
                        </div>
                        {dimensionSearch && (
                          <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                            {availableDimensions
                              .filter((dim) => dim.toLowerCase().includes(dimensionSearch.toLowerCase()))
                              .map((dimension) => (
                                <div
                                  key={dimension}
                                  className="p-2 hover:bg-indigo-50 cursor-pointer rounded"
                                  onClick={() => addDimension(dimension)}
                                >
                                  {dimension}
                                </div>
                              ))}
                            {!availableDimensions.some(
                              (dim) => dim.toLowerCase() === dimensionSearch.toLowerCase(),
                            ) && (
                              <div
                                className="p-2 hover:bg-indigo-50 cursor-pointer rounded border-t text-indigo-600"
                                onClick={() => addDimension(dimensionSearch)}
                              >
                                + "{dimensionSearch}" boyutunu ekle
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Boyutlar Listesi - Premium Tasarım */}
                    <div className="space-y-6">
                      {selectedDimensions.length === 0 ? (
                        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-indigo-300 shadow-inner">
                          <div className="relative">
                            <Star className="h-20 w-20 mx-auto mb-4 text-indigo-400" />
                            <Sparkles className="h-8 w-8 absolute top-0 right-1/2 transform translate-x-8 text-pink-400" />
                          </div>
                          <h3 className="text-xl font-bold text-indigo-900 mb-2"> Boyutları Ekleyin</h3>
                          <p className="text-indigo-600 mb-6 max-w-md mx-auto">
                            {selectedUserForContinue} kullanıcı türü için gelişmiş boyut-gösterge yapısını tanımlayın
                          </p>
                          <Button
                            onClick={() => setActiveSearchType("dimension")}
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            İlk  Boyutu Ekle
                          </Button>
                        </div>
                      ) : (
                        <div className="grid gap-8">
                          {selectedDimensions.map((dimension, index) => (
                            <Card
                              key={dimension.id}
                              className="border-l-8 border-l-indigo-500 shadow-2xl bg-gradient-to-r from-white via-indigo-50 to-purple-50"
                            >
                              <CardHeader className="bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                                      {index + 1}
                                    </div>
                                    <div>
                                      <h3 className="text-xl font-bold text-indigo-900">{dimension.name}</h3>
                                      <div className="flex items-center gap-3 mt-2">
                                        <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200">
                                          <BarChart3 className="h-3 w-3 mr-1" />
                                          {dimension.indicators.length} gösterge
                                        </Badge>
                                        <Badge className="bg-purple-100 text-purple-800 border-purple-200">
                                          <Crown className="h-3 w-3 mr-1" />
                                           Boyut
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200 px-4 py-2 text-lg">
                                      %{dimension.weight} ağırlık
                                    </Badge>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                          <MoreHorizontal className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                          <Eye className="h-4 w-4 mr-2" />
                                          Detayını Gör
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
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
                              </CardHeader>
                              <CardContent className="p-8">
                                <div className="space-y-8">
                                  {/* Boyut Ağırlığı */}
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
                                    <div className="space-y-2">
                                      <Label className="text-sm font-medium flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-indigo-600" />
                                        Boyut Ağırlığı (%)
                                      </Label>
                                      <Input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={dimension.weight}
                                        onChange={(e) => updateDimensionWeight(dimension.id, Number(e.target.value))}
                                        placeholder="0-100"
                                        className="bg-white border-indigo-200 focus:border-indigo-500"
                                      />
                                    </div>
                                    <div className="flex items-end">
                                      <div className="text-sm text-indigo-700">
                                        Bu boyutun toplam değerlendirmedeki ağırlık oranı
                                      </div>
                                    </div>
                                    <div className="flex items-end justify-end">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setActiveDimensionId(dimension.id)
                                          setActiveSearchType(activeSearchType === "indicator" ? null : "indicator")
                                        }}
                                        className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 hover:from-purple-100 hover:to-pink-100 border-purple-200"
                                      >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Gösterge Ekle
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Gösterge Arama */}
                                  {activeSearchType === "indicator" && activeDimensionId === dimension.id && (
                                    <div className="space-y-2">
                                      <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                        <Input
                                          placeholder="Gösterge ara veya yeni gösterge adı yazın..."
                                          value={indicatorSearch}
                                          onChange={(e) => setIndicatorSearch(e.target.value)}
                                          className="pl-10 border-purple-200 focus:border-purple-500"
                                        />
                                      </div>
                                      {indicatorSearch && (
                                        <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                                          {(availableIndicators[dimension.name] || [])
                                            .filter((ind) => ind.toLowerCase().includes(indicatorSearch.toLowerCase()))
                                            .map((indicator) => (
                                              <div
                                                key={indicator}
                                                className="p-2 hover:bg-purple-50 cursor-pointer rounded"
                                                onClick={() => addIndicator(dimension.id, indicator)}
                                              >
                                                {indicator}
                                              </div>
                                            ))}
                                          {!(availableIndicators[dimension.name] || []).some(
                                            (ind) => ind.toLowerCase() === indicatorSearch.toLowerCase(),
                                          ) && (
                                            <div
                                              className="p-2 hover:bg-purple-50 cursor-pointer rounded border-t text-purple-600"
                                              onClick={() => addIndicator(dimension.id, indicatorSearch)}
                                            >
                                              + "{indicatorSearch}" göstergesini ekle
                                            </div>
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  )}

                                  {/* Göstergeler */}
                                  <div className="space-y-6">
                                    {dimension.indicators.length === 0 ? (
                                      <div className="text-center py-12 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border-2 border-dashed border-purple-300">
                                        <BarChart3 className="h-16 w-16 mx-auto mb-4 text-purple-400" />
                                        <p className="text-purple-600 mb-4">Bu boyut için henüz gösterge eklenmedi</p>
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            setActiveDimensionId(dimension.id)
                                            setActiveSearchType("indicator")
                                          }}
                                          className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-purple-200"
                                        >
                                          <Plus className="h-4 w-4 mr-2" />
                                          İlk Göstergeyi Ekle
                                        </Button>
                                      </div>
                                    ) : (
                                      <div className="space-y-4">
                                        <Label className="font-medium flex items-center gap-2 text-lg">
                                          <BarChart3 className="h-5 w-5 text-purple-600" />
                                           Göstergeler ({dimension.indicators.length})
                                        </Label>
                                        {dimension.indicators.map((indicator, indicatorIndex) => (
                                          <Card
                                            key={indicator.id}
                                            className="border-l-4 border-l-purple-500 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 shadow-lg"
                                          >
                                            <CardContent className="p-6">
                                              <div className="space-y-6">
                                                <div className="flex items-center justify-between">
                                                  <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                                                      {indicatorIndex + 1}
                                                    </div>
                                                    <div>
                                                      <span className="font-bold text-purple-900 text-lg">
                                                        {indicator.name}
                                                      </span>
                                                      <div className="flex items-center gap-2 mt-1">
                                                        <Badge className="bg-pink-100 text-pink-800 border-pink-200 text-xs">
                                                          {indicator.selectedLevels.length} seviye seçili
                                                        </Badge>
                                                        <Badge className="bg-orange-100 text-orange-800 border-orange-200 text-xs">
                                                          %{indicator.weight} ağırlık
                                                        </Badge>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                      </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                      <DropdownMenuItem>
                                                        <Eye className="h-4 w-4 mr-2" />
                                                        Detayını Gör
                                                      </DropdownMenuItem>
                                                      <DropdownMenuItem>
                                                        <Copy className="h-4 w-4 mr-2" />
                                                        Kopyala
                                                      </DropdownMenuItem>
                                                      <DropdownMenuSeparator />
                                                      <DropdownMenuItem
                                                        onClick={() => removeIndicator(dimension.id, indicator.id)}
                                                        className="text-red-600"
                                                      >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Sil
                                                      </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                  </DropdownMenu>
                                                </div>

                                                {/* Gösterge Detayları */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                  <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Cevaplama Türü</Label>
                                                    <Select
                                                      value={indicator.responseType}
                                                      onValueChange={(value) =>
                                                        updateIndicatorResponseType(dimension.id, indicator.id, value)
                                                      }
                                                    >
                                                      <SelectTrigger className="w-full bg-white border-purple-200 focus:border-purple-500">
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
                                                    <Label className="text-sm font-medium">Gösterge Ağırlığı (%)</Label>
                                                    <Input
                                                      type="number"
                                                      min="0"
                                                      max="100"
                                                      value={indicator.weight}
                                                      onChange={(e) =>
                                                        updateIndicatorWeight(
                                                          dimension.id,
                                                          indicator.id,
                                                          Number(e.target.value),
                                                        )
                                                      }
                                                      placeholder="0-100"
                                                      className="bg-white border-purple-200 focus:border-purple-500"
                                                    />
                                                  </div>
                                                  <div className="space-y-2">
                                                    <Label className="text-sm font-medium">Seviye Seçimi *</Label>
                                                    <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-white border-purple-200">
                                                      {selectedLevels.map((level) => (
                                                        <div key={level} className="flex items-center space-x-2">
                                                          <Checkbox
                                                            id={`${indicator.id}-${level}`}
                                                            checked={indicator.selectedLevels.includes(level)}
                                                            onCheckedChange={(checked) => {
                                                              const newLevels = checked
                                                                ? [...indicator.selectedLevels, level]
                                                                : indicator.selectedLevels.filter((l) => l !== level)
                                                              updateIndicatorLevels(
                                                                dimension.id,
                                                                indicator.id,
                                                                newLevels,
                                                              )
                                                            }}
                                                            className="border-purple-500"
                                                          />
                                                          <Label
                                                            htmlFor={`${indicator.id}-${level}`}
                                                            className="text-sm cursor-pointer"
                                                          >
                                                            {level}
                                                          </Label>
                                                        </div>
                                                      ))}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            </CardContent>
                                          </Card>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Premium Özet Bilgiler */}
                    {selectedDimensions.length > 0 && (
                      <Card className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 shadow-xl">
                        <CardContent className="p-8">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-12">
                              <div className="text-center">
                                <div className="text-4xl font-bold text-indigo-600 mb-1">
                                  {selectedDimensions.length}
                                </div>
                                <div className="text-sm text-gray-600 font-medium"> Boyut</div>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-purple-600 mb-1">
                                  {selectedDimensions.reduce((total, dim) => total + dim.indicators.length, 0)}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Seviyeli Gösterge</div>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-pink-600 mb-1">
                                  {selectedUserForContinue ? "1" : "0"}
                                </div>
                                <div className="text-sm text-gray-600 font-medium">Aktif Kullanıcı</div>
                              </div>
                              <div className="text-center">
                                <div className="text-4xl font-bold text-orange-600 mb-1">{selectedLevels.length}</div>
                                <div className="text-sm text-gray-600 font-medium">Seviye</div>
                              </div>
                            </div>
                            <div className="flex flex-col gap-3">
                              <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-4 py-2 text-lg">
                                <Crown className="h-5 w-5 mr-2" />
                                 Sistem
                              </Badge>
                              <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2">
                                <Users className="h-4 w-4 mr-2" />
                                {selectedUserForContinue}
                              </Badge>
                              <Badge className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 px-4 py-2">
                                <Award className="h-4 w-4 mr-2" />
                                Seviyeli
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Alt Navigasyon */}
            <div className="flex justify-between items-center pt-6 border-t border-purple-200">
              <div className="flex items-center gap-2">
                {activeTab === "tab2" && (
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    className="border-purple-200 text-purple-600 hover:bg-purple-50 bg-transparent"
                  >
                    Geri
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleSaveAndExit}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 hover:from-blue-100 hover:to-indigo-100 border-blue-200"
                >
                  Kaydet ve Çık
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                >
                  {activeTab === "tab1" ? "İleri" : " Tamamla"}
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
