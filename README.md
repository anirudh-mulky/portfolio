# Premium Portfolio Website

An award-winning, Awwwards-level freelance portfolio website inspired by the motion quality and luxury aesthetic of premium creative studios.

## Features

- **3D Hero Background** - Animated WebGL scene with Three.js
- **GSAP Animations** - Smooth scroll-triggered reveals and micro-interactions
- **Custom Magnetic Cursor** - Premium cursor interactions on interactive elements
- **Smooth Scrolling** - Lenis-powered smooth scroll with inertia
- **Responsive Design** - Fully responsive, mobile-polished experience
- **Premium Typography** - Modern sans-serif with generous spacing
- **Dark Cinematic Aesthetic** - Minimal, luxury-first design

## Tech Stack

- React 18
- TypeScript
- Vite
- Three.js / React Three Fiber
- GSAP + ScrollTrigger
- Lenis (Smooth Scroll)
- Modern CSS

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

## Project Structure

```
src/
├── components/
│   ├── Hero.tsx          # Hero section with 3D background
│   ├── About.tsx          # About section
│   ├── Work.tsx           # Projects showcase
│   ├── Services.tsx       # Services list
│   ├── Contact.tsx        # Contact CTA
│   └── CustomCursor.tsx   # Magnetic cursor component
├── App.tsx                # Main app component
├── main.tsx               # Entry point
└── index.css              # Global styles
```

## Customization

All content is easily customizable in the component files:
- Update project data in `Work.tsx`
- Modify services in `Services.tsx`
- Change contact email in `Contact.tsx`
- Adjust colors in `index.css` CSS variables

## Performance

- Lazy-loaded heavy assets
- Optimized GSAP animations
- 60fps performance targets
- Clean, modular code structure

## License

MIT


