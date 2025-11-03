// Calculate Levenshtein distance for fuzzy matching
export const levenshteinDistance = (str1, str2) => {
  const matrix = [];

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[str2.length][str1.length];
};

// Fuzzy search with configurable threshold
export const fuzzySearch = (query, items, threshold = 0.6) => {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  return items
    .map((item) => {
      const searchFields = {
        ny: item.ny?.toLowerCase() || '',
        bem: item.bem?.toLowerCase() || '',
        en: item.en?.toLowerCase() || '',
      };

      let bestDistance = Infinity;
      let bestField = '';

      Object.entries(searchFields).forEach(([field, value]) => {
        const distance = levenshteinDistance(normalizedQuery, value);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestField = field;
        }
      });

      const similarity = 1 - bestDistance / Math.max(normalizedQuery.length, 3);

      return {
        ...item,
        similarity,
        matchedField: bestField,
      };
    })
    .filter((item) => item.similarity >= threshold)
    .sort((a, b) => b.similarity - a.similarity);
};

// Direct search for exact or partial matches
export const searchTranslations = (query, translations, field = 'ny') => {
  const normalizedQuery = query.toLowerCase().trim();

  if (!normalizedQuery) return [];

  return translations.filter((item) => {
    const fieldValue = item[field]?.toLowerCase() || '';
    return fieldValue.includes(normalizedQuery) || fieldValue.startsWith(normalizedQuery);
  });
};

// Get translation with fallback to fuzzy search
export const getTranslation = (query, translations, sourceField = 'ny', targetField = 'bem') => {
  // Try exact match first
  const exactMatch = translations.find(
    (item) => item[sourceField]?.toLowerCase() === query.toLowerCase()
  );

  if (exactMatch) {
    return {
      original: exactMatch[sourceField],
      translation: exactMatch[targetField],
      confidence: 1.0,
      type: 'exact',
    };
  }

  // Try partial/fuzzy match
  const fuzzyResults = fuzzySearch(query, translations, 0.5);

  if (fuzzyResults.length > 0) {
    const bestMatch = fuzzyResults[0];
    return {
      original: bestMatch[sourceField],
      translation: bestMatch[targetField],
      confidence: bestMatch.similarity,
      type: 'fuzzy',
    };
  }

  return null;
};

// Format search results
export const formatResults = (results, sourceField = 'ny', targetField = 'bem') => {
  return results.map((item) => ({
    id: `${item[sourceField]}-${item[targetField]}`,
    word: item[sourceField],
    translation: item[targetField],
    english: item.en,
    language: sourceField === 'ny' ? 'Nyanja' : 'Bemba',
  }));
};

// Get recently searched items from localStorage
export const getRecentSearches = () => {
  try {
    const recent = localStorage.getItem('recentSearches');
    return recent ? JSON.parse(recent) : [];
  } catch {
    return [];
  }
};

// Save search to localStorage
export const saveRecentSearch = (word, translation) => {
  try {
    const recent = getRecentSearches();
    const newSearch = { word, translation, timestamp: Date.now() };

    // Remove duplicate if exists
    const filtered = recent.filter((item) => item.word !== word);

    // Add new search at the beginning, keep only last 20
    const updated = [newSearch, ...filtered].slice(0, 20);

    localStorage.setItem('recentSearches', JSON.stringify(updated));
  } catch {
    // Silently fail if localStorage is not available
  }
};

// Clear all recent searches
export const clearRecentSearches = () => {
  try {
    localStorage.removeItem('recentSearches');
  } catch {
    // Silently fail
  }
};
