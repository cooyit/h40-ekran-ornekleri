"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Design1 from "./components/design1"
import Design2 from "./components/design2"
import Design3 from "./components/design3"
import LanguageDesign1 from "./components/language-support-design1"
import LanguageDesign2 from "./components/language-support-design2"
import LanguageDesign3 from "./components/language-support-design3"
import HomepageDesign1 from "./components/homepage-design1"
import HomepageDesign2 from "./components/homepage-design2"
import HomepageDesign3 from "./components/homepage-design3"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Ekran Tasarımları</h1>
          <p className="text-gray-600">Anasayfa, gösterge yönetimi ve dil desteği arayüzleri</p>
        </div>

        <Tabs defaultValue="homepage-designs" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="homepage-designs">Anasayfa Tasarımları</TabsTrigger>
            <TabsTrigger value="original-designs">Gösterge Yönetimi</TabsTrigger>
            <TabsTrigger value="language-support">Dil Desteği</TabsTrigger>
          </TabsList>

          <TabsContent value="homepage-designs">
            <Tabs defaultValue="homepage1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="homepage1">Modern Dashboard</TabsTrigger>
                <TabsTrigger value="homepage2">Sidebar Layout</TabsTrigger>
                <TabsTrigger value="homepage3">Hero Centered</TabsTrigger>
              </TabsList>

              <TabsContent value="homepage1">
                <HomepageDesign1 />
              </TabsContent>

              <TabsContent value="homepage2">
                <HomepageDesign2 />
              </TabsContent>

              <TabsContent value="homepage3">
                <HomepageDesign3 />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="original-designs">
            <Tabs defaultValue="design1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="design1">Klasik Form</TabsTrigger>
                <TabsTrigger value="design2">Kart Tabanlı</TabsTrigger>
                <TabsTrigger value="design3">Adım Adım</TabsTrigger>
              </TabsList>

              <TabsContent value="design1">
                <Design1 />
              </TabsContent>

              <TabsContent value="design2">
                <Design2 />
              </TabsContent>

              <TabsContent value="design3">
                <Design3 />
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="language-support">
            <Tabs defaultValue="lang-design1" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="lang-design1">Yan Yana Karşılaştırma</TabsTrigger>
                <TabsTrigger value="lang-design2">Tab Tabanlı</TabsTrigger>
                <TabsTrigger value="lang-design3">Overlay & Modal</TabsTrigger>
              </TabsList>

              <TabsContent value="lang-design1">
                <LanguageDesign1 />
              </TabsContent>

              <TabsContent value="lang-design2">
                <LanguageDesign2 />
              </TabsContent>

              <TabsContent value="lang-design3">
                <LanguageDesign3 />
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
