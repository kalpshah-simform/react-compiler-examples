import { CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { SubmitClaimResult } from '@/features/insurance-claim/api'

interface SubmissionResultProps {
  result: SubmitClaimResult
  onSubmitAnother: () => void
}

export function SubmissionResult({
  result,
  onSubmitAnother,
}: SubmissionResultProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <CheckCircle2 className="size-5" />
          Claim Submitted
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <p className="text-sm text-muted-foreground">
          Your claim has been received. A claims adjuster will reach out using
          your preferred contact method within 2-3 business days.
        </p>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt className="text-muted-foreground">Claim ID</dt>
          <dd className="font-medium text-foreground">{result.claimId}</dd>
          <dt className="text-muted-foreground">Submitted At</dt>
          <dd className="font-medium text-foreground">
            {new Date(result.submittedAt).toLocaleString()}
          </dd>
        </dl>
        <Button
          type="button"
          variant="outline"
          className="w-fit"
          onClick={onSubmitAnother}
        >
          Submit Another Claim
        </Button>
      </CardContent>
    </Card>
  )
}
