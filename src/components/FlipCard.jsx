import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2 } from 'lucide-react';

export const FlipCard = ({ word, language, isFlipped, onFlip }) => {
  const handleFlip = () => {
    if (onFlip) {
      onFlip();
    }
  };

  const playSound = (text, lang = 'en-US') => {
    if (!text) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      onClick={handleFlip}
      className="h-48 cursor-pointer perspective"
    >
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - English */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-[#2e0151] to-[#3d0a5f] rounded-xl p-6 flex flex-col items-center justify-between text-white shadow-lg border border-[#ff4e00]/30"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              playSound(word.english, 'en-US');
            }}
            className="self-end p-1 hover:bg-white/20 rounded transition-colors"
            style={{ pointerEvents: 'auto' }}
            title="Play English pronunciation"
          >
            <Volume2 className="w-4 h-4 text-[#ffddcc]" />
          </button>
          <div className="flex flex-col items-center">
            <p className="text-sm text-[#ffddcc] mb-2">English</p>
            <p className="text-3xl font-bold text-center">{word.english}</p>
          </div>
          <div></div>
        </div>

        {/* Back - Nyanja/Bemba */}
        <div
          className="absolute w-full h-full bg-gradient-to-br from-[#ff4e00] to-orange-600 rounded-xl p-6 flex flex-col items-center justify-between text-white shadow-lg border border-[#2e0151]/30"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (word.nyanja) playSound(word.nyanja, 'ny');
              else if (word.bemba) playSound(word.bemba, 'bem');
            }}
            className="self-end p-1 hover:bg-white/20 rounded transition-colors"
            style={{ pointerEvents: 'auto' }}
            title="Play word pronunciation"
          >
            <Volume2 className="w-4 h-4 text-orange-100" />
          </button>
          <div className="space-y-3 w-full text-center">
            {word.nyanja && (
              <div>
                <p className="text-sm text-orange-100 mb-1">Nyanja</p>
                <p className="text-2xl font-bold">{word.nyanja}</p>
              </div>
            )}
            {word.bemba && (
              <div>
                <p className="text-sm text-orange-100 mb-1">Bemba</p>
                <p className="text-2xl font-bold">{word.bemba}</p>
              </div>
            )}
            {!word.nyanja && !word.bemba && (
              <p className="text-sm italic text-orange-100">No translation yet</p>
            )}
          </div>
          <p className="text-xs text-orange-100 mt-4">Click to flip</p>
        </div>
      </motion.div>
    </motion.div>
  );
};
