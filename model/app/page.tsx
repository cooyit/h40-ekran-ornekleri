"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Layers,
  Target,
  BarChart3,
  Sparkles,
  Crown,
  CheckCircle,
  X,
  ArrowRight,
  Star,
  Zap,
  Settings,
  Eye,
  Plus,
  Database,
  Users,
  FileText,
  TrendingUp,
  Shield,
  Gauge,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Model Yönetim Sistemi
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Dijital sağlık altyapısı değerlendirme modelleri için kapsamlı yönetim platformu
        </p>
        <div className="flex justify-center gap-4 mb-8">
          <Badge variant="outline" className="px-4 py-2">
            <Database className="h-4 w-4 mr-2" />9 Farklı Sistem
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Users className="h-4 w-4 mr-2" />
            Çoklu Kullanıcı Desteği
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            <Shield className="h-4 w-4 mr-2" />
            Güvenli Veri Yönetimi
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="modeller" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-1">
          <TabsTrigger
            value="modeller"
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-2" />
            Modeller Sayfası
          </TabsTrigger>
          <TabsTrigger
            value="tanimlama"
            className="data-[state=active]:bg-green-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            <Plus className="h-4 w-4 mr-2" />
            Model Tanımlama
          </TabsTrigger>
          <TabsTrigger
            value="degerlendirme"
            className="data-[state=active]:bg-purple-600 data-[state=active]:text-white rounded-lg transition-all duration-200"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Değerlendirme Yapısı
          </TabsTrigger>
        </TabsList>

        {/* Modeller Sayfası Tab */}
        <TabsContent value="modeller" className="space-y-6">
          <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Eye className="h-6 w-6" />
                Modeller Sayfası
              </CardTitle>
              <p className="text-blue-600">Mevcut modelleri görüntüleyin ve yönetin</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/model-page-1">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-blue-200 hover:border-blue-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Layers className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">Klasik Sistem</h3>
                          <p className="text-sm text-blue-600">Geleneksel model görünümü</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          Seviye Esaslı
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/model-page-2">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-green-200 hover:border-green-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Target className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-800">Adım Adım</h3>
                          <p className="text-sm text-green-600">Rehberli model oluşturma</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          Yönlendirilmiş
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/model-page-3">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-purple-200 hover:border-purple-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Crown className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-800">Premium</h3>
                          <p className="text-sm text-purple-600">Gelişmiş özellikler</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-purple-600 border-purple-300">
                          <Star className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Model Tanımlama Tab */}
        <TabsContent value="tanimlama" className="space-y-6">
          <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <Plus className="h-6 w-6" />
                Model Tanımlama
              </CardTitle>
              <p className="text-green-600">Yeni modeller oluşturun ve yapılandırın</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/model-creation-tabs">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-green-200 hover:border-green-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Settings className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-green-800">Klasik Form</h3>
                          <p className="text-sm text-green-600">Geleneksel model tanımlama</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-green-600 border-green-300">
                          4 Adım
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/step-by-step-model-creation">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-blue-200 hover:border-blue-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Zap className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-blue-800">Adım Adım</h3>
                          <p className="text-sm text-blue-600">Rehberli model oluşturma</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-blue-600 border-blue-300">
                          Yönlendirilmiş
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/premium-model-creation">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-purple-200 hover:border-purple-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <Sparkles className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-800">Premium</h3>
                          <p className="text-sm text-purple-600">Gelişmiş model oluşturma</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-purple-600 border-purple-300">
                          <Crown className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Değerlendirme Yapısı Tab */}
        <TabsContent value="degerlendirme" className="space-y-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-800">
                <TrendingUp className="h-6 w-6" />
                Değerlendirme Yapısı
              </CardTitle>
              <p className="text-purple-600">Model değerlendirme sistemlerini yönetin</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/add-model-1">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-purple-200 hover:border-purple-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-800">Klasik Değerlendirme</h3>
                          <p className="text-sm text-purple-600">Geleneksel değerlendirme</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-purple-600 border-purple-300">
                          Seviye Esaslı
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/model-creation-tabs-v2">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-orange-200 hover:border-orange-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <BarChart3 className="h-5 w-5 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-orange-800">Puanlı Sistem</h3>
                          <p className="text-sm text-orange-600">Puan esaslı değerlendirme</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-orange-600 border-orange-300">
                          <Gauge className="h-3 w-3 mr-1" />
                          Puanlı
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-orange-500" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/premium-model-creation">
                  <Card className="hover:shadow-lg transition-all duration-200 cursor-pointer border-pink-200 hover:border-pink-400">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Crown className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-purple-800">Premium Değerlendirme</h3>
                          <p className="text-sm text-purple-600">Gelişmiş değerlendirme</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge
                          variant="outline"
                          className="text-purple-600 border-purple-300 bg-gradient-to-r from-purple-50 to-pink-50"
                        >
                          <Sparkles className="h-3 w-3 mr-1" />
                          Premium
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-purple-500" />
                      </div>
                      <div className="mt-3 text-xs text-gray-600">Seviyeli • Boyut-Gösterge • Çoklu Anket</div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sistem Karşılaştırma Tablosu */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Sistem Karşılaştırması
          </CardTitle>
          <p className="text-gray-600">Tüm sistemlerin özelliklerini karşılaştırın</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Özellik</TableHead>
                  <TableHead className="text-center bg-blue-50">Klasik Sistem</TableHead>
                  <TableHead className="text-center bg-green-50">Adım Adım</TableHead>
                  <TableHead className="text-center bg-purple-50">Premium</TableHead>
                  <TableHead className="text-center bg-orange-50">Puanlı Sistem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Model Türü</TableCell>
                  <TableCell className="text-center">Seviye Esaslı</TableCell>
                  <TableCell className="text-center">Yönlendirilmiş</TableCell>
                  <TableCell className="text-center">Hibrit</TableCell>
                  <TableCell className="text-center">Puan Esaslı</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hiyerarşi</TableCell>
                  <TableCell className="text-center">3 Seviye</TableCell>
                  <TableCell className="text-center">3 Seviye</TableCell>
                  <TableCell className="text-center">2 Seviye</TableCell>
                  <TableCell className="text-center">3 Seviye</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kullanıcı Seçimi</TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ağırlık Sistemi</TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <X className="h-4 w-4 text-red-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gelişmiş Özellikler</TableCell>
                  <TableCell className="text-center">
                    <X className="h-4 w-4 text-red-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                  <TableCell className="text-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mx-auto" />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Öneriler</TableCell>
                  <TableCell className="text-center">Temel</TableCell>
                  <TableCell className="text-center">Rehberli</TableCell>
                  <TableCell className="text-center">AI Destekli</TableCell>
                  <TableCell className="text-center">Akıllı</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
