import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const VARIABLES = [
  { key: 'DATABASE_URL', value: 'postgres://prod-db.internal:5432', masked: true },
  { key: 'NEXT_PUBLIC_API', value: 'https://api.example.com', masked: false },
  { key: 'STRIPE_SECRET', value: 'sk_live_51H8x...', masked: true },
]

export function EnvironmentVariablesBlock() {
  const [editing, setEditing] = useState(false)
  const [deployed, setDeployed] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] EnvironmentVariablesBlock', { editing, deployed })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Environment Variables</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="text-sm text-muted-foreground">
          Production · {VARIABLES.length} variables
        </p>
        {VARIABLES.map((variable) => (
          <div key={variable.key} className="grid gap-1">
            <Label className="font-mono text-xs">{variable.key}</Label>
            <Input
              key={editing ? 'editing' : 'masked'}
              readOnly={!editing}
              defaultValue={variable.masked && !editing ? '••••••••' : variable.value}
              className="font-mono text-xs"
            />
          </div>
        ))}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setEditing((value) => !value)}
          >
            {editing ? 'Done' : 'Edit'}
          </Button>
          <Button size="sm" onClick={() => setDeployed(true)}>
            Deploy
          </Button>
        </div>
        {deployed ? (
          <p className="text-sm text-muted-foreground">Deployed with current values.</p>
        ) : null}
      </CardContent>
    </Card>
  )
}
