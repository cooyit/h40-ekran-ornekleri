"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Save, X, Languages, Globe, Plus, Copy, Check, Maximize2, Minimize2, ArrowLeftRight } from "lucide-react"
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

interface TranslationModalProps {
  isOpen: boolean
  onClose: () => void
  targetLanguage?: { name: string; flag: string; code: string }
}

export default function TranslationModal({
  isOpen,
  onClose,
  targetLanguage = { name: "Almanca", flag: "🇩🇪", code: "de" },
}: TranslationModalProps) {
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
  const [isMaximized, setIsMaximized] = useState(false)
  const [showComparison, setShowComparison] = useState(true)

  const handleSave = () => {
    alert(`${targetLanguage.name} tercümesi kaydedildi!`)
    onClose()
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${isMaximized ? "max-w-[95vw] h-[95vh]" : "max-w-6xl max-h-[90vh]"} overflow-hidden`}>
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
              <Languages className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">
                {targetLanguage.flag} {targetLanguage.name} Tercümesi
              </DialogTitle>
              <p className="text-sm text-muted-foreground">Overlay modal ile tercüme ekleme</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComparison(!showComparison)}
              className="h-8 w-8 p-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setIsMaximized(!isMaximized)} className="h-8 w-8 p-0">
              {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className={`grid ${showComparison ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6 p-6`}>
            {/* Orijinal İçerik - Sadece karşılaştırma modunda göster */}
            {showComparison && (
              <div className="space-y-4">
                <Card className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Globe className="h-5 w-5" />
                      Orijinal (🇹🇷 {originalData.language})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Boyut Adı</Label>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-medium text-blue-900">{originalData.name}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("name", originalData.name)}
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "name" ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Kısa Ad</Label>
                        <div className="flex items-center justify-between mt-1">
                          <p className="font-medium text-blue-900">{originalData.shortName}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("shortName", originalData.shortName)}
                            className="h-6 w-6 p-0"
                          >
                            {copiedField === "shortName" ? (
                              <Check className="h-3 w-3 text-green-600" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <Label className="text-xs font-medium text-blue-700 uppercase tracking-wide">Etiketler</Label>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {originalData.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Tercüme Formu */}
            <div className="space-y-4">
              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Languages className="h-5 w-5" />
                    Tercüme ({targetLanguage.flag} {targetLanguage.name})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label htmlFor="name" className="text-sm font-medium text-green-700">
                        Boyut Adı *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Boyut adını tercüme edin"
                        value={translationData.name}
                        onChange={(e) => setTranslationData((prev) => ({ ...prev, name: e.target.value }))}
                        className="mt-2 bg-white"
                      />
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label htmlFor="shortName" className="text-sm font-medium text-green-700">
                        Kısa Ad *
                      </Label>
                      <Input
                        id="shortName"
                        placeholder="Kısa adı tercüme edin"
                        value={translationData.shortName}
                        onChange={(e) => setTranslationData((prev) => ({ ...prev, shortName: e.target.value }))}
                        className="mt-2 bg-white"
                      />
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label className="text-sm font-medium text-green-700">Etiketler</Label>
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
                          className="bg-white"
                        />
                        <Button onClick={addTag} disabled={!newTag.trim()} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    

                    

                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <Label className="text-sm font-medium text-green-700">Durum</Label>
                      <Select
                        value={translationData.status}
                        onValueChange={(value) => setTranslationData((prev) => ({ ...prev, status: value }))}
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
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>Tercüme kaydedildiğinde {targetLanguage.name} dilinde yeni boyut oluşturulacak</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              İptal
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-green-600 to-green-700">
              <Save className="h-4 w-4 mr-2" />
              Tercümeyi Kaydet
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
