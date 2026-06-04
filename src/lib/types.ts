export interface GalleryPhoto {
  id: string
  url: string
  uploadedAt: number
}

export interface TimelineEntry {
  id: string
  year: string
  title: string
  description: string
  image: string
}

export interface BirthdayMessage {
  id: string
  title: string
  message: string
}

export interface LoveNote {
  id: string
  content: string
  rotation: number
  x: number
  y: number
}

export interface GiftBox {
  id: string
  title: string
  image: string
  content: string
}

export interface ThemeConfig {
  primaryColor: string
  backgroundColor: string
  fontStyle: 'poppins' | 'dancing'
  animationSpeed: number
}

export interface BirthdayData {
  recipientName: string
  subtitle: string
  photos: GalleryPhoto[]
  timeline: TimelineEntry[]
  messages: BirthdayMessage[]
  notes: LoveNote[]
  giftBoxes: GiftBox[]
  theme: ThemeConfig
  musicUrl?: string
}
