import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently in the viewport's active band.
 * Used to highlight the current item in the navigation.
 */
export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState<string>(ids[0] ?? '')

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry closest to the top of the viewport that is intersecting.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
          return
        }
        // Fallback: the section whose top is just above the offset line.
        const current = sections
          .filter((el) => el.getBoundingClientRect().top <= offset)
          .pop()
        if (current) setActiveId(current.id)
      },
      { rootMargin: `-${offset}px 0px -55% 0px`, threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [ids, offset])

  return activeId
}
