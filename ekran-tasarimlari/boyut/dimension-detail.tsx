"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

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
    {
      id: 3,
      name: "Genel Memnuniyet",
      children: [
        { id: 31, name: "Tavsiye Etme", children: [] },
        { id: 32, name: "Tekrar Satın Alma", children: [] },
      ],
    },
  ],
}

interface HierarchyNode {
  id: number
  name: string
  children: HierarchyNode[]
}

interface DimensionDetailProps {
  onBack: () => void
}

export default function DimensionDetail({ onBack }: DimensionDetailProps) {
  const [formData, setFormData] = useState(dimensionData)
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 2, 3])
  const [newTag, setNewTag] = useState("")

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

  const renderHierarchyNode = (node: HierarchyNode, level = 0) => {
    const isExpanded = expandedNodes.includes(node.id)
    const hasChildren = node.children.length > 0

    return (
      <div key={node.id} className="space-y-1">
        <div
          className={`flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 cursor-pointer ${
            level > 0 ? `ml-${level * 4}` : ""
          }`}
          style={{ marginLeft: `${level * 16}px` }}
        >
          {hasChildren ? (
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleNode(node.id)}>
              {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          ) : (
            <div className="w-6" />
          )}

          {hasChildren ? (
            isExpanded ? (
              <FolderOpen className="h-4 w-4 text-blue-600" />
            ) : (
              <Folder className="h-4 w-4 text-blue-600" />
            )
          ) : (
            <FileText className="h-4 w-4 text-gray-500" />
          )}

          <span className="text-sm font-medium">{node.name}</span>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-auto opacity-0 group-hover:opacity-100">
                <Plus className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Alt Boyut Ekle</DropdownMenuItem>
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {isExpanded && hasChildren && (
          <div className="space-y-1">{node.children.map((child) => renderHierarchyNode(child, level + 1))}</div>
        )}
      </div>
    )
  }

  const handleSave = () => {
    alert("Boyut bilgileri kaydedildi!")
    onBack()
  }

  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Geri
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Boyut Detayları</h1>
            <p className="text-muted-foreground">Boyut bilgilerini düzenleyin</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={onBack}>
            <X className="h-4 w-4 mr-2" />
            İptal
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Kaydet
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Panel - Temel Bilgiler */}
        <div className="lg:col-span-2 space-y-6">
          {/* Temel Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Temel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Boyut Adı</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemName">Sistem Adı</Label>
                  <Input
                    id="systemName"
                    value={formData.systemName}
                    onChange={(e) => setFormData((prev) => ({ ...prev, systemName: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Dil</Label>
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
                      <SelectItem value="Fransızca">Fransızca</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Durum</Label>
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Etiketler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Etiketler
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
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
                  placeholder="Yeni etiket ekle..."
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

          {/* Hiyerarşik Yapı */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  Hiyerarşik Yapı
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ana Grup Ekle
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {formData.hierarchy.map((node) => (
                  <div key={node.id} className="group">
                    {renderHierarchyNode(node)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Panel - Özet ve İstatistikler */}
        <div className="space-y-6">
          {/* Boyut Özeti */}
          <Card>
            <CardHeader>
              <CardTitle>Boyut Özeti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{formData.language}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    formData.status === "Aktif" ? "default" : formData.status === "Taslak" ? "secondary" : "outline"
                  }
                >
                  {formData.status}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground">
                Sistem Adı: <code className="bg-muted px-1 rounded">{formData.systemName}</code>
              </div>
            </CardContent>
          </Card>

          {/* İstatistikler */}
          <Card>
            <CardHeader>
              <CardTitle>İstatistikler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-md">
                  <div className="text-2xl font-bold text-primary">{formData.hierarchy.length}</div>
                  <div className="text-xs text-muted-foreground">Ana Grup</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-md">
                  <div className="text-2xl font-bold text-primary">
                    {formData.hierarchy.reduce((acc, node) => acc + node.children.length, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Alt Boyut</div>
                </div>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-md">
                <div className="text-2xl font-bold text-primary">{formData.tags.length}</div>
                <div className="text-xs text-muted-foreground">Etiket</div>
              </div>
            </CardContent>
          </Card>

          {/* Son İşlemler */}
          <Card>
            <CardHeader>
              <CardTitle>Son İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-sm">
                <div className="font-medium">Oluşturulma</div>
                <div className="text-muted-foreground">15 Ocak 2024, 14:30</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Son Güncelleme</div>
                <div className="text-muted-foreground">20 Ocak 2024, 09:15</div>
              </div>
              <div className="text-sm">
                <div className="font-medium">Son Düzenleyen</div>
                <div className="text-muted-foreground">Admin User</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
