import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const SLIDES = [
  { title: 'Design system audit', author: 'Alex Kim', initials: 'AK' },
  { title: 'Q3 roadmap review', author: 'Riya Sharma', initials: 'RS' },
  { title: 'Onboarding flow', author: 'Chris Kane', initials: 'CK' },
]

export function MediaGalleryBlock() {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const renderCount = useRenderCount()

  console.log('[render] MediaGalleryBlock', { current })

  useEffect(() => {
    if (!api) return
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local state from the embla-carousel-react instance, not derived from React state
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const slide = SLIDES[current] ?? SLIDES[0]!

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Recent Documents</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <Carousel setApi={setApi}>
          <CarouselContent>
            {SLIDES.map((item) => (
              <CarouselItem key={item.title}>
                <div className="flex h-28 items-center justify-center rounded-md border px-4 text-center text-sm font-medium">
                  {item.title}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <HoverCard>
          <HoverCardTrigger asChild>
            <button type="button" className="flex items-center gap-2 text-sm">
              <Avatar className="size-6">
                <AvatarFallback className="text-xs">{slide.initials}</AvatarFallback>
              </Avatar>
              {slide.author}
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="text-sm">
            Last edited &quot;{slide.title}&quot; today.
          </HoverCardContent>
        </HoverCard>
      </CardContent>
    </Card>
  )
}
