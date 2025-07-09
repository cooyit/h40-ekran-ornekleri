"use client"

import React from "react"

import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Search,
  ArrowUpDown,
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
import DimensionDetailClassic from "./dimension-detail-classic"
import TranslationClassic from "./translation-classic"
import LanguageSelectionModal from "./language-selection-modal"
import NewDimensionClassic from "./new-dimension-classic"

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
    language: "Türkçe",
    status: "Pasif",
    date: "2024-01-05",
    translations: [{ language: "İngilizce", name: "Operational Efficiency", shortName: "OE", status: "Pasif" }],
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
  1: {
    Türkçe: [
      { name: "Müşteri Deneyimi Modeli", criteriaCount: 8, indicatorCount: 24, weight: 3, coverageLevel: "Temel Seviye" },
      { name: "Hizmet Kalitesi Modeli", criteriaCount: 6, indicatorCount: 18, weight: 2, coverageLevel: "Orta Seviye" },
    ],
    İngilizce: [
      { name: "Customer Experience Model", criteriaCount: 8, indicatorCount: 24, weight: 3, coverageLevel: "Basic Level" },
      { name: "Service Quality Model", criteriaCount: 6, indicatorCount: 18, weight: 2, coverageLevel: "Medium Level" },
    ],
  },
  2: {
    Türkçe: [
      { name: "Karlılık Analizi Modeli", criteriaCount: 5, indicatorCount: 15, weight: 2, coverageLevel: "Orta Seviye" },
      { name: "Nakit Akışı Modeli", criteriaCount: 4, indicatorCount: 12, weight: 2, coverageLevel: "Orta Seviye" },
    ],
    İngilizce: [
      { name: "Profitability Analysis Model", criteriaCount: 5, indicatorCount: 15, weight: 2, coverageLevel: "Medium Level" },
      { name: "Cash Flow Model", criteriaCount: 4, indicatorCount: 12, weight: 2, coverageLevel: "Medium Level" },
    ],
  },
  3: {
    Türkçe: [
      { name: "Süreç Optimizasyonu Modeli", criteriaCount: 7, indicatorCount: 21, weight: 2, coverageLevel: "Orta Seviye" },
    ],
    İngilizce: [
      { name: "Process Optimization Model", criteriaCount: 7, indicatorCount: 21, weight: 2, coverageLevel: "Medium Level" },
    ],
  },
  4: {
    Türkçe: [
      { name: "Personel Performans Modeli", criteriaCount: 6, indicatorCount: 18, weight: 2, coverageLevel: "Orta Seviye" },
      { name: "Eğitim Etkinliği Modeli", criteriaCount: 4, indicatorCount: 12, weight: 2, coverageLevel: "Orta Seviye" },
    ],
    İngilizce: [
      { name: "Personnel Performance Model", criteriaCount: 6, indicatorCount: 18, weight: 2, coverageLevel: "Medium Level" },
      { name: "Training Effectiveness Model", criteriaCount: 4, indicatorCount: 12, weight: 2, coverageLevel: "Medium Level" },
    ],
  },
};


export default function ClassicDesign() {
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
  const [selectedDimensionLanguage, setSelectedDimensionLanguage] = useState<string>("Türkçe");


  const filteredDimensions = dimensions.filter((dim) => {
    const matchesSearch =
      dim.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dim.shortName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || dim.status === statusFilter
    const matchesLanguage = languageFilter === "all" || dim.language === languageFilter

    return matchesSearch && matchesStatus && matchesLanguage
  })

  const toggleTranslations = (dimensionId: number) => {
    setExpandedTranslations(expandedTranslations === dimensionId ? null : dimensionId)
  }

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

  if (showTranslation && selectedLanguage) {
    return <TranslationClassic onBack={() => setShowTranslation(false)} targetLanguage={selectedLanguage} />
  }

  if (showDimensionDetail) {
    return <DimensionDetailClassic onBack={() => setShowDimensionDetail(false)} isReadOnly={viewMode === "view"} />
  }

  if (showNewDimension) {
    return <NewDimensionClassic onBack={() => setShowNewDimension(false)} />
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

      {/* Üst Tablo - Boyutlar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Boyut Listesi</CardTitle>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Boyut ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
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
                  <DropdownMenuItem onClick={() => setSortBy("name")}>İsme Göre A-Z</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("name")}>İsme Göre Z-A</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>Tarihe Göre Eski</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("date")}>Tarihe Göre Yeni</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Boyut Adı</TableHead>
                <TableHead>Kısa Ad</TableHead>
                <TableHead>Dil</TableHead>
                <TableHead>Durum</TableHead>
                <TableHead>Tarih</TableHead>
                <TableHead className="w-8"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDimensions.map((dimension) => (
                <React.Fragment key={dimension.id}>
                  <TableRow
                    key={dimension.id}
                    className={`cursor-pointer hover:bg-muted/50 ${selectedDimension === dimension.id ? "bg-muted" : ""}`}
                    onClick={() => setSelectedDimension(dimension.id)}
                  >
                    <TableCell>
                      {dimension.translations.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleTranslations(dimension.id)
                          }}
                        >
                          {expandedTranslations === dimension.id ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{dimension.name}</TableCell>
                    <TableCell>{dimension.shortName}</TableCell>
                    <TableCell>{dimension.language}</TableCell>
                    <TableCell>
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
                    </TableCell>
                    <TableCell>{dimension.date}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
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
                    </TableCell>
                  </TableRow>

                  {/* Çeviriler Tree View */}
                  {expandedTranslations === dimension.id &&
                    dimension.translations.map((translation, index) => (
                      <TableRow
                        key={dimension.id}
                        className={`cursor-pointer hover:bg-muted/50 ${selectedDimension === dimension.id ? "bg-muted" : ""}`}
                        onClick={() => {
                          setSelectedDimension(dimension.id)
                          setSelectedDimensionLanguage(translation.language)
                        }}
                      >

                        <TableCell className="pl-8">
                          <Languages className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                        <TableCell className="text-muted-foreground pl-4">{translation.name}</TableCell>
                        <TableCell className="text-muted-foreground">{translation.shortName}</TableCell>
                        <TableCell className="text-muted-foreground">{translation.language}</TableCell>
                        <TableCell>
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
                        </TableCell>
                        <TableCell className="text-muted-foreground">-</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alt Tablo - Modeller */}
      {selectedDimension && (
        <Card>
          <CardHeader>
            <CardTitle>
              {
                dimensions
                  .find((d) => d.id === selectedDimension)
                  ?.translations.find((t) => t.language === selectedDimensionLanguage)?.name
                ||
                dimensions.find((d) => d.id === selectedDimension)?.name
              } - Modeller
            </CardTitle>

          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Model Adı</TableHead>
                  <TableHead>Kriter Sayısı</TableHead>
                  <TableHead>Gösterge Sayısı</TableHead>
                  <TableHead>Model Ağırlığı</TableHead>
                  <TableHead>Karşılanma Düzeyi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models[selectedDimension]?.[selectedDimensionLanguage]?.map((model, index) => (

                  <TableRow key={index}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>{model.criteriaCount}</TableCell>
                    <TableCell>{model.indicatorCount}</TableCell>
                    <TableCell>{model.weight}</TableCell>
                    <TableCell>{model.coverageLevel}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem >
                            <Eye className="h-4 w-4 mr-2" />
                            Model Detayını Gör
                          </DropdownMenuItem>                      
                        </DropdownMenuContent>
                      </DropdownMenu>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
