import { useState, useEffect } from 'react'
import { projects } from '../data/projects'

const KEY = 'quest-visited'

function getVisited(): Set<string> {
  try {
    const saved = localStorage.getItem(KEY)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  } catch {
    return new Set()
  }
}

export function markProjectVisited(slug: string) {
  const visited = getVisited()
  const isNew = !visited.has(slug)
  visited.add(slug)
  localStorage.setItem(KEY, JSON.stringify([...visited]))
  const allDone = projects.every(p => visited.has(p.slug))
  window.dispatchEvent(new CustomEvent('quest-update', { detail: { slug, isNew, allDone } }))
  return { isNew, allDone }
}

export type QuestState = 'completed' | 'available' | 'locked'

export function useQuestSystem() {
  const [visited, setVisited] = useState<Set<string>>(getVisited)

  useEffect(() => {
    function onUpdate() { setVisited(getVisited()) }
    window.addEventListener('quest-update', onUpdate)
    return () => window.removeEventListener('quest-update', onUpdate)
  }, [])

  function projectState(slug: string): QuestState {
    if (visited.has(slug)) return 'completed'
    return 'available'
  }

  const completedCount = projects.filter(p => visited.has(p.slug)).length

  return { visited, projectState, completedCount, total: projects.length }
}
