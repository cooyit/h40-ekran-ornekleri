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
  BarChart3,
  Navigation,
  Plus,
  Bell,
  User,
  ArrowRight,
  Activity,
  FileText,
  Target,
  Layers,
  Clock,
  Star,
} from "lucide-react"

export default function HomepageDesign3() {
  const [searchQuery, setSearchQuery] = useState("")

  const heroStats = [
    { label: "Aktif Modeller", value: "24", icon: Target },
    { label: "Tanımlanan Ölçüm Tanımları", value: "1,247", icon: Activity },
    { label: "Kullanıcılar", value: "27", icon: User },
  ]

  const moduleGrid = [
    { title: "Temel Tanımlar", icon: Layers, count: "156 kayıt", color: "bg-blue-500" },
    { title: "Sınıflandırma", icon: Target, count: "89 kategori", color: "bg-green-500" },
    { title: "Ölçüm Tanımları", icon: BarChart3, count: "234 metrik", color: "bg-purple-500" },
    { title: "Atamalar", icon: Navigation, count: "45 atama", color: "bg-orange-500" },
    { title: "Kullanıcı Yönetimi", icon: Users, count: "78 kullanıcı", color: "bg-pink-500" },
    { title: "Sistem Ayarları", icon: Settings, count: "12 konfigürasyon", color: "bg-indigo-500" },
  ]

  const recentActivities = [
    { task: "Yeni gösterge eklendi", user: "Ahmet Emre", time: "5 dk önce", type: "create" },
    { task: "Kullanıcı sisteme kayıt oldu", user: "Büşra Gül", time: "15 dk önce", type: "user" },
    { task: "Model boyutu oluşturuldu", user: "BT Talep", time: "1 saat önce", type: "update" },
    { task: "Gösterge cevap türü güncellendi", user: "Admin", time: "2 saat önce", type: "update" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <img src="/logo.png" alt="Logo" className="h-10 w-10" />
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Hastane 4.0</h1>
                  <p className="text-xs text-gray-500">v2.1.0</p>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Modül ara, gösterge bul, kullanıcı sorgula..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 bg-white/50 border-white/30 focus:bg-white focus:border-blue-300 transition-all"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                  7
                </Badge>
              </Button>
              <div className="flex items-center space-x-3 bg-white/50 rounded-full px-3 py-2">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Hastane{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4.0</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Model Admin
          </p>

          <div className="flex justify-center space-x-8 mb-8">
            {heroStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg mb-2">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Plus className="mr-2 h-5 w-5" />
              Yeni Model Oluştur
            </Button>
            <Button variant="outline" size="lg" className="border-2 bg-transparent">
              <FileText className="mr-2 h-5 w-5" />
              Modelleri Görüntüle
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module Grid */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Menüler</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moduleGrid.map((module, index) => {
                const Icon = module.icon
                return (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-all duration-200 cursor-pointer bg-white/60 backdrop-blur-sm border-0"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`${module.color} p-3 rounded-xl`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{module.title}</h4>
                          <p className="text-sm text-gray-600">{module.count}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Tasks */}
            <Card className="bg-white/60 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Son İşlemler</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/50 transition-colors"
                  >
                    <div
                      className={`mt-1 h-3 w-3 rounded-full ${
                        activity.type === "create"
                          ? "bg-green-500"
                          : activity.type === "user"
                            ? "bg-blue-500"
                            : "bg-orange-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.task}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card className="bg-white/60 backdrop-blur-sm border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Sistem Durumu</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sistem Sürümü</span>
                  <span className="text-xs text-gray-500">v2.1.0</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
