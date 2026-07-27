import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const ACCENTS = [
  { value: 'violet', label: 'Violet', className: 'bg-violet-500' },
  { value: 'blue', label: 'Blue', className: 'bg-blue-500' },
  { value: 'green', label: 'Green', className: 'bg-emerald-500' },
  { value: 'amber', label: 'Amber', className: 'bg-amber-500' },
]

export function AppearanceBlock() {
  const [accent, setAccent] = useState('violet')
  const [radius, setRadius] = useState([8])
  const renderCount = useRenderCount()

  console.log('[render] AppearanceBlock', { accent, radius })

  const accentClassName = ACCENTS.find(
    (option) => option.value === accent,
  )?.className
  const radiusValue = radius[0] ?? 8

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Appearance</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div
          className={`flex h-16 items-center justify-center rounded-md border text-sm font-medium text-white ${accentClassName}`}
          style={{ borderRadius: radiusValue }}
        >
          Live preview
        </div>

        <div className="grid gap-2">
          <Label htmlFor="appearance-block-accent">Accent color</Label>
          <Select value={accent} onValueChange={setAccent}>
            <SelectTrigger id="appearance-block-accent" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ACCENTS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="appearance-block-radius">Corner radius</Label>
            <span className="text-sm text-muted-foreground">
              {radiusValue}px
            </span>
          </div>
          <Slider
            id="appearance-block-radius"
            value={radius}
            onValueChange={setRadius}
            max={24}
            step={1}
          />
        </div>
      </CardContent>
    </Card>
  )
}
