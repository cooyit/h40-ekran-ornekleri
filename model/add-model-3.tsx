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
import { X, Search, Sparkles, Settings, Globe, Users, Building, Target } from "lucide-react"

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

export default function AddModel3() {
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
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Yeni Model Oluştur
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Premium model oluşturma deneyimi</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Temel Bilgiler */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Globe className="h-6 w-6" />
                Temel Bilgiler
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="language" className="text-lg font-medium">
                    Model için dil seçiniz
                  </Label>
                  <Select
                    value={formData.language}
                    onValueChange={(value) => setFormData({ ...formData, language: value })}
                  >
                    <SelectTrigger className="h-12 text-lg">
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

                <div className="space-y-3">
                  <Label htmlFor="modelName" className="text-lg font-medium">
                    Model Adı
                  </Label>
                  <Input
                    id="modelName"
                    placeholder="Örn: Dijital Sağlık Altyapısı"
                    value={formData.modelName}
                    onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="modelShortName" className="text-lg font-medium">
                    Model Kısa Adı
                  </Label>
                  <Input
                    id="modelShortName"
                    placeholder="Örn: DSA TR"
                    value={formData.modelShortName}
                    onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="modelTags" className="text-lg font-medium">
                    Model Etiketleri
                  </Label>
                  <Input
                    id="modelTags"
                    placeholder="Örn: altyapı, dijital, sağlık"
                    value={formData.modelTags}
                    onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Model Özellikleri */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Settings className="h-6 w-6" />
                Model Özellikleri
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <Label className="text-xl font-semibold text-gray-800">Model türünü belirleyiniz</Label>
                  <RadioGroup
                    value={formData.modelType}
                    onValueChange={(value) => setFormData({ ...formData, modelType: value })}
                  >
                    <div className="relative">
                      <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                        <RadioGroupItem value="seviyeli" id="seviyeli" className="w-5 h-5" />
                        <div className="flex-1">
                          <Label htmlFor="seviyeli" className="text-lg font-medium cursor-pointer">
                            Seviye Esaslı
                          </Label>
                          <p className="text-gray-600 mt-1">Modelde seviye bazlı değerlendirme yapılır</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
                        <RadioGroupItem value="puanli" id="puanli" className="w-5 h-5" />
                        <div className="flex-1">
                          <Label htmlFor="puanli" className="text-lg font-medium cursor-pointer">
                            Puan Esaslı
                          </Label>
                          <p className="text-gray-600 mt-1">Modelde puan bazlı değerlendirme yapılır</p>
                        </div>
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Sparkles className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-6">
                  <Label className="text-xl font-semibold text-gray-800">Model hiyerarşisini belirleyiniz</Label>
                  <RadioGroup
                    value={formData.hierarchy}
                    onValueChange={(value) => setFormData({ ...formData, hierarchy: value })}
                  >
                    <div className="relative">
                      <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all cursor-pointer">
                        <RadioGroupItem value="boyut-kriter-gosterge" id="boyut-kriter-gosterge" className="w-5 h-5" />
                        <div className="flex-1">
                          <Label htmlFor="boyut-kriter-gosterge" className="text-lg font-medium cursor-pointer">
                            Boyut - Kriter - Gösterge
                          </Label>
                          <p className="text-gray-600 mt-1">3 seviyeli hiyerarşik yapı</p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all cursor-pointer">
                        <RadioGroupItem value="boyut-gosterge" id="boyut-gosterge" className="w-5 h-5" />
                        <div className="flex-1">
                          <Label htmlFor="boyut-gosterge" className="text-lg font-medium cursor-pointer">
                            Boyut - Gösterge
                          </Label>
                          <p className="text-gray-600 mt-1">2 seviyeli hiyerarşik yapı</p>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seviye & Hastane Türleri */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Seviye Seçimi - Sadece seviyeli seçilirse görünür */}
            {formData.modelType === "seviyeli" && (
              <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Target className="h-6 w-6" />
                    Seviye Ayarları
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Model için Seviye Ekleyiniz</Label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Seviye Ara"
                        value={levelSearch}
                        onChange={(e) => setLevelSearch(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>
                    {levelSearch && (
                      <div className="border rounded-xl p-3 bg-white shadow-lg max-h-48 overflow-y-auto">
                        {Array.from({ length: 10 }, (_, i) => `Seviye ${i + 1}`)
                          .filter((level) => level.toLowerCase().includes(levelSearch.toLowerCase()))
                          .map((level) => (
                            <div
                              key={level}
                              className="p-3 hover:bg-gradient-to-r hover:from-green-50 hover:to-teal-50 cursor-pointer rounded-lg transition-all"
                              onClick={() => addLevel(level)}
                            >
                              {level}
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {selectedLevels.map((level) => (
                        <Badge
                          key={level}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600"
                        >
                          {level}
                          <X className="h-4 w-4 cursor-pointer" onClick={() => removeLevel(level)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hastane Türleri */}
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Building className="h-6 w-6" />
                  Hastane Türleri
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Model için Hastane Türleri Ekleyiniz</Label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                      placeholder="Hastane Türü Ara"
                      value={hospitalSearch}
                      onChange={(e) => setHospitalSearch(e.target.value)}
                      className="pl-12 h-12 text-lg"
                    />
                  </div>
                  {hospitalSearch && (
                    <div className="border rounded-xl p-3 bg-white shadow-lg max-h-48 overflow-y-auto">
                      {hospitalTypes
                        .filter((type) => type.toLowerCase().includes(hospitalSearch.toLowerCase()))
                        .map((type) => (
                          <div
                            key={type}
                            className="p-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 cursor-pointer rounded-lg transition-all"
                            onClick={() => addHospitalType(type)}
                          >
                            {type}
                          </div>
                        ))}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3">
                    {selectedHospitalTypes.map((type) => (
                      <Badge
                        key={type}
                        className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                      >
                        {type}
                        <X className="h-4 w-4 cursor-pointer" onClick={() => removeHospitalType(type)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Kullanıcı Ayarları */}
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Users className="h-6 w-6" />
                Kullanıcı Ayarları
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div className="space-y-6">
                  <Label className="text-xl font-semibold text-gray-800">Model kullanıcı kapsamını belirleyiniz</Label>
                  <RadioGroup
                    value={formData.userScope}
                    onValueChange={(value) => setFormData({ ...formData, userScope: value })}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all cursor-pointer">
                          <RadioGroupItem value="tek" id="tek" className="w-5 h-5" />
                          <div className="flex-1">
                            <Label htmlFor="tek" className="text-lg font-medium cursor-pointer">
                              Tek anket
                            </Label>
                            <p className="text-gray-600 mt-1">Tüm kullanıcılar aynı anketi doldurur</p>
                          </div>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="flex items-center space-x-4 p-6 border-2 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all cursor-pointer">
                          <RadioGroupItem value="coklu" id="coklu" className="w-5 h-5" />
                          <div className="flex-1">
                            <Label htmlFor="coklu" className="text-lg font-medium cursor-pointer">
                              Çoklu Anket
                            </Label>
                            <p className="text-gray-600 mt-1">Farklı kullanıcı türleri farklı anketler doldurur</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Kullanıcı Türleri - Sadece çoklu anket seçilirse görünür */}
                {formData.userScope === "coklu" && (
                  <div className="space-y-6">
                    <Label className="text-xl font-semibold text-gray-800">
                      Model için Kullanıcı Türleri Ekleyiniz
                    </Label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        placeholder="Kullanıcı Türü Ara"
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                        className="pl-12 h-12 text-lg"
                      />
                    </div>
                    {userSearch && (
                      <div className="border rounded-xl p-3 bg-white shadow-lg max-h-48 overflow-y-auto">
                        {userTypes
                          .filter((type) => type.toLowerCase().includes(userSearch.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="p-3 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 cursor-pointer rounded-lg transition-all"
                              onClick={() => addUserType(type)}
                            >
                              {type}
                            </div>
                          ))}
                      </div>
                    )}
                    <div className="flex flex-wrap gap-3">
                      {selectedUserTypes.map((type) => (
                        <Badge
                          key={type}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
                        >
                          {type}
                          <X className="h-4 w-4 cursor-pointer" onClick={() => removeUserType(type)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              size="lg"
              className="px-12 py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl transform hover:scale-105 transition-all duration-200"
            >
              <Sparkles className="h-6 w-6 mr-3" />
              Yeni Model Tanımla
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
