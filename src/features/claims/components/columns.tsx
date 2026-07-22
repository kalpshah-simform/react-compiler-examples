import type { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { Checkbox } from '@/components/ui/checkbox'
import { ClaimRowActions } from '@/features/claims/components/claim-row-actions'
import { ClaimStatusBadge } from '@/features/claims/components/claim-status-badge'
import type { ClaimsTableMeta } from '@/features/claims/components/claims-table-meta'
import {
  CLAIM_PRIORITY_LABELS,
  CLAIM_TYPE_LABELS,
  formatCurrency,
  formatDate,
} from '@/features/claims/format'
import type { Claim } from '@/features/claims/types'

function optionsFilter<TData>(): ColumnDef<TData>['filterFn'] {
  return (row, columnId, filterValue: string[]) => {
    if (!filterValue?.length) return true
    return filterValue.includes(row.getValue(columnId))
  }
}

export function createClaimColumns(meta: ClaimsTableMeta): ColumnDef<Claim>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'claimId',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Claim ID" />
      ),
      cell: ({ row }) => (
        <span className="font-mono text-xs">{row.getValue('claimId')}</span>
      ),
    },
    {
      accessorKey: 'policyholderName',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Policyholder" />
      ),
    },
    {
      accessorKey: 'claimType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Type" />
      ),
      cell: ({ row }) =>
        CLAIM_TYPE_LABELS[row.getValue<Claim['claimType']>('claimType')],
      filterFn: optionsFilter(),
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => <ClaimStatusBadge status={row.getValue('status')} />,
      filterFn: optionsFilter(),
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'priority',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) =>
        CLAIM_PRIORITY_LABELS[row.getValue<Claim['priority']>('priority')],
      filterFn: optionsFilter(),
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          className="justify-end"
        />
      ),
      cell: ({ row }) => (
        <div className="text-right tabular-nums">
          {formatCurrency(row.getValue('amount'))}
        </div>
      ),
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'filedDate',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Filed Date" />
      ),
      cell: ({ row }) => formatDate(row.getValue('filedDate')),
      enableGlobalFilter: false,
    },
    {
      accessorKey: 'adjuster',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Adjuster" />
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => <ClaimRowActions claim={row.original} meta={meta} />,
      enableSorting: false,
      enableHiding: false,
      enableGlobalFilter: false,
    },
  ]
}
