import { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function FaqBlock() {
  const [openItem, setOpenItem] = useState<string | undefined>('item-1')
  const [detailsOpen, setDetailsOpen] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] FaqBlock', { openItem, detailsOpen })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>FAQ</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Does this work with React Compiler?</AccordionTrigger>
            <AccordionContent>
              Yes, every block on this page is compiled by React Compiler.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Can I self-host this example?</AccordionTrigger>
            <AccordionContent>
              Yes, it&apos;s a plain Vite + React app, deploy it anywhere.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {detailsOpen ? 'Hide' : 'Show'} technical details
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="text-sm text-muted-foreground">
            Built with shadcn/ui, Radix primitives, and Tailwind CSS v4.
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  )
}
