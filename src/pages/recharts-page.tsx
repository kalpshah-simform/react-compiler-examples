import { BackButton } from '@/components/back-button'
import { RechartsDemo } from '@/features/recharts/components/recharts-demo'

export function RechartsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex-1">
        <RechartsDemo />
      </div>
    </div>
  )
}
