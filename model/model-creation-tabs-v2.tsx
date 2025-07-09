"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
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
  Target,
  BarChart3,
  MoreHorizontal,
  Eye,
  Copy,
  Trash2,
  Globe,
  TrendingUp,
  Info,
  Lightbulb,
  CheckCircle2,
  Users,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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

// Cevap türlerine göre seçenekler ve puanlar
const responseOptions: Record<
  string,
  { options: { value: string; label: string; score: number; suggestion: string }[] }
> = {
  "Evet/Hayır": {
    options: [
      { value: "yes", label: "Evet", score: 100, suggestion: "Mükemmel! Bu gereksinim tam olarak karşılanıyor." },
      {
        value: "no",
        label: "Hayır",
        score: 0,
        suggestion: "Bu alanda iyileştirme gerekiyor. Acil eylem planı oluşturun.",
      },
    ],
  },
  "1-5 Likert Ölçeği": {
    options: [
      {
        value: "1",
        label: "1 - Kesinlikle Katılmıyorum",
        score: 0,
        suggestion: "Kritik seviyede eksiklik var. Acil müdahale gerekli.",
      },
      {
        value: "2",
        label: "2 - Katılmıyorum",
        score: 25,
        suggestion: "Önemli eksiklikler mevcut. Kapsamlı iyileştirme planı yapın.",
      },
      {
        value: "3",
        label: "3 - Kararsızım",
        score: 50,
        suggestion: "Orta seviye. Daha fazla analiz ve iyileştirme gerekiyor.",
      },
      {
        value: "4",
        label: "4 - Katılıyorum",
        score: 75,
        suggestion: "İyi seviyede. Küçük iyileştirmelerle mükemmelleştirilebilir.",
      },
      {
        value: "5",
        label: "5 - Kesinlikle Katılıyorum",
        score: 100,
        suggestion: "Mükemmel! Bu alanda örnek teşkil ediyorsunuz.",
      },
    ],
  },
  "1-10 Puan Ölçeği": {
    options: [
      { value: "1", label: "1 - Çok Kötü", score: 0, suggestion: "Kritik durum. Acil eylem gerekli." },
      { value: "2", label: "2 - Kötü", score: 11, suggestion: "Ciddi eksiklikler var. Kapsamlı iyileştirme gerekli." },
      { value: "3", label: "3 - Zayıf", score: 22, suggestion: "Önemli iyileştirmeler yapılmalı." },
      { value: "4", label: "4 - Yetersiz", score: 33, suggestion: "Temel gereksinimleri karşılamıyor." },
      { value: "5", label: "5 - Orta", score: 44, suggestion: "Kabul edilebilir ama iyileştirilebilir." },
      { value: "6", label: "6 - Orta Üstü", score: 55, suggestion: "İyi yönde ama daha fazla gelişim gerekli." },
      { value: "7", label: "7 - İyi", score: 66, suggestion: "İyi seviyede. Küçük iyileştirmeler yapılabilir." },
      { value: "8", label: "8 - Çok İyi", score: 77, suggestion: "Çok iyi durumda. Sürdürülebilirliğe odaklanın." },
      { value: "9", label: "9 - Mükemmel", score: 88, suggestion: "Mükemmel seviye. Diğer alanlara örnek olabilir." },
      { value: "10", label: "10 - Kusursuz", score: 100, suggestion: "Kusursuz! Bu başarıyı sürdürün ve paylaşın." },
    ],
  },
  "Çoktan Seçmeli": {
    options: [
      {
        value: "a",
        label: "A) Hiç yok",
        score: 0,
        suggestion: "Bu alanda başlangıç seviyesindesiniz. Temel adımları atın.",
      },
      {
        value: "b",
        label: "B) Kısmen var",
        score: 33,
        suggestion: "Başlangıç yapılmış. Daha kapsamlı yaklaşım gerekli.",
      },
      {
        value: "c",
        label: "C) Büyük ölçüde var",
        score: 66,
        suggestion: "İyi ilerleme. Son aşamalar için çaba gösterin.",
      },
      { value: "d", label: "D) Tamamen var", score: 100, suggestion: "Mükemmel! Bu başarıyı koruyun ve geliştirin." },
    ],
  },
  "Sayısal Değer": {
    options: [
      {
        value: "input",
        label: "Sayısal değer giriniz",
        score: 0,
        suggestion: "Girdiğiniz değer analiz edilecek ve öneriler sunulacak.",
      },
    ],
  },
  "Yüzde Değeri": {
    options: [
      {
        value: "input",
        label: "Yüzde değeri giriniz (%)",
        score: 0,
        suggestion: "Yüzde değerinize göre özel öneriler sunulacak.",
      },
    ],
  },
  "Açık Uçlu": {
    options: [
      {
        value: "text",
        label: "Açıklama yazınız",
        score: 0,
        suggestion: "Detaylı açıklamanız uzmanlar tarafından değerlendirilecek.",
      },
    ],
  },
  "Tarih Seçimi": {
    options: [
      {
        value: "date",
        label: "Tarih seçiniz",
        score: 0,
        suggestion: "Seçtiğiniz tarihe göre zaman çizelgesi önerileri sunulacak.",
      },
    ],
  },
}

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

export default function ModelCreationTabsV2() {
  const [activeTab, setActiveTab] = useState("tab1")

  // Tab 1 - Temel Bilgiler
  const [formData, setFormData] = useState({
    language: "",
    modelName: "",
    modelShortName: "",
    modelTags: "",
    modelType: "puanli", // V2 için puanlı sabit
    hierarchy: "boyut-kriter-gosterge", // V2 için sabit
    userScope: "coklu", // V2 için çoklu sabit
  })
  const [selectedHospitalTypes, setSelectedHospitalTypes] = useState<string[]>([])
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([])
  const [hospitalSearch, setHospitalSearch] = useState("")
  const [userSearch, setUserSearch] = useState("")
  const [openUserTypeModal, setOpenUserTypeModal] = useState(false)

  // Tab 2 - Model Yapısı
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>([])
  const [dimensionSearch, setDimensionSearch] = useState("")
  const [criterionSearch, setCriterionSearch] = useState("")
  const [indicatorSearch, setIndicatorSearch] = useState("")
  const [activeSearchType, setActiveSearchType] = useState<string | null>(null)
  const [activeDimensionId, setActiveDimensionId] = useState<string | null>(null)
  const [activeCriterionId, setActiveCriterionId] = useState<string | null>(null)

  // Tab 3 - Önizleme
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(new Set())
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set())
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, any>>({})

  // Tab 1 Functions
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

  // Tab 2 Functions
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

  const normalizeWeights = () => {
    setSelectedDimensions((prevDimensions) => {
      return prevDimensions.map((dimension) => {
        const totalDimensionWeight = prevDimensions.reduce((sum, dim) => sum + (dim.weight || 0), 0)
        const normalizedDimensionWeight =
          totalDimensionWeight > 0
            ? Math.round((dimension.weight / totalDimensionWeight) * 100)
            : Math.round(100 / prevDimensions.length)

        const totalCriterionWeight = dimension.criteria.reduce((sum, crit) => sum + (crit.weight || 0), 0)
        const normalizedCriteria = dimension.criteria.map((criterion) => {
          const normalizedCriterionWeight =
            totalCriterionWeight > 0
              ? Math.round((criterion.weight / totalCriterionWeight) * 100)
              : Math.round(100 / dimension.criteria.length)

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

  // Tab 3 Functions
  const toggleDimension = (dimensionId: string) => {
    setExpandedDimensions((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(dimensionId)) {
        newSet.delete(dimensionId)
      } else {
        newSet.add(dimensionId)
      }
      return newSet
    })
  }

  const toggleCriterion = (criterionId: string) => {
    setExpandedCriteria((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(criterionId)) {
        newSet.delete(criterionId)
      } else {
        newSet.add(criterionId)
      }
      return newSet
    })
  }

  const handleAnswerChange = (indicatorId: string, value: any) => {
    setSurveyAnswers((prev) => ({
      ...prev,
      [indicatorId]: value,
    }))
  }

  const renderAnswerOptions = (indicator: Indicator) => {
    const options = responseOptions[indicator.responseType]
    if (!options) return null

    const currentAnswer = surveyAnswers[indicator.id]

    switch (indicator.responseType) {
      case "Evet/Hayır":
      case "1-5 Likert Ölçeği":
      case "1-10 Puan Ölçeği":
      case "Çoktan Seçmeli":
        return (
          <div className="space-y-3">
            <RadioGroup value={currentAnswer || ""} onValueChange={(value) => handleAnswerChange(indicator.id, value)}>
              {options.options.map((option) => (
                <div key={option.value} className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                    <RadioGroupItem value={option.value} id={`${indicator.id}-${option.value}`} />
                    <div className="flex-1">
                      <Label htmlFor={`${indicator.id}-${option.value}`} className="cursor-pointer font-medium">
                        {option.label}
                      </Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {option.score} puan
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {currentAnswer === option.value && (
                    <div className="ml-6 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-lg">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-800">{option.suggestion}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case "Sayısal Değer":
        return (
          <div className="space-y-3">
            <Input
              type="number"
              placeholder="Sayısal değer giriniz"
              value={currentAnswer || ""}
              onChange={(e) => handleAnswerChange(indicator.id, e.target.value)}
              className="w-full"
            />
            {currentAnswer && (
              <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-green-800">
                    Girilen değer: {currentAnswer}. Bu değer analiz edilecek ve detaylı öneriler sunulacak.
                  </p>
                </div>
              </div>
            )}
          </div>
        )

      case "Yüzde Değeri":
        return (
          <div className="space-y-3">
            <div className="relative">
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="0-100 arası değer"
                value={currentAnswer || ""}
                onChange={(e) => handleAnswerChange(indicator.id, e.target.value)}
                className="w-full pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
            </div>
            {currentAnswer && (
              <div className="p-3 bg-purple-50 border-l-4 border-purple-400 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-purple-800">
                    %{currentAnswer} oranında tamamlanmış.
                    {Number(currentAnswer) < 50
                      ? " İyileştirme gerekli."
                      : Number(currentAnswer) < 80
                        ? " İyi seviyede, daha da geliştirilebilir."
                        : " Mükemmel seviye!"}
                  </p>
                </div>
              </div>
            )}
          </div>
        )

      case "Açık Uçlu":
        return (
          <div className="space-y-3">
            <Textarea
              placeholder="Detaylı açıklama yazınız..."
              value={currentAnswer || ""}
              onChange={(e) => handleAnswerChange(indicator.id, e.target.value)}
              className="w-full min-h-[100px]"
            />
            {currentAnswer && (
              <div className="p-3 bg-orange-50 border-l-4 border-orange-400 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-orange-800">
                    Açıklamanız kaydedildi. Uzman değerlendirmesi sonrası özel öneriler sunulacak.
                  </p>
                </div>
              </div>
            )}
          </div>
        )

      case "Tarih Seçimi":
        return (
          <div className="space-y-3">
            <Input
              type="date"
              value={currentAnswer || ""}
              onChange={(e) => handleAnswerChange(indicator.id, e.target.value)}
              className="w-full"
            />
            {currentAnswer && (
              <div className="p-3 bg-indigo-50 border-l-4 border-indigo-400 rounded-r-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-indigo-800">
                    Seçilen tarih: {new Date(currentAnswer).toLocaleDateString("tr-TR")}. Zaman çizelgesi önerileri
                    hazırlanacak.
                  </p>
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  // Navigation Functions
  const canGoNext = (currentTab: string): boolean => {
    switch (currentTab) {
      case "tab1":
        return formData.language !== "" && formData.modelName !== ""
      case "tab2":
        return selectedDimensions.length > 0
      case "tab3":
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    switch (activeTab) {
      case "tab1":
        if (canGoNext("tab1")) {
          if (formData.userScope === "coklu") {
            setOpenUserTypeModal(true)
          } else {
            setActiveTab("tab2")
          }
        } else alert("Lütfen zorunlu alanları doldurun!")
        break
      case "tab2":
        if (canGoNext("tab2")) setActiveTab("tab3")
        else alert("Lütfen en az bir boyut ekleyin!")
        break
      case "tab3":
        alert("Puanlı model başarıyla tamamlandı!")
        break
    }
  }

  const handlePrevious = () => {
    switch (activeTab) {
      case "tab2":
        setActiveTab("tab1")
        break
      case "tab3":
        setActiveTab("tab2")
        break
    }
  }

  const handleSaveAndExit = () => {
    console.log("Saving V2 data:", {
      formData,
      selectedHospitalTypes,
      selectedUserTypes,
      selectedDimensions,
      surveyAnswers,
    })
    alert("Puanlı model verileri başarıyla kaydedildi!")
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card className="border-2 border-orange-200 shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white">
          <CardTitle className="text-3xl flex items-center gap-3">
            <TrendingUp className="h-8 w-8" />
            Puanlı Model Oluşturma Sistemi
            <Badge className="bg-yellow-400 text-yellow-900 ml-2">
              <BarChart3 className="h-4 w-4 mr-1" />
              PUANLI
            </Badge>
          </CardTitle>
          <p className="text-orange-100 mt-2">Puan esaslı değerlendirme modeli - Boyut-Kriter-Gösterge hiyerarşisi</p>
        </CardHeader>
        <CardContent className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-white/70 backdrop-blur-sm rounded-lg shadow-lg">
              <TabsTrigger
                value="tab1"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Temel Bilgiler
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-600 data-[state=active]:to-pink-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Layers className="h-4 w-4" />
                Model Yapısı
              </TabsTrigger>
              <TabsTrigger
                value="tab3"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Önizleme
              </TabsTrigger>
            </TabsList>

            {/* Tab 1 - Temel Bilgiler */}
            <TabsContent value="tab1" className="space-y-6">
              <Card className="border-2 border-orange-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-100 to-red-100">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-orange-600" />
                    Puanlı Sistem Temel Bilgiler
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
                        <SelectTrigger className="border-orange-200 focus:border-orange-500">
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
                        placeholder="Örn: Puanlı Dijital Sağlık Değerlendirmesi"
                        value={formData.modelName}
                        onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelShortName">Model Kısa Adı</Label>
                      <Input
                        id="modelShortName"
                        placeholder="Örn: PDSD TR"
                        value={formData.modelShortName}
                        onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelTags">Model Etiketleri</Label>
                      <Input
                        id="modelTags"
                        placeholder="Örn: puanlı, değerlendirme, boyut-kriter-gösterge"
                        value={formData.modelTags}
                        onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                        className="border-orange-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Puanlı Sistem Sabit Seçenekler */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <TrendingUp className="h-8 w-8 text-orange-600" />
                          <div>
                            <Label className="font-medium text-orange-900">Model Türü</Label>
                            <p className="text-sm text-orange-700">Puan Esaslı</p>
                            <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">Puanlı Sabit</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Layers className="h-8 w-8 text-blue-600" />
                          <div>
                            <Label className="font-medium text-blue-900">Hiyerarşi</Label>
                            <p className="text-sm text-blue-700">Boyut - Kriter - Gösterge</p>
                            <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">Puanlı Sabit</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Users className="h-8 w-8 text-purple-600" />
                          <div>
                            <Label className="font-medium text-purple-900">Kullanıcı Kapsamı</Label>
                            <p className="text-sm text-purple-700">Çoklu Anket</p>
                            <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">Puanlı Sabit</Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-medium">Model için Hastane Türleri Ekleyiniz *</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Hastane Türü Ara"
                        value={hospitalSearch}
                        onChange={(e) => setHospitalSearch(e.target.value)}
                        className="pl-10 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    {hospitalSearch && (
                      <div className="border rounded-md p-2 bg-white shadow-sm">
                        {hospitalTypes
                          .filter((type) => type.toLowerCase().includes(hospitalSearch.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="p-2 hover:bg-orange-50 cursor-pointer rounded"
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
                          className="bg-orange-100 text-orange-800 border-orange-200 flex items-center gap-1"
                        >
                          {type}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeHospitalType(type)} />
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-lg font-medium">Model için Kullanıcı Türleri Ekleyiniz *</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Kullanıcı Türü Ara"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-10 border-orange-200 focus:border-orange-500"
                      />
                    </div>
                    {userSearch && (
                      <div className="border rounded-md p-2 bg-white shadow-sm">
                        {userTypes
                          .filter((type) => type.toLowerCase().includes(userSearch.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="p-2 hover:bg-orange-50 cursor-pointer rounded"
                              onClick={() => addUserType(type)}
                            >
                              {type}
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {selectedUserTypes.map((type) => (
                        <Badge key={type} className="bg-red-100 text-red-800 border-red-200 flex items-center gap-1">
                          {type}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeUserType(type)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2 - Model Yapısı */}
            <TabsContent value="tab2" className="space-y-6">
              <Card className="border-2 border-red-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Puanlı Model Yapısı Oluştur
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        Boyut - Kriter - Gösterge hiyerarşisini tanımlayın (Seviye seçimi yok)
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={normalizeWeights}
                      className="bg-orange-50 text-orange-600 hover:bg-orange-100"
                    >
                      <Target className="h-4 w-4 mr-2" />
                      Ağırlıkları Normalize Et
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
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
                            {!availableDimensions.some(
                              (dim) => dim.toLowerCase() === dimensionSearch.toLowerCase(),
                            ) && (
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
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                      <Layers className="h-4 w-4 text-orange-600" />
                                    </div>
                                    <span className="font-medium">{dimension.name}</span>
                                    <Badge variant="secondary">{dimension.criteria.length} kriter</Badge>
                                    <Badge variant="outline">
                                      {dimension.criteria.reduce((total, crit) => total + crit.indicators.length, 0)}{" "}
                                      gösterge
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
                              </AccordionTrigger>
                              <AccordionContent className="px-4 pb-4">
                                <div className="space-y-4">
                                  <div className="mb-4 p-3 bg-orange-50 rounded-lg">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label className="text-sm font-medium">
                                          Boyut Ağırlığı (Model İçerisinde %)
                                        </Label>
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

                                  <div className="flex items-center justify-between">
                                    <Label className="font-medium flex items-center gap-2">
                                      <Target className="h-4 w-4" />
                                      Kriterler ({dimension.criteria.length})
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
                                          {(availableCriteria[dimension.name] || [])
                                            .filter((crit) =>
                                              crit.toLowerCase().includes(criterionSearch.toLowerCase()),
                                            )
                                            .map((criterion) => (
                                              <div
                                                key={criterion}
                                                className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                                                onClick={() => addCriterion(dimension.id, criterion)}
                                              >
                                                {criterion}
                                              </div>
                                            ))}
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

                                  <div className="space-y-3">
                                    {dimension.criteria.map((criterion) => (
                                      <Card key={criterion.id} className="border-l-4 border-l-red-500">
                                        <CardContent className="p-4">
                                          <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-3">
                                              <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                                <Target className="h-3 w-3 text-red-600" />
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
                                                  onClick={() => removeCriterion(dimension.id, criterion.id)}
                                                  className="text-red-600"
                                                >
                                                  <Trash2 className="h-4 w-4 mr-2" />
                                                  Sil
                                                </DropdownMenuItem>
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </div>

                                          <div className="mb-4 p-3 bg-red-50 rounded-lg">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div className="space-y-2">
                                                <Label className="text-sm font-medium">
                                                  Kriter Ağırlığı (Boyut İçerisinde %)
                                                </Label>
                                                <Input
                                                  type="number"
                                                  min="0"
                                                  max="100"
                                                  value={criterion.weight}
                                                  onChange={(e) =>
                                                    updateCriterionWeight(
                                                      dimension.id,
                                                      criterion.id,
                                                      Number(e.target.value),
                                                    )
                                                  }
                                                  placeholder="0-100 arası değer"
                                                />
                                              </div>
                                              <div className="flex items-end">
                                                <div className="text-sm text-gray-600">
                                                  Bu kriterin boyut içerisindeki ağırlık oranını belirtin
                                                </div>
                                              </div>
                                            </div>
                                          </div>

                                          <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                              <Label className="font-medium flex items-center gap-2">
                                                <Lightbulb className="h-4 w-4" />
                                                Göstergeler ({criterion.indicators.length})
                                              </Label>
                                              <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                  setActiveCriterionId(criterion.id)
                                                  setActiveSearchType(
                                                    activeSearchType === "indicator" ? null : "indicator",
                                                  )
                                                }}
                                              >
                                                <Plus className="h-4 w-4 mr-2" />
                                                Gösterge Ekle
                                              </Button>
                                            </div>

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
                                                    {(availableIndicators[criterion.name] || [])
                                                      .filter((ind) =>
                                                        ind.toLowerCase().includes(indicatorSearch.toLowerCase()),
                                                      )
                                                      .map((indicator) => (
                                                        <div
                                                          key={indicator}
                                                          className="p-2 hover:bg-gray-100 cursor-pointer rounded"
                                                          onClick={() =>
                                                            addIndicator(dimension.id, criterion.id, indicator)
                                                          }
                                                        >
                                                          {indicator}
                                                        </div>
                                                      ))}
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

                                            <div className="space-y-3">
                                              {criterion.indicators.map((indicator) => (
                                                <Card key={indicator.id} className="border-l-4 border-l-pink-500">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                      <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                                                          <Lightbulb className="h-3 w-3 text-pink-600" />
                                                        </div>
                                                        <span className="font-medium">{indicator.name}</span>
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

                                                    <div className="mb-4 p-3 bg-pink-50 rounded-lg">
                                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                          <Label className="text-sm font-medium">
                                                            Gösterge Ağırlığı (Kriter İçerisinde %)
                                                          </Label>
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
                                                            placeholder="0-100 arası değer"
                                                          />
                                                        </div>
                                                        <div className="flex items-end">
                                                          <div className="text-sm text-gray-600">
                                                            Bu göstergenin kriter içerisindeki ağırlık oranını belirtin
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                      <Label className="text-sm font-medium">
                                                        Cevap Türünü Belirleyin
                                                      </Label>
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
                                                        <SelectTrigger>
                                                          <SelectValue placeholder="Cevap Türü Seçin" />
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
                                                  </CardContent>
                                                </Card>
                                              ))}
                                            </div>
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
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 3 - Önizleme */}
            <TabsContent value="tab3" className="space-y-6">
              <Card className="border-2 border-pink-200 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-pink-100 to-purple-100">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5 text-pink-600" />
                    Puanlı Model Önizlemesi
                  </CardTitle>
                  <p className="text-gray-600 mt-1">Puanlı modelin genel yapısını ve anket sorularını inceleyin</p>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <Accordion type="single" collapsible>
                    {selectedDimensions.map((dimension) => (
                      <AccordionItem key={dimension.id} value={dimension.id}>
                        <AccordionTrigger onClick={() => toggleDimension(dimension.id)}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                                <Layers className="h-4 w-4 text-orange-600" />
                              </div>
                              <span className="font-medium">{dimension.name}</span>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          {dimension.criteria.map((criterion) => (
                            <AccordionItem key={criterion.id} value={criterion.id}>
                              <AccordionTrigger onClick={() => toggleCriterion(criterion.id)}>
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                                      <Target className="h-3 w-3 text-red-600" />
                                    </div>
                                    <span className="font-medium">{criterion.name}</span>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4">
                                <div className="space-y-4">
                                  {criterion.indicators.map((indicator) => (
                                    <Card key={indicator.id} className="border-l-4 border-l-pink-500">
                                      <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center">
                                              <Lightbulb className="h-3 w-3 text-pink-600" />
                                            </div>
                                            <span className="font-medium">{indicator.name}</span>
                                          </div>
                                        </div>

                                        <div className="space-y-2">
                                          <Label className="text-sm font-medium">
                                            {indicator.name} için Cevabınızı Girin
                                          </Label>
                                          {renderAnswerOptions(indicator)}
                                        </div>
                                      </CardContent>
                                    </Card>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={handlePrevious} disabled={activeTab === "tab1"}>
          Geri
        </Button>
        <div>
          <Button variant="secondary" className="mr-2" onClick={handleSaveAndExit}>
            Kaydet & Çık
          </Button>
          <Button onClick={handleNext} disabled={!canGoNext(activeTab)}>
            {activeTab === "tab3" ? "Puanlı Tamamla" : "İleri"}
          </Button>
        </div>
      </div>

      <Dialog open={openUserTypeModal} onOpenChange={setOpenUserTypeModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Kullanıcı Türleri</DialogTitle>
            <DialogDescription>Lütfen model için kullanıcı türlerini ekleyin.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <Label>Model için Kullanıcı Türleri Ekleyiniz</Label>
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
          </div>
          <Button
            type="submit"
            onClick={() => {
              setOpenUserTypeModal(false)
              setActiveTab("tab2")
            }}
          >
            Kaydet
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}
