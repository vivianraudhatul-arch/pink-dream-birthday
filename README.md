# Pink Dream Birthday 🎂✨

> A premium, interactive birthday website created with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

![Birthday Website](https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80)

## ✨ Features

### 🎉 Core Sections

- **Hero Section** - Animated greeting with floating hearts and sakura petals
- **Photo Gallery** - Drag & drop upload, masonry layout, unlimited photos
- **Timeline** - Create precious memory milestones with images
- **Birthday Messages** - Add unlimited greeting cards
- **Love Notes Wall** - Sticky notes with random rotation
- **Music Player** - Upload and play birthday music
- **Gift Boxes** - Interactive boxes with secret messages
- **Slideshow** - Auto-play memory slideshow with manual controls
- **Theme Customizer** - Customize colors, fonts, and animations
- **Admin Panel** - Easy editor for all content

### 🎨 Design

- Soft pink & pastel color palette
- Elegant, romantic aesthetic
- Mobile-first responsive design
- Smooth 60 FPS animations
- Beautiful typography with Poppins & Dancing Script fonts

### 💾 Data Storage

- Everything stored in browser LocalStorage
- No backend required
- Auto-save functionality
- Data persists between sessions
- All client-side processing

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

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

## 📦 Build & Deploy

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel (Recommended)

The easiest way to deploy:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Done! Your site is live 🎉

### Deploy to Other Platforms

- **Netlify**: Push to GitHub, connect in Netlify dashboard
- **AWS Amplify**: Similar GitHub integration
- **Docker**: Use the included Dockerfile (if available)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Poppins, Dancing Script)
- **Storage**: Browser LocalStorage
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
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
│   ├── types.ts            # TypeScript types
│   ├── constants.ts        # Constants & dummy data
│   └── animations.ts       # Framer Motion variants
└── utils/
```

## 🎨 Customization

### Change Birthday Person's Name

1. Click "Edit" button (top-right)
2. Enter the birthday person's name
3. Changes auto-save

### Customize Theme

1. Click the palette icon (bottom-right)
2. Choose primary color, background color, font, and animation speed
3. Changes apply instantly

### Edit Content

- Add photos via Gallery (drag & drop supported)
- Create timeline entries with year and story
- Write unlimited birthday messages
- Add love notes to the wall
- Upload birthday music
- Create gift boxes with secret messages

## 📱 Browser Support

| Browser | Support | Version |
| --- | --- | --- |
| Chrome | ✅ Full | Latest |
| Firefox | ✅ Full | Latest |
| Safari | ✅ Full | 14+ |
| Edge | ✅ Full | Latest |
| Mobile | ✅ Full | All modern |

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Reduced motion preferences respected
- Screen reader friendly

## 📊 Performance

- ⚡ 60 FPS animations
- 📱 Mobile-optimized (320px+)
- 🚀 Instant page loads
- 💾 LocalStorage for zero-latency
- 🎯 Lighthouse optimized

## 🔒 Privacy

- 100% client-side processing
- No data sent to servers
- No external APIs required
- No tracking or analytics
- Your data stays in your browser

## 📝 License

MIT License - feel free to use for any celebration!

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For issues, questions, or suggestions:

- Open a GitHub issue
- Check the [DEVELOPMENT.md](DEVELOPMENT.md) guide
- Review component documentation

## 🎉 Made with ❤️

Created to make birthday celebrations more special and interactive.

---

**Ready to create magic?** [Get Started Now](https://github.com/vivianraudhatul-arch/pink-dream-birthday)
