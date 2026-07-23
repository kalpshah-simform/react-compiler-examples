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

const QUERY_KEY = ['countries', 'broken']

export function CountriesBroken() {
  const [value, setValue] = useState('')

  const queryClient = useQueryClient()

  const { data: countries } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getCountries,
  })

  const deleteCountryMutation = useMutation({
    mutationFn: deleteCountry,
    onSuccess: (_, name) => {
      queryClient.setQueryData(
        QUERY_KEY,
        countries?.filter((country) => country.name !== name),
      )
    },
  })

  const onDelete = (name: string) => {
    deleteCountryMutation.mutate(name)
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

  console.log('[render] CountriesBroken', { value, countries })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Broken: rows re-render on every change</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ul className="list-disc pl-5 text-sm text-muted-foreground">
          <li>Type in input fields - all rows and cells with re-render</li>
          <li>Click Add button - all rows and cells with re-render</li>
          <li>Click Delete button - all rows and cells with re-render</li>
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
            {countries?.map(({ name }) => {
              console.log('[render] CountriesBroken row', { name })
              return (
                <TableRow key={name}>
                  <TableCell className="font-medium">{name}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
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
