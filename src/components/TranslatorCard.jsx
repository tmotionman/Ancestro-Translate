import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Volume2, RotateCcw, Search, ArrowRightLeft } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import useTranslatorStore from '../store/useTranslatorStore';
import { copyToClipboard, speakText } from '../lib/utils';
import toast from 'react-hot-toast';

export const TranslatorCard = () => {
  const {
    sourceLanguage,
    targetLanguage,
    setSourceLanguage,
    setTargetLanguage,
    swapLanguages,
    inputText,
    translatedText,
    isLoading,
    error,
    setInputText,
    translate,
    clearInput,
  } = useTranslatorStore();

  const languageNames = {
    ny: 'Nyanja',
    en: 'English',
  };

  // Manual-translate: only run when user clicks Translate or presses Enter
  useEffect(() => {
    // No-op effect kept to align with other effects and ensure translate reference stability
    return () => {};
  }, [translate]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputText.trim().length > 0) {
      translate();
    }
  };

  const handleCopyTranslation = async () => {
    if (translatedText) {
      const success = await copyToClipboard(translatedText);
      if (success) {
        toast.success('Copied to clipboard!');
      } else {
        toast.error('Failed to copy');
      }
    }
  };

  const handleSpeak = (text) => {
    speakText(text, 'en');
    toast.success('Playing pronunciation...');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
      <CardHeader className="pb-4" />

      <CardContent className="space-y-6">
        {/* Language Selection */}
        <div className="grid grid-cols-2 gap-4 items-end">
          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wide">From:</label>
            <Select
              value={sourceLanguage}
              onChange={setSourceLanguage}
              options={[
                { value: 'ny', label: 'Nyanja' },
                { value: 'en', label: 'English' },
              ]}
            />
          </div>

          <div className="flex justify-center">
            <motion.button
              onClick={swapLanguages}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-lg bg-gradient-to-r from-[#2e0151] to-[#ff4e00] text-white hover:shadow-lg transition"
              title="Swap languages"
            >
              <ArrowRightLeft size={20} />
            </motion.button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold uppercase tracking-wide">To:</label>
            <Select
              value={targetLanguage}
              onChange={setTargetLanguage}
              options={[
                { value: 'ny', label: 'Nyanja' },
                { value: 'en', label: 'English' },
              ]}
            />
          </div>
        </div>

        {/* Input Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold uppercase tracking-wide">Enter {languageNames[sourceLanguage]} word:</label>
          <div className="relative">
            <Input
              placeholder={`Type a ${languageNames[sourceLanguage]} word...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pr-12 text-base"
              disabled={isLoading}
            />
            {inputText && (
              <button
                onClick={clearInput}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                title="Clear"
              >
                <RotateCcw size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Output Section */}
        <div className="space-y-3">
          <label className="text-sm font-semibold uppercase tracking-wide">{languageNames[targetLanguage]} translation:</label>
          <div className="relative min-h-12 p-4 rounded-lg bg-muted/50 border border-border">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2 items-center"
                >
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary"
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">Translating...</span>
                </motion.div>
              ) : translatedText ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-3"
                >
                  <p className="text-lg font-medium">{translatedText}</p>
                  <div className="flex gap-2 mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleCopyTranslation}
                      className="gap-2"
                    >
                      <Copy size={16} />
                      Copy
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSpeak(translatedText)}
                      className="gap-2"
                    >
                      <Volume2 size={16} />
                      Speak
                    </Button>
                  </div>
                </motion.div>
              ) : error ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-amber-600 dark:text-amber-400 text-sm"
                >
                  {error}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-muted-foreground text-sm"
                >
                  <Search size={16} />
                  <span>Type a word to see the translation</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Translate & Clear Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            onClick={translate}
            disabled={!inputText.trim() || isLoading}
            className="flex-1"
            variant="solid"
          >
            <Search size={18} className="mr-2" />
            Translate
          </Button>
          <Button
            onClick={clearInput}
            variant="outline"
            className="flex-1"
          >
            <RotateCcw size={18} className="mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
