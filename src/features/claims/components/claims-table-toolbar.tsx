import type { Table } from '@tanstack/react-table'
import { Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from '@/features/claims/format'
import type { Claim } from '@/features/claims/types'

interface ClaimsTableToolbarProps {
  table: Table<Claim>
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  onDeleteSelected: () => void
}

export function ClaimsTableToolbar({
  table,
  globalFilter,
  onGlobalFilterChange,
  onDeleteSelected,
}: ClaimsTableToolbarProps) {
  // eslint-disable-next-line react-compiler/react-compiler -- TanStack Table's column/table objects are stable-but-mutable; compiler memoization causes stale UI (verified empirically: the Reset button didn't appear after filtering).
  // 'use no memo'

  const isFiltered =
    table.getState().columnFilters.length > 0 || globalFilter.length > 0
  const selectedCount = table.getFilteredSelectedRowModel().rows.length
  const statusColumn = table.getColumn('status')

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Search claims..."
          value={globalFilter}
          onChange={(event) => onGlobalFilterChange(event.target.value)}
          className="h-8 w-full sm:w-56"
        />
        <DataTableFacetedFilter
          column={statusColumn}
          key="status-filter"
          title="Status"
          options={STATUS_OPTIONS}
        />
        <DataTableFacetedFilter
          key="type-filter"
          column={table.getColumn('claimType')}
          title="Type"
          options={TYPE_OPTIONS}
        />
        <DataTableFacetedFilter
          key="priority-filter"
          column={table.getColumn('priority')}
          title="Priority"
          options={PRIORITY_OPTIONS}
        />
        {isFiltered ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              table.resetColumnFilters()
              onGlobalFilterChange('')
            }}
          >
            Reset
            <X />
          </Button>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {selectedCount > 0 ? (
          <Button variant="outline" size="sm" onClick={onDeleteSelected}>
            <Trash2 />
            Delete ({selectedCount})
          </Button>
        ) : null}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}
