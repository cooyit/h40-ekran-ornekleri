"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Search,
  Settings,
  Users,
  Database,
  BarChart3,
  Navigation,
  Plus,
  Bell,
  User,
  ChevronRight,
  Activity,
  FileText,
  Target,
  Layers,
} from "lucide-react"

export default function HomepageDesign1() {
  const [searchQuery, setSearchQuery] = useState("")

  const quickActions = [
    { icon: Plus, label: "Yeni Gösterge", color: "bg-blue-500", href: "#" },
    { icon: FileText, label: "Yeni Model", color: "bg-green-500", href: "#" },
    { icon: Users, label: "Kullanıcı Ekle", color: "bg-purple-500", href: "#" },
    { icon: Settings, label: "Sistem Ayarları", color: "bg-orange-500", href: "#" },
  ]

  const mainModules = [
    {
      title: "Temel Tanımlar",
      description: "Sistem temel tanımlarını yönetin",
      icon: Layers,
      items: ["Diller", "Ülkeler", "Şehirler", "Hastaneler", "Kullanıcılar", "Roller"],
      color: "border-blue-200 hover:border-blue-300 bg-blue-50/50",
    },
    {
      title: "Sınıflandırma Tanımları",
      description: "Sınıflandırma sistemlerini düzenleyin",
      icon: Target,
      items: ["Hastane Türleri", "Kullanıcı Türleri", "Seviyeler", "Gösterge Cevap Türleri"],
      color: "border-green-200 hover:border-green-300 bg-green-50/50",
    },
    {
      title: "Ölçüm Tanımları",
      description: "Ölçüm ve değerlendirme parametreleri",
      icon: BarChart3,
      items: ["Modeller", "Boyutlar", "Kriterler", "Göstergeler"],
      color: "border-purple-200 hover:border-purple-300 bg-purple-50/50",
    },
    {
      title: "Navigasyon Yönetimi",
      description: "Sistem navigasyonunu yapılandırın",
      icon: Navigation,
      items: ["Model Navigasyonu", "Menü Yapısı"],
      color: "border-orange-200 hover:border-orange-300 bg-orange-50/50",
    },
  ]

  const recentActivities = [
    { action: "Yeni gösterge eklendi", user: "Ahmet Emre", time: "5 dk önce", type: "create" },
    { action: "Kullanıcı sisteme kayıt oldu", user: "Büşra Gül", time: "15 dk önce", type: "user" },
    { action: "Model boyutu oluşturuldu", user: "BT Talep", time: "1 saat önce", type: "update" },
  ]

  const stats = [
    { label: "Toplam Kriter", value: "225", change: "+12", trend: "up" },
    { label: "Aktif Boyut", value: "80", change: "+5", trend: "up" },
    { label: "Toplam Model", value: "10", change: "0", trend: "stable" },
    { label: "Aktif Ülke", value: "4", change: "+1", trend: "up" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Logo" className="h-8 w-8" />
              <h1 className="text-xl font-bold text-gray-900">Hastane 4.0</h1>
            </div>

            {/* Search */}
            <div className="flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Modül, gösterge veya kullanıcı ara..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  3
                </Badge>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Hoş Geldiniz!</h2>
          <p className="text-gray-600">
            Sistem yönetim paneline hoş geldiniz. Aşağıdaki modüllerden istediğinizi seçerek işlemlerinizi
            gerçekleştirebilirsiniz.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex-col space-y-2 hover:shadow-md transition-all duration-200 bg-transparent"
                >
                  <div className={`${action.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{action.label}</span>
                </Button>
              )
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`text-sm ${stat.trend === "up" ? "text-green-600" : "text-gray-500"}`}>
                        {stat.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Main Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainModules.map((module, index) => {
                const Icon = module.icon
                return (
                  <Card
                    key={index}
                    className={`${module.color} border-2 hover:shadow-lg transition-all duration-200 cursor-pointer`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          <Icon className="h-6 w-6 text-gray-700" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
                          <p className="text-sm text-gray-600 font-normal">{module.description}</p>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2">
                        {module.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-white/50 transition-colors"
                          >
                            <span className="text-sm text-gray-700">{item}</span>
                            <ChevronRight className="h-4 w-4 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Son İşlemler</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div
                      className={`p-1 rounded-full ${
                        activity.type === "create"
                          ? "bg-green-100"
                          : activity.type === "user"
                            ? "bg-blue-100"
                            : "bg-orange-100"
                      }`}
                    >
                      <div
                        className={`h-2 w-2 rounded-full ${
                          activity.type === "create"
                            ? "bg-green-500"
                            : activity.type === "user"
                              ? "bg-blue-500"
                              : "bg-orange-500"
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>Sistem Durumu</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Veritabanı</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Aktif
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Servisleri</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Çalışıyor
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Son Yedekleme</span>
                  <span className="text-xs text-gray-500">2 saat önce</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
