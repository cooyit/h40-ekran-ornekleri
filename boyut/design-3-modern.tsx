"use client"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  ArrowUpDown,
  BarChart3,
  TrendingUp,
  Users,
  ChevronDown,
  ChevronRight,
  Languages,
  MoreHorizontal,
  Edit,
  Trash2,
  Power,
  Plus,
  Eye,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import DimensionDetailModern from "./dimension-detail-modern"
import TranslationModal from "./translation-modal"
import LanguageSelectionModal from "./language-selection-modal"
import NewDimensionModern from "./new-dimension-modern"

// Örnek veri - çeviriler ile birlikte
const dimensions = [
  {
    id: 1,
    name: "Müşteri Memnuniyeti",
    shortName: "MM",
    language: "Türkçe",
    status: "Aktif",
    date: "2024-01-15",
    icon: Users,
    translations: [
      { language: "İngilizce", name: "Customer Satisfaction", shortName: "CS", status: "Aktif" },
      { language: "Almanca", name: "Kundenzufriedenheit", shortName: "KZ", status: "Aktif" },
    ],
  },
  {
    id: 2,
    name: "Finansal Performans",
    shortName: "FP",
    language: "Türkçe",
    status: "Aktif",
    date: "2024-01-10",
    icon: TrendingUp,
    translations: [
      { language: "İngilizce", name: "Financial Performance", shortName: "FP", status: "Aktif" },
      { language: "Fransızca", name: "Performance Financière", shortName: "PF", status: "Taslak" },
    ],
  },
  {
    id: 3,
    name: "Operasyonel Verimlilik",
    shortName: "OV",
    language: "İngilizce",
    status: "Pasif",
    date: "2024-01-05",
    icon: BarChart3,
    translations: [{ language: "Türkçe", name: "Operasyonel Verimlilik", shortName: "OV", status: "Pasif" }],
  },
  {
    id: 4,
    name: "İnsan Kaynakları",
    shortName: "İK",
    language: "Türkçe",
    status: "Taslak",
    date: "2024-01-20",
    icon: Users,
    translations: [
      { language: "İngilizce", name: "Human Resources", shortName: "HR", status: "Taslak" },
      { language: "İspanyolca", name: "Recursos Humanos", shortName: "RH", status: "Taslak" },
      { language: "İtalyanca", name: "Risorse Umane", shortName: "RU", status: "Taslak" },
    ],
  },
  {
    id: 5,
    name: "Customer Satisfaction",
    shortName: "CS",
    language: "İngilizce",
    status: "Aktif",
    date: "2024-01-12",
    icon: Users,
    translations: [{ language: "Türkçe", name: "Müşteri Memnuniyeti", shortName: "MM", status: "Aktif" }],
  },
  {
    id: 6,
    name: "Teknoloji Altyapısı",
    shortName: "TA",
    language: "Türkçe",
    status: "Taslak",
    date: "2024-01-18",
    icon: BarChart3,
    translations: [{ language: "İngilizce", name: "Technology Infrastructure", shortName: "TI", status: "Taslak" }],
  },
]

const models = {
  1: [
    { name: "Müşteri Deneyimi Modeli", criteriaCount: 8, indicatorCount: 24, weight: 3, coverageLevel: "Orta Seviye" },
    { name: "Hizmet Kalitesi Modeli", criteriaCount: 6, indicatorCount: 18, weight: 2, coverageLevel: "Orta Seviye" },
  ],
  2: [
    { name: "Karlılık Analizi Modeli", criteriaCount: 5, indicatorCount: 15, weight: 2, coverageLevel: "Orta Seviye" },
    { name: "Nakit Akışı Modeli", criteriaCount: 4, indicatorCount: 12, weight: 2, coverageLevel: "Orta Seviye" },
  ],
  3: [{ name: "Süreç Optimizasyonu Modeli", criteriaCount: 7, indicatorCount: 21, weight: 2, coverageLevel: "Orta Seviye" }],
  4: [
    { name: "Personel Performans Modeli", criteriaCount: 6, indicatorCount: 18, weight: 2, coverageLevel: "Orta Seviye" },
    { name: "Eğitim Etkinliği Modeli", criteriaCount: 4, indicatorCount: 12, weight: 2, coverageLevel: "Orta Seviye" },
  ],
}

export default function ModernDesign() {
  const [selectedDimension, setSelectedDimension] = useState<number | null>(null)
  const [expandedTranslations, setExpandedTranslations] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [statusFilter, setStatusFilter] = useState("all")
  const [languageFilter, setLanguageFilter] = useState("all")
  const [showDimensionDetail, setShowDimensionDetail] = useState(false)
  const [viewMode, setViewMode] = useState<"view" | "edit">("view")
  const [showLanguageSelection, setShowLanguageSelection] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<{ name: string; flag: string; code: string } | null>(null)
  const [selectedDimensionForTranslation, setSelectedDimensionForTranslation] = useState<number | null>(null)
  const [showNewDimension, setShowNewDimension] = useState(false)

  const filteredDimensions = dimensions.filter((dim) => {
    const matchesSearch =
      dim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dim.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dim.status === statusFilter
    const matchesLanguage = languageFilter === "all" || dim.language === languageFilter

    return matchesSearch && matchesStatus && matchesLanguage
  })

  const selectedDimensionData = dimensions.find((d) => d.id === selectedDimension)

  const handleMenuAction = (action: string, dimensionId: number, dimensionName: string) => {
    switch (action) {
      case "view":
        if (dimensionId === 1) {
          setViewMode("view")
          setShowDimensionDetail(true)
        } else {
          alert(`${dimensionName} detayları görüntüleniyor...`)
        }
        break
      case "edit":
        if (dimensionId === 1) {
          setViewMode("edit")
          setShowDimensionDetail(true)
        } else {
          alert(`${dimensionName} düzenleniyor...`)
        }
        break
      case "delete":
        if (confirm(`${dimensionName} silinsin mi?`)) {
          alert(`${dimensionName} silindi!`)
        }
        break
      case "activate":
        alert(`${dimensionName} devreye alındı!`)
        break
      case "translate":
        setSelectedDimensionForTranslation(dimensionId)
        setShowLanguageSelection(true)
        break
    }
  }

  const handleLanguageSelect = (language: { name: string; flag: string; code: string }) => {
    console.log("Dil seçildi:", language) // Debug için
    setSelectedLanguage(language)
    setShowLanguageSelection(false) // Modal'ı kapat
    // Küçük bir delay ile tercüme ekranını aç
    setTimeout(() => {
      setShowTranslation(true)
    }, 100)
  }

  if (showDimensionDetail) {
    return <DimensionDetailModern onBack={() => setShowDimensionDetail(false)} isReadOnly={viewMode === "view"} />
  }

  if (showNewDimension) {
    return <NewDimensionModern onBack={() => setShowNewDimension(false)} />
  }

  const selectedDimensionForTranslationData = dimensions.find((d) => d.id === selectedDimensionForTranslation)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Boyutlar</h1>
        <Button onClick={() => setShowNewDimension(true)} className="rounded-full">
          <Plus className="h-4 w-4 mr-2" />
          Yeni Boyut Ekle
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Panel - Boyutlar */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Boyut Listesi</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSortBy("name")}>İsme Göre</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy("date")}>Tarihe Göre</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      {statusFilter === "all" ? "Tüm Durumlar" : statusFilter}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatusFilter("all")}>Tümü</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Aktif")}>Aktif</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Pasif")}>Pasif</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatusFilter("Taslak")}>Taslak</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      {languageFilter === "all" ? "Tüm Diller" : languageFilter}
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setLanguageFilter("all")}>Tümü</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguageFilter("Türkçe")}>Türkçe</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguageFilter("İngilizce")}>İngilizce</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-2">
                {filteredDimensions.map((dimension) => {
                  const Icon = dimension.icon
                  return (
                    <div key={dimension.id} className="space-y-1">
                      <div
                        className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                          selectedDimension === dimension.id ? "bg-muted border-primary" : ""
                        }`}
                        onClick={() => setSelectedDimension(dimension.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex items-center gap-1">
                            {dimension.translations.length > 0 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-5 w-5 p-0"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  setExpandedTranslations(expandedTranslations === dimension.id ? null : dimension.id)
                                }}
                              >
                                {expandedTranslations === dimension.id ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </Button>
                            )}
                            <div className="p-2 rounded-md bg-primary/10">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-sm truncate">{dimension.name}</h3>
                              <Badge
                                variant={
                                  dimension.status === "Aktif"
                                    ? "default"
                                    : dimension.status === "Taslak"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs"
                              >
                                {dimension.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {dimension.shortName} • {dimension.date}
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleMenuAction("view", dimension.id, dimension.name)}>
                                <Eye className="h-3 w-3 mr-2" />
                                Detayını Gör
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleMenuAction("edit", dimension.id, dimension.name)}>
                                <Edit className="h-3 w-3 mr-2" />
                                Düzenle
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleMenuAction("activate", dimension.id, dimension.name)}
                              >
                                <Power className="h-3 w-3 mr-2" />
                                Devreye Al
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleMenuAction("translate", dimension.id, dimension.name)}
                              >
                                <Plus className="h-3 w-3 mr-2" />
                                Tercüme Ekle
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => handleMenuAction("delete", dimension.id, dimension.name)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-3 w-3 mr-2" />
                                Sil
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      {/* Çeviriler */}
                      {expandedTranslations === dimension.id && dimension.translations.length > 0 && (
                        <div className="ml-8 space-y-1">
                          {dimension.translations.map((translation, index) => (
                            <div key={index} className="p-2 rounded-md bg-muted/30 border-dashed border">
                              <div className="flex items-center gap-2">
                                <Languages className="h-3 w-3 text-muted-foreground" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium text-xs truncate">{translation.name}</h4>
                                    <div className="flex items-center gap-1">
                                      <Badge
                                        variant={
                                          translation.status === "Aktif"
                                            ? "default"
                                            : translation.status === "Taslak"
                                              ? "secondary"
                                              : "outline"
                                        }
                                        className="text-xs opacity-80"
                                      >
                                        {translation.status}
                                      </Badge>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                                            <MoreHorizontal className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem
                                            onClick={() => handleMenuAction("view", dimension.id, translation.name)}
                                          >
                                            <Eye className="h-3 w-3 mr-2" />
                                            Detayını Gör
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => handleMenuAction("edit", dimension.id, translation.name)}
                                          >
                                            <Edit className="h-3 w-3 mr-2" />
                                            Düzenle
                                          </DropdownMenuItem>
                                          <DropdownMenuItem
                                            onClick={() => handleMenuAction("activate", dimension.id, translation.name)}
                                          >
                                            <Power className="h-3 w-3 mr-2" />
                                            Devreye Al
                                          </DropdownMenuItem>
                                          <DropdownMenuSeparator />
                                          <DropdownMenuItem
                                            onClick={() => handleMenuAction("delete", dimension.id, translation.name)}
                                            className="text-red-600 focus:text-red-600"
                                          >
                                            <Trash2 className="h-3 w-3 mr-2" />
                                            Sil
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {translation.shortName} • {translation.language}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Panel - Detaylar */}
        <div className="lg:col-span-2">
          {selectedDimension ? (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {selectedDimensionData && (
                    <div className="p-2 rounded-md bg-primary/10">
                      <selectedDimensionData.icon className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle>{selectedDimensionData?.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Kısa Ad: {selectedDimensionData?.shortName} • {selectedDimensionData?.language}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-3">Modeller</h3>
                    <div className="space-y-3">
                      {models[selectedDimension as keyof typeof models]?.map((model, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <h4 className="font-medium mb-2">{model.name}</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-3 bg-muted/50 rounded-md">
                              <div className="text-2xl font-bold text-primary">{model.criteriaCount}</div>
                              <div className="text-xs text-muted-foreground">Kriter Sayısı</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-md">
                              <div className="text-2xl font-bold text-primary">{model.indicatorCount}</div>
                              <div className="text-xs text-muted-foreground">Gösterge Sayısı</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-md">
                              <div className="text-2xl font-bold text-primary">{model.weight}</div>
                              <div className="text-xs text-muted-foreground">Model Ağırlığı</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded-md">
                              <div className="text-2xl font-bold text-primary">{model.coverageLevel}</div>
                              <div className="text-xs text-muted-foreground">Karşılanma Düzeyi</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Detayları görmek için bir boyut seçin</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Dil Seçimi Modalı */}
      <LanguageSelectionModal
        isOpen={showLanguageSelection}
        onClose={() => setShowLanguageSelection(false)}
        onLanguageSelect={handleLanguageSelect}
        dimensionName={selectedDimensionForTranslationData?.name || ""}
        existingTranslations={selectedDimensionForTranslationData?.translations.map((t) => t.language) || []}
      />

      {/* Tercüme Modalı */}
      <TranslationModal
        isOpen={showTranslation}
        onClose={() => setShowTranslation(false)}
        targetLanguage={selectedLanguage || undefined}
      />
    </div>
  )
}
