# Pink Dream Birthday 🎂✨

A premium, interactive birthday website built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

✨ **Hero Section** - Beautiful gradient background with floating hearts and sakura petals animation
📸 **Dynamic Gallery** - Upload, manage, and organize photos with drag & drop
💌 **Birthday Messages** - Create unlimited birthday cards and messages
⏰ **Timeline Memories** - Create a timeline of precious moments
📝 **Love Notes Wall** - Sticky notes wall with random rotation
🎵 **Music Player** - Upload and play birthday music
🎁 **Gift Boxes** - Interactive gift boxes with secret messages
🎬 **Slideshow** - Auto-play slideshow of all memories
🎨 **Theme Customizer** - Customize colors, fonts, and animations
✏️ **Admin Mode** - Easy-to-use editor for all content

## Tech Stack

- **Next.js 15** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **LocalStorage** - Data persistence

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vivianraudhatul-arch/pink-dream-birthday.git
cd pink-dream-birthday

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy with default settings

```bash
# Or deploy from command line
npm install -g vercel
vercel
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Hero.tsx
│   ├── Gallery.tsx
│   ├── Timeline.tsx
│   ├── Messages.tsx
│   ├── NotesWall.tsx
│   ├── MusicPlayer.tsx
│   ├── GiftBoxes.tsx
│   ├── Slideshow.tsx
│   ├── ThemeCustomizer.tsx
│   ├── AdminPanel.tsx
│   ├── FloatingHearts.tsx
│   └── SakuraEffect.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useTheme.ts
│   ├── useGallery.ts
│   ├── useTimeline.ts
│   ├── useMessages.ts
│   ├── useNotes.ts
│   └── useGiftBoxes.ts
├── lib/
│   ├── types.ts
│   └── constants.ts
└── utils/
    └── animations.ts
```

## Usage

### Admin Mode

Click the "Edit Website" button in the top-right corner to enter admin mode. From there you can:

- Edit birthday person's name and subtitle
- Upload and manage photos
- Create timeline entries
- Add birthday messages
- Create love notes
- Create gift boxes

All changes are automatically saved to LocalStorage.

### Customization

Use the Theme Customizer (floating button in bottom-right) to:

- Change primary color
- Change background color
- Switch font styles
- Adjust animation speed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- ⚡ Optimized for 60 FPS animations
- 📱 Mobile-first responsive design
- 🚀 Instant loading with no backend
- 💾 Local storage for zero latency

## License

MIT

## Author

Created with ❤️ for special celebrations
