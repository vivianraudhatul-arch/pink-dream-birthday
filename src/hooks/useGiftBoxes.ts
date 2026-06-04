'use client'

import { useCallback } from 'react'
import { GiftBox, BirthdayData } from '@/lib/types'
import { useLocalStorage } from './useLocalStorage'

export function useGiftBoxes() {
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

  const addGiftBox = useCallback(
    (giftBox: Omit<GiftBox, 'id'>) => {
      const newGiftBox: GiftBox = {
        ...giftBox,
        id: Date.now().toString(),
      }
      setData((prev) => ({
        ...prev,
        giftBoxes: [...prev.giftBoxes, newGiftBox],
      }))
      return newGiftBox
    },
    [setData]
  )

  const updateGiftBox = useCallback(
    (id: string, updates: Partial<GiftBox>) => {
      setData((prev) => ({
        ...prev,
        giftBoxes: prev.giftBoxes.map((box) =>
          box.id === id ? { ...box, ...updates } : box
        ),
      }))
    },
    [setData]
  )

  const deleteGiftBox = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        giftBoxes: prev.giftBoxes.filter((box) => box.id !== id),
      }))
    },
    [setData]
  )

  return {
    giftBoxes: data.giftBoxes,
    addGiftBox,
    updateGiftBox,
    deleteGiftBox,
  }
}
