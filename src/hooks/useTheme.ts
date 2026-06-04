'use client'

import { useCallback } from 'react'
import { ThemeConfig, BirthdayData } from '@/lib/types'
import { DEFAULT_THEME } from '@/lib/constants'
import { useLocalStorage } from './useLocalStorage'

export function useTheme() {
  const [data, setData, isLoading] = useLocalStorage<BirthdayData>('birthdayData', {
    recipientName: 'Birthday Person',
    subtitle: 'Celebrating you!',
    photos: [],
    timeline: [],
    messages: [],
    notes: [],
    giftBoxes: [],
    theme: DEFAULT_THEME,
  })

  const updateTheme = useCallback((theme: Partial<ThemeConfig>) => {
    setData((prev) => ({
      ...prev,
      theme: {
        ...prev.theme,
        ...theme,
      },
    }))
  }, [setData])

  const resetTheme = useCallback(() => {
    setData((prev) => ({
      ...prev,
      theme: DEFAULT_THEME,
    }))
  }, [setData])

  return {
    theme: data.theme,
    updateTheme,
    resetTheme,
    isLoading,
  }
}
