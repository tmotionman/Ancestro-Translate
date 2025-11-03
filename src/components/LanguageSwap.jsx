import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from './ui/Button';
import useTranslatorStore from '../store/useTranslatorStore';

export const LanguageSwap = () => {
  const { swapLanguages } = useTranslatorStore();

  const handleSwap = () => {
    swapLanguages();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex justify-center"
    >
      <Button
        variant="outline"
        size="md"
        onClick={handleSwap}
        className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
        title="Swap languages"
      >
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <ArrowRightLeft className="h-5 w-5" />
        </motion.div>
      </Button>
    </motion.div>
  );
};
