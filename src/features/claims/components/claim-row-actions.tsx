import { Loader2, MoreHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ClaimsTableMeta } from '@/features/claims/components/claims-table-meta'
import type { Claim } from '@/features/claims/types'

interface ClaimRowActionsProps {
  claim: Claim
  meta: ClaimsTableMeta
}

export function ClaimRowActions({ claim, meta }: ClaimRowActionsProps) {
  const isPending = meta.pendingClaimId === claim.id
  const canDecide =
    claim.status === 'submitted' || claim.status === 'under_review'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          disabled={isPending}
          aria-label="Open claim actions"
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <MoreHorizontal />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => meta.onView(claim)}>
          View details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            void navigator.clipboard.writeText(claim.claimId)
          }}
        >
          Copy claim ID
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          disabled={!canDecide}
          onClick={() => meta.onApprove(claim)}
        >
          Approve claim
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!canDecide}
          onClick={() => meta.onReject(claim)}
        >
          Reject claim
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={() => meta.onDelete(claim)}
        >
          Delete claim
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
