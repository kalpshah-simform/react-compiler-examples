import { QueryClientProvider } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { queryClient } from '@/features/tanstack-query/query-client'
import { CountriesBroken } from '@/features/tanstack-query/components/countries-broken'
import { CountriesFixed } from '@/features/tanstack-query/components/countries-fixed'

// Discussion point:
// In the below code we have two panels one is broken and another is fixed. Both panels are rendering the same countries table backed by useQuery/useMutation (each with its own query key, so they don't share a cache entry). The row markup itself differs too (inline map vs an extracted CountryRow/NameCell/DeleteActionCell), but the actual trigger for the broken panel's re-renders is in its delete handler: CountriesBroken keeps the whole object returned by useMutation() (`const deleteCountryMutation = useMutation(...)`) and calls `.mutate(name)` from onDelete. useMutation() always returns a brand-new object literal on every render (`{ ...result, mutate, mutateAsync }` — see @tanstack/react-query/src/useMutation.ts), even though the `mutate` function itself is a stable reference internally. Because onDelete closes over that whole object, its identity changes every render, which cascades into the compiler being unable to memoize onDelete or anything that depends on it (i.e. the whole row-mapping block) — so all rows re-render even when just typing in the input, where `countries` hasn't changed at all.
// CountriesFixed avoids this by destructuring only the stable piece: `const { mutate: deleteCountryMutation } = useMutation(...)`. Now onDelete's only dependency is a reference that never changes, so React Compiler can bail out entirely when typing (no row logs a re-render). On Add/Delete, `countries` does get a new array reference (from setQueryData), so CountryRow re-invokes for every row, but since it recreates NameCell/DeleteActionCell from the same name/onDelete values, those components' memoized output is still reused.
// reference: https://www.developerway.com/posts/i-tried-react-compiler#so-whats-the-verdict
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
              query key, so they don&apos;t share a cache entry). The row
              markup differs too (inline map vs an extracted{' '}
              <code>CountryRow</code>/<code>NameCell</code>/
              <code>DeleteActionCell</code>), but the real trigger is the
              delete handler:{' '}
              <code>CountriesBroken</code> keeps the whole object returned by{' '}
              <code>useMutation()</code> and calls <code>.mutate(name)</code>{' '}
              from <code>onDelete</code>. That object is a brand-new
              reference on every render (
              <code>{'{ ...result, mutate, mutateAsync }'}</code>), even
              though <code>mutate</code> itself is stable internally, so{' '}
              <code>onDelete</code>&apos;s identity — and everything that
              depends on it — breaks every render.
            </p>
            <p>
              Open the console. In the broken panel, typing or clicking
              Add/Delete re-renders every row and every table cell each time,
              even though <code>countries</code> hasn&apos;t changed
              reference while typing. In the fixed panel,{' '}
              <code>CountriesFixed</code> destructures just{' '}
              <code>{'{ mutate: deleteCountryMutation }'}</code>, whose
              reference never changes, so <code>onDelete</code> stays stable
              and typing doesn&apos;t log a single row re-render. Add/Delete
              always re-invoke <code>CountryRow</code> for every row (the
              array reference always changes), but only the affected
              row&apos;s <code>NameCell</code>/<code>DeleteActionCell</code>{' '}
              actually re-renders — the rest reuse their previous memoized
              output.
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
