"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Plus,
  X,
  Save,
  ChevronLeft,
  ChevronRight,
  Check,
  Settings,
  FileText,
  MessageSquare,
  Target,
} from "lucide-react"

interface Answer {
  id: number
  text: string
  suggestion: string
  score: number
}

export default function Design3() {
  const [currentStep, setCurrentStep] = useState(1)
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

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    { id: 1, title: "Temel Ayarlar", icon: Settings, description: "Dil ve genel ayarlar" },
    { id: 2, title: "Soru Bilgileri", icon: FileText, description: "Soru adı ve açıklaması" },
    { id: 3, title: "Cevap Seçenekleri", icon: MessageSquare, description: "Cevaplar ve puanlar" },
    { id: 4, title: "Önizleme & Kaydet", icon: Target, description: "Son kontrol ve kaydetme" },
  ]

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

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedLanguage && answerType
      case 2:
        return questionName && shortName
      case 3:
        return answers.some((a) => a.text.trim())
      default:
        return true
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Header */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Adım Adım Gösterge Tanımlama</h2>
            <Badge variant="outline" className="text-sm">
              Adım {currentStep} / {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
        <CardContent className="pt-2">
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = step.id === currentStep
              const isCompleted = step.id < currentStep

              return (
                <div key={step.id} className="flex flex-col items-center text-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <h3 className={`font-medium text-sm ${isActive ? "text-blue-600" : "text-gray-600"}`}>
                    {step.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{step.description}</p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="min-h-[500px]">
        <CardContent className="p-6">
          {/* Step 1: Temel Ayarlar */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Settings className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Temel Ayarlar</h3>
                <p className="text-gray-600">Göstergenizin dil ve cevap türü ayarlarını yapın</p>
              </div>

              <div className="max-w-md mx-auto space-y-6">
                <div>
                  <Label className="text-base font-medium">Gösterge Dili</Label>
                  <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                    <SelectTrigger className="mt-2">
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
                  <Label className="text-base font-medium">Cevap Türü</Label>
                  <Select value={answerType} onValueChange={handleAnswerTypeChange}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Cevap türünü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="likert">5'li Likert Ölçeği</SelectItem>
                      <SelectItem value="yesno">Evet/Hayır</SelectItem>
                      <SelectItem value="scale">1-10 Sayısal Ölçek</SelectItem>
                      <SelectItem value="multiple">Çoktan Seçmeli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-base font-medium">Gösterge Durumu</Label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger className="mt-2">
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
          )}

          {/* Step 2: Soru Bilgileri */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <FileText className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Soru Bilgileri</h3>
                <p className="text-gray-600">Göstergenizin adını, açıklamasını ve etiketlerini girin</p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium">Gösterge Adı *</Label>
                    <Input
                      value={questionName}
                      onChange={(e) => setQuestionName(e.target.value)}
                      placeholder="Kullanıcıya gösterilecek soru"
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Kısa Ad *</Label>
                    <Input
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      placeholder="Yönetim için kısa ad"
                      className="mt-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Etiketler</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Etiket ekleyin"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    />
                    <Button onClick={addTag}>Ekle</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-base font-medium">Açıklama</Label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Gösterge açıklaması"
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label className="text-base font-medium">Uygulama Örneği</Label>
                    <Textarea
                      value={example}
                      onChange={(e) => setExample(e.target.value)}
                      placeholder="Örnek uygulama"
                      rows={4}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Cevap Seçenekleri */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <MessageSquare className="h-12 w-12 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Cevap Seçenekleri</h3>
                <p className="text-gray-600">Cevap seçeneklerini, önerilerini ve puanlarını tanımlayın</p>
              </div>

              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium">Cevap Listesi</h4>
                  <Button onClick={addAnswer} className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Yeni Cevap
                  </Button>
                </div>

                <div className="space-y-4">
                  {answers.map((answer, index) => (
                    <Card key={answer.id} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="font-medium">Cevap {index + 1}</h5>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAnswer(answer.id)}
                          disabled={answers.length <= 1}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
                        <div className="md:col-span-4">
                          <Label className="text-sm">Cevap Metni</Label>
                          <Input
                            value={answer.text}
                            onChange={(e) => updateAnswer(answer.id, "text", e.target.value)}
                            placeholder="Cevap seçeneği"
                            className="mt-1"
                          />
                        </div>
                        <div className="md:col-span-6">
                          <Label className="text-sm">Öneri Cümlesi</Label>
                          <Input
                            value={answer.suggestion}
                            onChange={(e) => updateAnswer(answer.id, "suggestion", e.target.value)}
                            placeholder="Bu cevap için öneri"
                            className="mt-1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-sm">Puan</Label>
                          <Input
                            type="number"
                            value={answer.score}
                            onChange={(e) => updateAnswer(answer.id, "score", Number.parseInt(e.target.value) || 0)}
                            placeholder="0"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Önizleme */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Target className="h-12 w-12 mx-auto text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Önizleme & Kaydet</h3>
                <p className="text-gray-600">Göstergenizi son kez kontrol edin ve kaydedin</p>
              </div>

              <div className="max-w-3xl mx-auto">
                <Card className="p-6 bg-gray-50">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <strong>Dil:</strong>{" "}
                        {selectedLanguage === "tr" ? "Türkçe" : selectedLanguage === "en" ? "English" : "Deutsch"}
                      </div>
                      <div>
                        <strong>Cevap Türü:</strong> {answerType}
                      </div>
                      <div>
                        <strong>Durum:</strong>{" "}
                        {status === "draft" ? "Taslak" : status === "active" ? "Aktif" : "Pasif"}
                      </div>
                      <div>
                        <strong>Cevap Sayısı:</strong> {answers.filter((a) => a.text.trim()).length}
                      </div>
                    </div>

                    <div>
                      <strong>Gösterge Adı:</strong>
                      <p className="mt-1 p-2 bg-white rounded border">{questionName || "Belirtilmemiş"}</p>
                    </div>

                    <div>
                      <strong>Kısa Ad:</strong>
                      <p className="mt-1 p-2 bg-white rounded border">{shortName || "Belirtilmemiş"}</p>
                    </div>

                    {tags.length > 0 && (
                      <div>
                        <strong>Etiketler:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <strong>Cevap Seçenekleri:</strong>
                      <div className="mt-2 space-y-2">
                        {answers
                          .filter((a) => a.text.trim())
                          .map((answer, index) => (
                            <div key={answer.id} className="p-2 bg-white rounded border text-sm">
                              <div className="font-medium">
                                {index + 1}. {answer.text}
                              </div>
                              {answer.suggestion && (
                                <div className="text-gray-600 text-xs mt-1">Öneri: {answer.suggestion}</div>
                              )}
                              <div className="text-blue-600 text-xs">Puan: {answer.score}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Card>

                <div className="text-center mt-6">
                  <Button size="lg" className="px-8 flex items-center gap-2 mx-auto">
                    <Save className="h-5 w-5" />
                    Göstergeyi Kaydet
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
              Önceki
            </Button>

            <div className="flex gap-2">
              {currentStep < totalSteps ? (
                <Button onClick={nextStep} disabled={!canProceed()} className="flex items-center gap-2">
                  Sonraki
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button className="flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  Tamamla
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
