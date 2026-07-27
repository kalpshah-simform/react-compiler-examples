import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from '@/components/ui/command'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function CommandPaletteBlock() {
  const [open, setOpen] = useState(false)
  const [lastAction, setLastAction] = useState<string | null>(null)
  const renderCount = useRenderCount()

  console.log('[render] CommandPaletteBlock', { open, lastAction })

  function runCommand(action: string) {
    setLastAction(action)
    setOpen(false)
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Command Palette</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <Button variant="outline" className="justify-start" onClick={() => setOpen(true)}>
          Search commands...
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => runCommand('New file')}>New file</CommandItem>
              <CommandItem onSelect={() => runCommand('New project')}>
                New project
                <CommandShortcut>⌘N</CommandShortcut>
              </CommandItem>
              <CommandItem onSelect={() => runCommand('Search docs')}>
                Search docs
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
        {lastAction ? (
          <p className="text-sm text-muted-foreground">
            Last selected:{' '}
            <span className="font-medium text-foreground">{lastAction}</span>
          </p>
        ) : null}
      </CardContent>
    </Card>
  )
}
