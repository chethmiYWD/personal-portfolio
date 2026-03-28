import { useEffect, useState } from 'react'

export function useScrollSpy(ids = [], offset = 72) {
  const [active, setActive] = useState(ids?.[0] || '')

  useEffect(() => {
    if (!ids?.length) return
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) setActive(visible[0].target.id)
      },
      {
        root: null,
        threshold: [0.12, 0.2, 0.35],
        rootMargin: `-${offset + 8}px 0px -55% 0px`,
      },
    )

    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [ids.join('|'), offset])

  return active
}
