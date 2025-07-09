"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Save, Languages, Eye, Edit, ArrowRight } from "lucide-react"

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

export default function LanguageSupportDesign1() {
  const [selectedNewLanguage, setSelectedNewLanguage] = useState("")
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

  // Orijinal veri (read-only)
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

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Languages className="h-6 w-6" />
            Dil Desteği - Yan Yana Karşılaştırma
          </CardTitle>
          <p className="text-green-100">Orijinal kaydı referans alarak yeni dil tercümesi oluşturun</p>
        </CardHeader>
      </Card>

      {/* Dil Seçimi */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Label className="font-medium">Yeni Dil Seçin:</Label>
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
            <ArrowRight className="h-5 w-5 text-gray-400" />
            <Badge variant="outline" className="text-sm">
              Orijinal: {originalData.language}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Ana İçerik - Yan Yana */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sol Taraf - Orijinal Kayıt (Read-Only) */}
        <Card className="border-2 border-gray-200">
          <CardHeader className="bg-gray-50">
            <CardTitle className="flex items-center gap-2 text-lg text-gray-700">
              <Eye className="h-5 w-5" />
              Orijinal Kayıt ({originalData.language})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Gösterge Adı</Label>
                <div className="p-2 bg-gray-50 rounded border text-sm">{originalData.questionName}</div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Kısa Ad</Label>
                <div className="p-2 bg-gray-50 rounded border text-sm">{originalData.shortName}</div>
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
                <div className="p-2 bg-gray-50 rounded border text-sm min-h-[80px]">{originalData.description}</div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Uygulama Örneği</Label>
                <div className="p-2 bg-gray-50 rounded border text-sm min-h-[80px]">{originalData.example}</div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Cevap Türü</Label>
                <div className="p-2 bg-gray-50 rounded border text-sm">{originalData.answerType}</div>
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
          </CardContent>
        </Card>

        {/* Sağ Taraf - Yeni Dil Tercümesi (Create Mode) */}
        <Card className="border-2 border-blue-200">
          <CardHeader className="bg-blue-50">
            <CardTitle className="flex items-center gap-2 text-lg text-blue-700">
              <Edit className="h-5 w-5" />
              Yeni Tercüme (
              {selectedNewLanguage
                ? selectedNewLanguage === "en"
                  ? "English"
                  : selectedNewLanguage === "de"
                    ? "Deutsch"
                    : selectedNewLanguage === "fr"
                      ? "Français"
                      : selectedNewLanguage === "es"
                        ? "Español"
                        : "Seçilmedi"
                : "Dil Seçiniz"}
              )
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {!selectedNewLanguage ? (
              <div className="text-center py-12 text-gray-500">
                <Languages className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Tercüme oluşturmak için önce dil seçiniz</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Gösterge Adı *</Label>
                  <Input
                    value={newQuestionName}
                    onChange={(e) => setNewQuestionName(e.target.value)}
                    placeholder="Orijinal metni tercüme edin"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Kısa Ad *</Label>
                  <Input
                    value={newShortName}
                    onChange={(e) => setNewShortName(e.target.value)}
                    placeholder="Kısa adı tercüme edin"
                    className="mt-1"
                  />
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
                </div>

                <div>
                  <Label className="text-sm font-medium">Açıklama</Label>
                  <Textarea
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Açıklamayı tercüme edin"
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium">Uygulama Örneği</Label>
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

                <div>
                  <Label className="text-sm font-medium">Cevap Seçenekleri</Label>
                  <div className="space-y-3 mt-2">
                    {newAnswers.map((answer, index) => (
                      <Card key={answer.id} className="p-3 bg-blue-50">
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
                            <Input
                              type="number"
                              value={answer.score}
                              onChange={(e) =>
                                updateNewAnswer(answer.id, "score", Number.parseInt(e.target.value) || 0)
                              }
                              className="w-16 text-sm"
                              readOnly
                            />
                            <span className="text-xs text-gray-500">(Orijinal ile aynı)</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Alt Kaydet Butonu */}
      {selectedNewLanguage && (
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-center">
              <Button size="lg" className="px-8 flex items-center gap-2">
                <Save className="h-5 w-5" />
                Tercümeyi Kaydet
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
