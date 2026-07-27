import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Progress } from '@/components/ui/progress'
import { Toaster } from '@/components/ui/sonner'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function SettingsDrawerBlock() {
  const [storageUsed, setStorageUsed] = useState(62)
  const renderCount = useRenderCount()

  console.log('[render] SettingsDrawerBlock', { storageUsed })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Storage Settings</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid gap-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Storage used</span>
            <span>{storageUsed}%</span>
          </div>
          <Progress value={storageUsed} />
        </div>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Manage storage</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Clear cached files</DrawerTitle>
                <DrawerDescription>
                  Free up space by removing cached files.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-2 px-4">
                <Progress value={storageUsed} />
                <p className="text-sm text-muted-foreground">{storageUsed}% used</p>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button
                    onClick={() => {
                      setStorageUsed(20)
                      toast('Cache cleared', { description: 'Storage usage reduced to 20%.' })
                    }}
                  >
                    Clear cache
                  </Button>
                </DrawerClose>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
        <Toaster />
      </CardContent>
    </Card>
  )
}
