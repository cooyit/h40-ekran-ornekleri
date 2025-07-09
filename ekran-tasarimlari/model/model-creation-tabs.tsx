"use client"

import { useState, useEffect } from "react"
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
  CheckCircle,
  Globe,
  Sparkles,
  Info,
  Lightbulb,
  CheckCircle2,
  Home,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"

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

// Karşılanma düzeyleri
const complianceLevels = [
  {
    id: "level1",
    name: "Seviye 1 - Temel",
    description: "Temel gereksinimler karşılanıyor",
    color: "bg-red-100 text-red-800 border-red-200",
  },
  {
    id: "level2",
    name: "Seviye 2 - Gelişmekte",
    description: "Süreçler geliştirilmeye başlanmış",
    color: "bg-orange-100 text-orange-800 border-orange-200",
  },
  {
    id: "level3",
    name: "Seviye 3 - Tanımlanmış",
    description: "Süreçler tanımlanmış ve dokümante edilmiş",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
  },
  {
    id: "level4",
    name: "Seviye 4 - Yönetilen",
    description: "Süreçler aktif olarak yönetiliyor",
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "level5",
    name: "Seviye 5 - Optimize",
    description: "Süreçler sürekli iyileştiriliyor",
    color: "bg-green-100 text-green-800 border-green-200",
  },
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

interface ComplianceSelection {
  dimensionId: string
  criterionId: string
  selectedLevel: string
}

export default function ModelCreationTabs() {
  const [activeTab, setActiveTab] = useState("tab1")

  // Tab 1 - Temel Bilgiler
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
  const [openUserTypeModal, setOpenUserTypeModal] = useState(false)

  // Tab 2 - Model Yapısı
  const [selectedDimensions, setSelectedDimensions] = useState<Dimension[]>([])
  const [dimensionSearch, setDimensionSearch] = useState("")
  const [criterionSearch, setCriterionSearch] = useState("")
  const [indicatorSearch, setIndicatorSearch] = useState("")
  const [activeSearchType, setActiveSearchType] = useState<string | null>(null)
  const [activeDimensionId, setActiveDimensionId] = useState<string | null>(null)
  const [activeCriterionId, setActiveCriterionId] = useState<string | null>(null)

  // Tab 3 - Karşılanma Düzeyleri
  const [complianceSelections, setComplianceSelections] = useState<ComplianceSelection[]>([])
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  // Tab 4 - Önizleme
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(new Set())
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set())
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null)
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, any>>({})

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

  const removeCriterion = (dimensionId: string, criterionId: string) => {
    setSelectedDimensions(
      selectedDimensions.map((dimension) =>
        dimension.id === dimensionId
          ? { ...dimension, criteria: dimension.criteria.filter((c) => c.id !== criterionId) }
          : dimension,
      ),
    )
  }

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
  useEffect(() => {
    if (selectedDimensions.length > 0) {
      const initialSelections: ComplianceSelection[] = []
      selectedDimensions.forEach((dimension: Dimension) => {
        initialSelections.push({
          dimensionId: dimension.id,
          criterionId: "",
          selectedLevel: "",
        })

        dimension.criteria.forEach((criterion: Criterion) => {
          initialSelections.push({
            dimensionId: dimension.id,
            criterionId: criterion.id,
            selectedLevel: "",
          })
        })
      })
      setComplianceSelections(initialSelections)
      setExpandedDimensions(new Set(selectedDimensions.map((dim) => dim.id)))
    }
  }, [selectedDimensions])

  const handleLevelChange = (dimensionId: string, criterionId: string, levelId: string) => {
    setComplianceSelections((prev) => {
      return prev.map((selection) => {
        if (selection.dimensionId === dimensionId && selection.criterionId === criterionId) {
          const itemKey = `${dimensionId}-${criterionId}`
          if (levelId) {
            setCompletedItems((prev) => new Set([...prev, itemKey]))
          } else {
            setCompletedItems((prev) => {
              const newSet = new Set(prev)
              newSet.delete(itemKey)
              return newSet
            })
          }

          return {
            ...selection,
            selectedLevel: levelId,
          }
        }
        return selection
      })
    })
  }

  const getSelectedLevel = (dimensionId: string, criterionId: string): string => {
    const selection = complianceSelections.find((s) => s.dimensionId === dimensionId && s.criterionId === criterionId)
    return selection?.selectedLevel || ""
  }

  const isCompleted = (dimensionId: string, criterionId: string): boolean => {
    return completedItems.has(`${dimensionId}-${criterionId}`)
  }

  const getTotalItems = (): number => {
    return selectedDimensions.reduce((total, dim) => total + dim.criteria.length + 1, 0)
  }

  const getCompletedCount = (): number => {
    return completedItems.size
  }

  const getProgressPercentage = (): number => {
    const total = getTotalItems()
    const completed = getCompletedCount()
    return total > 0 ? Math.round((completed / total) * 100) : 0
  }

  const getSelectedLevelInfo = (levelId: string) => {
    return complianceLevels.find((level) => level.id === levelId)
  }

  // Tab 4 Functions
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
        return getCompletedCount() > 0
      case "tab4":
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
        if (canGoNext("tab3")) setActiveTab("tab4")
        else alert("Lütfen en az bir karşılanma düzeyi seçin!")
        break
      case "tab4":
        alert("Model başarıyla tamamlandı!")
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
      case "tab4":
        setActiveTab("tab3")
        break
    }
  }

  const handleSaveAndExit = () => {
    console.log("Saving data:", {
      formData,
      selectedLevels,
      selectedHospitalTypes,
      selectedUserTypes,
      selectedDimensions,
      complianceSelections,
      surveyAnswers,
    })
    alert("Veriler başarıyla kaydedildi!")
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Ana Sayfa Butonu */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white/90 shadow-lg"
          >
            <Home className="h-4 w-4 mr-2" />
            Ana Sayfa
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl flex items-center gap-3">
            <Sparkles className="h-8 w-8" />
            Model Oluşturma Süreci - Klasik Sistem
          </CardTitle>
          <p className="text-gray-600 mt-2">4 adımda seviye esaslı model oluşturma ve yapılandırma işlemi</p>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-lg">
              <TabsTrigger
                value="tab1"
                className="data-[state=active]:bg-blue-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Globe className="h-4 w-4" />
                Temel Bilgiler
              </TabsTrigger>
              <TabsTrigger
                value="tab2"
                className="data-[state=active]:bg-green-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Layers className="h-4 w-4" />
                Model Yapısı
              </TabsTrigger>
              <TabsTrigger
                value="tab3"
                className="data-[state=active]:bg-orange-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Karşılanma Düzeyleri
              </TabsTrigger>
              <TabsTrigger
                value="tab4"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Önizleme
              </TabsTrigger>
            </TabsList>

            {/* Tab 1 - Temel Bilgiler */}
            <TabsContent value="tab1" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Temel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="language">Model için dil seçiniz</Label>
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
                      <Label htmlFor="modelName">Model Adı</Label>
                      <Input
                        id="modelName"
                        placeholder="Örn: Dijital Sağlık Altyapısı"
                        value={formData.modelName}
                        onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelShortName">Model Kısa Adı</Label>
                      <Input
                        id="modelShortName"
                        placeholder="Örn: DSA TR"
                        value={formData.modelShortName}
                        onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="modelTags">Model Etiketleri</Label>
                      <Input
                        id="modelTags"
                        placeholder="Örn: altyapı, dijital, sağlık"
                        value={formData.modelTags}
                        onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Model türünü belirleyiniz</Label>
                    <RadioGroup
                      value={formData.modelType}
                      onValueChange={(value) => setFormData({ ...formData, modelType: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="seviyeli" id="seviyeli" />
                        <Label htmlFor="seviyeli">Seviye Esaslı</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="puanli" id="puanli" />
                        <Label htmlFor="puanli">Puan Esaslı</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Model hiyerarşisini belirleyiniz</Label>
                    <RadioGroup
                      value={formData.hierarchy}
                      onValueChange={(value) => setFormData({ ...formData, hierarchy: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boyut-kriter-gosterge" id="boyut-kriter-gosterge" />
                        <Label htmlFor="boyut-kriter-gosterge">Boyut - Kriter - Gösterge</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boyut-gosterge" id="boyut-gosterge" />
                        <Label htmlFor="boyut-gosterge">Boyut - Gösterge</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.modelType === "seviyeli" && (
                    <div className="space-y-3">
                      <Label>Model için Seviye Ekleyiniz</Label>
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
                    <Label>Model için Hastane Türleri Ekleyiniz</Label>
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

                  <div className="space-y-3">
                    <Label>Model kullanıcı kapsamını belirleyiniz</Label>
                    <RadioGroup
                      value={formData.userScope}
                      onValueChange={(value) => setFormData({ ...formData, userScope: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tek" id="tek" />
                        <Label htmlFor="tek">Tek anket</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="coklu" id="coklu" />
                        <Label htmlFor="coklu">Çoklu Anket</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {formData.userScope === "coklu" && (
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
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 2 - Model Yapısı */}
            <TabsContent value="tab2" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Layers className="h-5 w-5" />
                        Model Yapısı Oluştur
                      </CardTitle>
                      <p className="text-gray-600 mt-1">Boyut - Kriter - Gösterge hiyerarşisini tanımlayın</p>
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
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                      <Layers className="h-4 w-4 text-blue-600" />
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
                                  <div className="mb-4 p-3 bg-blue-50 rounded-lg">
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
                                      <Card key={criterion.id} className="border-l-4 border-l-green-500">
                                        <CardContent className="p-4">
                                          <div className="flex items-center justify-between mb-3">
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

                                          <div className="mb-4 p-3 bg-green-50 rounded-lg">
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
                                                <Card key={indicator.id} className="border-l-4 border-l-yellow-500">
                                                  <CardContent className="p-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                      <div className="flex items-center gap-3">
                                                        <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                                          <Lightbulb className="h-3 w-3 text-yellow-600" />
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

                                                    <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
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

            {/* Tab 3 - Karşılanma Düzeyleri */}
            <TabsContent value="tab3" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Karşılanma Düzeylerini Belirle
                  </CardTitle>
                  <p className="text-gray-600 mt-1">Boyut ve kriterlerin hangi seviyede karşılandığını işaretleyin</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold">
                        İlerleme: {getCompletedCount()} / {getTotalItems()} tamamlandı
                      </div>
                      <div className="text-lg font-semibold">{getProgressPercentage()}%</div>
                    </div>
                    <progress
                      className="w-full h-2 rounded bg-gray-200 appearance-none"
                      value={getProgressPercentage()}
                      max="100"
                    ></progress>
                  </div>

                  <Accordion type="multiple" value={Array.from(expandedDimensions)}>
                    {selectedDimensions.map((dimension) => (
                      <AccordionItem key={dimension.id} value={dimension.id}>
                        <AccordionTrigger onClick={() => toggleDimension(dimension.id)}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Layers className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium">{dimension.name}</span>
                              {isCompleted(dimension.id, "") ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  Tamamlandı
                                </Badge>
                              ) : (
                                <Badge variant="outline">Devam Ediyor</Badge>
                              )}
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                          <div className="space-y-4">
                            <Label className="text-sm font-medium">Boyut için karşılanma düzeyini seçin:</Label>
                            <RadioGroup
                              value={getSelectedLevel(dimension.id, "")}
                              onValueChange={(value) => handleLevelChange(dimension.id, "", value)}
                            >
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {complianceLevels.map((level) => (
                                  <div key={level.id} className="space-y-2">
                                    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                      <RadioGroupItem value={level.id} id={`${dimension.id}-${level.id}`} />
                                      <div className={`p-3 rounded-md border ${level.color} flex-1`}>
                                        <Label htmlFor={`${dimension.id}-${level.id}`} className="cursor-pointer">
                                          <div className="font-semibold">{level.name}</div>
                                          <div className="text-sm text-gray-600">{level.description}</div>
                                        </Label>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>

                          {dimension.criteria.map((criterion) => (
                            <div key={criterion.id} className="space-y-4 border-l-4 border-l-green-500 pl-4">
                              <div className="flex items-center gap-3">
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                  <Target className="h-3 w-3 text-green-600" />
                                </div>
                                <span className="font-medium">{criterion.name}</span>
                                {isCompleted(dimension.id, criterion.id) ? (
                                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                    Tamamlandı
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Devam Ediyor</Badge>
                                )}
                              </div>

                              <div className="space-y-4">
                                <Label className="text-sm font-medium">Kriter için karşılanma düzeyini seçin:</Label>
                                <RadioGroup
                                  value={getSelectedLevel(dimension.id, criterion.id)}
                                  onValueChange={(value) => handleLevelChange(dimension.id, criterion.id, value)}
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {complianceLevels.map((level) => (
                                      <div key={level.id} className="space-y-2">
                                        <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                                          <RadioGroupItem value={level.id} id={`${criterion.id}-${level.id}`} />
                                          <div className={`p-3 rounded-md border ${level.color} flex-1`}>
                                            <Label htmlFor={`${criterion.id}-${level.id}`} className="cursor-pointer">
                                              <div className="font-semibold">{level.name}</div>
                                              <div className="text-sm text-gray-600">{level.description}</div>
                                            </Label>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </RadioGroup>
                              </div>
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab 4 - Önizleme */}
            <TabsContent value="tab4" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Model Önizlemesi
                  </CardTitle>
                  <p className="text-gray-600 mt-1">Modelin genel yapısını ve anket sorularını inceleyin</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Accordion type="single" collapsible>
                    {selectedDimensions.map((dimension) => (
                      <AccordionItem key={dimension.id} value={dimension.id}>
                        <AccordionTrigger onClick={() => toggleDimension(dimension.id)}>
                          <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                <Layers className="h-4 w-4 text-blue-600" />
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
                                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                      <Target className="h-3 w-3 text-green-600" />
                                    </div>
                                    <span className="font-medium">{criterion.name}</span>
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent className="space-y-4">
                                <div className="space-y-4">
                                  {criterion.indicators.map((indicator) => (
                                    <Card key={indicator.id} className="border-l-4 border-l-yellow-500">
                                      <CardContent className="p-4">
                                        <div className="flex items-center justify-between mb-3">
                                          <div className="flex items-center gap-3">
                                            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                                              <Lightbulb className="h-3 w-3 text-yellow-600" />
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
            {activeTab === "tab4" ? "Tamamla" : "İleri"}
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
