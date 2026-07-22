import { BackButton } from '@/components/back-button'
import { InsuranceClaimForm } from '@/features/insurance-claim/components/insurance-claim-form'

export function ReactHookFormPage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            React Hook Form + Zod
          </h1>
          <p className="text-sm text-muted-foreground">
            File an insurance claim below.
          </p>
        </div>
        <BackButton />
      </div>
      <InsuranceClaimForm />
    </div>
  )
}
