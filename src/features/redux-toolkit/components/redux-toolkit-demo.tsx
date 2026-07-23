import { Provider } from 'react-redux'
import { store } from '@/store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ControlPanel } from '@/features/redux-toolkit/components/control-panel'
import { NestedLevel } from '@/features/redux-toolkit/components/nested-level'

export function ReduxToolkitDemo() {
  return (
    <Provider store={store}>
      <div className="grid gap-4 p-4 lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Redux Toolkit + React Compiler</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm text-muted-foreground">
              <p>
                Each of the 6 nested levels below can subscribe to a slice of
                Redux state via its own <code>useSelector</code>. Set a
                level&apos;s subscription, then update that slice from the
                panel and watch the render-count badges: only the subscribed
                level (and possibly its ancestors if they subscribe too)
                should climb.
              </p>
              <p>
                Each level also renders a props-only sibling that never
                touches Redux. If an ancestor level re-renders from its own
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
    </Provider>
  )
}
