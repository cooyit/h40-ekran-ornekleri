import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import ModelCreationTabsV2 from "@/model-creation-tabs-v2"

export default function Page() {
  return (
    <div>
      {/* Ana Sayfa Butonu */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Button
            variant="outline"
            size="sm"
            className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white border-gray-200"
          >
            <Home className="h-4 w-4 mr-2" />
            Ana Sayfa
          </Button>
        </Link>
      </div>

      <ModelCreationTabsV2 />
    </div>
  )
}
