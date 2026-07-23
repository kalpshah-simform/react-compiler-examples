import { useRef } from 'react'

/**
 * Mutates a ref during render to count renders for this component instance —
 * the same instrumentation-only escape hatch this repo already uses via
 * `console.log('[render] ...')`. The count is never read by anything other
 * than the debug badge, so it can't feed a stale value into a memoized
 * computation; if React Compiler bails out and skips re-executing this
 * component, the count correctly stays flat, which is the exact signal this
 * demo needs to show.
 */
export function useRenderCount(): number {
  const countRef = useRef(0)
  // eslint-disable-next-line react-hooks/refs -- see comment above; instrumentation-only ref read/write
  countRef.current += 1
  // eslint-disable-next-line react-hooks/refs -- see comment above; instrumentation-only ref read/write
  return countRef.current
}
