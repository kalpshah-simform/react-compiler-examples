import type { ReactTable } from '@tanstack/react-table'
import { Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter'
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options'
import type { ClaimsTableFeatures } from '@/features/claims/components/table-features'
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
  TYPE_OPTIONS,
} from '@/features/claims/format'
import type { Claim } from '@/features/claims/types'

interface ClaimsTableToolbarProps {
  table: ReactTable<ClaimsTableFeatures, Claim>
  globalFilter: string
  onGlobalFilterChange: (value: string) => void
  onDeleteSelected: () => void
}

function getColumnFilterValues(
  table: ReactTable<ClaimsTableFeatures, Claim>,
  columnId: string,
): string[] {
  return (
    (table.state.columnFilters.find((filter) => filter.id === columnId)
      ?.value as string[] | undefined) ?? []
  )
}

export function ClaimsTableToolbar({
  table,
  globalFilter,
  onGlobalFilterChange,
  onDeleteSelected,
}: ClaimsTableToolbarProps) {
  const isFiltered =
    table.state.columnFilters.length > 0 || globalFilter.length > 0
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
          selectedValues={getColumnFilterValues(table, 'status')}
        />
        <DataTableFacetedFilter
          key="type-filter"
          column={table.getColumn('claimType')}
          title="Type"
          options={TYPE_OPTIONS}
          selectedValues={getColumnFilterValues(table, 'claimType')}
        />
        <DataTableFacetedFilter
          key="priority-filter"
          column={table.getColumn('priority')}
          title="Priority"
          options={PRIORITY_OPTIONS}
          selectedValues={getColumnFilterValues(table, 'priority')}
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
