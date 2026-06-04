# Pink Dream Birthday - Development Guide

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with fonts
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/
│   ├── Hero.tsx             # Hero section with animation
│   ├── Gallery.tsx          # Photo gallery with drag & drop
│   ├── Timeline.tsx         # Timeline with images
│   ├── Messages.tsx         # Birthday messages
│   ├── NotesWall.tsx        # Sticky notes wall
│   ├── MusicPlayer.tsx      # Audio player
│   ├── GiftBoxes.tsx        # Interactive gift boxes
│   ├── Slideshow.tsx        # Photo slideshow
│   ├── ThemeCustomizer.tsx  # Theme settings
│   ├── AdminPanel.tsx       # Admin editor
│   ├── FloatingHearts.tsx   # Background animation
│   └── SakuraEffect.tsx      # Background animation
├── hooks/
│   ├── useLocalStorage.ts   # LocalStorage management
│   ├── useTheme.ts          # Theme management
│   ├── useGallery.ts        # Gallery state
│   ├── useTimeline.ts       # Timeline state
│   ├── useMessages.ts       # Messages state
│   ├── useNotes.ts          # Notes state
│   └── useGiftBoxes.ts      # Gift boxes state
├── lib/
│   ├── types.ts             # TypeScript types
│   ├── constants.ts         # Constants and dummy data
│   └── animations.ts        # Framer Motion variants
└── utils/
    └── (utility functions)
```

## Features

### Hero Section
- Beautiful gradient background
- Floating hearts and sakura petals
- Smooth scroll to gallery

### Gallery
- Upload photos via click or drag & drop
- Masonry grid layout
- Delete photos
- Image validation (format & size)

### Timeline
- Create entries with year, title, description, and image
- Edit and delete entries
- Vertical timeline layout
- Scroll animations

### Messages
- Add unlimited birthday cards
- Edit and delete messages
- Card layout with hover effects

### Notes Wall
- Sticky note style elements
- Random rotation for each note
- Add, edit, delete notes
- Visual wall display

### Music Player
- Upload audio files
- Play/Pause controls
- Volume control
- Progress bar
- Time display

### Gift Boxes
- Create gift boxes with images
- Secret messages that reveal on click
- Edit and delete functionality
- Hover effects

### Slideshow
- Auto-play slideshow of all photos
- Manual navigation
- Progress indicators
- Combines photos and timeline images

### Theme Customizer
- Change primary color from palette
- Change background color
- Switch font styles (Poppins/Dancing Script)
- Adjust animation speed
- Floating button in bottom-right

### Admin Panel
- Edit birthday person's name
- Edit subtitle
- View content statistics
- Easy access via Edit button

## Data Storage

All data is stored in browser's LocalStorage under the key `birthdayData`:

```typescript
{
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
```

## Customization

### Colors
Edit `src/lib/constants.ts` to change the color palette:

```typescript
export const COLOR_PALETTE = [
  '#FFF0F5',
  '#FFD6E7',
  // ... more colors
]
```

### Dummy Data
Edit `DUMMY_DATA` in `src/lib/constants.ts` to change initial content.

### Fonts
Fonts are loaded in `src/app/layout.tsx` from Google Fonts.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Click "Deploy"

That's it! Your site will be live in seconds.

### Environment Variables
No environment variables needed - this project works entirely client-side.

## Performance Tips

1. **Image Optimization**: Compress images before uploading for faster loading
2. **Music File Size**: Keep audio files under 10MB for best performance
3. **Browser Cache**: LocalStorage persists data between sessions

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 14+)
- Mobile browsers: Full responsive support

## Accessibility

- Semantic HTML
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Reduced motion support

## Troubleshooting

### Images not saving?
- Check browser's LocalStorage limit (usually 5-10MB)
- Use smaller image files
- Clear browser cache if having issues

### Music not playing?
- Ensure file is in supported audio format (MP3, WAV, OGG)
- Check browser console for errors
- Try a different audio file

### Data lost after refresh?
- Check if LocalStorage is enabled in browser
- Check browser privacy settings
- Data should persist automatically

## License

MIT - Feel free to use this for any celebration!

## Support

For issues or suggestions, open a GitHub issue in the repository.
