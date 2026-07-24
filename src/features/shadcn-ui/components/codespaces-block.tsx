import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PlusIcon } from 'lucide-react'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const CODESPACES = ['react-compiler-examples', 'shadcn-blocks']

export function CodespacesBlock() {
  const [tab, setTab] = useState('codespaces')
  const [count, setCount] = useState(CODESPACES.length)
  const renderCount = useRenderCount()

  console.log('[render] CodespacesBlock', { tab, count })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Codespaces</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between gap-2">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="codespaces">Codespaces</TabsTrigger>
              <TabsTrigger value="local">Local</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setCount((value) => value + 1)}
            aria-label="Create codespace"
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>

        {tab === 'codespaces' ? (
          <div className="grid gap-2">
            <p className="text-sm text-muted-foreground">Your workspaces in the cloud</p>
            {Array.from({ length: count }, (_, index) =>
              index < CODESPACES.length
                ? CODESPACES[index]
                : `codespace-${index + 1}`,
            ).map((name) => (
              <div
                key={name}
                className="rounded-md border px-3 py-2 text-sm font-mono"
              >
                {name}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No local environments configured.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
