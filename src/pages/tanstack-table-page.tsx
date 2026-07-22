import { BackButton } from '@/components/back-button'
import { ClaimsTable } from '@/features/claims/components/claims-table'

export function TanstackTablePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            TanStack Table
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse and manage insurance claims.
          </p>
        </div>
        <BackButton />
      </div>
      <ClaimsTable />
    </div>
  )
}
