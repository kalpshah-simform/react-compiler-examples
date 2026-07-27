import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function SecurityBlock() {
  const [enabled, setEnabled] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] SecurityBlock', { enabled })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Security</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between gap-3 rounded-md border p-3">
          <div className="grid gap-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Two-factor authentication</p>
              <Badge variant={enabled ? 'default' : 'secondary'}>
                {enabled ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Verify via email or phone number.
            </p>
          </div>
          <Button
            size="sm"
            variant={enabled ? 'outline' : 'default'}
            onClick={() => setEnabled((value) => !value)}
          >
            {enabled ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
