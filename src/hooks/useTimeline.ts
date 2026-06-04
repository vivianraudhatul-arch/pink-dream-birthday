'use client'

import { useCallback } from 'react'
import { TimelineEntry, BirthdayData } from '@/lib/types'
import { useLocalStorage } from './useLocalStorage'

export function useTimeline() {
  const [data, setData] = useLocalStorage<BirthdayData>('birthdayData', {
    recipientName: 'Birthday Person',
    subtitle: 'Celebrating you!',
    photos: [],
    timeline: [],
    messages: [],
    notes: [],
    giftBoxes: [],
    theme: {
      primaryColor: '#FB6F92',
      backgroundColor: '#FFF0F5',
      fontStyle: 'poppins',
      animationSpeed: 1,
    },
  })

  const addEntry = useCallback(
    (entry: Omit<TimelineEntry, 'id'>) => {
      const newEntry: TimelineEntry = {
        ...entry,
        id: Date.now().toString(),
      }
      setData((prev) => ({
        ...prev,
        timeline: [...prev.timeline, newEntry],
      }))
      return newEntry
    },
    [setData]
  )

  const updateEntry = useCallback(
    (id: string, updates: Partial<TimelineEntry>) => {
      setData((prev) => ({
        ...prev,
        timeline: prev.timeline.map((entry) =>
          entry.id === id ? { ...entry, ...updates } : entry
        ),
      }))
    },
    [setData]
  )

  const deleteEntry = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        timeline: prev.timeline.filter((entry) => entry.id !== id),
      }))
    },
    [setData]
  )

  return {
    timeline: data.timeline,
    addEntry,
    updateEntry,
    deleteEntry,
  }
}
