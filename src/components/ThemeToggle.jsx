import React, { useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/Button';
import useTranslatorStore from '../store/useTranslatorStore';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme, initializeTheme } = useTranslatorStore();

  useEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return (
    <Button
      variant="ghost"
      size="md"
      onClick={toggleTheme}
      className="rounded-full w-10 h-10 p-0"
      title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-500" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700" />
      )}
    </Button>
  );
};
