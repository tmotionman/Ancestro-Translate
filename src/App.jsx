import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import TranslateLogo from '../ASSETS/Translate logo.svg';
import { TranslatorCard } from './components/TranslatorCard';
import { ThemeToggle } from './components/ThemeToggle';
import { RecentSearches } from './components/RecentSearches';
import { SplashScreen } from './components/SplashScreen';
import { About } from './components/About';
import { Learn } from './components/Learn';
import useTranslatorStore from './store/useTranslatorStore';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('translate');
  const { isDarkMode, initializeTheme } = useTranslatorStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="h-screen w-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300">
        {/* Animated background elements */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <motion.div
            className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl"
            animate={{
              x: [0, -50, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        {/* Header (fixed at top) */}
        <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-6 sm:px-8 bg-gradient-to-r from-[#2e0151] via-[#3d0a5f] to-[#2e0151] shadow-lg backdrop-blur-sm bg-opacity-95 h-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <div className="flex items-center justify-center">
              <img src={TranslateLogo} alt="Translate logo" className="w-10 h-10 object-contain" />
            </div>
            <h1 className="text-xl font-bold hidden sm:block text-white mr-4">
              Translate
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <nav className="hidden sm:flex items-center gap-3">
              <a href="https://ancestro.pages.dev/about" target="_blank" rel="noopener noreferrer" className="text-white text-sm hover:text-[#ffddcc] transition-colors">Ancestro</a>
            </nav>
            <ThemeToggle />
          </motion.div>
        </header>

        {/* Tab Navigation (fixed, below header) */}
        <div className="fixed top-20 left-0 right-0 z-40 bg-background flex justify-center border-b border-border/50 h-16">
          <div className="w-full max-w-2xl flex gap-4 px-4 sm:px-0">
            <button
              onClick={() => setActiveTab('translate')}
              className={`pb-3 px-4 font-semibold text-sm transition-all ${
                activeTab === 'translate'
                  ? 'text-[#ff4e00] border-b-2 border-[#ff4e00]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Translate
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`pb-3 px-4 font-semibold text-sm transition-all ${
                activeTab === 'learn'
                  ? 'text-[#ff4e00] border-b-2 border-[#ff4e00]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 px-4 font-semibold text-sm transition-all ${
                activeTab === 'about'
                  ? 'text-[#ff4e00] border-b-2 border-[#ff4e00]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              About
            </button>
          </div>
        </div>

        {/* Scrollable Content Area (starts below header and tabs) */}
        <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden" style={{ paddingTop: '120px' }}>
          <div className="flex flex-col items-center justify-start px-4 py-8 sm:px-6 sm:py-12 min-h-full">
            <div className="w-full max-w-2xl space-y-6">
              {/* Translate Tab */}
              {activeTab === 'translate' && (
                <>
                  {/* Title and Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center space-y-2 mb-8"
                  >
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-[#2e0151] to-[#ff4e00] bg-clip-text text-transparent">
                      Translate
                    </h2>
                    <p className="text-muted-foreground text-lg">
                      Instantly translate words — fast and simple
                    </p>
                  </motion.div>

                  {/* Translator Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <TranslatorCard />
                  </motion.div>

                  {/* Recent Searches */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <RecentSearches />
                  </motion.div>

                  {/* Info Cards */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8"
                  >
                    {[
                      {
                        icon: '🔍',
                        title: 'Instant Translation',
                        description: 'Real-time translation as you type',
                      },
                      {
                        icon: '📚',
                        title: 'Rich Dictionary',
                        description: '300+ Nyanja words with English meanings',
                      },
                      {
                        icon: '💾',
                        title: 'Search History',
                    description: 'Your recent translations are saved',
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg bg-card border border-border/50 text-center hover:shadow-md transition-shadow"
                    whileHover={{ y: -4 }}
                  >
                    <div className="text-2xl mb-2">{feature.icon}</div>
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>
                </>
              )}

              {/* Learn Tab */}
              {activeTab === 'learn' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Learn />
                </motion.div>
              )}

              {/* About Tab */}
              {activeTab === 'about' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <About />
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <footer className="mt-auto text-center py-6 text-sm text-muted-foreground w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <p className="text-xs mt-2">
                  © 2025 Ancestro Translate. All Rights Reserved
                </p>
                <p className="text-xs mt-1 text-muted-foreground/80">Powered by Nestro Ai</p>
              </motion.div>
            </footer>
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: isDarkMode ? '#1f2937' : '#f9fafb',
            color: isDarkMode ? '#f3f4f6' : '#111827',
            borderRadius: '0.5rem',
            border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
          },
        }}
      />
    </div>
  );
}

export default App;
