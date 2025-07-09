"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, X, Languages, Plus, Eye, Edit, CheckCircle, AlertCircle, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Orijinal boyut verisi
const originalData = {
  name: "Müşteri Memnuniyeti",
  shortName: "MM",
  language: "Türkçe",
  tags: ["Müşteri", "Deneyim", "Kalite", "Hizmet"],
  description: "Kurumunuzun müşteri memnuniyetinin mevcut durumunu değerlendirin",
  implementationExample: "Elektronik hasta kayıt sistemi, telemedicine platformları, dijital görüntüleme sistemleri",
}

interface TranslationCardsProps {
  onBack: () => void
  targetLanguage?: { name: string; flag: string; code: string }
}

export default function TranslationCards({
  onBack,
  targetLanguage = { name: "Almanca", flag: "🇩🇪", code: "de" },
}: TranslationCardsProps) {
  const [translationData, setTranslationData] = useState({
    name: "",
    shortName: "",
    tags: [] as string[],
    description: "",
    implementationExample: "",
    status: "Taslak",
  })
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("basic-info")

  const handleSave = () => {
    alert(`${targetLanguage.name} tercümesi kaydedildi!`)
    onBack()
  }

  const addTag = () => {
    if (newTag.trim() && !translationData.tags.includes(newTag.trim())) {
      setTranslationData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTranslationData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const getCompletionStatus = () => {
    const fields = [translationData.name, translationData.shortName, translationData.description]
    const completed = fields.filter(Boolean).length
    const total = fields.length
    return { completed, total, percentage: Math.round((completed / total) * 100) }
  }

  const status = getCompletionStatus()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Languages className="h-6 w-6" />
              {targetLanguage.flag} {targetLanguage.name} Tercümesi
            </h1>
            <p className="text-muted-foreground">Tab tabanlı tercüme ekleme</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            <X className="h-4 w-4 mr-2" />
            İptal
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Tercümeyi Kaydet
          </Button>
        </div>
      </div>

      {/* İlerleme Kartı */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Languages className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Tercüme İlerlemesi</h3>
                <p className="text-sm text-muted-foreground">
                  {status.completed}/{status.total} alan tamamlandı
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">%{status.percentage}</div>
                <div className="text-xs text-muted-foreground">Tamamlandı</div>
              </div>
              {status.percentage === 100 ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <AlertCircle className="h-8 w-8 text-orange-600" />
              )}
            </div>
          </div>
          <div className="mt-3 w-full bg-muted rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${status.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tab'lı Tercüme Formu */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Temel Bilgiler
            {translationData.name && translationData.shortName && <CheckCircle className="h-3 w-3 text-green-600" />}
          </TabsTrigger>
          
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Önizleme
          </TabsTrigger>
        </TabsList>

        {/* Temel Bilgiler Tab */}
        <TabsContent value="basic-info" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orijinal Bilgiler */}
            <Card className="border-l-4 border-l-gray-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Eye className="h-5 w-5" />
                  Orijinal (🇹🇷 {originalData.language})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-muted-foreground">Boyut Adı</Label>
                    <p className="font-medium mt-1">{originalData.name}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-muted-foreground">Kısa Ad</Label>
                    <p className="font-medium mt-1">{originalData.shortName}</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-muted-foreground">Etiketler</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {originalData.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Tercüme Alanları */}
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Languages className="h-5 w-5" />
                  Tercüme ({targetLanguage.flag} {targetLanguage.name})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Boyut Adı *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Boyut adını tercüme edin"
                      value={translationData.name}
                      onChange={(e) => setTranslationData((prev) => ({ ...prev, name: e.target.value }))}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label htmlFor="shortName" className="text-sm font-medium">
                      Kısa Ad *
                    </Label>
                    <Input
                      id="shortName"
                      placeholder="Kısa adı tercüme edin"
                      value={translationData.shortName}
                      onChange={(e) => setTranslationData((prev) => ({ ...prev, shortName: e.target.value }))}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium">Etiketler</Label>
                    <div className="flex flex-wrap gap-2 mt-2 mb-3">
                      {translationData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 hover:bg-transparent"
                            onClick={() => removeTag(tag)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Yeni etiket ekle"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag} disabled={!newTag.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        

        {/* Önizleme Tab */}
        <TabsContent value="preview" className="mt-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Tercüme Önizlemesi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-purple-700">Boyut Adı</Label>
                    <p className="font-medium mt-1">{translationData.name || "Henüz tercüme edilmedi"}</p>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-purple-700">Kısa Ad</Label>
                    <p className="font-medium mt-1">{translationData.shortName || "Henüz tercüme edilmedi"}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <Label className="text-sm font-medium text-purple-700">Etiketler</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {translationData.tags.length > 0 ? (
                      translationData.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground text-sm">Henüz etiket eklenmedi</span>
                    )}
                  </div>
                </CardContent>
              </Card>

              

              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm font-medium text-purple-700">Durum</Label>
                      <div className="mt-1">
                        <Badge
                          variant={
                            translationData.status === "Aktif"
                              ? "default"
                              : translationData.status === "İnceleme"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {translationData.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Hedef Dil</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg">{targetLanguage.flag}</span>
                        <span className="font-medium">{targetLanguage.name}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
