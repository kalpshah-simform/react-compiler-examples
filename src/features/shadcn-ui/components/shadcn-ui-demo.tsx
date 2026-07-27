import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ActivityFeedBlock } from '@/features/shadcn-ui/components/activity-feed-block'
import { AppearanceBlock } from '@/features/shadcn-ui/components/appearance-block'
import { BrowserShareBlock } from '@/features/shadcn-ui/components/browser-share-block'
import { CodespacesBlock } from '@/features/shadcn-ui/components/codespaces-block'
import { CommandPaletteBlock } from '@/features/shadcn-ui/components/command-palette-block'
import { ComponentPlaygroundBlock } from '@/features/shadcn-ui/components/component-playground-block'
import { ContactFormBlock } from '@/features/shadcn-ui/components/contact-form-block'
import { EnvironmentVariablesBlock } from '@/features/shadcn-ui/components/environment-variables-block'
import { FaqBlock } from '@/features/shadcn-ui/components/faq-block'
import { FileManagerBlock } from '@/features/shadcn-ui/components/file-manager-block'
import { MediaGalleryBlock } from '@/features/shadcn-ui/components/media-gallery-block'
import { SchedulerBlock } from '@/features/shadcn-ui/components/scheduler-block'
import { SecurityBlock } from '@/features/shadcn-ui/components/security-block'
import { SettingsDrawerBlock } from '@/features/shadcn-ui/components/settings-drawer-block'
import { TeamMembersBlock } from '@/features/shadcn-ui/components/team-members-block'
import { TrafficChartBlock } from '@/features/shadcn-ui/components/traffic-chart-block'
import { VerifyDeviceBlock } from '@/features/shadcn-ui/components/verify-device-block'

export function ShadcnUiDemo() {
  return (
    <div className="grid gap-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Shadcn UI / Radix UI + React Compiler</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 text-sm text-muted-foreground">
          <p>
            Each block below composes several shadcn/ui components into one
            self-contained widget with its own local state and a render-count
            badge (the same{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">
              useRenderCount
            </code>{' '}
            +{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-foreground">
              console.log(&apos;[render] ...&apos;)
            </code>{' '}
            instrumentation used elsewhere in this repo).
          </p>
          <p>
            Interact with a block and watch its badge: it should only climb
            when that block&apos;s own state changes. If React Compiler is
            memoizing correctly, interacting with one block must never bump
            the render count of an unrelated block.
          </p>
        </CardContent>
      </Card>

      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
        <div className="mb-4 break-inside-avoid">
          <AppearanceBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <SecurityBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <ComponentPlaygroundBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <ContactFormBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <EnvironmentVariablesBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <TrafficChartBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <BrowserShareBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <TeamMembersBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <CodespacesBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <FileManagerBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <SchedulerBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <MediaGalleryBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <CommandPaletteBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <SettingsDrawerBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <FaqBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <ActivityFeedBlock />
        </div>
        <div className="mb-4 break-inside-avoid">
          <VerifyDeviceBlock />
        </div>
      </div>
    </div>
  )
}
