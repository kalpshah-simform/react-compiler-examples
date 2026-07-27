import { useState } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

const INITIAL_MEMBERS = ['AK', 'RS']

export function TeamMembersBlock() {
  const [members, setMembers] = useState(INITIAL_MEMBERS)
  const renderCount = useRenderCount()

  console.log('[render] TeamMembersBlock', { members })

  function inviteMember() {
    const nextLabel = String.fromCharCode(65 + members.length) + 'K'
    setMembers((current) => [...current, nextLabel])
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>Team Members</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-3">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground">No team members yet.</p>
        ) : (
          <div className="flex -space-x-2">
            {members.map((initials, index) => (
              <Avatar key={`${initials}-${index}`} className="border-2 border-card">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>
        )}
        <p className="text-sm text-muted-foreground">
          Invite your team to collaborate on this project.
        </p>
        <Button size="sm" onClick={inviteMember}>
          Invite Team
        </Button>
      </CardContent>
    </Card>
  )
}
