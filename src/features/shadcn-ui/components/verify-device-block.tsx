import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function VerifyDeviceBlock() {
  const [code, setCode] = useState('')
  const [verified, setVerified] = useState(false)
  const renderCount = useRenderCount()

  console.log('[render] VerifyDeviceBlock', { code, verified })

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Verify Device</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your device.
        </p>
        <InputOTP maxLength={6} value={code} onChange={setCode}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button disabled={code.length !== 6} onClick={() => setVerified(true)}>
          Verify
        </Button>
        {verified ? (
          <p className="text-sm text-muted-foreground">Device verified.</p>
        ) : null}
      </CardContent>
    </Card>
  )
}
