"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Save, Languages, Eye, Edit, Copy, CheckCircle } from "lucide-react"

interface Answer {
  id: number
  text: string
  suggestion: string
  score: number
}

interface OriginalData {
  questionName: string
  shortName: string
  tags: string[]
  description: string
  example: string
  answerType: string
  status: string
  language: string
  answers: Answer[]
}

export default function LanguageSupportDesign2() {
  const [selectedNewLanguage, setSelectedNewLanguage] = useState("")
  const [activeTab, setActiveTab] = useState("original")
  const [newQuestionName, setNewQuestionName] = useState("")
  const [newShortName, setNewShortName] = useState("")
  const [newTags, setNewTags] = useState<string[]>([])
  const [newTagInput, setNewTagInput] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newExample, setNewExample] = useState("")
  const [newStatus, setNewStatus] = useState("draft")
  const [newAnswers, setNewAnswers] = useState<Answer[]>([
    { id: 1, text: "", suggestion: "", score: 85 },
    { id: 2, text: "", suggestion: "", score: 70 },
    { id: 3, text: "", suggestion: "", score: 55 },
    { id: 4, text: "", suggestion: "", score: 40 },
    { id: 5, text: "", suggestion: "", score: 25 },
  ])

  // Orijinal veri
  const originalData: OriginalData = {
    questionName: "Dijital Sağlık Altyapısı Değerlendirmesi",
    shortName: "DSA_TR",
    tags: ["altyapı", "dijital", "sağlık"],
    description: "Kurumunuzun dijital sağlık altyapısının mevcut durumunu değerlendirin",
    example: "Elektronik hasta kayıt sistemi, telemedicine platformları, dijital görüntüleme sistemleri",
    answerType: "5'li Likert / Etkinlik Durumu",
    status: "Aktif",
    language: "Türkçe",
    answers: [
      { id: 1, text: "Çok İyi", suggestion: "Dijital altyapınız mükemmel durumda", score: 85 },
      { id: 2, text: "İyi", suggestion: "Dijital altyapınız iyi seviyede", score: 70 },
      { id: 3, text: "Orta", suggestion: "Dijital altyapınızda iyileştirmeler gerekli", score: 55 },
      { id: 4, text: "Zayıf", suggestion: "Dijital altyapınızda ciddi eksiklikler var", score: 40 },
      { id: 5, text: "Çok Zayıf", suggestion: "Dijital altyapınız acil modernizasyon gerektiriyor", score: 25 },
    ],
  }

  const copyFromOriginal = (field: string) => {
    switch (field) {
      case "questionName":
        setNewQuestionName(originalData.questionName)
        break
      case "shortName":
        setNewShortName(originalData.shortName)
        break
      case "tags":
        setNewTags([...originalData.tags])
        break
      case "description":
        setNewDescription(originalData.description)
        break
      case "example":
        setNewExample(originalData.example)
        break
      case "answers":
        setNewAnswers(originalData.answers.map((a) => ({ ...a })))
        break
    }
  }

  const addNewTag = () => {
    if (newTagInput.trim() && !newTags.includes(newTagInput.trim())) {
      setNewTags([...newTags, newTagInput.trim()])
      setNewTagInput("")
    }
  }

  const removeNewTag = (tagToRemove: string) => {
    setNewTags(newTags.filter((tag) => tag !== tagToRemove))
  }

  const updateNewAnswer = (id: number, field: keyof Answer, value: string | number) => {
    setNewAnswers(newAnswers.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  const getLanguageFlag = (lang: string) => {
    const flags: { [key: string]: string } = {
      tr: "🇹🇷",
      en: "🇺🇸",
      de: "🇩🇪",
      fr: "🇫🇷",
      es: "🇪🇸",
    }
    return flags[lang] || "🌐"
  }

  const getLanguageName = (lang: string) => {
    const names: { [key: string]: string } = {
      tr: "Türkçe",
      en: "English",
      de: "Deutsch",
      fr: "Français",
      es: "Español",
    }
    return names[lang] || lang
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Languages className="h-6 w-6" />
            Dil Desteği - Tab Tabanlı Yaklaşım
          </CardTitle>
          <p className="text-purple-100">Orijinal ve tercüme arasında kolay geçiş yapın</p>
        </CardHeader>
      </Card>

      {/* Dil Seçimi */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Label className="font-medium">Yeni Dil:</Label>
              <Select value={selectedNewLanguage} onValueChange={setSelectedNewLanguage}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Dil seçiniz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                  <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                  <SelectItem value="fr">🇫🇷 Français</SelectItem>
                  <SelectItem value="es">🇪🇸 Español</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedNewLanguage && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="text-sm text-green-600 font-medium">
                  {getLanguageFlag(selectedNewLanguage)} {getLanguageName(selectedNewLanguage)} tercümesi hazırlanıyor
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tab Yapısı */}
      <Card>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="original" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                {getLanguageFlag("tr")} Orijinal ({originalData.language})
              </TabsTrigger>
              <TabsTrigger value="translation" disabled={!selectedNewLanguage} className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                {selectedNewLanguage ? getLanguageFlag(selectedNewLanguage) : "🌐"}
                {selectedNewLanguage ? ` Tercüme (${getLanguageName(selectedNewLanguage)})` : " Tercüme"}
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-6">
            {/* Orijinal Tab */}
            <TabsContent value="original" className="space-y-6 mt-0">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="h-5 w-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-700">Orijinal Kayıt - Sadece Görüntüleme</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Gösterge Adı</Label>
                      <div className="p-3 bg-white rounded border text-sm mt-1">{originalData.questionName}</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Kısa Ad</Label>
                      <div className="p-3 bg-white rounded border text-sm mt-1">{originalData.shortName}</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Etiketler</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {originalData.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Açıklama</Label>
                      <div className="p-3 bg-white rounded border text-sm min-h-[100px] mt-1">
                        {originalData.description}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-gray-600">Uygulama Örneği</Label>
                      <div className="p-3 bg-white rounded border text-sm min-h-[100px] mt-1">
                        {originalData.example}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Cevap Türü</Label>
                      <div className="p-3 bg-white rounded border text-sm mt-1">{originalData.answerType}</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Durum</Label>
                      <div className="p-3 bg-white rounded border text-sm mt-1">{originalData.status}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <Label className="text-sm font-medium text-gray-600">Cevap Seçenekleri</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                    {originalData.answers.map((answer, index) => (
                      <div key={answer.id} className="p-3 bg-white rounded border">
                        <div className="font-medium text-sm">
                          {index + 1}. {answer.text}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">{answer.suggestion}</div>
                        <div className="text-xs text-blue-600 mt-1">Puan: {answer.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tercüme Tab */}
            <TabsContent value="translation" className="space-y-6 mt-0">
              {!selectedNewLanguage ? (
                <div className="text-center py-12 text-gray-500">
                  <Languages className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Tercüme oluşturmak için önce dil seçiniz</p>
                </div>
              ) : (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Edit className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-700">
                        {getLanguageFlag(selectedNewLanguage)} {getLanguageName(selectedNewLanguage)} Tercümesi
                      </h3>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActiveTab("original")}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      Orijinali Gör
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Gösterge Adı *</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("questionName")}
                            className="h-6 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <Input
                          value={newQuestionName}
                          onChange={(e) => setNewQuestionName(e.target.value)}
                          placeholder="Orijinal metni tercüme edin"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Kısa Ad *</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("shortName")}
                            className="h-6 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <Input
                          value={newShortName}
                          onChange={(e) => setNewShortName(e.target.value)}
                          placeholder="Kısa adı tercüme edin"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Etiketler</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("tags")}
                            className="h-6 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <Input
                            value={newTagInput}
                            onChange={(e) => setNewTagInput(e.target.value)}
                            placeholder="Tercüme edilmiş etiket"
                            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addNewTag())}
                          />
                          <Button onClick={addNewTag} size="sm">
                            +
                          </Button>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {newTags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeNewTag(tag)} />
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Açıklama</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("description")}
                            className="h-6 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <Textarea
                          value={newDescription}
                          onChange={(e) => setNewDescription(e.target.value)}
                          placeholder="Açıklamayı tercüme edin"
                          rows={4}
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium">Uygulama Örneği</Label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyFromOriginal("example")}
                            className="h-6 px-2"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <Textarea
                          value={newExample}
                          onChange={(e) => setNewExample(e.target.value)}
                          placeholder="Örneği tercüme edin"
                          rows={4}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Durum</Label>
                        <Select value={newStatus} onValueChange={setNewStatus}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">📝 Taslak</SelectItem>
                            <SelectItem value="active">✅ Aktif</SelectItem>
                            <SelectItem value="inactive">❌ Pasif</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-sm font-medium">Cevap Seçenekleri</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyFromOriginal("answers")}
                        className="flex items-center gap-1"
                      >
                        <Copy className="h-4 w-4" />
                        Tümünü Kopyala
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {newAnswers.map((answer, index) => (
                        <Card key={answer.id} className="p-3 bg-white">
                          <div className="space-y-2">
                            <Label className="text-xs font-medium">Cevap {index + 1}</Label>
                            <Input
                              value={answer.text}
                              onChange={(e) => updateNewAnswer(answer.id, "text", e.target.value)}
                              placeholder={`"${originalData.answers[index]?.text}" tercümesi`}
                              className="text-sm"
                            />
                            <Input
                              value={answer.suggestion}
                              onChange={(e) => updateNewAnswer(answer.id, "suggestion", e.target.value)}
                              placeholder={`"${originalData.answers[index]?.suggestion}" tercümesi`}
                              className="text-sm"
                            />
                            <div className="flex items-center gap-2">
                              <Label className="text-xs">Puan:</Label>
                              <Input type="number" value={answer.score} className="w-16 text-sm" readOnly />
                              <span className="text-xs text-gray-500">(Sabit)</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center mt-6">
                    <Button size="lg" className="px-8 flex items-center gap-2">
                      <Save className="h-5 w-5" />
                      {getLanguageFlag(selectedNewLanguage)} Tercümeyi Kaydet
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
}
