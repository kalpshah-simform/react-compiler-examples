import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function ContactFormBlock() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [subscribe, setSubscribe] = useState(true)
  const [sent, setSent] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] ContactFormBlock', { name, message, subscribe, sent })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Contact</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="contact-form-block-name">Name</Label>
          <Input
            id="contact-form-block-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Jane Doe"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="contact-form-block-message">Message</Label>
          <Textarea
            id="contact-form-block-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="How can we help?"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="contact-form-block-subscribe"
            checked={subscribe}
            onCheckedChange={(value) => setSubscribe(value === true)}
          />
          <Label htmlFor="contact-form-block-subscribe">Subscribe to updates</Label>
        </div>
        <Button
          onClick={() => setSent(true)}
          disabled={name.length === 0 || message.length === 0}
        >
          Send message
        </Button>
        {sent ? (
          <p className="text-sm text-muted-foreground">Message sent, {name}.</p>
        ) : null}
      </CardContent>
    </Card>
  )
}
