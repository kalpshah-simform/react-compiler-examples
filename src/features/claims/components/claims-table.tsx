import {
  flexRender,
  useTable,
  type ColumnFiltersState,
  type ColumnVisibilityState,
  type RowSelectionState,
  type SortingState,
} from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DataTablePagination } from '@/components/data-table/data-table-pagination'
import {
  deleteClaim,
  fetchClaims,
  updateClaimStatus,
} from '@/features/claims/api'
import { ClaimDetailsDialog } from '@/features/claims/components/claim-details-dialog'
import { createClaimColumns } from '@/features/claims/components/columns'
import { ClaimsTableToolbar } from '@/features/claims/components/claims-table-toolbar'
import { claimsTableFeatures } from '@/features/claims/components/table-features'
import type { Claim } from '@/features/claims/types'

export function ClaimsTable() {
  // Discussion point: on TanStack Table v8, the table instance was stable-but-mutable,
  // which broke React Compiler's memoization (stale "Page X of Y" text, etc. — see
  // https://github.com/TanStack/table/issues/5567). TanStack Table v9 fixed this
  // (the issue was closed as resolved), so this component can be memoized normally.
  const [data, setData] = useState<Claim[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] =
    useState<ColumnVisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [globalFilter, setGlobalFilter] = useState('')

  const [viewingClaim, setViewingClaim] = useState<Claim | null>(null)
  const [pendingClaimId, setPendingClaimId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchClaims()
      .then((claims) => {
        if (cancelled) return
        setData(claims)
        setIsLoading(false)
      })
      .catch(() => {
        if (cancelled) return
        setLoadError('Failed to load claims. Please try again.')
        setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  async function handleApprove(claim: Claim) {
    setPendingClaimId(claim.id)
    const updated = await updateClaimStatus(claim.id, 'approved')
    setData((current) =>
      current.map((item) => (item.id === claim.id ? updated : item)),
    )
    setPendingClaimId(null)
  }

  async function handleReject(claim: Claim) {
    setPendingClaimId(claim.id)
    const updated = await updateClaimStatus(claim.id, 'rejected')
    setData((current) =>
      current.map((item) => (item.id === claim.id ? updated : item)),
    )
    setPendingClaimId(null)
  }

  async function handleDelete(claim: Claim) {
    setPendingClaimId(claim.id)
    await deleteClaim(claim.id)
    setData((current) => current.filter((item) => item.id !== claim.id))
    setPendingClaimId(null)
  }

  async function handleDeleteSelected() {
    const selectedIds = Object.keys(rowSelection)
    await Promise.all(selectedIds.map((id) => deleteClaim(id)))
    setData((current) => current.filter((item) => !rowSelection[item.id]))
    setRowSelection({})
  }

  const columns = createClaimColumns({
    pendingClaimId,
    onView: setViewingClaim,
    onApprove: (claim) => {
      void handleApprove(claim)
    },
    onReject: (claim) => {
      void handleReject(claim)
    },
    onDelete: (claim) => {
      void handleDelete(claim)
    },
  })

  const table = useTable({
    features: claimsTableFeatures,
    data,
    columns,
    getRowId: (row) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
  })

  console.log('[render] ClaimsTable', {
    isLoading,
    loadError,
    dataLength: data.length,
    globalFilter,
    sorting,
    columnFilters,
    columnVisibility,
    rowSelection,
  })

  if (loadError) {
    return (
      <p className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        {loadError}
      </p>
    )
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
        Loading claims...
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      <ClaimsTableToolbar
        table={table}
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        onDeleteSelected={() => {
          void handleDeleteSelected()
        }}
      />

      <div className="rounded-lg border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No claims found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} />

      <ClaimDetailsDialog
        claim={viewingClaim}
        onOpenChange={(open) => {
          if (!open) setViewingClaim(null)
        }}
      />
    </div>
  )
}
