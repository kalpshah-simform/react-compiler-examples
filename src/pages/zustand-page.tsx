import { BackButton } from '@/components/back-button'
import { ZustandDemo } from '@/features/zustand/components/zustand-demo'

export function ZustandPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex-1">
        <ZustandDemo />
      </div>
    </div>
  )
}
