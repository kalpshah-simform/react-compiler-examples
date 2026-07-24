import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { FileIcon, MoreVerticalIcon } from 'lucide-react'
import { RenderCountBadge } from '@/components/render-count-badge'
import { useRenderCount } from '@/hooks/use-render-count'

export function FileManagerBlock() {
  const [files, setFiles] = useState(['Invoice.pdf', 'Roadmap.md', 'Logo.png'])
  const [renameTarget, setRenameTarget] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null)
  const renderCount = useRenderCount()

  console.log('[render] FileManagerBlock', { files, renameTarget, deleteTarget })

  function openRename(file: string) {
    setRenameTarget(file)
    setRenameValue(file)
  }

  function confirmRename() {
    if (!renameTarget) return
    setFiles((current) =>
      current.map((file) => (file === renameTarget ? renameValue : file)),
    )
    setRenameTarget(null)
  }

  function confirmDelete() {
    if (!deleteTarget) return
    setFiles((current) => current.filter((file) => file !== deleteTarget))
    setDeleteTarget(null)
  }

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between gap-2">
        <CardTitle>File Manager</CardTitle>
        <RenderCountBadge count={renderCount} />
      </CardHeader>
      <CardContent className="grid gap-1">
        {files.map((file) => (
          <ContextMenu key={file}>
            <ContextMenuTrigger asChild>
              <div className="flex items-center justify-between gap-2 rounded-md border px-3 py-2">
                <span className="flex items-center gap-2 text-sm">
                  <FileIcon className="size-4 text-muted-foreground" />
                  {file}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label={`Actions for ${file}`}>
                      <MoreVerticalIcon className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => openRename(file)}>
                      Rename
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => setDeleteTarget(file)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onClick={() => openRename(file)}>Rename</ContextMenuItem>
              <ContextMenuItem
                variant="destructive"
                onClick={() => setDeleteTarget(file)}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground">No files left.</p>
        ) : null}

        <Dialog
          open={renameTarget !== null}
          onOpenChange={(open) => !open && setRenameTarget(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Rename file</DialogTitle>
            </DialogHeader>
            <Input
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
            />
            <DialogFooter>
              <Button onClick={confirmRename}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={deleteTarget !== null}
          onOpenChange={(open) => !open && setDeleteTarget(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete {deleteTarget}?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  )
}
