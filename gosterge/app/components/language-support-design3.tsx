"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Save, Languages, Eye, Edit, ArrowDown, Maximize2, Minimize2 } from "lucide-react"

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

export default function LanguageSupportDesign3() {
  const [selectedNewLanguage, setSelectedNewLanguage] = useState("")
  const [showOriginalModal, setShowOriginalModal] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Languages className="h-6 w-6" />
            Dil Desteği - Overlay & Modal Yaklaşımı
          </CardTitle>
          <p className="text-indigo-100">Kompakt görünüm ile etkili tercüme deneyimi</p>
        </CardHeader>
      </Card>

      {/* Dil Seçimi ve Orijinal Görüntüleme */}
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

            <Dialog open={showOriginalModal} onOpenChange={setShowOriginalModal}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  {getLanguageFlag("tr")} Orijinali Görüntüle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Orijinal Kayıt - {originalData.language}
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[60vh] pr-4">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Gösterge Adı</Label>
                        <div className="p-2 bg-gray-50 rounded border text-sm mt-1">{originalData.questionName}</div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Kısa Ad</Label>
                        <div className="p-2 bg-gray-50 rounded border text-sm mt-1">{originalData.shortName}</div>
                      </div>
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
                      <div className="p-2 bg-gray-50 rounded border text-sm mt-1">{originalData.description}</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Uygulama Örneği</Label>
                      <div className="p-2 bg-gray-50 rounded border text-sm mt-1">{originalData.example}</div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-600">Cevap Seçenekleri</Label>
                      <div className="space-y-2 mt-2">
                        {originalData.answers.map((answer, index) => (
                          <div key={answer.id} className="p-3 bg-gray-50 rounded border">
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
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Orijinal Özet (Kompakt) */}
      <Card className="bg-gray-50 border-2 border-gray-200">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between text-lg">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">Orijinal Kayıt Özeti</span>
              <Badge variant="outline">
                {getLanguageFlag("tr")} {originalData.language}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowOriginalModal(true)}
              className="text-blue-600 hover:text-blue-800"
            >
              Detayları Gör
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <Label className="text-xs font-medium text-gray-500">Gösterge Adı</Label>
              <p className="text-gray-700 truncate">{originalData.questionName}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-500">Kısa Ad</Label>
              <p className="text-gray-700">{originalData.shortName}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-gray-500">Cevap Sayısı</Label>
              <p className="text-gray-700">{originalData.answers.length} seçenek</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ArrowDown className="h-6 w-6 mx-auto text-gray-400" />

      {/* Tercüme Formu */}
      {!selectedNewLanguage ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Languages className="h-16 w-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">Tercüme Oluşturun</h3>
            <p className="text-gray-500">Yukarıdan hedef dili seçerek tercüme işlemini başlatın</p>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
              <Edit className="h-5 w-5" />
              {getLanguageFlag(selectedNewLanguage)} {getLanguageName(selectedNewLanguage)} Tercümesi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Temel Bilgiler */}
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection("basic")}
              >
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Temel Bilgiler</span>
                  {expandedSection === "basic" ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </CardTitle>
              </CardHeader>
              {(expandedSection === "basic" || expandedSection === null) && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Gösterge Adı *</Label>
                      <Input
                        value={newQuestionName}
                        onChange={(e) => setNewQuestionName(e.target.value)}
                        placeholder={`"${originalData.questionName}" tercümesi`}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Kısa Ad *</Label>
                      <Input
                        value={newShortName}
                        onChange={(e) => setNewShortName(e.target.value)}
                        placeholder={`"${originalData.shortName}" tercümesi`}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Etiketler</Label>
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
                    <p className="text-xs text-gray-500 mt-1">Orijinal: {originalData.tags.join(", ")}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Durum</Label>
                    <Select value={newStatus} onValueChange={setNewStatus}>
                      <SelectTrigger className="mt-1 w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">📝 Taslak</SelectItem>
                        <SelectItem value="active">✅ Aktif</SelectItem>
                        <SelectItem value="inactive">❌ Pasif</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Açıklamalar */}
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection("descriptions")}
              >
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Açıklamalar</span>
                  {expandedSection === "descriptions" ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
              {(expandedSection === "descriptions" || expandedSection === null) && (
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Açıklama</Label>
                    <Textarea
                      value={newDescription}
                      onChange={(e) => setNewDescription(e.target.value)}
                      placeholder="Açıklamayı tercüme edin"
                      rows={3}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Orijinal: {originalData.description}</p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium">Uygulama Örneği</Label>
                    <Textarea
                      value={newExample}
                      onChange={(e) => setNewExample(e.target.value)}
                      placeholder="Örneği tercüme edin"
                      rows={3}
                      className="mt-1"
                    />
                    <p className="text-xs text-gray-500 mt-1">Orijinal: {originalData.example}</p>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Cevap Seçenekleri */}
            <Card>
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleSection("answers")}
              >
                <CardTitle className="flex items-center justify-between text-base">
                  <span>Cevap Seçenekleri</span>
                  {expandedSection === "answers" ? (
                    <Minimize2 className="h-4 w-4" />
                  ) : (
                    <Maximize2 className="h-4 w-4" />
                  )}
                </CardTitle>
              </CardHeader>
              {(expandedSection === "answers" || expandedSection === null) && (
                <CardContent>
                  <div className="space-y-4">
                    {newAnswers.map((answer, index) => (
                      <Card key={answer.id} className="p-4 bg-blue-50">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label className="text-sm font-medium">Cevap {index + 1}</Label>
                            <Badge variant="outline" className="text-xs">
                              Puan: {answer.score}
                            </Badge>
                          </div>

                          <div>
                            <Label className="text-xs text-gray-600">Cevap Metni</Label>
                            <Input
                              value={answer.text}
                              onChange={(e) => updateNewAnswer(answer.id, "text", e.target.value)}
                              placeholder={`"${originalData.answers[index]?.text}" tercümesi`}
                              className="text-sm mt-1"
                            />
                          </div>

                          <div>
                            <Label className="text-xs text-gray-600">Öneri Cümlesi</Label>
                            <Input
                              value={answer.suggestion}
                              onChange={(e) => updateNewAnswer(answer.id, "suggestion", e.target.value)}
                              placeholder={`"${originalData.answers[index]?.suggestion}" tercümesi`}
                              className="text-sm mt-1"
                            />
                          </div>

                          <div className="text-xs text-gray-500 bg-white p-2 rounded border">
                            <strong>Orijinal:</strong> {originalData.answers[index]?.text} -{" "}
                            {originalData.answers[index]?.suggestion}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Kaydet Butonu */}
            <div className="flex justify-center pt-4">
              <Button size="lg" className="px-8 flex items-center gap-2">
                <Save className="h-5 w-5" />
                {getLanguageFlag(selectedNewLanguage)} Tercümeyi Kaydet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
