import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  addCountry,
  deleteCountry,
  getCountries,
} from '@/features/tanstack-query/api'

const QUERY_KEY = ['countries', 'fixed']

interface NameCellProps {
  name: string
}

// A separate component so its own render is memoized independently of
// CountryRow's — its cached output is reused (no re-render) whenever `name`
// itself hasn't changed, even on renders CountryRow is re-invoked for.
function NameCell({ name }: NameCellProps) {
  console.log('[render] NameCell', { name })
  return <TableCell className="font-medium">{name}</TableCell>
}

interface DeleteActionCellProps {
  name: string
  onDelete: (name: string) => void
}

function DeleteActionCell({ name, onDelete }: DeleteActionCellProps) {
  console.log('[render] DeleteActionCell', { name })
  return (
    <TableCell className="text-right">
      <Button size="sm" variant="outline" onClick={() => onDelete(name)}>
        Delete
      </Button>
    </TableCell>
  )
}

interface CountryRowProps {
  name: string
  onDelete: (name: string) => void
}

// CountryRow itself is re-invoked whenever the `countries` array gets a new
// reference (e.g. after Add/Delete) — the compiler memoizes the *whole*
// `.map()` as one unit keyed on that array, so a new array means every row
// element is recreated regardless of whether that row's own data changed.
// What the compiler DOES preserve is each memoized child's own output
// (NameCell, DeleteActionCell below): since CountryRow recreates their
// elements from the same `name`/`onDelete` values, those elements are
// referentially unchanged, so NameCell/DeleteActionCell don't re-render even
// though CountryRow's own body just ran again.
function CountryRow({ name, onDelete }: CountryRowProps) {
  console.log('[render] CountryRow', { name })
  return (
    <TableRow key={name}>
      <NameCell name={name} />
      <DeleteActionCell name={name} onDelete={onDelete} />
    </TableRow>
  )
}

export function CountriesFixed() {
  const [value, setValue] = useState('')

  const queryClient = useQueryClient()

  const { data: countries } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCountries,
  })

  const { mutate: deleteCountryMutation } = useMutation({
    mutationFn: deleteCountry,
    onSuccess: (_, name) => {
      queryClient.setQueryData(
        QUERY_KEY,
        countries?.filter((country) => country.name !== name),
      )
    },
  })

  const onDelete = (name: string) => {
    deleteCountryMutation(name)
  }

  const addCountryMutation = useMutation({
    mutationFn: addCountry,
    onSuccess: (response) => {
      queryClient.setQueryData(QUERY_KEY, [...(countries ?? []), response])
    },
  })

  const onAddCountry = () => {
    addCountryMutation.mutate(value)
    setValue('')
  }

  console.log('[render] CountriesFixed', { value, countries })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Fixed: rows are memoized independently</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>Type in the input — no row logs a re-render at all</li>
          <li>
            Click Add/Delete — CountryRow re-runs for every row (the list
            reference always changes), but NameCell/DeleteActionCell for
            untouched rows don&apos;t
          </li>
        </ul>
        <Table>
          <TableCaption>Supported countries list.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countries?.map(({ name }) => (
              <CountryRow key={name} name={name} onDelete={onDelete} />
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Add new country"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button size="sm" onClick={onAddCountry}>
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
