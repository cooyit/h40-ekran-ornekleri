"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  Folder,
  Info,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface NewDimensionClassicProps {
  onBack: () => void
}

export default function NewDimensionClassic({ onBack }: NewDimensionClassicProps) {
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
            <p className="text-muted-foreground">Klasik tablo görünümünde yeni boyut tanımlayın</p>
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

      {/* İlerleme Durumu */}
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
        </CardContent>
      </Card>

      {/* Klasik Tablo Formu */}
      <div className="space-y-6">
        {/* Temel Bilgiler Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Temel Bilgiler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium w-1/3">
                    Boyut Adı *{!formData.name && <span className="text-red-500 ml-1">⚠</span>}
                  </TableCell>
                  <TableCell>
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
                      className={!formData.name ? "border-red-300" : ""}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    Kısa Ad *{!formData.shortName && <span className="text-red-500 ml-1">⚠</span>}
                  </TableCell>
                  <TableCell>
                    <Input
                      placeholder="Kısa ad girin (örn: MM)"
                      value={formData.shortName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, shortName: e.target.value }))}
                      className={!formData.shortName ? "border-red-300" : ""}
                    />
                  </TableCell>
                </TableRow>
              
                <TableRow>
                  <TableCell className="font-medium">Dil</TableCell>
                  <TableCell>
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Türkçe">🇹🇷 Türkçe</SelectItem>
                        <SelectItem value="İngilizce">🇺🇸 İngilizce</SelectItem>
                        <SelectItem value="Almanca">🇩🇪 Almanca</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Durum</TableCell>
                  <TableCell>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Taslak">📝 Taslak</SelectItem>
                        <SelectItem value="Aktif">✅ Aktif</SelectItem>
                        <SelectItem value="İnceleme">🔍 İnceleme</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Etiketler Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Etiketler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mevcut Etiketler</TableHead>
                  <TableHead className="w-48">Yeni Etiket Ekle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.length > 0 ? (
                        formData.tags.map((tag) => (
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
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">Henüz etiket eklenmedi</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Etiket adı"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag} disabled={!newTag.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        
        {/* Özet Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Folder className="h-5 w-5" />
              Boyut Özeti
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium w-1/3">Boyut Adı</TableCell>
                  <TableCell>{formData.name || "Henüz girilmedi"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kısa Ad</TableCell>
                  <TableCell>{formData.shortName || "Henüz girilmedi"}</TableCell>
                </TableRow>
                
                <TableRow>
                  <TableCell className="font-medium">Dil</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      {formData.language}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Durum</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Etiket Sayısı</TableCell>
                  <TableCell>{formData.tags.length} etiket</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
