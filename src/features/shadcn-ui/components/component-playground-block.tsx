import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button, type buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Toggle } from '@/components/ui/toggle'
import { BoldIcon } from 'lucide-react'
import type { VariantProps } from 'class-variance-authority'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>['variant']>

const VARIANTS: ButtonVariant[] = ['default', 'secondary', 'outline', 'ghost']

export function ComponentPlaygroundBlock() {
  const [variant, setVariant] = useState<ButtonVariant>('default')
  const [size, setSize] = useState('default')
  const [bold, setBold] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] ComponentPlaygroundBlock', { variant, size, bold })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Component Playground</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <Tabs value={variant} onValueChange={(value) => setVariant(value as ButtonVariant)}>
          <TabsList>
            {VARIANTS.map((option) => (
              <TabsTrigger key={option} value={option} className="capitalize">
                {option}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex h-16 items-center justify-center rounded-md border">
          <Button variant={variant} size={size === 'small' ? 'sm' : 'default'}>
            <span className={bold ? 'font-bold' : undefined}>Preview button</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge>Badge</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Toggle
            size="sm"
            pressed={bold}
            onPressedChange={setBold}
            aria-label="Toggle bold preview"
          >
            <BoldIcon className="size-4" />
          </Toggle>
        </div>

        <RadioGroup value={size} onValueChange={setSize} className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <RadioGroupItem value="default" id="playground-size-default" />
            <Label htmlFor="playground-size-default">Default size</Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="small" id="playground-size-small" />
            <Label htmlFor="playground-size-small">Small size</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
