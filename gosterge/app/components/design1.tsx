"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Save, Languages } from "lucide-react"

interface Answer {
  id: number
  text: string
  suggestion: string
  score: number
}

export default function Design1() {
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

  const handleAnswerTypeChange = (type: string) => {
    setAnswerType(type)
    const template = getAnswerTemplate(type)
    setAnswers(template)
  }

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="bg-slate-800 text-white">
        <CardTitle className="flex items-center gap-2">
          <Languages className="h-5 w-5" />
          Gösterge Tanımlama - Klasik Form Tasarımı
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Dil Seçimi */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="language">Gösterge İçin Dil Seçin</Label>
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Temel Bilgiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="questionName">Gösterge Adı (Kullanıcıya gösterilecek soru)</Label>
            <Input
              id="questionName"
              value={questionName}
              onChange={(e) => setQuestionName(e.target.value)}
              placeholder="Örn: Dijital Sağlık Altyapısı"
            />
          </div>
          <div>
            <Label htmlFor="shortName">Gösterge Kısa Adı (Yönetim Paneli için)</Label>
            <Input
              id="shortName"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
              placeholder="Örn: DSA_TR"
            />
          </div>
        </div>

        {/* Etiketler */}
        <div>
          <Label>Gösterge Etiketleri (Virgülle ayırarak yazın)</Label>
          <div className="flex gap-2 mb-2">
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Örn: altyapı, dijital, sağlık"
              onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            />
            <Button onClick={addTag} size="sm">
              Ekle
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
        </div>

        {/* Açıklama ve Örnek */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="description">Gösterge Açıklaması</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Örn: altyapı, dijital, sağlık"
              rows={4}
            />
          </div>
          <div>
            <Label htmlFor="example">Gösterge Uygulama Örneği</Label>
            <Textarea
              id="example"
              value={example}
              onChange={(e) => setExample(e.target.value)}
              placeholder="Örn: 3"
              rows={4}
            />
          </div>
        </div>

        {/* Cevap Türü */}
        <div>
          <Label>Gösterge Cevap Şablonu</Label>
          <Select value={answerType} onValueChange={handleAnswerTypeChange}>
            <SelectTrigger className="w-full md:w-1/3">
              <SelectValue placeholder="Seçiniz" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="likert">5'li Likert / Etkinlik Durumu</SelectItem>
              <SelectItem value="yesno">Evet/Hayır</SelectItem>
              <SelectItem value="scale">1-10 Ölçek</SelectItem>
              <SelectItem value="multiple">Çoktan Seçmeli</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cevaplar Tablosu */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <Label className="text-lg font-semibold">Gösterge Cevapları</Label>
            <Button onClick={addAnswer} size="sm" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Cevap Ekle
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-12 gap-2 p-3 bg-gray-50 font-medium text-sm">
              <div className="col-span-4">Gösterge Cevabı</div>
              <div className="col-span-5">Cevap Öneri Cümlesi</div>
              <div className="col-span-2">Cevap Puanı</div>
              <div className="col-span-1">İşlem</div>
            </div>

            {answers.map((answer, index) => (
              <div key={answer.id} className="grid grid-cols-12 gap-2 p-3 border-t">
                <div className="col-span-4">
                  <Input
                    value={answer.text}
                    onChange={(e) => updateAnswer(answer.id, "text", e.target.value)}
                    placeholder={`Cevap ${index + 1}`}
                  />
                </div>
                <div className="col-span-5">
                  <Input
                    value={answer.suggestion}
                    onChange={(e) => updateAnswer(answer.id, "suggestion", e.target.value)}
                    placeholder="Öneri cümlesi"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={answer.score}
                    onChange={(e) => updateAnswer(answer.id, "score", Number.parseInt(e.target.value) || 0)}
                    placeholder="Puan"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeAnswer(answer.id)}
                    disabled={answers.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Durum ve Kaydet */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <Label>Gösterge Durumu</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Taslak</SelectItem>
                <SelectItem value="active">Aktif</SelectItem>
                <SelectItem value="inactive">Pasif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button className="flex items-center gap-2" size="lg">
            <Save className="h-4 w-4" />
            Yeni Gösterge Tanımla
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
