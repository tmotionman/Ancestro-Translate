import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getTranslation, getRecentSearches, saveRecentSearch } from '../lib/search';
import translationsData from '../data/translations.json';

const useTranslatorStore = create(
  devtools(
    persist(
      (set, get) => ({
        // State
        sourceLanguage: 'ny', // Can be 'ny' or 'en'
        targetLanguage: 'en', // Can be 'ny' or 'en'
        inputText: '',
        translatedText: '',
        isLoading: false,
        error: null,
        recentSearches: getRecentSearches(),
        translations: translationsData,
        showHistory: false,
        isDarkMode: false,

        // Actions
        setSourceLanguage: (lang) =>
          set({ sourceLanguage: lang }, false, 'setSourceLanguage'),

        setTargetLanguage: (lang) =>
          set({ targetLanguage: lang }, false, 'setTargetLanguage'),

        // Swap source and target languages
        swapLanguages: () => {
          set((state) => ({
            sourceLanguage: state.targetLanguage,
            targetLanguage: state.sourceLanguage,
            inputText: state.translatedText,
            translatedText: state.inputText,
          }), false, 'swapLanguages');
        },

        setInputText: (text) =>
          set({ inputText: text }, false, 'setInputText'),

        setTranslatedText: (text) =>
          set({ translatedText: text }, false, 'setTranslatedText'),

        setError: (error) =>
          set({ error }, false, 'setError'),

        setIsLoading: (loading) =>
          set({ isLoading: loading }, false, 'setIsLoading'),

        setShowHistory: (show) =>
          set({ showHistory: show }, false, 'setShowHistory'),

        setIsDarkMode: (isDark) =>
          set({ isDarkMode: isDark }, false, 'setIsDarkMode'),

        // Translate function
        translate: () => {
          const state = get();
          const { inputText, translations, sourceLanguage, targetLanguage } = state;

          if (!inputText.trim()) {
            set({ translatedText: '', error: null });
            return;
          }

          set({ isLoading: true, error: null });

          // Simulate async operation
          setTimeout(() => {
            try {
              // Translate using current source and target languages
              const result = getTranslation(inputText, translations, sourceLanguage, targetLanguage);

              if (result) {
                set({
                  translatedText: result.translation,
                  isLoading: false,
                  error: null,
                });

                // Save to recent searches
                saveRecentSearch(inputText, result.translation);
                set({ recentSearches: getRecentSearches() });
              } else {
                set({
                  translatedText: '',
                  error: `"${inputText}" not found in dictionary. Try a similar word!`,
                  isLoading: false,
                });
              }
            } catch (err) {
              set({
                translatedText: '',
                error: 'An error occurred during translation. Please try again.',
                isLoading: false,
              });
            }
          }, 200);
        },

        swapLanguages: () => {
          const state = get();
          // No swap needed - always Nyanja to English
          set(
            {
              inputText: state.translatedText,
              translatedText: '',
            },
            false,
            'swapLanguages'
          );
        },

        clearInput: () =>
          set(
            {
              inputText: '',
              translatedText: '',
              error: null,
            },
            false,
            'clearInput'
          ),

        removeRecentSearch: (word) =>
          set(
            (state) => ({
              recentSearches: state.recentSearches.filter((item) => item.word !== word),
            }),
            false,
            'removeRecentSearch'
          ),

        clearRecentSearches: () =>
          set({ recentSearches: [] }, false, 'clearRecentSearches'),

        // Load theme from localStorage
        initializeTheme: () => {
          const darkMode = localStorage.getItem('isDarkMode') === 'true';
          set({ isDarkMode: darkMode });

          if (darkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },

        // Toggle theme
        toggleTheme: () => {
          const state = get();
          const newDarkMode = !state.isDarkMode;

          set({ isDarkMode: newDarkMode });
          localStorage.setItem('isDarkMode', newDarkMode);

          if (newDarkMode) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },
      }),
      {
        name: 'translator-store',
        partialize: (state) => ({
          isDarkMode: state.isDarkMode,
        }),
      }
    )
  )
);

export default useTranslatorStore;
