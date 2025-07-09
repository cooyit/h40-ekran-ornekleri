"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Save,
  X,
  Plus,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Tag,
  Globe,
  Settings,
  FileText,
  Edit,
  Eye,
  MoreHorizontal,
  Trash2,
  Power,
  Calendar,
  Hash,
  BarChart3,
  Target,
  Info,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

// Örnek boyut verisi
const dimensionData = {
  id: 1,
  name: "Müşteri Memnuniyeti",
  systemName: "customer_satisfaction",
  language: "Türkçe",
  status: "Aktif",
  tags: ["Müşteri", "Deneyim", "Kalite", "Hizmet"],
  hierarchy: [
    {
      id: 1,
      name: "Hizmet Kalitesi",
      children: [
        { id: 11, name: "Yanıt Süresi", children: [] },
        { id: 12, name: "Çözüm Kalitesi", children: [] },
        {
          id: 13,
          name: "İletişim",
          children: [
            { id: 131, name: "Nezaket", children: [] },
            { id: 132, name: "Anlaşılırlık", children: [] },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Ürün Memnuniyeti",
      children: [
        { id: 21, name: "Kalite", children: [] },
        { id: 22, name: "Fiyat/Performans", children: [] },
      ],
    },
  ],
}

const models = [
  { name: "Müşteri Deneyimi Modeli", criteriaCount: 8, indicatorCount: 24 },
  { name: "Hizmet Kalitesi Modeli", criteriaCount: 6, indicatorCount: 18 },
  { name: "Memnuniyet Ölçüm Modeli", criteriaCount: 5, indicatorCount: 15 },
]

interface HierarchyNode {
  id: number
  name: string
  children: HierarchyNode[]
}

interface DimensionDetailCardsProps {
  onBack: () => void
  isReadOnly?: boolean
}

export default function DimensionDetailCards({ onBack, isReadOnly = false }: DimensionDetailCardsProps) {
  const [formData, setFormData] = useState(dimensionData)
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 2])
  const [newTag, setNewTag] = useState("")
  const [editMode, setEditMode] = useState(!isReadOnly)

  const toggleNode = (nodeId: number) => {
    setExpandedNodes((prev) => (prev.includes(nodeId) ? prev.filter((id) => id !== nodeId) : [...prev, nodeId]))
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

  const handleSave = () => {
    alert("Boyut bilgileri kaydedildi!")
    setEditMode(false)
  }

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "edit":
        setEditMode(true)
        break
      case "delete":
        if (confirm("Bu boyut silinsin mi?")) {
          alert("Boyut silindi!")
          onBack()
        }
        break
      case "activate":
        alert("Boyut devreye alındı!")
        break
      case "translate":
        alert("Tercüme ekleniyor...")
        break
    }
  }

  const renderHierarchyCard = (node: HierarchyNode, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id)
    const hasChildren = node.children.length > 0

    return (
      <div key={node.id} className="space-y-2">
        <Card className={`${level > 0 ? "ml-8" : ""} border-l-4 border-l-blue-500`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {hasChildren && (
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleNode(node.id)}>
                    {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                  </Button>
                )}
                {hasChildren ? (
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                ) : (
                  <FileText className="h-5 w-5 text-gray-500" />
                )}
                <div>
                  <h4 className="font-medium">{node.name}</h4>
                  <p className="text-xs text-muted-foreground">
                    {hasChildren ? "Ana Grup" : "Alt Boyut"} • Seviye {level + 1}
                  </p>
                </div>
              </div>
              {editMode && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {hasChildren && <DropdownMenuItem>Alt Boyut Ekle</DropdownMenuItem>}
                    <DropdownMenuItem>Düzenle</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </CardContent>
        </Card>

        {isExpanded && hasChildren && (
          <div className="space-y-2">{node.children.map((child) => renderHierarchyCard(child, level + 1))}</div>
        )}
      </div>
    )
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
              {editMode ? <Edit className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              Boyut {editMode ? "Düzenleme" : "Detayları"}
            </h1>
            <p className="text-muted-foreground">
              {editMode ? "Boyut bilgilerini düzenleyin" : "Boyut bilgilerini görüntüleyin"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)}>
                <X className="h-4 w-4 mr-2" />
                İptal
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MoreHorizontal className="h-4 w-4 mr-2" />
                  İşlemler
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleMenuAction("edit")}>
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuAction("activate")}>
                  <Power className="h-4 w-4 mr-2" />
                  Devreye Al
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuAction("translate")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Tercüme Ekle
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleMenuAction("delete")}
                  className="text-red-600 focus:text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Sil
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Tab'lı Yapı */}
      <Tabs defaultValue="basic-info" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Temel Bilgiler
          </TabsTrigger>
          <TabsTrigger value="models" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            İlişkili Modeller ({models.length})
          </TabsTrigger>
        </TabsList>

        {/* Temel Bilgiler Tab */}
        <TabsContent value="basic-info" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sol Panel */}
            <div className="lg:col-span-2 space-y-6">
              {/* Temel Bilgiler Kartı */}
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Temel Bilgiler
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">Boyut Adı</label>
                          {editMode ? (
                            <Input
                              value={formData.name}
                              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            />
                          ) : (
                            <p className="font-medium">{formData.name}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">Dil</label>
                          {editMode ? (
                            <Select
                              value={formData.language}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Türkçe">Türkçe</SelectItem>
                                <SelectItem value="İngilizce">İngilizce</SelectItem>
                                <SelectItem value="Almanca">Almanca</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              <span>{formData.language}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">Durum</label>
                          {editMode ? (
                            <Select
                              value={formData.status}
                              onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Aktif">Aktif</SelectItem>
                                <SelectItem value="Pasif">Pasif</SelectItem>
                                <SelectItem value="Taslak">Taslak</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <Badge
                              variant={
                                formData.status === "Aktif"
                                  ? "default"
                                  : formData.status === "Taslak"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {formData.status}
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Etiketler Kartı */}
              <Card className="border-l-4 border-l-orange-500">
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
                            {editMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-4 w-4 p-0 hover:bg-transparent"
                                onClick={() => removeTag(tag)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  {editMode && (
                    <div className="flex gap-2">
                      <Input
                        placeholder="Yeni etiket ekle..."
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && addTag()}
                      />
                      <Button onClick={addTag} disabled={!newTag.trim()}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              
            </div>

            {/* Sağ Panel - İstatistikler */}
            <div className="space-y-6">
             

              <Card>
                <CardHeader>
                  <CardTitle>Son İşlemler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Oluşturulma</div>
                          <div className="text-muted-foreground">15 Ocak 2024</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-muted/30">
                    <CardContent className="p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Edit className="h-4 w-4" />
                        <div>
                          <div className="font-medium">Son Güncelleme</div>
                          <div className="text-muted-foreground">20 Ocak 2024</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* İlişkili Modeller Tab */}
        <TabsContent value="models" className="mt-6">
          <div className="space-y-6">
            {/* Modeller Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">İlişkili Modeller</h2>
                <p className="text-muted-foreground">Bu boyutla ilişkili tüm modeller</p>
              </div>
              {editMode && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Model Ekle
                </Button>
              )}
            </div>

            {/* Modeller Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model, index) => (
                <Card key={index} className="border-l-4 border-l-purple-500 hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg text-purple-900">{model.name}</CardTitle>
                      <Badge variant="default" className="bg-purple-600">
                        Aktif
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <Hash className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">{model.criteriaCount}</div>
                          <div className="text-sm text-purple-600">Kriter</div>
                        </CardContent>
                      </Card>

                      <Card className="bg-purple-50 border-purple-200">
                        <CardContent className="p-4 text-center">
                          <Target className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                          <div className="text-2xl font-bold text-purple-600">{model.indicatorCount}</div>
                          <div className="text-sm text-purple-600">Gösterge</div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button variant="outline" size="sm">
                        Model Detayı
                      </Button>
                      {editMode && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Düzenle</DropdownMenuItem>
                            <DropdownMenuItem>Kopyala</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Kaldır</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Model İstatistikleri */}
            <Card className="border-l-4 border-l-indigo-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Model İstatistikleri
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Card className="bg-indigo-50 border-indigo-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-indigo-600">{models.length}</div>
                      <div className="text-sm text-indigo-600">Toplam Model</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {models.reduce((acc, model) => acc + model.criteriaCount, 0)}
                      </div>
                      <div className="text-sm text-blue-600">Toplam Kriter</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {models.reduce((acc, model) => acc + model.indicatorCount, 0)}
                      </div>
                      <div className="text-sm text-green-600">Toplam Gösterge</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-50 border-orange-200">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round(models.reduce((acc, model) => acc + model.indicatorCount, 0) / models.length)}
                      </div>
                      <div className="text-sm text-orange-600">Ortalama Gösterge</div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
