import { BackButton } from '@/components/back-button'
import { TanstackQueryDemo } from '@/features/tanstack-query/components/tanstack-query-demo'

export function TanstackQueryPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex-1">
        <TanstackQueryDemo />
      </div>
    </div>
  )
}
