"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ChevronLeft, ChevronRight, CheckCircle, Target, Layers, AlertCircle, Weight, TrendingUp } from "lucide-react"

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

export default function ModelComplianceLevels() {
  const [modelStructure, setModelStructure] = useState<Dimension[]>([])
  const [complianceSelections, setComplianceSelections] = useState<ComplianceSelection[]>([])
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())

  useEffect(() => {
    // localStorage'dan model yapısını al
    const savedStructure = localStorage.getItem("modelStructure")
    if (savedStructure) {
      const structure = JSON.parse(savedStructure)
      setModelStructure(structure)

      // Her boyut ve kriter için boş seçim objesi oluştur
      const initialSelections: ComplianceSelection[] = []
      structure.forEach((dimension: Dimension) => {
        // Boyut için
        initialSelections.push({
          dimensionId: dimension.id,
          criterionId: "",
          selectedLevel: "",
        })

        // Kriterler için
        dimension.criteria.forEach((criterion: Criterion) => {
          initialSelections.push({
            dimensionId: dimension.id,
            criterionId: criterion.id,
            selectedLevel: "",
          })
        })
      })
      setComplianceSelections(initialSelections)
    }
  }, [])

  const handleLevelChange = (dimensionId: string, criterionId: string, levelId: string) => {
    setComplianceSelections((prev) => {
      return prev.map((selection) => {
        if (selection.dimensionId === dimensionId && selection.criterionId === criterionId) {
          // Tamamlanma durumunu güncelle
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
    return modelStructure.reduce((total, dim) => total + dim.criteria.length + 1, 0) // +1 boyut için
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

  const handleBack = () => {
    window.location.href = "/model-structure-builder"
  }

  const handleNext = () => {
    if (getCompletedCount() === 0) {
      alert("Lütfen en az bir karşılanma düzeyi seçin!")
      return
    }

    // Seçimleri kaydet
    localStorage.setItem("complianceSelections", JSON.stringify(complianceSelections))
    console.log("Compliance Selections:", complianceSelections)
    // Model önizleme sayfasına yönlendir
    window.location.href = "/model-preview"
  }

  if (modelStructure.length === 0) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-xl font-semibold mb-2">Model Yapısı Bulunamadı</h2>
            <p className="text-gray-600 mb-4">Lütfen önce model yapısını oluşturun.</p>
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
    <div className="container mx-auto p-6 max-w-6xl">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-3">
                <CheckCircle className="h-6 w-6" />
                Karşılanma Düzeylerini Belirle
              </CardTitle>
              <p className="text-gray-600 mt-2">Her boyut ve kriter için tek bir karşılanma düzeyi seçin</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleBack}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Geri
              </Button>
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                <ChevronRight className="h-4 w-4 ml-2" />
                Tamamla
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Bar */}
          <Card className="bg-gradient-to-r from-blue-50 to-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Label className="font-medium">İlerleme Durumu</Label>
                <span className="text-sm font-medium">
                  {getCompletedCount()} / {getTotalItems()} tamamlandı
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-3" />
              <div className="flex justify-between text-xs text-gray-600 mt-1">
                <span>%{getProgressPercentage()} tamamlandı</span>
                <span>{getTotalItems() - getCompletedCount()} kalan</span>
              </div>
            </CardContent>
          </Card>

          {/* Karşılanma Düzeyleri Açıklaması */}
          <Card className="bg-gray-50">
            <CardHeader>
              <CardTitle className="text-lg">Karşılanma Düzeyleri</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {complianceLevels.map((level) => (
                  <div key={level.id} className={`p-3 rounded-lg border ${level.color}`}>
                    <div className="font-medium text-sm">{level.name}</div>
                    <div className="text-xs mt-1">{level.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Boyutlar ve Kriterler */}
          <div className="space-y-4">
            <Accordion type="single" collapsible className="space-y-4">
              {modelStructure.map((dimension) => (
                <AccordionItem key={dimension.id} value={dimension.id} className="border rounded-lg">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Layers className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="font-medium">{dimension.name}</span>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Weight className="h-3 w-3" />%{dimension.weight}
                        </Badge>
                        <Badge variant="outline">{dimension.criteria.length} kriter</Badge>
                        {isCompleted(dimension.id, "") && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-6">
                      {/* Boyut için Karşılanma Düzeyleri */}
                      <Card className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Layers className="h-5 w-5 text-blue-600" />
                                <Label className="text-lg font-medium">Boyut: {dimension.name}</Label>
                                {isCompleted(dimension.id, "") && <CheckCircle className="h-5 w-5 text-green-600" />}
                              </div>
                              <div className="flex items-center gap-4">
                                <Badge variant="secondary" className="flex items-center gap-1">
                                  <Weight className="h-3 w-3" />
                                  Model Ağırlığı: %{dimension.weight}
                                </Badge>
                                {getSelectedLevel(dimension.id, "") && (
                                  <Badge className={getSelectedLevelInfo(getSelectedLevel(dimension.id, ""))?.color}>
                                    {getSelectedLevelInfo(getSelectedLevel(dimension.id, ""))?.name}
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <Label className="text-sm text-gray-600">Bu boyut için karşılanma düzeyini seçin:</Label>
                              <RadioGroup
                                value={getSelectedLevel(dimension.id, "")}
                                onValueChange={(value) => handleLevelChange(dimension.id, "", value)}
                              >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                  {complianceLevels.map((level) => (
                                    <div
                                      key={level.id}
                                      className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                                    >
                                      <RadioGroupItem value={level.id} id={`${dimension.id}-${level.id}`} />
                                      <div className="flex-1">
                                        <Label
                                          htmlFor={`${dimension.id}-${level.id}`}
                                          className="font-medium cursor-pointer"
                                        >
                                          {level.name}
                                        </Label>
                                        <p className="text-xs text-gray-600 mt-1">{level.description}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </RadioGroup>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {/* Kriterler için Karşılanma Düzeyleri */}
                      <div className="space-y-4">
                        <Label className="text-lg font-medium flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Kriterler
                        </Label>
                        {dimension.criteria.map((criterion) => (
                          <Card key={criterion.id} className="border-l-4 border-l-green-500">
                            <CardContent className="p-4">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-green-600" />
                                    <Label className="font-medium">{criterion.name}</Label>
                                    {isCompleted(dimension.id, criterion.id) && (
                                      <CheckCircle className="h-4 w-4 text-green-600" />
                                    )}
                                  </div>
                                  <div className="flex items-center gap-2">
                                    {criterion.level && (
                                      <Badge variant="outline" className="flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" />
                                        {criterion.level}
                                      </Badge>
                                    )}
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                      <Weight className="h-3 w-3" />
                                      Boyut Ağırlığı: %{criterion.weight}
                                    </Badge>
                                    {getSelectedLevel(dimension.id, criterion.id) && (
                                      <Badge
                                        className={
                                          getSelectedLevelInfo(getSelectedLevel(dimension.id, criterion.id))?.color
                                        }
                                      >
                                        {getSelectedLevelInfo(getSelectedLevel(dimension.id, criterion.id))?.name}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <Label className="text-sm text-gray-600">
                                    Bu kriter için karşılanma düzeyini seçin:
                                  </Label>
                                  <RadioGroup
                                    value={getSelectedLevel(dimension.id, criterion.id)}
                                    onValueChange={(value) => handleLevelChange(dimension.id, criterion.id, value)}
                                  >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                      {complianceLevels.map((level) => (
                                        <div
                                          key={level.id}
                                          className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50"
                                        >
                                          <RadioGroupItem
                                            value={level.id}
                                            id={`${dimension.id}-${criterion.id}-${level.id}`}
                                          />
                                          <div className="flex-1">
                                            <Label
                                              htmlFor={`${dimension.id}-${criterion.id}-${level.id}`}
                                              className="font-medium cursor-pointer"
                                            >
                                              {level.name}
                                            </Label>
                                            <p className="text-xs text-gray-600 mt-1">{level.description}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </RadioGroup>
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
          </div>

          {/* Özet Bilgiler */}
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
                    <div className="text-2xl font-bold text-purple-600">{getCompletedCount()}</div>
                    <div className="text-sm text-gray-600">Tamamlanan</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">%{getProgressPercentage()}</div>
                    <div className="text-sm text-gray-600">İlerleme</div>
                  </div>
                </div>
                <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Karşılanma Düzeylerini Kaydet
                </Button>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
