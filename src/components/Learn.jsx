import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { FlipCard } from './FlipCard';
import { getAllCategories, getWordsByCategory } from '../data/learningData';
import { Select } from './ui/Select';

export const Learn = () => {
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [flippedIndex, setFlippedIndex] = useState(null);
  const words = getWordsByCategory(selectedCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <p className="text-muted-foreground">
          Select a category and click cards to flip and learn
        </p>
      </motion.div>

      {/* Category Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
      >
        <label className="text-sm font-semibold text-foreground">
          Category:
        </label>
        <Select
          value={selectedCategory}
          onChange={(val) => setSelectedCategory(val)}
          options={categories.map((cat) => ({ value: cat, label: cat }))}
        />
        <p className="text-xs text-muted-foreground">
          {words.length} word{words.length !== 1 ? 's' : ''} in this category
        </p>
      </motion.div>

      {/* Word Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-sm text-muted-foreground/60">
          💡 Tip: Click any card to reveal the translation
        </p>
      </motion.div>

      {/* Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {words.map((word, index) => (
          <motion.div key={index} variants={itemVariants}>
            <FlipCard 
              word={word} 
              isFlipped={flippedIndex === index}
              onFlip={() => setFlippedIndex(flippedIndex === index ? null : index)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Empty State */}
      {words.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <p className="text-muted-foreground text-lg">
            No words found in this category yet.
          </p>
        </motion.div>
      )}
    </div>
  );
};
