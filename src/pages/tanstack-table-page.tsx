import { BackButton } from '@/components/back-button'
import { PlaceholderPage } from '@/components/placeholder-page'

export function TanstackTablePage() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex-1">
        <PlaceholderPage title="TanStack Table" />
      </div>
    </div>
  )
}
