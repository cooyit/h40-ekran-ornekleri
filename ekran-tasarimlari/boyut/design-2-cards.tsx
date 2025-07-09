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
  ChevronDown,
  Calendar,
  Globe,
  Hash,
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
import DimensionDetailCards from "./dimension-detail-cards"
import TranslationCards from "./translation-cards"
import LanguageSelectionModal from "./language-selection-modal"
import NewDimensionCards from "./new-dimension-cards"

// Örnek veri - çeviriler ile birlikte
const dimensions = [
  {
    id: 1,
    name: "Müşteri Memnuniyeti",
    shortName: "MM",
    language: "Türkçe",
    status: "Aktif",
    date: "2024-01-15",
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
    translations: [{ language: "Türkçe", name: "Operasyonel Verimlilik", shortName: "OV", status: "Pasif" }],
  },
  {
    id: 4,
    name: "İnsan Kaynakları",
    shortName: "İK",
    language: "Türkçe",
    status: "Taslak",
    date: "2024-01-20",
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
    translations: [{ language: "Türkçe", name: "Müşteri Memnuniyeti", shortName: "MM", status: "Aktif" }],
  },
  {
    id: 6,
    name: "Teknoloji Altyapısı",
    shortName: "TA",
    language: "Türkçe",
    status: "Taslak",
    date: "2024-01-18",
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

export default function CardsDesign() {
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

  if (showNewDimension) {
    return <NewDimensionCards onBack={() => setShowNewDimension(false)} />
  }

  if (showTranslation && selectedLanguage) {
    return <TranslationCards onBack={() => setShowTranslation(false)} targetLanguage={selectedLanguage} />
  }

  if (showDimensionDetail) {
    return <DimensionDetailCards onBack={() => setShowDimensionDetail(false)} isReadOnly={viewMode === "view"} />
  }

  const filteredDimensions = dimensions.filter((dim) => {
    const matchesSearch =
      dim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dim.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dim.status === statusFilter
    const matchesLanguage = languageFilter === "all" || dim.language === languageFilter

    return matchesSearch && matchesStatus && matchesLanguage
  })

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

  const selectedDimensionData = dimensions.find((d) => d.id === selectedDimensionForTranslation)

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Boyutlar</h1>
        <Button onClick={() => setShowNewDimension(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Boyut Ekle
        </Button>
      </div>

      {/* Arama ve Sıralama */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Boyut ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Durum: {statusFilter === "all" ? "Tümü" : statusFilter}
              <ChevronDown className="h-4 w-4 ml-2" />
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
            <Button variant="outline">
              Dil: {languageFilter === "all" ? "Tümü" : languageFilter}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setLanguageFilter("all")}>Tümü</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguageFilter("Türkçe")}>Türkçe</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguageFilter("İngilizce")}>İngilizce</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Sırala
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSortBy("name")}>İsme Göre</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("date")}>Tarihe Göre</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Boyut Kartları */}
      <div className="space-y-4">
        {filteredDimensions.map((dimension) => (
          <div key={dimension.id} className="space-y-2">
            <Card
              className={`cursor-pointer transition-all hover:shadow-md ${
                selectedDimension === dimension.id ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedDimension(dimension.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      {dimension.translations.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            setExpandedTranslations(expandedTranslations === dimension.id ? null : dimension.id)
                          }}
                        >
                          {expandedTranslations === dimension.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      <CardTitle className="text-lg">{dimension.name}</CardTitle>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Kısa Ad: {dimension.shortName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        dimension.status === "Aktif"
                          ? "default"
                          : dimension.status === "Taslak"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {dimension.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleMenuAction("view", dimension.id, dimension.name)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Detayını Gör
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMenuAction("edit", dimension.id, dimension.name)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Düzenle
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMenuAction("activate", dimension.id, dimension.name)}>
                          <Power className="h-4 w-4 mr-2" />
                          Devreye Al
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleMenuAction("translate", dimension.id, dimension.name)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Tercüme Ekle
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleMenuAction("delete", dimension.id, dimension.name)}
                          className="text-red-600 focus:text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Sil
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {dimension.language}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {dimension.date}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Çeviriler */}
            {expandedTranslations === dimension.id && dimension.translations.length > 0 && (
              <div className="ml-8 space-y-2">
                {dimension.translations.map((translation, index) => (
                  <Card key={index} className="border-dashed bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Languages className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-sm">{translation.name}</h4>
                              <p className="text-xs text-muted-foreground">
                                {translation.shortName} • {translation.language}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  translation.status === "Aktif"
                                    ? "default"
                                    : translation.status === "Taslak"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="opacity-80"
                              >
                                {translation.status}
                              </Badge>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleMenuAction("view", dimension.id, translation.name)}
                                  >
                                    <Eye className="h-4 w-4 mr-2" />
                                    Detayını Gör
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleMenuAction("edit", dimension.id, translation.name)}
                                  >
                                    <Edit className="h-4 w-4 mr-2" />
                                    Düzenle
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => handleMenuAction("activate", dimension.id, translation.name)}
                                  >
                                    <Power className="h-4 w-4 mr-2" />
                                    Devreye Al
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    onClick={() => handleMenuAction("delete", dimension.id, translation.name)}
                                    className="text-red-600 focus:text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Sil
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
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
        ))}
      </div>

      {/* Model Kartları */}
      {selectedDimension && (
        <Card>
          <CardHeader>
            <CardTitle>{dimensions.find((d) => d.id === selectedDimension)?.name} - Modeller</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models[selectedDimension as keyof typeof models]?.map((model, index) => (
                <Card key={index} className="border-dashed">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-3">{model.name}</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Kriter Sayısı:</span>
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          <span className="font-medium">{model.criteriaCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Gösterge Sayısı:</span>
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          <span className="font-medium">{model.indicatorCount}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Model Ağırlığı:</span>
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          <span className="font-medium">{model.weight}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Karşılanma Düzeyi:</span>
                        <div className="flex items-center gap-1">
                          <Hash className="h-3 w-3" />
                          <span className="font-medium">{model.coverageLevel}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Durumu:</span>
                        <div className="flex items-center gap-1">
                          <Badge variant="default">Aktif</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dil Seçimi Modalı */}
      <LanguageSelectionModal
        isOpen={showLanguageSelection}
        onClose={() => setShowLanguageSelection(false)}
        onLanguageSelect={handleLanguageSelect}
        dimensionName={selectedDimensionData?.name || ""}
        existingTranslations={selectedDimensionData?.translations.map((t) => t.language) || []}
      />
    </div>
  )
}
