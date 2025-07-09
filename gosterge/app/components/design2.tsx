"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Languages, Settings, MessageSquare, Target } from "lucide-react"

interface Answer {
  id: number
  text: string
  suggestion: string
  score: number
}

export default function Design2() {
  const [selectedLanguage, setSelectedLanguage] = useState("tr")
  const [questionName, setQuestionName] = useState("")
  const [shortName, setShortName] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")
  const [description, setDescription] = useState("")
  const [example, setExample] = useState("")
  const [answerType, setAnswerType] = useState("")
  const [status, setStatus] = useState("draft")
  const [answers, setAnswers] = useState<Answer[]>([
    { id: 1, text: "", suggestion: "", score: 0 },
    { id: 2, text: "", suggestion: "", score: 0 },
    { id: 3, text: "", suggestion: "", score: 0 },
    { id: 4, text: "", suggestion: "", score: 0 },
    { id: 5, text: "", suggestion: "", score: 0 },
  ])

  const getAnswerTemplate = (type: string) => {
    switch (type) {
      case "likert":
        return [
          { id: 1, text: "Kesinlikle Katılmıyorum", suggestion: "Bu alanda ciddi iyileştirmeler gerekli", score: 20 },
          { id: 2, text: "Katılmıyorum", suggestion: "Bu alanda iyileştirmeler yapılmalı", score: 40 },
          { id: 3, text: "Kararsızım", suggestion: "Bu alan değerlendirmeye alınmalı", score: 60 },
          { id: 4, text: "Katılıyorum", suggestion: "Bu alanda iyi durumdasınız", score: 80 },
          { id: 5, text: "Kesinlikle Katılıyorum", suggestion: "Bu alanda mükemmel durumdasınız", score: 100 },
        ]
      case "yesno":
        return [
          { id: 1, text: "Evet", suggestion: "Bu özellik mevcut ve aktif", score: 100 },
          { id: 2, text: "Hayır", suggestion: "Bu özellik mevcut değil, geliştirilmeli", score: 0 },
        ]
      case "scale":
        return Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          text: `${i + 1}`,
          suggestion: `${i + 1}/10 seviyesinde performans`,
          score: (i + 1) * 10,
        }))
      case "multiple":
        return [
          { id: 1, text: "", suggestion: "", score: 0 },
          { id: 2, text: "", suggestion: "", score: 0 },
          { id: 3, text: "", suggestion: "", score: 0 },
          { id: 4, text: "", suggestion: "", score: 0 },
        ]
      default:
        return [
          { id: 1, text: "", suggestion: "", score: 0 },
          { id: 2, text: "", suggestion: "", score: 0 },
          { id: 3, text: "", suggestion: "", score: 0 },
          { id: 4, text: "", suggestion: "", score: 0 },
          { id: 5, text: "", suggestion: "", score: 0 },
        ]
    }
  }

  const handleAnswerTypeChange = (type: string) => {
    setAnswerType(type)
    const template = getAnswerTemplate(type)
    setAnswers(template)
  }

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addAnswer = () => {
    const newId = Math.max(...answers.map((a) => a.id)) + 1
    setAnswers([...answers, { id: newId, text: "", suggestion: "", score: 0 }])
  }

  const removeAnswer = (id: number) => {
    if (answers.length > 1) {
      setAnswers(answers.filter((a) => a.id !== id))
    }
  }

  const updateAnswer = (id: number, field: keyof Answer, value: string | number) => {
    setAnswers(answers.map((a) => (a.id === id ? { ...a, [field]: value } : a)))
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Languages className="h-6 w-6" />
            Kart Tabanlı Gösterge Tanımlama
          </CardTitle>
          <p className="text-blue-100">Modüler yaklaşım ile organize edilmiş form tasarımı</p>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Temel Bilgiler */}
        <div className="space-y-6">
          {/* Dil ve Temel Ayarlar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Settings className="h-5 w-5" />
                Temel Ayarlar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Dil Seçimi</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tr">🇹🇷 Türkçe</SelectItem>
                    <SelectItem value="en">🇺🇸 English</SelectItem>
                    <SelectItem value="de">🇩🇪 Deutsch</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Durum</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
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
                <Label>Cevap Türü</Label>
                <Select value={answerType} onValueChange={handleAnswerTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="likert">5'li Likert</SelectItem>
                    <SelectItem value="yesno">Evet/Hayır</SelectItem>
                    <SelectItem value="scale">1-10 Ölçek</SelectItem>
                    <SelectItem value="multiple">Çoktan Seçmeli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Soru Bilgileri */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5" />
                Soru Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Gösterge Adı</Label>
                <Input
                  value={questionName}
                  onChange={(e) => setQuestionName(e.target.value)}
                  placeholder="Kullanıcıya gösterilecek soru"
                />
              </div>

              <div>
                <Label>Kısa Ad</Label>
                <Input
                  value={shortName}
                  onChange={(e) => setShortName(e.target.value)}
                  placeholder="Yönetim için kısa ad"
                />
              </div>

              <div>
                <Label>Etiketler</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Etiket ekle"
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button onClick={addTag} size="sm">
                    +
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                      <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orta Kolon - Açıklamalar */}
        <div className="space-y-6">
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Target className="h-5 w-5" />
                Detay Bilgileri
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Açıklama</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Gösterge açıklaması"
                  rows={6}
                />
              </div>

              <div>
                <Label>Uygulama Örneği</Label>
                <Textarea
                  value={example}
                  onChange={(e) => setExample(e.target.value)}
                  placeholder="Örnek uygulama"
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sağ Kolon - Cevaplar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-lg">
                  <MessageSquare className="h-5 w-5" />
                  Cevap Seçenekleri
                </span>
                <Button onClick={addAnswer} size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {answers.map((answer, index) => (
                  <Card key={answer.id} className="p-3 bg-gray-50">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">Cevap {index + 1}</Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnswer(answer.id)}
                          disabled={answers.length <= 1}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>

                      <Input
                        value={answer.text}
                        onChange={(e) => updateAnswer(answer.id, "text", e.target.value)}
                        placeholder="Cevap metni"
                        className="text-sm"
                      />

                      <Input
                        value={answer.suggestion}
                        onChange={(e) => updateAnswer(answer.id, "suggestion", e.target.value)}
                        placeholder="Öneri cümlesi"
                        className="text-sm"
                      />

                      <div className="flex items-center gap-2">
                        <Label className="text-xs">Puan:</Label>
                        <Input
                          type="number"
                          value={answer.score}
                          onChange={(e) => updateAnswer(answer.id, "score", Number.parseInt(e.target.value) || 0)}
                          className="w-16 text-sm"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alt Kaydet Butonu */}
      <Card>
        <CardContent className="p-4">
          <div className="flex justify-center">
            <Button size="lg" className="px-8 flex items-center gap-2">
              <Save className="h-5 w-5" />
              Göstergeyi Kaydet
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
