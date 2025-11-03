// Parse the CSV at build time using Vite's raw import. This keeps the source CSV as the single source of truth.
import csvText from '../../ASSETS/hillmark.csv?raw';

// Simple CSV parser assuming four columns: Category, English, nyanja, bemba
const parseCSV = (text) => {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  // Remove header row if present (looks like 'Category,English,nyanja,bemba')
  const header = lines[0] && lines[0].toLowerCase().startsWith('category');
  const dataLines = header ? lines.slice(1) : lines;

  const map = new Map();

  dataLines.forEach((line) => {
    // split into at most 4 parts to avoid breaking if extra commas appear later
    const parts = line.split(',');
    const category = (parts[0] || '').trim();
    const english = (parts[1] || '').trim();
    const nyanja = (parts[2] || '').trim();
    const bemba = (parts[3] || '').trim();

    if (!category) return;
    if (!english) return; // skip category header rows like 'ANIMALS (BIRDS),,,'

    const key = category;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push({ english, nyanja, bemba });
  });

  const categories = Array.from(map.entries()).map(([category, words]) => ({ category, words }));
  return categories;
};

export const learningCategories = parseCSV(csvText);

export const getAllCategories = () => learningCategories.map((c) => c.category);

export const getWordsByCategory = (category) => {
  const found = learningCategories.find((c) => c.category === category);
  return found ? found.words : [];
};
