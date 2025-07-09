"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Languages, Globe, ArrowRight, X } from "lucide-react"

const availableLanguages = [
  { code: "en", name: "İngilizce", flag: "🇺🇸", nativeName: "English" },
  { code: "de", name: "Almanca", flag: "🇩🇪", nativeName: "Deutsch" },
  { code: "fr", name: "Fransızca", flag: "🇫🇷", nativeName: "Français" },
  { code: "es", name: "İspanyolca", flag: "🇪🇸", nativeName: "Español" },
  { code: "it", name: "İtalyanca", flag: "🇮🇹", nativeName: "Italiano" },
  { code: "pt", name: "Portekizce", flag: "🇵🇹", nativeName: "Português" },
  { code: "ru", name: "Rusça", flag: "🇷🇺", nativeName: "Русский" },
  { code: "ar", name: "Arapça", flag: "🇸🇦", nativeName: "العربية" },
  { code: "zh", name: "Çince", flag: "🇨🇳", nativeName: "中文" },
  { code: "ja", name: "Japonca", flag: "🇯🇵", nativeName: "日本語" },
]

interface LanguageSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  onLanguageSelect: (language: { code: string; name: string; flag: string }) => void
  dimensionName: string
  existingTranslations?: string[]
}

export default function LanguageSelectionModal({
  isOpen,
  onClose,
  onLanguageSelect,
  dimensionName,
  existingTranslations = [],
}: LanguageSelectionModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  const handleContinue = () => {
    const language = availableLanguages.find((lang) => lang.code === selectedLanguage)
    if (language) {
      // Önce dili set et, sonra callback'i çağır
      onLanguageSelect(language)
      // Modal'ı kapatmayı parent component'e bırak
    }
  }

  const filteredLanguages = availableLanguages.filter((lang) => !existingTranslations.includes(lang.name))

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex-shrink-0 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-purple-100">
              <Languages className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold">Tercüme Dili Seçin</DialogTitle>
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">{dimensionName}</span> boyutu için tercüme dili seçin
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-6 min-h-0">
          {filteredLanguages.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="font-medium mb-2">Tüm Diller Tercüme Edilmiş</h3>
                <p className="text-sm text-muted-foreground">
                  Bu boyut için mevcut tüm dillerde tercüme bulunmaktadır.
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-6">
                <h3 className="font-medium mb-2">Mevcut Tercümeler</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    🇹🇷 Türkçe (Orijinal)
                  </Badge>
                  {existingTranslations.map((lang) => {
                    const langData = availableLanguages.find((l) => l.name === lang)
                    return (
                      <Badge key={lang} variant="secondary" className="flex items-center gap-1">
                        {langData?.flag} {lang}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">Tercüme Edilebilir Diller</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredLanguages.map((language) => (
                    <Card
                      key={language.code}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedLanguage === language.code
                          ? "ring-2 ring-primary border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedLanguage(language.code)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{language.flag}</div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{language.name}</h4>
                            <p className="text-xs text-muted-foreground">{language.nativeName}</p>
                          </div>
                          {selectedLanguage === language.code && (
                            <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-white" />
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex-shrink-0 flex items-center justify-between p-6 border-t bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="h-4 w-4" />
            <span>
              {selectedLanguage
                ? `${availableLanguages.find((l) => l.code === selectedLanguage)?.name} tercümesi oluşturulacak`
                : "Tercüme dili seçin"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onClose}>
              <X className="h-4 w-4 mr-2" />
              İptal
            </Button>
            <Button onClick={handleContinue} disabled={!selectedLanguage || filteredLanguages.length === 0}>
              <ArrowRight className="h-4 w-4 mr-2" />
              Tercümeye Başla
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
