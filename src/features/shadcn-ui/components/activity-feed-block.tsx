import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const TOTAL_PAGES = 4
const ACTIVITY = {
  all: ['Alex commented on Roadmap', 'Riya opened a PR', 'Chris mentioned you'],
  mentions: ['Chris mentioned you'],
  replies: ['Alex replied to your comment'],
}

export function ActivityFeedBlock() {
  const [filter, setFilter] = useState<keyof typeof ACTIVITY>('all')
  const [page, setPage] = useState(1)
  const renderCount = useRenderCount()

  console.log('[render] ActivityFeedBlock', { filter, page })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Activity Feed</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <ToggleGroup
          type="single"
          value={filter}
          onValueChange={(value) => value && setFilter(value as keyof typeof ACTIVITY)}
        >
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="mentions">Mentions</ToggleGroupItem>
          <ToggleGroupItem value="replies">Replies</ToggleGroupItem>
        </ToggleGroup>

        <div className="grid gap-1">
          {ACTIVITY[filter].map((entry) => (
            <p key={entry} className="rounded-md border px-3 py-2 text-sm">
              {entry}
            </p>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  setPage((current) => Math.max(1, current - 1))
                }}
              />
            </PaginationItem>
            {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map(
              (pageNumber) => (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={pageNumber === page}
                    onClick={(event) => {
                      event.preventDefault()
                      setPage(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  setPage((current) => Math.min(TOTAL_PAGES, current + 1))
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  )
}
