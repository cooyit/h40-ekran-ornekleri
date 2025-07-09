"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  Eye,
  Layers,
  Target,
  BarChart3,
  ChevronDown,
  ChevronRightIcon,
  Star,
  AlertCircle,
  Lightbulb,
  CheckCircle2,
  Info,
} from "lucide-react"

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

export default function ModelPreview() {
  const [modelStructure, setModelStructure] = useState<Dimension[]>([])
  const [complianceSelections, setComplianceSelections] = useState<ComplianceSelection[]>([])
  const [expandedDimensions, setExpandedDimensions] = useState<Set<string>>(new Set())
  const [expandedCriteria, setExpandedCriteria] = useState<Set<string>>(new Set())
  const [selectedIndicator, setSelectedIndicator] = useState<string | null>(null)
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, any>>({})

  useEffect(() => {
    // localStorage'dan verileri al
    const savedStructure = localStorage.getItem("modelStructure")
    const savedCompliance = localStorage.getItem("complianceSelections")

    if (savedStructure) {
      setModelStructure(JSON.parse(savedStructure))
      // Tüm boyutları başlangıçta aç
      const structure = JSON.parse(savedStructure)
      setExpandedDimensions(new Set(structure.map((dim: Dimension) => dim.id)))
    }

    if (savedCompliance) {
      setComplianceSelections(JSON.parse(savedCompliance))
    }
  }, [])

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

  const getComplianceLevel = (dimensionId: string, criterionId: string) => {
    const selection = complianceSelections.find((s) => s.dimensionId === dimensionId && s.criterionId === criterionId)
    return selection?.selectedLevel || ""
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
                      ? " Iyileştirme gerekli."
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

  const handleBack = () => {
    window.location.href = "/model-compliance-levels"
  }

  const handleFinish = () => {
    console.log("Survey Answers:", surveyAnswers)
    alert("Model önizlemesi tamamlandı! Anket cevapları kaydedildi.")
  }

  if (modelStructure.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Model Verisi Bulunamadı</h2>
            <p className="text-gray-600 mb-4">Lütfen önce model yapısını ve karşılanma düzeylerini tamamlayın.</p>
            <Button onClick={handleBack}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Geri Dön
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Eye className="h-6 w-6" />
                Model Önizleme
              </CardTitle>
              <p className="text-gray-600 mt-2">Model yapısını inceleyin ve anket sorularını test edin</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
              <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Tamamla
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sol Taraf - Tree View */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Model Yapısı
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {modelStructure.map((dimension) => (
                  <div key={dimension.id} className="space-y-2">
                    {/* Boyut */}
                    <div
                      className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => toggleDimension(dimension.id)}
                    >
                      {expandedDimensions.has(dimension.id) ? (
                        <ChevronDown className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ChevronRightIcon className="h-4 w-4 text-blue-600" />
                      )}
                      <Layers className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-900">{dimension.name}</span>
                      <Badge variant="secondary" className="ml-auto">
                        %{dimension.weight}
                      </Badge>
                    </div>

                    {/* Kriterler */}
                    {expandedDimensions.has(dimension.id) && (
                      <div className="ml-6 space-y-2">
                        {dimension.criteria.map((criterion) => (
                          <div key={criterion.id} className="space-y-2">
                            <div
                              className="flex items-center gap-2 p-2 bg-green-50 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                              onClick={() => toggleCriterion(criterion.id)}
                            >
                              {expandedCriteria.has(criterion.id) ? (
                                <ChevronDown className="h-3 w-3 text-green-600" />
                              ) : (
                                <ChevronRightIcon className="h-3 w-3 text-green-600" />
                              )}
                              <Target className="h-3 w-3 text-green-600" />
                              <span className="text-sm font-medium text-green-900">{criterion.name}</span>
                              <Badge variant="outline" className="text-xs ml-auto">
                                %{criterion.weight}
                              </Badge>
                            </div>

                            {/* Göstergeler */}
                            {expandedCriteria.has(criterion.id) && (
                              <div className="ml-6 space-y-1">
                                {criterion.indicators.map((indicator) => (
                                  <div
                                    key={indicator.id}
                                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                                      selectedIndicator === indicator.id
                                        ? "bg-purple-100 border-2 border-purple-300"
                                        : "bg-purple-50 hover:bg-purple-100"
                                    }`}
                                    onClick={() => setSelectedIndicator(indicator.id)}
                                  >
                                    <BarChart3 className="h-3 w-3 text-purple-600" />
                                    <span className="text-xs text-purple-900">{indicator.name}</span>
                                    <Badge variant="outline" className="text-xs ml-auto">
                                      {indicator.responseType}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Sağ Taraf - Anket Soruları */}
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Anket Soruları
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedIndicator ? (
                  (() => {
                    // Seçilen göstergeyi bul
                    let selectedIndicatorData: Indicator | null = null
                    let parentDimension: Dimension | null = null
                    let parentCriterion: Criterion | null = null

                    for (const dimension of modelStructure) {
                      for (const criterion of dimension.criteria) {
                        const indicator = criterion.indicators.find((ind) => ind.id === selectedIndicator)
                        if (indicator) {
                          selectedIndicatorData = indicator
                          parentDimension = dimension
                          parentCriterion = criterion
                          break
                        }
                      }
                      if (selectedIndicatorData) break
                    }

                    if (!selectedIndicatorData || !parentDimension || !parentCriterion) {
                      return <p className="text-gray-500">Gösterge bulunamadı.</p>
                    }

                    return (
                      <div className="space-y-6">
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                          <Layers className="h-4 w-4" />
                          <span>{parentDimension.name}</span>
                          <ChevronRightIcon className="h-3 w-3" />
                          <Target className="h-4 w-4" />
                          <span>{parentCriterion.name}</span>
                          <ChevronRightIcon className="h-3 w-3" />
                          <BarChart3 className="h-4 w-4" />
                          <span className="font-medium">{selectedIndicatorData.name}</span>
                        </div>

                        {/* Soru Bilgileri */}
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                            <h3 className="font-semibold text-lg mb-2">{selectedIndicatorData.name}</h3>
                            <div className="flex items-center gap-4 text-sm">
                              <Badge variant="outline">Cevap Türü: {selectedIndicatorData.responseType}</Badge>
                              <Badge variant="secondary">Ağırlık: %{selectedIndicatorData.weight}</Badge>
                              <Badge className="bg-green-100 text-green-800">{parentCriterion.level}</Badge>
                            </div>
                          </div>

                          {/* Cevap Seçenekleri */}
                          <div className="space-y-4">
                            <Label className="text-base font-medium">Cevabınızı seçin:</Label>
                            {renderAnswerOptions(selectedIndicatorData)}
                          </div>
                        </div>
                      </div>
                    )
                  })()
                ) : (
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Gösterge Seçin</h3>
                    <p className="text-gray-600">
                      Sol taraftaki model yapısından bir gösterge seçerek anket sorularını görüntüleyin.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Alt Kısım - Özet */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{modelStructure.length}</div>
                    <div className="text-sm text-gray-600">Boyut</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {modelStructure.reduce((total, dim) => total + dim.criteria.length, 0)}
                    </div>
                    <div className="text-sm text-gray-600">Kriter</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {modelStructure.reduce(
                        (total, dim) =>
                          total + dim.criteria.reduce((critTotal, crit) => critTotal + crit.indicators.length, 0),
                        0,
                      )}
                    </div>
                    <div className="text-sm text-gray-600">Gösterge</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{Object.keys(surveyAnswers).length}</div>
                    <div className="text-sm text-gray-600">Cevaplanan</div>
                  </div>
                </div>
                <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700">
                  <Star className="h-4 w-4 mr-2" />
                  Modeli Tamamla
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
