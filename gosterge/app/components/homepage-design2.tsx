"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import {
  Search,
  Settings,
  Users,
  BarChart3,
  Navigation,
  Plus,
  Bell,
  User,
  Menu,
  X,
  Home,
  FileText,
  Target,
  Layers,
  TrendingUp,
  Clock,
  CheckCircle,
} from "lucide-react"

export default function HomepageDesign2() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")

  const sidebarItems = [
    { icon: Home, label: "Dashboard", id: "dashboard" },
    { icon: Layers, label: "Temel Tanımlar", id: "basic" },
    { icon: Target, label: "Sınıflandırma", id: "classification" },
    { icon: BarChart3, label: "Ölçüm Tanımları", id: "measurement" },
    { icon: Navigation, label: "Atamalar", id: "navigation" },
    { icon: Users, label: "Kullanıcı Yönetimi", id: "users" },
    { icon: Settings, label: "Sistem Ayarları", id: "settings" },
  ]

  const dashboardCards = [
    {
      title: "Toplam Göstergeler",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Target,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Aktif Kullanıcılar",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: Users,
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Toplam Ölçüm Tanımları",
      value: "456",
      change: "+18%",
      trend: "up",
      icon: CheckCircle,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Tercüme Edilen Ölçüm Tanımları",
      value: "80.5%",
      change: "+0.2%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
  ]

  const quickAccessItems = [
    { title: "Yeni Gösterge Ekle", description: "Hızlı gösterge oluşturma", icon: Plus, color: "text-blue-600" },
    { title: "Modeller", description: "Detaylı analiz raporları", icon: FileText, color: "text-green-600" },
    { title: "Kullanıcılar", description: "Yeni kullanıcı ekleme", icon: Users, color: "text-purple-600" },
    { title: "Sistem Ayarları", description: "Genel konfigürasyon", icon: Settings, color: "text-orange-600" },
  ]

  const recentTasks = [
    { task: "Dijital Sağlık göstergesi güncellendi", time: "5 dk önce", status: "completed" },
    { task: "Yeni kullanıcı onay bekliyor", time: "15 dk önce", status: "pending" },
    { task: "Sistem yedeklemesi tamamlandı", time: "1 saat önce", status: "completed" },
    { task: "Model navigasyonu düzenlendi", time: "2 saat önce", status: "completed" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo" className="h-8 w-8" />
            <span className="text-lg font-semibold text-gray-900">Hesabım</span>
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Button>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-500">admin@hesabim.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Ara..." className="pl-10 pr-4 w-full" />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  5
                </Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="dashboard" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {dashboardCards.map((card, index) => {
                  const Icon = card.icon
                  return (
                    <Card key={index} className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className={`${card.color} p-4 text-white`}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm opacity-90">{card.title}</p>
                              <p className="text-2xl font-bold">{card.value}</p>
                            </div>
                            <Icon className="h-8 w-8 opacity-80" />
                          </div>
                        </div>
                        <div className="p-4 bg-white">
                          <div className="flex items-center text-sm">
                            <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-600 font-medium">{card.change}</span>
                            <span className="text-gray-500 ml-1">bu ay</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Access */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hızlı Erişim</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {quickAccessItems.map((item, index) => {
                          const Icon = item.icon
                          return (
                            <div
                              key={index}
                              className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                            >
                              <div className="flex items-start space-x-3">
                                <Icon className={`h-6 w-6 ${item.color} mt-1`} />
                                <div>
                                  <h3 className="font-medium text-gray-900">{item.title}</h3>
                                  <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Tasks */}
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Clock className="h-5 w-5" />
                        <span>Son Aktiviteler</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {recentTasks.map((task, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div
                            className={`mt-1 h-2 w-2 rounded-full ${
                              task.status === "completed" ? "bg-green-500" : "bg-yellow-500"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-900">{task.task}</p>
                            <p className="text-xs text-gray-500">{task.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Other tab contents would go here */}
            <TabsContent value="basic">
              <Card>
                <CardHeader>
                  <CardTitle>Temel Tanımlar</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Temel tanımlar modülü içeriği burada görünecek...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="classification">
              <Card>
                <CardHeader>
                  <CardTitle>Sınıflandırma Tanımları</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Sınıflandırma modülü içeriği burada görünecek...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
