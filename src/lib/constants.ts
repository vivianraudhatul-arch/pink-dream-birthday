export const DEFAULT_THEME = {
  primaryColor: '#FB6F92',
  backgroundColor: '#FFF0F5',
  fontStyle: 'poppins' as const,
  animationSpeed: 1,
}

export const COLOR_PALETTE = [
  '#FFF0F5',
  '#FFD6E7',
  '#FFC2D9',
  '#FFB3C6',
  '#FF8FAB',
  '#FB6F92',
]

export const DUMMY_DATA = {
  recipientName: 'Sarah',
  subtitle: 'Wishing you a day filled with love, laughter, and joy!',
  photos: [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=500&fit=crop',
      uploadedAt: Date.now() - 86400000,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop',
      uploadedAt: Date.now() - 172800000,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1516534775068-bb57e5de3ee1?w=500&h=500&fit=crop',
      uploadedAt: Date.now() - 259200000,
    },
  ],
  timeline: [
    {
      id: '1',
      year: '2020',
      title: 'Our First Meeting',
      description: 'The day we met and our journey began',
      image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop',
    },
    {
      id: '2',
      year: '2021',
      title: 'Adventure Time',
      description: 'Exploring new places and making memories together',
      image: 'https://images.unsplash.com/photo-1504674900969-f2df05b3252d?w=400&h=400&fit=crop',
    },
    {
      id: '3',
      year: '2023',
      title: 'Special Moments',
      description: 'Creating unforgettable memories',
      image: 'https://images.unsplash.com/photo-1516534775068-bb57e5de3ee1?w=400&h=400&fit=crop',
    },
  ],
  messages: [
    {
      id: '1',
      title: 'Happy Birthday! 🎉',
      message: 'Wishing you a day filled with love, laughter, and all your favorite things!',
    },
    {
      id: '2',
      title: 'To a Special Person',
      message: 'May this year bring you happiness, success, and endless possibilities!',
    },
  ],
  notes: [
    {
      id: '1',
      content: 'You are amazing!',
      rotation: -5,
      x: 10,
      y: 10,
    },
    {
      id: '2',
      content: 'Happy Birthday!',
      rotation: 8,
      x: 60,
      y: 20,
    },
    {
      id: '3',
      content: 'Love you! 💕',
      rotation: -3,
      x: 35,
      y: 60,
    },
  ],
  giftBoxes: [
    {
      id: '1',
      title: '💝 Special Gift',
      image: 'https://images.unsplash.com/photo-1531142522115-1d8f32842f85?w=400&h=400&fit=crop',
      content: 'You deserve all the happiness in the world! Thank you for being you.',
    },
  ],
}
