"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
  BarChart3,
  Hash,
  Target,
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

interface DimensionDetailClassicProps {
  onBack: () => void
  isReadOnly?: boolean
}

export default function DimensionDetailClassic({ onBack, isReadOnly = false }: DimensionDetailClassicProps) {
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

      {/* Klasik Tablo Tasarımı */}
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
                  <TableCell className="font-medium w-1/3">Boyut Adı</TableCell>
                  <TableCell>
                    {editMode ? (
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    ) : (
                      formData.name
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kısa Adı</TableCell>
                  <TableCell>
                    {editMode ? (
                      <Input
                        value={formData.systemName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, shortName: e.target.value }))}
                      />
                    ) : (
                      <code className="bg-muted px-2 py-1 rounded">{formData.shortName}</code>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dil</TableCell>
                  <TableCell>
                    {editMode ? (
                      <Select
                        value={formData.language}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, language: value }))}
                      >
                        <SelectTrigger className="w-48">
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
                        {formData.language}
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Durum</TableCell>
                  <TableCell>
                    {editMode ? (
                      <Select
                        value={formData.status}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger className="w-48">
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
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
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
            </div>
          </CardContent>
        </Card>
        
        {/* Hiyerarşi Tablosu 
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Hiyerarşik Yapı
              </div>
              {editMode && (
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Ana Grup Ekle
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8"></TableHead>
                  <TableHead>Adı</TableHead>
                  <TableHead>Tip</TableHead>
                  <TableHead>Seviye</TableHead>
                  {editMode && <TableHead className="w-8"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {formData.hierarchy.map((node) => (
                  <>
                    <TableRow key={node.id}>
                      <TableCell>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => toggleNode(node.id)}>
                          {expandedNodes.includes(node.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      </TableCell>
                      <TableCell className="font-medium flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-blue-600" />
                        {node.name}
                      </TableCell>
                      <TableCell>Ana Grup</TableCell>
                      <TableCell>1</TableCell>
                      {editMode && (
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Alt Boyut Ekle</DropdownMenuItem>
                              <DropdownMenuItem>Düzenle</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      )}
                    </TableRow>
                    {expandedNodes.includes(node.id) &&
                      node.children.map((child) => (
                        <TableRow key={child.id} className="bg-muted/30">
                          <TableCell className="pl-8"></TableCell>
                          <TableCell className="flex items-center gap-2 pl-4">
                            <FileText className="h-4 w-4 text-gray-500" />
                            {child.name}
                          </TableCell>
                          <TableCell>Alt Boyut</TableCell>
                          <TableCell>2</TableCell>
                          {editMode && (
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem>Düzenle</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Sil</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        */}
        {/* Modeller Tablosu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                İlişkili Modeller
              </div>
              
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
                  <TableHead>Durum</TableHead>
                  {editMode && <TableHead className="w-8"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {models.map((model, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{model.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        {model.criteriaCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        {model.indicatorCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        {models.weight ?? "5"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Hash className="h-4 w-4 text-muted-foreground" />
                        {models.coverageLevel ?? "Orta Seviye"}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge variant="default">Aktif</Badge>
                    </TableCell>
                    {editMode && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Model Detayı</DropdownMenuItem>
                        
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
