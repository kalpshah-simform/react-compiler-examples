import { BackButton } from '@/components/back-button'
import { ShadcnUiDemo } from '@/features/shadcn-ui/components/shadcn-ui-demo'

export function ShadcnUiPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex-1">
        <ShadcnUiDemo />
      </div>
    </div>
  )
}
