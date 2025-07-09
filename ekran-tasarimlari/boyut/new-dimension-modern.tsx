"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  Tag,
  Settings,
  FileText,
  Info,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"

interface NewDimensionModernProps {
  onBack: () => void
}

export default function NewDimensionModern({ onBack }: NewDimensionModernProps) {
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
    <div className="p-6 space-y-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      {/* Modern Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="rounded-full bg-transparent">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              Yeni Boyut Oluştur
            </h1>
            <p className="text-muted-foreground ml-12">Modern split görünümde yeni boyut tanımlayın</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack} className="rounded-full bg-transparent">
            <X className="h-4 w-4 mr-2" />
            İptal
          </Button>
          <Button
            onClick={handleSave}
            disabled={!status.isValid}
            className="rounded-full bg-gradient-to-r from-purple-600 to-pink-600"
          >
            <Save className="h-4 w-4 mr-2" />
            Boyutu Kaydet
          </Button>
        </div>
      </div>

      {/* İlerleme Kartı */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-gradient-to-r from-purple-100 to-pink-100">
                <Info className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Form İlerlemesi</h3>
                <p className="text-muted-foreground">
                  Zorunlu: {status.required}/2 • İsteğe Bağlı: {status.optional}/2
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  %{status.percentage}
                </div>
                <div className="text-sm text-muted-foreground">Tamamlandı</div>
              </div>
              {status.isValid ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <AlertCircle className="h-10 w-10 text-orange-600" />
              )}
            </div>
          </div>
          <div className="mt-4 w-full bg-white/60 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${status.percentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Modern Split Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Sol Panel - Temel Bilgiler */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-green-100">
                  <Settings className="h-4 w-4 text-green-600" />
                </div>
                Temel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Boyut Adı *
                  </label>
                  <Input
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
                    className={`mt-1 ${!formData.name ? "border-red-300" : ""}`}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Kısa Ad *</label>
                  <Input
                    placeholder="Kısa ad girin (örn: MM)"
                    value={formData.shortName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, shortName: e.target.value }))}
                    className={`mt-1 ${!formData.shortName ? "border-red-300" : ""}`}
                  />
                </div>

                

                
              </div>
            </CardContent>
          </Card>
          
        </div>
        
        {/* Sağ Panel  */}
        
        <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-orange-100">
                  <Tag className="h-4 w-4 text-orange-600" />
                </div>
                Etiketler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {formData.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center justify-between p-2 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg"
                  >
                    <span className="text-sm font-medium text-orange-800">{tag}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-orange-200"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Input
                  placeholder="Yeni etiket..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                  className="text-sm"
                />
                <Button onClick={addTag} disabled={!newTag.trim()} size="sm" className="w-full rounded-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Ekle
                </Button>
              </div>
            </CardContent>
          </Card>
          {/* Sağ Panel - Dil ve Durum */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50 col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Globe className="h-4 w-4 text-blue-600" />
                </div>
                Dil ve Durum
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dil</label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Türkçe">🇹🇷 Türkçe</SelectItem>
                    <SelectItem value="İngilizce">🇺🇸 İngilizce</SelectItem>
                    <SelectItem value="Almanca">🇩🇪 Almanca</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Durum</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger className="mt-1">
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
    </div>
  )
}
