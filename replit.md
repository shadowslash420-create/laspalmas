# Las Palmas Restaurant Website

## Overview
A cinematic, luxury digital experience for Las Palmas, a high-end restaurant in Oran, Algeria. The website is designed to feel like a film opening - calm, confident, and expensive. Every interaction is intentional, slow, and premium.

## Tech Stack
- **Framework**: React 18 with Vite 5
- **Styling**: Tailwind CSS
- **Animations**: anime.js
- **Typography**: Cormorant Garamond (serif) + Montserrat (sans-serif)

## Project Structure
```
/
├── src/
│   ├── main.jsx              # React entry point
│   ├── App.jsx               # Main app with OwnerContext
│   ├── index.css             # Global styles + custom animations
│   ├── components/
│   │   ├── CinematicIntro.jsx    # Opening sequence with Enter Experience
│   │   ├── Hero.jsx              # Hero section with animated title
│   │   ├── About.jsx             # Restaurant story section
│   │   ├── Menu.jsx              # Gallery-style menu with hover reveals
│   │   ├── Atmosphere.jsx        # Experience cards section
│   │   ├── Reservation.jsx       # Multi-step ritual reservation form
│   │   ├── Footer.jsx            # Location and social links
│   │   ├── AnimatedBackground.jsx # Ambient glow orbs and grid
│   │   ├── OwnerMode.jsx         # Hidden owner panel for editing
│   │   ├── SketchfabEmbed.jsx    # 3D model integration component
│   │   ├── Scene3D.jsx           # Scroll-reactive 3D scene with transforms
│   │   ├── AmbientLighting.jsx   # Dynamic lighting overlay based on scroll
│   │   ├── ParallaxSection.jsx   # Scroll-based parallax wrapper
│   │   └── ScrollIndicator.jsx   # Animated scroll indicator on hero
│   ├── hooks/
│   │   └── useScrollProgress.jsx # Scroll tracking context and hook
│   └── animations/
│       └── useAnime.js           # Reusable anime.js hooks
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

## Running the Project
- **Development**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build`
- **Preview**: `npm run preview`

## Key Features

### Cinematic Opening Sequence
- Black screen with subtle grain texture
- Letter-by-letter title reveal animation
- "Enter Experience" button with elegant hover state
- Vignette overlay for depth

### Architectural Scrolling
- Sections with subtle parallax depth
- Text moves slower than visuals
- No harsh snapping, everything floats
- Elegant scroll indicator with gold styling and gentle animations
- Indicator fades out as user scrolls down

### 3D as a Living Character
- Fixed 3D scene responds to scroll with subtle transforms
- Perspective shifts, gentle rotation, and scale changes
- Warm lighting at top deepens as users progress
- Section-aware lighting adapts to each area (hero, about, menu, etc.)
- Supports the story without dominating the experience

### Menu as Gallery
- Each dish introduced with hover reveal
- Story, ingredients, and origin shown on hover
- Prices hidden initially, revealed after delay
- Category filtering with elegant transitions

### Owner Mode
- Hidden control panel (type "owner" to activate)
- Edit hero title and subtitle
- Modify about text
- Update menu items (name, description, price, category)
- Change Sketchfab 3D model ID
- No backend required, frontend controls only

### Luxury Micro-Interactions
- Buttons warm subtly on hover
- Soft scale shift on click
- Film grain overlay throughout
- Ambient glow orbs that pulse slowly
- Motion pauses when user stops scrolling

### Reservation Ritual
- 3-step minimal form
- Smooth step transitions with progress dots
- Ceremonial confirmation screen
- User feels chosen, not processed

## Design System
- **Colors**: Gold (#d4a012), Sand (#f5f0e1), Dark (#0a0a0a)
- **Typography**: Serif for emotion, sans-serif for clarity
- **Spacing**: Large breathing room, never rushed
- **Animations**: easeOutCubic for reveals, easeInOutSine for ambient

## Restaurant Details
- **Name**: Las Palmas
- **Location**: P922+7XX, Rue Patrice Lumumba, Oran, Algeria
- **Cuisine**: Mediterranean-Algerian fine dining
- **Established**: 2020

## User Preferences
- Luxury aesthetic with restrained animations
- Mobile-responsive design
- Accessibility: prefers-reduced-motion support
