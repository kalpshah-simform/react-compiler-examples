import { BackButton } from '@/components/back-button'
import { ReduxToolkitDemo } from '@/features/redux-toolkit/components/redux-toolkit-demo'

export function ReduxToolkitPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <BackButton />
      </div>
      <div className="flex-1">
        <ReduxToolkitDemo />
      </div>
    </div>
  )
}
