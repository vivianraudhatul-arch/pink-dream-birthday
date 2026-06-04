'use client'

import { useCallback } from 'react'
import { GalleryPhoto, BirthdayData } from '@/lib/types'
import { useLocalStorage } from './useLocalStorage'

export function useGallery() {
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

  const addPhoto = useCallback(
    (url: string) => {
      const newPhoto: GalleryPhoto = {
        id: Date.now().toString(),
        url,
        uploadedAt: Date.now(),
      }
      setData((prev) => ({
        ...prev,
        photos: [...prev.photos, newPhoto],
      }))
      return newPhoto
    },
    [setData]
  )

  const deletePhoto = useCallback(
    (id: string) => {
      setData((prev) => ({
        ...prev,
        photos: prev.photos.filter((photo) => photo.id !== id),
      }))
    },
    [setData]
  )

  const reorderPhotos = useCallback(
    (newOrder: GalleryPhoto[]) => {
      setData((prev) => ({
        ...prev,
        photos: newOrder,
      }))
    },
    [setData]
  )

  return {
    photos: data.photos,
    addPhoto,
    deletePhoto,
    reorderPhotos,
  }
}
