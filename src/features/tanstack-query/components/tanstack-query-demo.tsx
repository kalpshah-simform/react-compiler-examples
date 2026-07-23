import { QueryClientProvider } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { queryClient } from '@/features/tanstack-query/query-client'
import { CountriesBroken } from '@/features/tanstack-query/components/countries-broken'
import { CountriesFixed } from '@/features/tanstack-query/components/countries-fixed'

export function TanstackQueryDemo() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="grid gap-4 p-4">
        <Card>
          <CardHeader>
            <CardTitle>TanStack Query + React Compiler</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>
              Both panels below render the same countries table backed by{' '}
              <code>useQuery</code>/<code>useMutation</code> (each with its own
              query key, so they don&apos;t share a cache entry). The only
              difference is where the row lives: in the broken panel it&apos;s
              mapped inline in the same component that owns the input state; in
              the fixed panel it&apos;s extracted into its own{' '}
              <code>CountryRow</code> component.
            </p>
            <p>
              Open the console. In the broken panel, typing or clicking
              Add/Delete re-renders every row and every table cell each time. In
              the fixed panel, typing doesn&apos;t log a single row since{' '}
              <code>countries</code> hasn&apos;t changed reference, so the
              memoized row list is reused entirely. Add/Delete always re-invoke{' '}
              <code>CountryRow</code> for every row (the array reference always
              changes), but only the affected row&apos;s <code>NameCell</code>/
              <code>DeleteActionCell</code> actually re-renders — the rest reuse
              their previous memoized output.
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-4 lg:grid-cols-2">
          <CountriesBroken />
          <CountriesFixed />
        </div>
      </div>
    </QueryClientProvider>
  )
}
