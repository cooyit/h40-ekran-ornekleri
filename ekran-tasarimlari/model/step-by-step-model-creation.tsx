"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X, Search, Globe, Users, Award, Settings, Check } from "lucide-react"

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
  "Personel Yetkinliği": [
    "IT Personel Sayısı",
    "Sertifika Durumu",
    "Deneyim Süresi",
    "Teknik Bilgi Seviyesi",
    "Eğitim Saatleri",
    "Performans Değerlendirmesi",
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
  weight: number
  indicators: Indicator[]
}

interface Dimension {
  id: string
  name: string
  weight: number
  criteria: Criterion[]
}

const steps = [
  {
    id: 1,
    title: "Temel Bilgiler",
    subtitle: "Model adı ve dil bilgileri",
    icon: Globe,
  },
  {
    id: 2,
    title: "Model Özellikleri",
    subtitle: "Tür ve hiyerarşi seçimi",
    icon: Settings,
  },
  {
    id: 3,
    title: "Seviye & Hastane",
    subtitle: "Seviye ve hastane türleri",
    icon: Award,
  },
  {
    id: 4,
    title: "Kullanıcı Ayarları",
    subtitle: "Kullanıcı kapsamı ve türleri",
    icon: Users,
  },
]

export default function StepByStepModelCreation() {
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUserForContinue, setSelectedUserForContinue] = useState("")

  // Form Data
  const [formData, setFormData] = useState({
    language: "",
    modelName: "",
    modelShortName: "",
    modelTags: "",
    modelType: "",
    hierarchy: "",
    userScope: "",
  })
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedHospitalTypes, setSelectedHospitalTypes] = useState<string[]>([])
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([])
  const [levelSearch, setLevelSearch] = useState("")
  const [hospitalSearch, setHospitalSearch] = useState("")
  const [userSearch, setUserSearch] = useState("")

  // Model Structure
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>([])
  const [dimensionSearch, setDimensionSearch] = useState("")
  const [criterionSearch, setCriterionSearch] = useState("")
  const [indicatorSearch, setIndicatorSearch] = useState("")
  const [activeSearchType, setActiveSearchType] = useState<string | null>(null)
  const [activeDimensionId, setActiveDimensionId] = useState<string | null>(null)
  const [activeCriterionId, setActiveCriterionId] = useState<string | null>(null)

  // Helper Functions
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

  const addUserType = (type: string) => {
    if (!selectedUserTypes.includes(type)) {
      setSelectedUserTypes([...selectedUserTypes, type])
    }
    setUserSearch("")
  }

  const removeUserType = (type: string) => {
    setSelectedUserTypes(selectedUserTypes.filter((t) => t !== type))
  }

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

  const removeDimension = (dimensionId: string) => {
    setSelectedDimensions(selectedDimensions.filter((d) => d.id !== dimensionId))
  }

  const addCriterion = (dimensionId: string, criterionName: string) => {
    const newCriterion: Criterion = {
      id: Date.now().toString(),
      name: criterionName,
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

  const removeCriterion = (dimensionId: string, criterionId: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? { ...dimension, criteria: dimension.criteria.filter((c) => c.id !== criterionId) }
          : dimension,
      ),
    )
  }

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

  // Navigation Functions
  const canGoNext = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.language !== "" && formData.modelName !== ""
      case 2:
        return formData.modelType !== "" && formData.hierarchy !== ""
      case 3:
        return selectedHospitalTypes.length > 0 && (formData.modelType !== "seviyeli" || selectedLevels.length > 0)
      case 4:
        return formData.userScope !== "" && (formData.userScope !== "coklu" || selectedUserTypes.length > 0)
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canGoNext(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep])
      }

      if (currentStep === 4) {
        if (formData.userScope === "coklu" && selectedUserTypes.length > 1) {
          setShowUserModal(true)
        } else {
          alert("Model başarıyla oluşturuldu!")
        }
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      alert("Lütfen zorunlu alanları doldurun!")
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleUserSelection = (userType: string) => {
    setSelectedUserForContinue(userType)

    // Diğer kullanıcı türleri için taslak oluşturulduğunu bildir
    const otherUsers = selectedUserTypes.filter((u) => u !== userType)
    if (otherUsers.length > 0) {
      setTimeout(() => {
        alert(
          `${otherUsers.join(", ")} kullanıcı türleri için taslak modeller oluşturuldu. Şimdi ${userType} için detaylı model yapısını oluşturabilirsiniz.`,
        )
      }, 500)
    }

    alert("Model başarıyla oluşturuldu! Değerlendirme yapısı sayfasına yönlendiriliyorsunuz...")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="language">Model için dil seçiniz *</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
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
                  placeholder="Örn: Dijital Sağlık Değerlendirmesi"
                  value={formData.modelName}
                  onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelShortName">Model Kısa Adı</Label>
                <Input
                  id="modelShortName"
                  placeholder="Örn: DSD TR"
                  value={formData.modelShortName}
                  onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="modelTags">Model Etiketleri</Label>
                <Input
                  id="modelTags"
                  placeholder="Örn: puanlı, değerlendirme, sağlık"
                  value={formData.modelTags}
                  onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Model türünü belirleyiniz *</Label>
              <RadioGroup
                value={formData.modelType}
                onValueChange={(value) => setFormData({ ...formData, modelType: value })}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="seviyeli" id="seviyeli" />
                    <div>
                      <Label htmlFor="seviyeli" className="font-medium cursor-pointer">
                        Seviye Esaslı
                      </Label>
                      <p className="text-sm text-gray-600">Seviye bazlı değerlendirme</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="puanli" id="puanli" />
                    <div>
                      <Label htmlFor="puanli" className="font-medium cursor-pointer">
                        Puan Esaslı
                      </Label>
                      <p className="text-sm text-gray-600">Puan bazlı değerlendirme</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <Label className="text-lg font-medium">Model hiyerarşisini belirleyiniz *</Label>
              <RadioGroup
                value={formData.hierarchy}
                onValueChange={(value) => setFormData({ ...formData, hierarchy: value })}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="boyut-kriter-gosterge" id="boyut-kriter-gosterge" />
                    <div>
                      <Label htmlFor="boyut-kriter-gosterge" className="font-medium cursor-pointer">
                        Boyut - Kriter - Gösterge
                      </Label>
                      <p className="text-sm text-gray-600">3 seviyeli hiyerarşik yapı</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="boyut-gosterge" id="boyut-gosterge" />
                    <div>
                      <Label htmlFor="boyut-gosterge" className="font-medium cursor-pointer">
                        Boyut - Gösterge
                      </Label>
                      <p className="text-sm text-gray-600">2 seviyeli hiyerarşik yapı</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {formData.modelType === "seviyeli" && (
              <div className="space-y-3">
                <Label className="text-lg font-medium">Model için Seviye Ekleyiniz *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Seviye Ara"
                    value={levelSearch}
                    onChange={(e) => setLevelSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {levelSearch && (
                  <div className="border rounded-md p-2 bg-white shadow-sm">
                    {Array.from({ length: 10 }, (_, i) => `Seviye ${i + 1}`)
                      .filter((level) => level.toLowerCase().includes(levelSearch.toLowerCase()))
                      .map((level) => (
                        <div
                          key={level}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addLevel(level)}
                        >
                          {level}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedLevels.map((level) => (
                    <Badge key={level} variant="secondary" className="flex items-center gap-1">
                      {level}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeLevel(level)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <Label className="text-lg font-medium">Model için Hastane Türleri Ekleyiniz *</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Hastane Türü Ara"
                  value={hospitalSearch}
                  onChange={(e) => setHospitalSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              {hospitalSearch && (
                <div className="border rounded-md p-2 bg-white shadow-sm">
                  {hospitalTypes
                    .filter((type) => type.toLowerCase().includes(hospitalSearch.toLowerCase()))
                    .map((type) => (
                      <div
                        key={type}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addHospitalType(type)}
                      >
                        {type}
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedHospitalTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="flex items-center gap-1">
                    {type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeHospitalType(type)} />
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label className="text-lg font-medium">Model kullanıcı kapsamını belirleyiniz *</Label>
              <RadioGroup
                value={formData.userScope}
                onValueChange={(value) => setFormData({ ...formData, userScope: value })}
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="tek" id="tek" />
                    <div>
                      <Label htmlFor="tek" className="font-medium cursor-pointer">
                        Tek anket
                      </Label>
                      <p className="text-sm text-gray-600">Tüm kullanıcılar aynı anketi doldurur</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value="coklu" id="coklu" />
                    <div>
                      <Label htmlFor="coklu" className="font-medium cursor-pointer">
                        Çoklu Anket
                      </Label>
                      <p className="text-sm text-gray-600">Farklı kullanıcı türleri farklı anketler doldurur</p>
                    </div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {formData.userScope === "coklu" && (
              <div className="space-y-3">
                <Label className="text-lg font-medium">Model için Kullanıcı Türleri Ekleyiniz *</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Kullanıcı Türü Ara"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {userSearch && (
                  <div className="border rounded-md p-2 bg-white shadow-sm">
                    {userTypes
                      .filter((type) => type.toLowerCase().includes(userSearch.toLowerCase()))
                      .map((type) => (
                        <div
                          key={type}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addUserType(type)}
                        >
                          {type}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedUserTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeUserType(type)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yeni Model Oluştur</h1>
          <p className="text-gray-600">Adım adım model oluşturma süreci</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                      completedSteps.includes(step.id)
                        ? "bg-blue-600"
                        : currentStep === step.id
                          ? "bg-blue-600"
                          : "bg-gray-300"
                    }`}
                  >
                    {completedSteps.includes(step.id) ? <Check className="h-6 w-6" /> : step.id}
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-sm font-medium text-gray-900">{step.title}</div>
                    <div className="text-xs text-gray-500">{step.subtitle}</div>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 ${completedSteps.includes(step.id) ? "bg-blue-600" : "bg-gray-300"}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-lg">
          <CardHeader className="bg-blue-600 text-white">
            <CardTitle className="text-xl">
              Adım {currentStep}: {steps[currentStep - 1]?.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-6 bg-transparent"
          >
            Önceki
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canGoNext(currentStep)}
            className="px-6 bg-green-600 hover:bg-green-700"
          >
            {currentStep === 4 ? "Yeni Model Tanımla" : "İleri"}
          </Button>
        </div>

        {/* User Selection Modal */}
        <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Hangi kullanıcı türü için devam etmek istiyorsunuz?</DialogTitle>
              <DialogDescription>
                Seçtiğiniz kullanıcı türü için detaylı model yapısını oluşturacaksınız. Diğer kullanıcı türleri için
                taslak modeller otomatik oluşturulacak.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-3 py-4">
              {selectedUserTypes.map((userType) => (
                <Button
                  key={userType}
                  variant="outline"
                  onClick={() => handleUserSelection(userType)}
                  className="justify-start h-auto p-4 text-left"
                >
                  <div>
                    <div className="font-medium">{userType}</div>
                    <div className="text-sm text-gray-500">Bu kullanıcı türü için detaylı yapı oluştur</div>
                  </div>
                </Button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
