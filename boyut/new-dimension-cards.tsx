"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Tag,
  Globe,
  Settings,
  FileText,
  Info,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewDimensionCardsProps {
  onBack: () => void
}

export default function NewDimensionCards({ onBack }: NewDimensionCardsProps) {
  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    systemName: "",
    language: "Türkçe",
    status: "Taslak",
    tags: [] as string[],
    description: "",
    implementationExample: "",
  })
  const [newTag, setNewTag] = useState("")
  const [activeTab, setActiveTab] = useState("basic-info")

  const handleSave = () => {
    if (!formData.name || !formData.shortName) {
      alert("Lütfen zorunlu alanları doldurun!")
      return
    }
    alert("Yeni boyut başarıyla oluşturuldu!")
    onBack()
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const getCompletionStatus = () => {
    const requiredFields = [formData.name, formData.shortName]
    const optionalFields = [formData.description, formData.implementationExample]
    const requiredCompleted = requiredFields.filter(Boolean).length
    const optionalCompleted = optionalFields.filter(Boolean).length
    const totalCompleted = requiredCompleted + optionalCompleted
    const totalFields = requiredFields.length + optionalFields.length

    return {
      required: requiredCompleted,
      optional: optionalCompleted,
      total: totalCompleted,
      percentage: Math.round((totalCompleted / totalFields) * 100),
      isValid: requiredCompleted === requiredFields.length,
    }
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
              <Plus className="h-6 w-6" />
              Yeni Boyut Oluştur
            </h1>
            <p className="text-muted-foreground">Kart tabanlı görünümde yeni boyut tanımlayın</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            <X className="h-4 w-4 mr-2" />
            İptal
          </Button>
          <Button onClick={handleSave} disabled={!status.isValid}>
            <Save className="h-4 w-4 mr-2" />
            Boyutu Kaydet
          </Button>
        </div>
      </div>

      {/* İlerleme Kartı */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium">Form İlerlemesi</h3>
                <p className="text-sm text-muted-foreground">
                  Zorunlu: {status.required}/2 • İsteğe Bağlı: {status.optional}/2
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">%{status.percentage}</div>
                <div className="text-xs text-muted-foreground">Tamamlandı</div>
              </div>
              {status.isValid ? (
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

      {/* Tab'lı Form */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic-info" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Temel Bilgiler
            {formData.name && formData.shortName && <CheckCircle className="h-3 w-3 text-green-600" />}
          </TabsTrigger>
          
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            Önizleme
          </TabsTrigger>
        </TabsList>

        {/* Temel Bilgiler Tab */}
        <TabsContent value="basic-info" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="h-5 w-5" />
                  Zorunlu Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label htmlFor="name" className="text-sm font-medium text-green-700">
                      Boyut Adı *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Boyut adını girin"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                          systemName: e.target.value
                            .toLowerCase()
                            .replace(/\s+/g, "_")
                            .replace(/[^a-z0-9_]/g, ""),
                        }))
                      }}
                      className={`mt-2 bg-white ${!formData.name ? "border-red-300" : ""}`}
                    />
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label htmlFor="shortName" className="text-sm font-medium text-green-700">
                      Kısa Ad *
                    </Label>
                    <Input
                      id="shortName"
                      placeholder="Kısa ad girin (örn: MM)"
                      value={formData.shortName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortName: e.target.value }))}
                      className={`mt-2 bg-white ${!formData.shortName ? "border-red-300" : ""}`}
                    />
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Globe className="h-5 w-5" />
                  Sistem Ayarları
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Card className="bg-blue-50 border-blue-200">
                  
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-blue-700">Dil</Label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="mt-2 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Türkçe">🇹🇷 Türkçe</SelectItem>
                        <SelectItem value="İngilizce">🇺🇸 İngilizce</SelectItem>
                        <SelectItem value="Almanca">🇩🇪 Almanca</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-blue-700">Durum</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="mt-2 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Taslak">📝 Taslak</SelectItem>
                        <SelectItem value="Aktif">✅ Aktif</SelectItem>
                        <SelectItem value="İnceleme">🔍 İnceleme</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>

          {/* Etiketler */}
          <Card className="border-l-4 border-l-orange-500 mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Etiketler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Card key={tag} className="bg-orange-50 border-orange-200">
                    <CardContent className="p-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
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
                    </CardContent>
                  </Card>
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
        </TabsContent>

        

        {/* Önizleme Tab */}
        <TabsContent value="preview" className="mt-6">
          <Card className="border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Boyut Önizlemesi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-green-700">Boyut Adı</Label>
                    <p className="font-medium mt-1">{formData.name || "Henüz girilmedi"}</p>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-green-700">Kısa Ad</Label>
                    <p className="font-medium mt-1">{formData.shortName || "Henüz girilmedi"}</p>
                  </CardContent>
                </Card>
              </div>

              

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-green-700">Dil</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="h-4 w-4" />
                      <span>{formData.language}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-green-700">Durum</Label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          formData.status === "Aktif"
                            ? "default"
                            : formData.status === "İnceleme"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {formData.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <Label className="text-sm font-medium text-green-700">Etiketler</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.tags.length > 0 ? (
                      formData.tags.map((tag) => (
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

              {formData.description && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-green-700">Açıklama</Label>
                    <p className="mt-2 text-sm leading-relaxed">{formData.description}</p>
                  </CardContent>
                </Card>
              )}

              {formData.implementationExample && (
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <Label className="text-sm font-medium text-green-700">Uygulama Örneği</Label>
                    <p className="mt-2 text-sm leading-relaxed">{formData.implementationExample}</p>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
