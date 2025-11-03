# Nyanja ↔ Bemba Translator

A modern, production-ready web application for translating between Nyanja and Bemba languages. Built with React, Vite, Tailwind CSS, and shadcn/ui components.

## Features

✨ **Instant Translation** - Real-time translation as you type  
🔄 **Bidirectional** - Translate between Nyanja and Bemba in both directions  
💾 **Search History** - Automatically saves your recent translations  
🌙 **Dark Mode** - Seamless light/dark theme switching  
📱 **Fully Responsive** - Works perfectly on all devices  
🎨 **Modern UI** - Beautiful, clean design with smooth animations  
🔊 **Text-to-Speech** - Hear pronunciations (browser-supported)  
📋 **Copy to Clipboard** - Easy sharing of translations  
⚡ **Fuzzy Matching** - Find similar words even with typos  

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **UI Components**: Custom shadcn/ui inspired components
- **State Management**: Zustand with localStorage persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Typography**: Inter font from @fontsource

## Project Structure

```
src/
├── assets/                 # Static assets
├── components/
│   ├── ui/                 # shadcn/ui components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   └── Select.jsx
│   ├── TranslatorCard.jsx  # Main translator component
│   ├── ThemeToggle.jsx     # Dark mode toggle
│   ├── LanguageSwap.jsx    # Language swap animation
│   └── RecentSearches.jsx  # Recent searches display
├── data/
│   └── translations.json   # Nyanja-Bemba-English dictionary
├── lib/
│   ├── search.js           # Search and fuzzy matching utilities
│   └── utils.js            # General utility functions
├── store/
│   └── useTranslatorStore.js # Zustand state management
├── App.jsx                 # Main app component
├── main.jsx                # React DOM entry point
└── index.css               # Global styles & Tailwind directives
```

## Installation

### Prerequisites
- Node.js 16+ and npm/yarn/pnpm

### Setup

1. **Clone or download the project**
   ```bash
   cd Nyanja_Translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## Usage

### Basic Translation
1. Select source language (Nyanja or Bemba)
2. Type a word or phrase in the input field
3. Translation appears instantly
4. Click "Copy" to copy the translation or "Speak" to hear it

### Swap Languages
Click the swap button (↔) to instantly reverse the translation direction

### Dark Mode
Toggle between light and dark themes using the moon/sun icon in the header

### View Recent Searches
Recent translations are automatically saved and displayed below the translator card

### Clear History
Click "Clear All" in the Recent Searches section to remove all saved translations

## Features in Detail

### Fuzzy Matching
The translator uses Levenshtein distance algorithm to find similar words even if you make typos or slight spelling variations.

### Local Storage
- Theme preference (light/dark)
- Recent searches (up to 20 items)
- All data is stored locally in your browser

### State Management
Zustand store manages:
- Language selection
- Input/output text
- Loading states
- Error messages
- Theme preference
- Recent searches

### Animations
- Smooth page transitions
- Language swap rotation
- Loading spinner
- Result fade-in effects
- Subtle background animations

## API Reference

### Translation Search
```javascript
import { getTranslation, fuzzySearch } from './lib/search';

// Direct translation
const result = getTranslation('love', translations, 'ny', 'bem');

// Fuzzy search
const results = fuzzySearch('chikondi', translations, 0.6);
```

### Store Usage
```javascript
import useTranslatorStore from './store/useTranslatorStore';

const {
  sourceLanguage,
  targetLanguage,
  inputText,
  translatedText,
  translate,
  swapLanguages,
  setIsDarkMode,
} = useTranslatorStore();
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dictionary

The translation dictionary (`src/data/translations.json`) contains:
- Nyanja words and phrases
- Corresponding Bemba translations
- English meanings for reference
- 300+ common words and phrases

## Performance Optimizations

- Code splitting with Vite
- Lazy component loading
- Debounced search input
- Optimized re-renders with React
- CSS-in-JS with Tailwind (no runtime)
- Minimal bundle size (~150KB gzipped)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast in both themes
- Focus visible states
- Screen reader friendly

## Future Enhancements

- [ ] Add more languages (Zulu, Xhosa, etc.)
- [ ] Pronunciation guides with IPA
- [ ] Batch translation support
- [ ] Translation API integration
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Export translation lists
- [ ] Community contributions for dictionary

## Contributing

Contributions are welcome! To improve the translator:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

Areas for contribution:
- Adding more translations to the dictionary
- Improving fuzzy matching algorithm
- Adding new languages
- UI/UX improvements
- Performance optimizations

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

## Acknowledgments

- Built with [React](https://react.dev)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://www.framer.com/motion)
- Icons by [Lucide](https://lucide.dev)
- State managed with [Zustand](https://zustand-demo.vercel.app)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Environment Variables

Create `.env` file if needed:
```
VITE_APP_NAME=Translate
VITE_APP_VERSION=1.0.0
```

## Version

Current version: 1.0.0

---

Made with ❤️ by the Translate Team
