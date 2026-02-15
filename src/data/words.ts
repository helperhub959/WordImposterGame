// ============================
// WORD IMPOSTER GAME DATA PACK
// ============================

// ----------------------------------
//     BASIC WORD BANK (General)
// ----------------------------------
export const generalWords = [
  "Pencil", "Apple", "Bridge", "Laptop", "River", "Mountain", "School",
  "Library", "Camera", "Garden", "Village", "Doctor", "Phone", "Bottle",
  "Keyboard", "Window", "Carpet", "Market", "Airplane", "Money",
  "Mirror", "Candle", "Paper", "Cloud", "Rocket", "Planet", "Galaxy",
  "Hospital", "Teacher", "Ocean", "Forest", "City", "Country",
  "Chair", "Table", "Clock", "Beach", "Desert", "Island", "Castle",
  "Engine", "Battery", "Charger", "Backpack", "Shoes", "Umbrella",
  "Notebook", "Magazine", "Newspaper", "Artist", "Engineer", "Pilot",
  "Chef", "Farmer", "Scientist", "Police", "Firefighter", "Judge",
  "Temple", "Museum", "Stadium", "Theater", "Restaurant", "Cafe",
  "Train", "Bus", "Bicycle", "Helicopter", "Submarine", "Boat",
  "Rainbow", "Storm", "Thunder", "Lightning", "Snow", "Volcano",
  "Diamond", "Gold", "Silver", "Treasure", "Map", "Compass"
];

  
  // ----------------------------------
  //        EASY WORD LIST
  // ----------------------------------
  export const easyWords = [
    "Dog", "Cat", "Bird", "Car", "House", "Sun", "Rain", "Bed", "Chair", "Tree",
    "Milk", "Pizza", "Book", "Fish", "Ball", "Shoe", "Hat", "Cake", "Star", "Flower"
  ];
  
  // ----------------------------------
  //        MEDIUM WORD LIST
  // ----------------------------------
  export const mediumWords = [
    "Airport", "Concert", "Elevator", "Chocolate", "Submarine", "Volcano",
    "Microwave", "Passport", "Jungle", "Baseball", "Pirate", "Detective",
    "Costume", "Festival", "Robot", "Compass", "Factory", "Knight", "Dragon"
  ];
  
  // ----------------------------------
  //        HARD WORD LIST
  // ----------------------------------
  export const hardWords = [
    "Philosophy", "Algorithm", "Democracy", "Photosynthesis", "Architecture",
    "Cryptocurrency", "Hypothesis", "Symphony", "Paradox", "Tsunami",
    "Evolution", "Conspiracy", "Quantum", "Nostalgia", "Ecosystem", "Nanotechnology"
  ];
  
  // ----------------------------------
  //        **CATEGORIES**
  // ----------------------------------
  export const categories = {
    animals: [
      "Tiger", "Elephant", "Shark", "Penguin", "Giraffe", "Kangaroo",
      "Butterfly", "Dolphin", "Turtle", "Eagle", "Snake"
    ],
    foods: [
      "Burger", "Sushi", "Pasta", "Chocolate", "Cheese", "Coffee",
      "Avocado", "Steak", "Taco", "Cereal"
    ],
    jobs: [
      "Engineer", "Scientist", "Chef", "Pilot", "Artist", "Firefighter",
      "Detective", "Lawyer", "Nurse", "Carpenter"
    ],
    places: [
      "Restaurant", "Airport", "Beach", "Mall", "Castle", "Stadium",
      "Museum", "Farm", "Desert", "Island"
    ],
    objects: [
      "Wallet", "Key", "Backpack", "Watch", "Microphone", "Glasses",
      "Scissors", "Remote", "Flashlight", "Blanket"
    ],
    popCulture: [
      "Batman", "Marvel", "Star Wars", "Harry Potter", "Pokemon",
      "Minecraft", "Mario", "Avengers"
    ]
  };
  
  // ----------------------------------
  //       THEMES / CATEGORY PACKS
  // ----------------------------------
  export const themes = Object.keys(categories);
  
  // ----------------------------------
  //     SPECIAL “TRAP WORDS”
  // ----------------------------------
  export const trapWords = [
    "Everything", "Nothing", "Blank", "Unknown", "Secret", "Mystery",
    "Void", "Shadow", "Hidden", "Undefined"
  ];
  
  // ----------------------------------
  //  Expansive FRONT TEXTS / PROMPTS
  // ----------------------------------
  export const frontTexts = [
    "Click to reveal",
    "Tap to see your word",
    "Hidden word inside",
    "What did you get?",
    "Flip to reveal",
    "Your secret word awaits",
    "Tap for your fate",
    "Are you the imposter?",
    "Reveal your clue word",
    "Shhh... don't show anyone"
  ];
  
  // ----------------------------------
  //  IN-GAME PROMPTS & FLAVOR TEXT
  // ----------------------------------
  export const cluePrompts = [
    "Give a clue (one word)",
    "Describe the word without revealing it",
    "Be subtle… but not TOO subtle",
    "Try not to sound suspicious",
    "Blend in with the crew"
  ];
  
  export const votingPrompts = [
    "Who sounds the most suspicious?",
    "Vote for the Imposter",
    "Someone is lying… pick them",
    "Choose wisely",
    "The fate of the round is in your hands"
  ];
  
  export const resultsTexts = [
    "The Imposter has been revealed!",
    "Crewmates win!",
    "The Imposter survives!",
    "Better luck next round!",
    "That was suspicious…"
  ];
  
  // ----------------------------------
  //  MEGA WORD LIST (all words combined)
  // ----------------------------------
  export const allWords = [
    ...easyWords,
    ...generalWords,
    ...mediumWords,
    ...hardWords,
    ...categories.animals,
    ...categories.foods,
    ...categories.jobs,
    ...categories.places,
    ...categories.objects,
    ...categories.popCulture
  ];
  
  // ----------------------------------
  //         UTILITY FUNCTIONS
  // ----------------------------------
  export const randomFrom = <T,>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)];
  
  export const getRandomWord = (): string =>
    randomFrom(allWords);
  
  export const getWordByDifficulty = (difficulty: "easy" | "medium" | "hard") => {
    if (difficulty === "easy") return randomFrom(easyWords);
    if (difficulty === "medium") return randomFrom(mediumWords);
    return randomFrom(hardWords);
  };
  
  export const getRandomCategoryWord = (category: keyof typeof categories) =>
    randomFrom(categories[category]);
  
  export const getRandomFrontText = (): string =>
    randomFrom(frontTexts);
  
  export const getRandomTheme = (): string =>
    randomFrom(themes);
  
  // Optional: Seeded random for deterministic games
  export const seededRandom = (seed: number) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
