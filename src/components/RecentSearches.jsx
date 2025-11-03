import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, History, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import useTranslatorStore from '../store/useTranslatorStore';
import { formatDate } from '../lib/utils';

export const RecentSearches = () => {
  const { recentSearches, removeRecentSearch, clearRecentSearches, setInputText } =
    useTranslatorStore();

  const [isOpen, setIsOpen] = useState(false);

  if (recentSearches.length === 0) {
    return null;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5" />
            <div className="flex items-baseline gap-3">
              <CardTitle className="text-lg">Recent Searches</CardTitle>
              <span className="text-xs text-muted-foreground">({recentSearches.length})</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={clearRecentSearches}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>

            <button
              aria-expanded={isOpen}
              onClick={() => setIsOpen((s) => !s)}
              className="p-1 rounded hover:bg-muted/30"
              title={isOpen ? 'Collapse' : 'Expand'}
            >
              <ChevronDown className={`h-4 w-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="recent-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
          >
            <CardContent>
              <div className="space-y-2">
                <AnimatePresence>
                  {recentSearches.map((item, index) => (
                    <motion.div
                      key={`${item.word}-${index}`}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 12 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                    >
                      <button
                        onClick={() => setInputText(item.word)}
                        className="flex-1 text-left hover:text-primary transition-colors"
                      >
                        <p className="font-medium text-sm">{item.word}</p>
                        <p className="text-xs text-muted-foreground">{item.translation}</p>
                      </button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeRecentSearch(item.word)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
