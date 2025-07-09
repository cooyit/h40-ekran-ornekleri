"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, X, Eye, Languages, Globe, Plus, Copy, Check } from "lucide-react"
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

interface TranslationClassicProps {
  onBack: () => void
  targetLanguage?: { name: string; flag: string; code: string }
}

export default function TranslationClassic({
  onBack,
  targetLanguage = { name: "Almanca", flag: "🇩🇪", code: "de" },
}: TranslationClassicProps) {
  const [translationData, setTranslationData] = useState({
    name: "",
    shortName: "",
    tags: [] as string[],
    description: "",
    implementationExample: "",
    status: "Taslak",
  })
  const [newTag, setNewTag] = useState("")
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleSave = () => {
    alert(`${targetLanguage.name} tercümesi kaydedildi!`)
    onBack()
  }

  const copyFromOriginal = (field: string, value: string) => {
    setTranslationData((prev) => ({ ...prev, [field]: value }))
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
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
            <p className="text-muted-foreground">Orijinal içerik ile karşılaştırmalı tercüme</p>
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

      {/* Yan Yana Karşılaştırma */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Panel - Orijinal İçerik */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Orijinal Kayıt (🇹🇷 {originalData.language})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Boyut Adı</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-md">{originalData.name}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyFromOriginal("name", originalData.name)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedField === "name" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Kısa Ad</Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 p-3 bg-muted rounded-md">{originalData.shortName}</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyFromOriginal("shortName", originalData.shortName)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedField === "shortName" ? (
                      <Check className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Etiketler */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Etiketler</Label>
              <div className="flex flex-wrap gap-2">
                {originalData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-xs text-muted-foreground">Orijinal: {originalData.tags.join(", ")}</div>
            </div>

            {/* Açıklama 
            <div className="space-y-2">
              <Label className="text-sm font-medium">Açıklama</Label>
              <div className="flex items-start gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md min-h-[100px]">{originalData.description}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyFromOriginal("description", originalData.description)}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "description" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            */}
            {/* Uygulama Örneği 
            <div className="space-y-2">
              <Label className="text-sm font-medium">Uygulama Örneği</Label>
              <div className="flex items-start gap-2">
                <div className="flex-1 p-3 bg-muted rounded-md min-h-[100px]">{originalData.implementationExample}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyFromOriginal("implementationExample", originalData.implementationExample)}
                  className="h-8 w-8 p-0"
                >
                  {copiedField === "implementationExample" ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            */}
          </CardContent>
        </Card>

        {/* Sağ Panel - Yeni Tercüme */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Languages className="h-5 w-5" />
              Yeni Tercüme ({targetLanguage.flag} {targetLanguage.name})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Temel Bilgiler */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Boyut Adı *
                </Label>
                <Input
                  id="name"
                  placeholder="Boyut adını tercüme edin"
                  value={translationData.name}
                  onChange={(e) => setTranslationData((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortName" className="text-sm font-medium">
                  Kısa Ad *
                </Label>
                <Input
                  id="shortName"
                  placeholder="Kısa adı tercüme edin"
                  value={translationData.shortName}
                  onChange={(e) => setTranslationData((prev) => ({ ...prev, shortName: e.target.value }))}
                />
              </div>
            </div>

            {/* Etiketler */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Etiketler</Label>
              <div className="flex flex-wrap gap-2 mb-2">
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
                  placeholder="Tercüme edilmiş etiket"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <Button onClick={addTag} disabled={!newTag.trim()}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Açıklama 
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Açıklama
              </Label>
              <Textarea
                id="description"
                placeholder="Açıklamayı tercüme edin"
                value={translationData.description}
                onChange={(e) => setTranslationData((prev) => ({ ...prev, description: e.target.value }))}
                rows={4}
              />
            </div>
            */}
            {/* Uygulama Örneği 
            <div className="space-y-2">
              <Label htmlFor="implementationExample" className="text-sm font-medium">
                Uygulama Örneği
              </Label>
              <Textarea
                id="implementationExample"
                placeholder="Örneği tercüme edin"
                value={translationData.implementationExample}
                onChange={(e) => setTranslationData((prev) => ({ ...prev, implementationExample: e.target.value }))}
                rows={4}
              />
            </div>
            */}
            {/* Durum */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Durum</Label>
              <Select
                value={translationData.status}
                onValueChange={(value) => setTranslationData((prev) => ({ ...prev, status: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Taslak">📝 Taslak</SelectItem>
                  <SelectItem value="Aktif">✅ Aktif</SelectItem>
                  <SelectItem value="İnceleme">🔍 İnceleme</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alt Bilgi */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>
              Tercüme tamamlandığında, sistem otomatik olarak {targetLanguage.name} dilinde yeni bir boyut
              oluşturacaktır.
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
