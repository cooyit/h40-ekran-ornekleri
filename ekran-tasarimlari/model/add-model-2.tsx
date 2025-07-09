"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { X, Search, ChevronLeft, ChevronRight, Check } from "lucide-react"

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

const steps = [
  { id: 1, title: "Temel Bilgiler", description: "Model adı ve dil bilgileri" },
  { id: 2, title: "Model Özellikleri", description: "Tür ve hiyerarşi seçimi" },
  { id: 3, title: "Seviye & Hastane", description: "Seviye ve hastane türleri" },
  { id: 4, title: "Kullanıcı Ayarları", description: "Kullanıcı kapsamı ve türleri" },
]

export default function AddModel2() {
  const [currentStep, setCurrentStep] = useState(1)
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

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    console.log("Form Data:", {
      ...formData,
      selectedLevels,
      selectedHospitalTypes,
      selectedUserTypes,
    })
  }

  const progress = (currentStep / 4) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Yeni Model Oluştur</h1>
          <p className="text-gray-600">Adım adım model oluşturma süreci</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="text-center mt-2">
                  <div className="text-sm font-medium text-gray-900">{step.title}</div>
                  <div className="text-xs text-gray-500">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardTitle className="text-xl">
              Adım {currentStep}: {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {/* Step 1: Temel Bilgiler */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div className="space-y-2">
                    <Label htmlFor="modelName">Model Adı</Label>
                    <Input
                      id="modelName"
                      placeholder="Örn: Dijital Sağlık Altyapısı"
                      value={formData.modelName}
                      onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modelShortName">Model Kısa Adı</Label>
                    <Input
                      id="modelShortName"
                      placeholder="Örn: DSA TR"
                      value={formData.modelShortName}
                      onChange={(e) => setFormData({ ...formData, modelShortName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="modelTags">Model Etiketleri</Label>
                    <Input
                      id="modelTags"
                      placeholder="Örn: altyapı, dijital, sağlık"
                      value={formData.modelTags}
                      onChange={(e) => setFormData({ ...formData, modelTags: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Model Özellikleri */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Model türünü belirleyiniz</Label>
                  <RadioGroup
                    value={formData.modelType}
                    onValueChange={(value) => setFormData({ ...formData, modelType: value })}
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="seviyeli" id="seviyeli" />
                      <div>
                        <Label htmlFor="seviyeli" className="font-medium">
                          Seviye Esaslı
                        </Label>
                        <p className="text-sm text-gray-500">Modelde seviye bazlı değerlendirme yapılır</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="puanli" id="puanli" />
                      <div>
                        <Label htmlFor="puanli" className="font-medium">
                          Puan Esaslı
                        </Label>
                        <p className="text-sm text-gray-500">Modelde puan bazlı değerlendirme yapılır</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-4">
                  <Label className="text-lg font-medium">Model hiyerarşisini belirleyiniz</Label>
                  <RadioGroup
                    value={formData.hierarchy}
                    onValueChange={(value) => setFormData({ ...formData, hierarchy: value })}
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="boyut-kriter-gosterge" id="boyut-kriter-gosterge" />
                      <div>
                        <Label htmlFor="boyut-kriter-gosterge" className="font-medium">
                          Boyut - Kriter - Gösterge
                        </Label>
                        <p className="text-sm text-gray-500">3 seviyeli hiyerarşik yapı</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="boyut-gosterge" id="boyut-gosterge" />
                      <div>
                        <Label htmlFor="boyut-gosterge" className="font-medium">
                          Boyut - Gösterge
                        </Label>
                        <p className="text-sm text-gray-500">2 seviyeli hiyerarşik yapı</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Step 3: Seviye & Hastane */}
            {currentStep === 3 && (
              <div className="space-y-8">
                {/* Seviye Seçimi - Sadece seviyeli seçilirse görünür */}
                {formData.modelType === "seviyeli" && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Model için Seviye Ekleyiniz</Label>
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
                      <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                        {Array.from({ length: 10 }, (_, i) => `Seviye ${i + 1}`)
                          .filter((level) => level.toLowerCase().includes(levelSearch.toLowerCase()))
                          .map((level) => (
                            <div
                              key={level}
                              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
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
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Model için Hastane Türleri Ekleyiniz</Label>
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
                    <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                      {hospitalTypes
                        .filter((type) => type.toLowerCase().includes(hospitalSearch.toLowerCase()))
                        .map((type) => (
                          <div
                            key={type}
                            className="p-2 hover:bg-gray-100 cursor-pointer rounded"
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
              </div>
            )}

            {/* Step 4: Kullanıcı Ayarları */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-lg font-medium">Model kullanıcı kapsamını belirleyiniz</Label>
                  <RadioGroup
                    value={formData.userScope}
                    onValueChange={(value) => setFormData({ ...formData, userScope: value })}
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="tek" id="tek" />
                      <div>
                        <Label htmlFor="tek" className="font-medium">
                          Tek anket
                        </Label>
                        <p className="text-sm text-gray-500">Tüm kullanıcılar aynı anketi doldurur</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="coklu" id="coklu" />
                      <div>
                        <Label htmlFor="coklu" className="font-medium">
                          Çoklu Anket
                        </Label>
                        <p className="text-sm text-gray-500">Farklı kullanıcı türleri farklı anketler doldurur</p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Kullanıcı Türleri - Sadece çoklu anket seçilirse görünür */}
                {formData.userScope === "coklu" && (
                  <div className="space-y-4">
                    <Label className="text-lg font-medium">Model için Kullanıcı Türleri Ekleyiniz</Label>
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
                      <div className="border rounded-md p-2 bg-white shadow-sm max-h-40 overflow-y-auto">
                        {userTypes
                          .filter((type) => type.toLowerCase().includes(userSearch.toLowerCase()))
                          .map((type) => (
                            <div
                              key={type}
                              className="p-2 hover:bg-gray-100 cursor-pointer rounded"
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
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="h-4 w-4" />
                Önceki
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  Sonraki
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Yeni Model Tanımla
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
