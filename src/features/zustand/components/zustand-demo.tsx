import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ControlPanel } from '@/features/zustand/components/control-panel'
import { NestedLevel } from '@/features/zustand/components/nested-level'

export function ZustandDemo() {
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,320px)_1fr]">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Zustand + React Compiler</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>
              Each of the 6 nested levels below can subscribe to the Zustand
              store: with a selector for one slice, with no selector at all
              (&quot;whole store&quot;), or not at all. Update a slice from
              the panel and watch the render-count badges: a selector-based
              subscriber only re-renders when its own slice changes, while a
              whole-store subscriber re-renders on every update, no matter
              which slice changed.
            </p>
            <p>
              Each level also renders a props-only sibling that never touches
              the store. If an ancestor level re-renders from its own
              subscription but the descendant levels&apos; props haven&apos;t
              changed, React Compiler should skip re-rendering them
              automatically — watch their badges stay flat.
            </p>
          </CardContent>
        </Card>
        <ControlPanel />
      </div>

      <NestedLevel level={1} />
    </div>
  )
}
