'use client'

import { useCallback } from 'react'
import { BirthdayMessage, BirthdayData } from '@/lib/types'
import { useLocalStorage } from './useLocalStorage'

export function useMessages() {
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

  const addMessage = useCallback(
    (message: Omit<BirthdayMessage, 'id'>) => {
      const newMessage: BirthdayMessage = {
        ...message,
        id: Date.now().toString(),
      }
      setData((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }))
      return newMessage
    },
    [setData]
  )

  const updateMessage = useCallback(
    (id: string, updates: Partial<BirthdayMessage>) => {
      setData((prev) => ({
        ...prev,
        messages: prev.messages.map((msg) =>
          msg.id === id ? { ...msg, ...updates } : msg
        ),
      }))
    },
    [setData]
  )

  const deleteMessage = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        messages: prev.messages.filter((msg) => msg.id !== id),
      }))
    },
    [setData]
  )

  return {
    messages: data.messages,
    addMessage,
    updateMessage,
    deleteMessage,
  }
}
