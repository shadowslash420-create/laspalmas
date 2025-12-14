# Las Palmas Restaurant Website

## Overview
A luxurious, modern 3D restaurant website for Las Palmas, a fine dining establishment located in Oran, Algeria. The website features elegant animations, a dark theme with gold accents, and a Mediterranean-inspired aesthetic.

## Tech Stack
- **Framework**: React 18 with Vite 5
- **Styling**: Tailwind CSS
- **Animations**: anime.js
- **Build Tool**: Vite

## Project Structure
```
/
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global styles + Tailwind
│   ├── components/        # React components
│   │   ├── Hero.jsx       # Hero section with animated title
│   │   ├── About.jsx      # About the restaurant
│   │   ├── Menu.jsx       # Menu categories and items
│   │   ├── Atmosphere.jsx # Experience section
│   │   ├── Reservation.jsx # Reservation CTA
│   │   └── Footer.jsx     # Location map and footer
│   └── animations/        # Animation utilities
│       └── useAnime.js    # Reusable anime.js hooks
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
└── package.json           # Dependencies
```

## Running the Project
- **Development**: `npm run dev` (runs on port 5000)
- **Build**: `npm run build` (outputs to `dist/`)
- **Preview**: `npm run preview`

## Features
- Animated hero section with staggered letter animation
- Section reveal animations on scroll
- 3D card tilt effects on hover
- Ambient floating animations
- Responsive design (mobile-first)
- Google Maps integration
- WhatsApp contact button

## Restaurant Details
- **Name**: Las Palmas
- **Location**: P922+7XX, Rue Patrice Lumumba, Oran, Algeria
- **Cuisine**: Mediterranean-Algerian fine dining
