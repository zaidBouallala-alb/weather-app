# 🌤️ Weather App

A modern, fully responsive weather application built with **React 18** and a **glassmorphism design system**. Features a real-time city search, current weather, 5-day forecast, and a smooth **dark / light theme toggle** with Framer Motion micro-animations.

---

## ✨ Features

- 🔍 **City search** with autocomplete powered by Geoapify
- 🌡️ **Current weather** — temperature, humidity, wind, pressure, sunrise
- 📅 **5-day forecast** with staggered entrance animations
- 🌙 **Dark / Light theme** with smooth crossfade transitions
- 💀 **Skeleton loading** with shimmer placeholders
- 📱 **Fully responsive** — mobile, tablet, and desktop
- ⚠️ **Error boundary** + user-friendly error states
- ♿ **Keyboard navigable** with visible focus rings

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (Create React App) |
| State | Redux Toolkit |
| UI Components | MUI v5 (Material UI) |
| Animations | Framer Motion |
| Styling | SCSS Modules + CSS Variables |
| Weather API | OpenWeatherMap |
| Geocoding API | Geoapify |
| SEO | react-helmet-async |
| Deployment | GitHub Pages (`gh-pages`) |

---

## 📁 Project Structure

```
weather-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ErrorBoundary/
│   │   ├── Forecast/          # 5-day forecast cards
│   │   ├── SearchBar/         # Autocomplete search
│   │   ├── SEO/               # Meta tags
│   │   ├── Svgs/              # Weather & metric icons
│   │   ├── ThemeToggle/       # Dark/light switcher
│   │   └── Weather/           # Current weather card
│   ├── features/
│   │   └── weather/
│   │       └── WeatherSlice.js  # Redux state
│   ├── services/
│   │   ├── geocodingApi.js    # Geoapify calls
│   │   └── weatherApi.js      # OpenWeatherMap calls
│   ├── utils/
│   │   └── dateFormat.js      # Intl.DateTimeFormat helpers
│   ├── App.jsx
│   ├── App.module.scss
│   ├── index.js
│   └── style.scss             # Global design tokens & themes
├── .env                        # API keys (not committed)
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v16+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/zaidBouallala-alb/weather-app.git
cd weather-app

# 2. Install dependencies
npm install

# 3. Create .env file
cp .env.example .env

# 4. Start the dev server
npm start
```

---

## 🔑 API Setup

This app requires two free API keys:

### OpenWeatherMap (weather data)
1. Sign up at [openweathermap.org](https://openweathermap.org/)
2. Get your API key from the dashboard

### Geoapify (city autocomplete)
1. Sign up at [geoapify.com](https://www.geoapify.com/)
2. Create a project and get your API key

### `.env` file
```env
REACT_APP_WEATHER_API_KEY=your_openweathermap_key_here
REACT_APP_GEO_API_KEY=your_geoapify_key_here
```

> ⚠️ Never commit your `.env` file. It is already in `.gitignore`.

---

## 🎨 Theme System

The app ships with a **Soft Neutral Light Mode** and a **Deep Blue Dark Mode**, implemented via CSS custom properties on `[data-theme]`:

| Token | Dark | Light |
|---|---|---|
| `--bg-start` | `#0B1120` | `#B8C4D0` |
| `--surface` | `rgba(255,255,255,0.08)` | `rgba(248,246,243,0.88)` |
| `--text-primary` | `#F1F5F9` | `#1A1A2E` |
| `--metric-icon` | `#94A3B8` | `#2D3748` |

Theme is stored in Redux and persisted to `localStorage`.

---

## 📦 Scripts

```bash
npm start        # Start development server (port 3000)
npm run build    # Production build
npm test         # Run tests
npm run deploy   # Deploy to GitHub Pages
```

---

## 📄 License

MIT — feel free to use and adapt.
