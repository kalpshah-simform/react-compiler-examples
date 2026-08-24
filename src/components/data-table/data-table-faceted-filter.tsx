import type { Column, RowData } from '@tanstack/react-table'
import { CirclePlus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ClaimsTableFeatures } from '@/features/claims/components/table-features'
import { Separator } from '@/components/ui/separator'

interface DataTableFacetedFilterOption {
  label: string
  value: string
}

interface DataTableFacetedFilterProps<TData extends RowData, TValue> {
  column?: Column<ClaimsTableFeatures, TData, TValue>
  title: string
  options: DataTableFacetedFilterOption[]
  selectedValues: string[]
}

export function DataTableFacetedFilter<TData extends RowData, TValue>({
  column,
  title,
  options,
  selectedValues: selectedValuesProp,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const facets = column?.getFacetedUniqueValues()
  const selectedValues = new Set(selectedValuesProp)

  console.log('[render] DataTableFacetedFilter', title, selectedValues, facets)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <CirclePlus />
          {title}
          {selectedValues.size > 0 ? (
            <>
              <Separator orientation="vertical" className="mx-1 h-4" />
              <Badge variant="secondary" className="rounded-sm lg:hidden">
                {selectedValues.size}
              </Badge>
              <div className="hidden gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="secondary" className="rounded-sm">
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        key={option.value}
                        variant="secondary"
                        className="rounded-sm"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value)
          const count = facets?.get(option.value)
          console.log(
            '[render] DataTableFacetedFilter option',
            title,
            option.value,
            isSelected,
            count,
          )
          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={isSelected}
              onSelect={(event) => event.preventDefault()}
              onCheckedChange={(checked) => {
                if (checked) {
                  selectedValues.add(option.value)
                } else {
                  selectedValues.delete(option.value)
                }
                const filterValues = Array.from(selectedValues)
                column?.setFilterValue(
                  filterValues.length ? filterValues : undefined,
                )
              }}
            >
              <span className="flex-1">{option.label}</span>
              {count !== undefined ? (
                <span className="font-mono text-xs text-muted-foreground">
                  {count}
                </span>
              ) : null}
            </DropdownMenuCheckboxItem>
          )
        })}
        {selectedValues.size > 0 ? (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => column?.setFilterValue(undefined)}
              className="justify-center text-center"
            >
              Clear filters
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
