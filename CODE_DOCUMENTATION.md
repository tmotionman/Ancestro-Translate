# Code Documentation

## Overview

This document provides detailed documentation of the Nyanja ↔ Bemba Translator codebase.

## Module Reference

### Store Module (`src/store/useTranslatorStore.js`)

**Description**: Central state management using Zustand with localStorage persistence.

**Key State Variables**:
- `sourceLanguage` - Current source language ('ny' or 'bem')
- `targetLanguage` - Current target language ('ny' or 'bem')
- `inputText` - Current user input
- `translatedText` - Current translation result
- `isLoading` - Loading indicator
- `error` - Error message if any
- `recentSearches` - Array of recent translations
- `isDarkMode` - Theme preference
- `translations` - Full translation dictionary

**Methods**:
- `setSourceLanguage(lang)` - Set source language
- `setTargetLanguage(lang)` - Set target language
- `setInputText(text)` - Update input field
- `translate()` - Perform translation lookup
- `swapLanguages()` - Swap source and target
- `clearInput()` - Reset input and output
- `toggleTheme()` - Toggle dark mode
- `initializeTheme()` - Load theme from localStorage

**Usage Example**:
```javascript
const { sourceLanguage, translate } = useTranslatorStore();
// Use the state and actions
translate();
```

### Search Module (`src/lib/search.js`)

**Description**: Translation search and fuzzy matching utilities.

**Functions**:

#### `levenshteinDistance(str1, str2)`
Calculates the Levenshtein distance between two strings.
- **Parameters**: Two strings to compare
- **Returns**: Number representing edit distance
- **Complexity**: O(m*n) where m and n are string lengths

#### `fuzzySearch(query, items, threshold = 0.6)`
Performs fuzzy search on translation items.
- **Parameters**:
  - `query`: User input string
  - `items`: Array of translation objects
  - `threshold`: Similarity threshold (0-1)
- **Returns**: Array of matching items sorted by similarity
- **Algorithm**: Uses Levenshtein distance and similarity score

#### `getTranslation(query, translations, sourceField, targetField)`
Main translation lookup function.
- **Parameters**:
  - `query`: Word to translate
  - `translations`: Translation database
  - `sourceField`: Source language field ('ny' or 'bem')
  - `targetField`: Target language field ('ny' or 'bem')
- **Returns**: Translation object with confidence score
- **Process**:
  1. Try exact match (fastest)
  2. Fall back to fuzzy match if needed
  3. Return null if not found

#### `saveRecentSearch(word, translation)`
Persists search to localStorage.
- **Parameters**: Word and its translation
- **Side Effect**: Updates localStorage with max 20 items
- **Error Handling**: Silently fails if localStorage unavailable

### Utils Module (`src/lib/utils.js`)

**Functions**:

#### `copyToClipboard(text)`
Asynchronous clipboard copy.
- **Returns**: Promise<boolean>
- **Browser API**: Uses Clipboard API with fallback

#### `speakText(text, language)`
Text-to-speech functionality.
- **Parameters**:
  - `text`: Text to speak
  - `language`: Language code
- **Browser API**: Uses Web Speech API
- **Limitations**: Browser-dependent, not all languages supported

#### `debounce(func, delay = 300)`
Debounce decorator for functions.
- **Use Case**: Delay execution of search on input change
- **Parameters**:
  - `func`: Function to debounce
  - `delay`: Milliseconds to wait
- **Returns**: Debounced function

#### `throttle(func, limit = 300)`
Throttle decorator for functions.
- **Use Case**: Limit function call frequency
- **Returns**: Throttled function

### UI Components

#### Button Component (`src/components/ui/Button.jsx`)
Customizable button component.

**Props**:
- `variant`: 'solid' | 'outline' | 'ghost' | 'secondary'
- `size`: 'sm' | 'md' | 'lg'
- `disabled`: boolean
- `children`: React.ReactNode

**Example**:
```jsx
<Button variant="solid" size="md" onClick={handleClick}>
  Click me
</Button>
```

#### Input Component (`src/components/ui/Input.jsx`)
Text input component with styling.

**Props**:
- `type`: Input type (default: 'text')
- `disabled`: boolean
- `placeholder`: string
- Standard HTML input attributes

#### Card Components (`src/components/ui/Card.jsx`)
Composable card layout components.

**Components**:
- `Card` - Main container
- `CardHeader` - Header section
- `CardTitle` - Title text
- `CardDescription` - Description text
- `CardContent` - Main content area
- `CardFooter` - Footer section

**Example**:
```jsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content here</CardContent>
</Card>
```

### Feature Components

#### TranslatorCard (`src/components/TranslatorCard.jsx`)
Main translator interface component.

**Features**:
- Language selection dropdowns
- Real-time translation
- Copy to clipboard
- Text-to-speech
- Error handling
- Loading animation

**State Dependencies**:
- sourceLanguage
- targetLanguage
- inputText
- translatedText
- isLoading
- error

#### ThemeToggle (`src/components/ThemeToggle.jsx`)
Dark/light mode toggle button.

**Features**:
- Icon changes based on theme
- Smooth transitions
- localStorage persistence
- DOM class manipulation

#### LanguageSwap (`src/components/LanguageSwap.jsx`)
Animated language swap button.

**Features**:
- Framer Motion animations
- Hover and tap effects
- Rotation animation
- Accessibility support

#### RecentSearches (`src/components/RecentSearches.jsx`)
Recent translations display.

**Features**:
- Displays last 20 searches
- Click to re-translate
- Remove individual items
- Clear all option
- Smooth animations

### App Component (`src/App.jsx`)

**Structure**:
1. Header with logo and theme toggle
2. Main content area with translator
3. Recent searches section
4. Feature info cards
5. Footer with credits

**Features**:
- Animated background gradients
- Smooth page transitions
- Toast notifications via Toaster
- Responsive layout
- Dark mode support

## Data Structures

### Translation Object
```javascript
{
  "en": "love",           // English reference
  "ny": "chikondi",       // Nyanja word
  "bem": "ubwenzi"        // Bemba word
}
```

### Recent Search Object
```javascript
{
  "word": "chikondi",
  "translation": "ubwenzi",
  "timestamp": 1699200000000
}
```

### Translation Result Object
```javascript
{
  "original": "chikondi",
  "translation": "ubwenzi",
  "confidence": 1.0,      // 0-1, 1 = exact match
  "type": "exact"         // "exact" or "fuzzy"
}
```

## Styling System

### CSS Architecture

1. **Global Styles** (`index.css`):
   - Tailwind directives
   - Theme variables (CSS custom properties)
   - Custom animations
   - Typography setup

2. **Theme Variables** (Light Mode):
   ```css
   --background: 0 0% 100%;       /* White */
   --foreground: 0 0% 3.6%;       /* Nearly black */
   --primary: 0 84.2% 60.2%;      /* Red */
   --accent: 0 84.2% 60.2%;       /* Red */
   ```

3. **Theme Variables** (Dark Mode):
   ```css
   --background: 0 0% 3.6%;       /* Nearly black */
   --foreground: 0 0% 98%;        /* Nearly white */
   --primary: 0 84.2% 60.2%;      /* Red */
   ```

### Tailwind Configuration

- Custom font: Inter from @fontsource
- Extended color palette with CSS variables
- Custom animations (shimmer, fade-in, gradient)
- Responsive breakpoints

## Animation Patterns

### Page Transitions
```javascript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ delay: 0.3 }}
```

### Interactive Elements
```javascript
whileHover={{ scale: 1.05 }}
whileTap={{ scale: 0.95 }}
```

### Loading States
```javascript
animate={{ scale: [1, 1.2, 1] }}
transition={{
  duration: 1,
  repeat: Infinity,
  delay: i * 0.1,
}}
```

## Performance Considerations

### Optimizations
1. **Lazy Loading**: Components load on demand
2. **Code Splitting**: Vendor chunks separated
3. **Memoization**: Zustand store prevents unnecessary renders
4. **Debouncing**: Search input debounced
5. **localStorage**: Reduces API calls (local-only)

### Bundle Analysis
```
- React/ReactDOM: ~40KB
- Tailwind: ~30KB
- Framer Motion: ~25KB
- Other libs: ~15KB
- App code: ~20KB
```

## Error Handling

### Translation Errors
- "Word not found" message with suggestions
- Fuzzy matching fallback
- User-friendly error messages

### Browser API Errors
- Clipboard: Silently fails, shows toast
- Speech: Graceful degradation
- localStorage: Wrapped in try-catch

### Validation
- Input trimming
- Empty input checks
- Language validation

## Testing Strategies

### Unit Test Examples

```javascript
// Search function test
test('fuzzySearch finds similar words', () => {
  const results = fuzzySearch('chikondi', translations, 0.5);
  expect(results.length).toBeGreaterThan(0);
});

// Store test
test('swapLanguages exchanges source and target', () => {
  const store = useTranslatorStore.getState();
  const before = { source: store.sourceLanguage };
  store.swapLanguages();
  expect(store.sourceLanguage).not.toBe(before.source);
});
```

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 12+, Chrome Mobile 90+)

## Accessibility Features

- Semantic HTML elements
- ARIA labels on buttons
- Keyboard navigation
- Focus visible states
- Color contrast > 4.5:1
- Text alternatives for icons

## Security

- No sensitive data transmission
- All processing is client-side
- Safe localStorage usage
- XSS prevention via React
- Content Security Policy ready

## Configuration Files

### vite.config.js
- Port: 5173
- Strict port: false (uses next available)
- Output directory: dist
- Vendor code splitting

### tailwind.config.js
- Dark mode: class-based
- Custom theme colors
- Extended animations
- Font configuration

### postcss.config.js
- Tailwind CSS plugin
- Autoprefixer for vendor prefixes

## Development Tools

### ESLint
Configuration for code quality:
- React recommended rules
- Modern JavaScript support
- No prop-types required (using React 17+ JSX)

### Browser DevTools
- React DevTools Profiler
- Redux DevTools (Zustand works with it)
- Network analysis
- Performance monitoring

## Common Patterns

### Using the Store
```javascript
const store = useTranslatorStore();
const result = store.translate();
```

### Error Handling
```javascript
try {
  await copyToClipboard(text);
  toast.success('Copied!');
} catch (err) {
  toast.error('Failed to copy');
}
```

### Component Composition
```jsx
const MyComponent = ({ children }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {children}
  </motion.div>
);
```

## Debugging Tips

1. **Zustand DevTools**: Use `devtools` middleware
2. **React Profiler**: Identify slow renders
3. **Network Tab**: Monitor API calls (none in this app)
4. **Console Logs**: Check for warnings
5. **localStorage**: Inspect stored data in DevTools

## Future Improvements

1. **Caching**: Memoize search results
2. **Web Workers**: Offload fuzzy search
3. **PWA**: Offline support
4. **i18n**: Multi-language UI
5. **API Integration**: Connect to online dictionary

---

For questions or clarifications, refer to inline code comments or open an issue.
