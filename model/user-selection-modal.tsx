"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

interface UserSelectionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedUserTypes: string[]
  onUserTypeSelect: (userType: string) => void
}

export default function UserSelectionModal({
  isOpen,
  onClose,
  selectedUserTypes,
  onUserTypeSelect,
}: UserSelectionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Hangi kullanıcı türü için devam etmek istiyorsunuz?
          </DialogTitle>
          <DialogDescription>
            Seçtiğiniz kullanıcı türü için detaylı model yapısını oluşturacaksınız. Diğer kullanıcı türleri için taslak
            modeller otomatik oluşturulacak.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-4">
          {selectedUserTypes.map((userType) => (
            <Button
              key={userType}
              variant="outline"
              onClick={() => onUserTypeSelect(userType)}
              className="justify-start h-auto p-4 text-left hover:bg-blue-50 hover:border-blue-200"
            >
              <div>
                <div className="font-medium text-blue-900">{userType}</div>
                <div className="text-sm text-gray-500">Bu kullanıcı türü için detaylı yapı oluştur</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
