"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Search } from "lucide-react"

const languages = ["Türkçe", "İngilizce", "Almanca", "Fransızca", "İspanyolca"]
const hospitalTypes = [
  "Genel Hastane",
  "Özel Hastane",
  "Branş Hastanesi",
  "Eğitim Araştırma Hastanesi",
  "Devlet Hastanesi",
  "Üniversite Hastanesi",
]
const userTypes = ["İdari Personel", "Tıbbi Personel", "Teknik Personel", "Hemşire", "Doktor", "Yönetici"]

export default function AddModel1() {
  const [formData, setFormData] = useState({
    language: "",
    modelName: "",
    modelShortName: "",
    modelTags: "",
    modelType: "",
    hierarchy: "",
    userScope: "",
  })

  const [selectedLevels, setSelectedLevels] = useState<string[]>([])
  const [selectedHospitalTypes, setSelectedHospitalTypes] = useState<string[]>([])
  const [selectedUserTypes, setSelectedUserTypes] = useState<string[]>([])
  const [levelSearch, setLevelSearch] = useState("")
  const [hospitalSearch, setHospitalSearch] = useState("")
  const [userSearch, setUserSearch] = useState("")

  const addLevel = (level: string) => {
    if (!selectedLevels.includes(level)) {
      setSelectedLevels([...selectedLevels, level])
    }
    setLevelSearch("")
  }

  const removeLevel = (level: string) => {
    setSelectedLevels(selectedLevels.filter((l) => l !== level))
  }

  const addHospitalType = (type: string) => {
    if (!selectedHospitalTypes.includes(type)) {
      setSelectedHospitalTypes([...selectedHospitalTypes, type])
    }
    setHospitalSearch("")
  }

  const removeHospitalType = (type: string) => {
    setSelectedHospitalTypes(selectedHospitalTypes.filter((t) => t !== type))
  }

  const addUserType = (type: string) => {
    if (!selectedUserTypes.includes(type)) {
      setSelectedUserTypes([...selectedUserTypes, type])
    }
    setUserSearch("")
  }

  const removeUserType = (type: string) => {
    setSelectedUserTypes(selectedUserTypes.filter((t) => t !== type))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form Data:", {
      ...formData,
      selectedLevels,
      selectedHospitalTypes,
      selectedUserTypes,
    })
    // Model structure builder sayfasına yönlendir
    window.location.href = "/model-structure-builder"
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Yeni Model Ekle - Klasik Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dil Seçimi */}
              <div className="space-y-2">
                <Label htmlFor="language">Model için dil seçiniz</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) => setFormData({ ...formData, language: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Dil seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model Adı */}
              <div className="space-y-2">
                <Label htmlFor="modelName">Model Adı (Kullanıcıya gösterilecek isim)</Label>
                <Input
                  id="modelName"
                  placeholder="Örn: Dijital Sağlık Altyapısı"
                  value={formData.modelName}
                  onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                />
              </div>

              {/* Model Kısa Adı */}
              <div className="space-y-2">
                <Label htmlFor="modelShortName">Model Kısa Adı (Yönetim Paneli için)</Label>
                <Input
                  id="modelShortName"
                  placeholder="Örn: DSA TR"
                  value={formData.modelShortName}
                  onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                />
              </div>

              {/* Model Etiketleri */}
              <div className="space-y-2">
                <Label htmlFor="modelTags">Model Etiketleri (Virgülle ayırarak yazın)</Label>
                <Input
                  id="modelTags"
                  placeholder="Örn: altyapı, dijital, sağlık"
                  value={formData.modelTags}
                  onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                />
              </div>
            </div>

            {/* Model Türü */}
            <div className="space-y-3">
              <Label>Model türünü belirleyiniz</Label>
              <RadioGroup
                value={formData.modelType}
                onValueChange={(value) => setFormData({ ...formData, modelType: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="seviyeli" id="seviyeli" />
                  <Label htmlFor="seviyeli">Seviye Esaslı</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="puanli" id="puanli" />
                  <Label htmlFor="puanli">Puan Esaslı</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Model Hiyerarşisi */}
            <div className="space-y-3">
              <Label>Model hiyerarşisini belirleyiniz</Label>
              <RadioGroup
                value={formData.hierarchy}
                onValueChange={(value) => setFormData({ ...formData, hierarchy: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boyut-kriter-gosterge" id="boyut-kriter-gosterge" />
                  <Label htmlFor="boyut-kriter-gosterge">Boyut - Kriter - Gösterge</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boyut-gosterge" id="boyut-gosterge" />
                  <Label htmlFor="boyut-gosterge">Boyut - Gösterge</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Seviye Seçimi - Sadece seviyeli seçilirse görünür */}
            {formData.modelType === "seviyeli" && (
              <div className="space-y-3">
                <Label>Model için Seviye Ekleyiniz</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Seviye Ara"
                    value={levelSearch}
                    onChange={(e) => setLevelSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {levelSearch && (
                  <div className="border rounded-md p-2 bg-white shadow-sm">
                    {Array.from({ length: 10 }, (_, i) => `Seviye ${i + 1}`)
                      .filter((level) => level.toLowerCase().includes(levelSearch.toLowerCase()))
                      .map((level) => (
                        <div
                          key={level}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addLevel(level)}
                        >
                          {level}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedLevels.map((level) => (
                    <Badge key={level} variant="secondary" className="flex items-center gap-1">
                      {level}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeLevel(level)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Hastane Türleri */}
            <div className="space-y-3">
              <Label>Model için Hastane Türleri Ekleyiniz</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Hastane Türü Ara"
                  value={hospitalSearch}
                  onChange={(e) => setHospitalSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              {hospitalSearch && (
                <div className="border rounded-md p-2 bg-white shadow-sm">
                  {hospitalTypes
                    .filter((type) => type.toLowerCase().includes(hospitalSearch.toLowerCase()))
                    .map((type) => (
                      <div
                        key={type}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => addHospitalType(type)}
                      >
                        {type}
                      </div>
                    ))}
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                {selectedHospitalTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="flex items-center gap-1">
                    {type}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeHospitalType(type)} />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Kullanıcı Kapsamı */}
            <div className="space-y-3">
              <Label>Model kullanıcı kapsamını belirleyiniz</Label>
              <RadioGroup
                value={formData.userScope}
                onValueChange={(value) => setFormData({ ...formData, userScope: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tek" id="tek" />
                  <Label htmlFor="tek">Tek anket</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="coklu" id="coklu" />
                  <Label htmlFor="coklu">Çoklu Anket</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Kullanıcı Türleri - Sadece çoklu anket seçilirse görünür */}
            {formData.userScope === "coklu" && (
              <div className="space-y-3">
                <Label>Model için Kullanıcı Türleri Ekleyiniz</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Kullanıcı Türü Ara"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {userSearch && (
                  <div className="border rounded-md p-2 bg-white shadow-sm">
                    {userTypes
                      .filter((type) => type.toLowerCase().includes(userSearch.toLowerCase()))
                      .map((type) => (
                        <div
                          key={type}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => addUserType(type)}
                        >
                          {type}
                        </div>
                      ))}
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {selectedUserTypes.map((type) => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeUserType(type)} />
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between space-x-4 pt-6">
              <Button type="button" variant="outline">
                İptal
              </Button>
              <div className="flex space-x-2">
                <Button type="button" variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-100">
                  Kaydet ve Çık
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  İleri
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
