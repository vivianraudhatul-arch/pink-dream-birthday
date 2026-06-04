'use client'

import { useCallback } from 'react'
import { LoveNote, BirthdayData } from '@/lib/types'
import { useLocalStorage } from './useLocalStorage'

export function useNotes() {
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

  const addNote = useCallback(
    (note: Omit<LoveNote, 'id'>) => {
      const newNote: LoveNote = {
        ...note,
        id: Date.now().toString(),
      }
      setData((prev) => ({
        ...prev,
        notes: [...prev.notes, newNote],
      }))
      return newNote
    },
    [setData]
  )

  const updateNote = useCallback(
    (id: string, updates: Partial<LoveNote>) => {
      setData((prev) => ({
        ...prev,
        notes: prev.notes.map((note) =>
          note.id === id ? { ...note, ...updates } : note
        ),
      }))
    },
    [setData]
  )

  const deleteNote = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        notes: prev.notes.filter((note) => note.id !== id),
      }))
    },
    [setData]
  )

  return {
    notes: data.notes,
    addNote,
    updateNote,
    deleteNote,
  }
}
