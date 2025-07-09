"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Target,
  BarChart3,
  Hash,
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

interface DimensionDetailModernProps {
  onBack: () => void
  isReadOnly?: boolean
}

export default function DimensionDetailModern({ onBack, isReadOnly = false }: DimensionDetailModernProps) {
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

  const renderHierarchyNode = (node: HierarchyNode, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id)
    const hasChildren = node.children.length > 0

    return (
      <div key={node.id} className="space-y-1">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg border transition-all hover:bg-muted/50 ${
            level > 0 ? "ml-6 bg-muted/20" : "bg-background"
          }`}
        >
          {hasChildren ? (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleNode(node.id)}>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          ) : (
            <div className="w-6" />
          )}

          <div className="p-2 rounded-md bg-primary/10">
            {hasChildren ? (
              <FolderOpen className="h-4 w-4 text-primary" />
            ) : (
              <FileText className="h-4 w-4 text-muted-foreground" />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{node.name}</span>
              <Badge variant="outline" className="text-xs">
                {hasChildren ? "Grup" : "Boyut"}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">Seviye {level + 1}</p>
          </div>

          {editMode && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
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

        {isExpanded && hasChildren && (
          <div className="space-y-1">{node.children.map((child) => renderHierarchyNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

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
              <div className="p-2 rounded-lg bg-primary/10">
                {editMode ? <Edit className="h-6 w-6 text-primary" /> : <Eye className="h-6 w-6 text-primary" />}
              </div>
              Boyut {editMode ? "Düzenleme" : "Detayları"}
            </h1>
            <p className="text-muted-foreground ml-12">
              {editMode ? "Boyut bilgilerini düzenleyin" : "Boyut bilgilerini görüntüleyin"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <Button variant="outline" onClick={() => setEditMode(false)} className="rounded-full">
                <X className="h-4 w-4 mr-2" />
                İptal
              </Button>
              <Button onClick={handleSave} className="rounded-full bg-gradient-to-r from-primary to-primary/80">
                <Save className="h-4 w-4 mr-2" />
                Kaydet
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-full bg-transparent">
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

      {/* Modern Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Sol Panel - Temel Bilgiler */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-blue-100">
                  <Settings className="h-4 w-4 text-blue-600" />
                </div>
                Temel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Boyut Adı</label>
                  {editMode ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <p className="font-semibold mt-1">{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Sistem Adı
                  </label>
                  {editMode ? (
                    <Input
                      value={formData.systemName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, systemName: e.target.value }))}
                      className="mt-1"
                    />
                  ) : (
                    <code className="block mt-1 bg-muted px-2 py-1 rounded text-sm">{formData.systemName}</code>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Dil</label>
                  {editMode ? (
                    <Select
                      value={formData.language}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Türkçe">Türkçe</SelectItem>
                        <SelectItem value="İngilizce">İngilizce</SelectItem>
                        <SelectItem value="Almanca">Almanca</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="h-4 w-4" />
                      <span>{formData.language}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Durum</label>
                  {editMode ? (
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Pasif">Pasif</SelectItem>
                        <SelectItem value="Taslak">Taslak</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="mt-1">
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
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İstatistikler */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-green-100">
                  <Target className="h-4 w-4 text-green-600" />
                </div>
                İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{formData.hierarchy.length}</div>
                  <div className="text-xs text-blue-600 font-medium">Ana Grup</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {formData.hierarchy.reduce((acc, node) => acc + node.children.length, 0)}
                  </div>
                  <div className="text-xs text-green-600 font-medium">Alt Boyut</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{formData.tags.length}</div>
                  <div className="text-xs text-orange-600 font-medium">Etiket</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orta Panel - Etiketler */}
        <div className="lg:col-span-1 space-y-4">
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
                    {editMode && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 hover:bg-orange-200"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              {editMode && (
                <div className="space-y-2">
                  <Input
                    placeholder="Yeni etiket..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTag()}
                    className="text-sm"
                  />
                  <Button onClick={addTag} disabled={!newTag.trim()} size="sm" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ekle
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sağ Panel - Hiyerarşi */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-lg">
                  <div className="p-2 rounded-lg bg-purple-100">
                    <Folder className="h-4 w-4 text-purple-600" />
                  </div>
                  Hiyerarşik Yapı
                </div>
                {editMode && (
                  <Button size="sm" className="rounded-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Ana Grup Ekle
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {formData.hierarchy.map((node) => renderHierarchyNode(node))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* En Sağ Panel - Modeller */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="p-2 rounded-lg bg-indigo-100">
                  <BarChart3 className="h-4 w-4 text-indigo-600" />
                </div>
                Modeller
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {models.map((model, index) => (
                <div key={index} className="space-y-2">
                  <div className="p-3 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-xs text-indigo-900 leading-tight">{model.name}</h4>
                      {editMode && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Detay</DropdownMenuItem>
                            <DropdownMenuItem>Düzenle</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Kaldır</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-center p-2 bg-white/60 rounded">
                        <Hash className="h-3 w-3 mx-auto mb-1 text-indigo-600" />
                        <div className="text-sm font-bold text-indigo-600">{model.criteriaCount}</div>
                        <div className="text-xs text-indigo-600">Kriter</div>
                      </div>
                      <div className="text-center p-2 bg-white/60 rounded">
                        <Target className="h-3 w-3 mx-auto mb-1 text-indigo-600" />
                        <div className="text-sm font-bold text-indigo-600">{model.indicatorCount}</div>
                        <div className="text-xs text-indigo-600">Gösterge</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {editMode && (
                <Button size="sm" className="w-full rounded-full text-xs">
                  <Plus className="h-3 w-3 mr-1" />
                  Model Ekle
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
