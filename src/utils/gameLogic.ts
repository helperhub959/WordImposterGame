import { categories, randomFrom } from '../data/words';
import type { Player } from '../components/PlayerCard';
import type { GameSettings } from '../components/SettingsModal.tsx';

/**
 * Get all words from selected categories
 * Categories should be theme keys (animals, foods, jobs, places, objects, popCulture)
 */
export const getWordsFromCategories = (selectedCategories: string[]): string[] => {
  const words: string[] = [];
  
  selectedCategories.forEach(category => {
    // Direct key match (themes array contains the category keys)
    const categoryKey = category as keyof typeof categories;
    
    if (categories[categoryKey]) {
      words.push(...categories[categoryKey]);
    }
  });

  // If no words found, use all categories as fallback
  return words.length > 0 ? words : Object.values(categories).flat();
};

/**
 * Generate players based on game settings
 */
export const generatePlayers = (settings: GameSettings): Player[] => {
  const players: Player[] = [];
  const words = getWordsFromCategories(settings.categories);
  // Pick a single word for this round that all non-imposters will share
  const commonCrewmateWord = randomFrom(words);

  // Generate all player indices
  const playerIndices = Array.from({ length: settings.numPlayers }, (_, i) => i);
  
  // Randomly select imposter indices
  const imposterIndices: number[] = [];
  while (imposterIndices.length < settings.numImposters) {
    const randomIndex = Math.floor(Math.random() * playerIndices.length);
    const selectedIndex = playerIndices[randomIndex];
    if (!imposterIndices.includes(selectedIndex)) {
      imposterIndices.push(selectedIndex);
    }
  }

  // Generate players
  for (let i = 0; i < settings.numPlayers; i++) {
    const isImposter = imposterIndices.includes(i);
    // Non-imposters share the same secret word, imposters get an empty word here
    const word = isImposter ? '' : commonCrewmateWord;

    players.push({
      id: i + 1,
      name: `Player ${i + 1}`,
      isImposter,
      word,
    });
  }

  return players;
};

