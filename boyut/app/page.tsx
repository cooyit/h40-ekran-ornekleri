import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClassicDesign from "../design-1-classic"
import CardsDesign from "../design-2-cards"
import ModernDesign from "../design-3-modern"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Tabs defaultValue="classic" className="w-full">
        <div className="border-b">
          <div className="container mx-auto">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="classic">Klasik Tablo</TabsTrigger>
              <TabsTrigger value="cards">Kart Tasarımı</TabsTrigger>
              <TabsTrigger value="modern">Modern Split</TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="classic" className="mt-0">
          <ClassicDesign />
        </TabsContent>

        <TabsContent value="cards" className="mt-0">
          <CardsDesign />
        </TabsContent>

        <TabsContent value="modern" className="mt-0">
          <ModernDesign />
        </TabsContent>
      </Tabs>
    </div>
  )
}
