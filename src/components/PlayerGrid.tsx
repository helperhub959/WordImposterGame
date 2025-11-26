import { useState, useEffect } from 'react';
import PlayerCard, { type Player } from './PlayerCard.tsx';
import './PlayerGrid.css';

interface PlayerGridProps {
  // You can tighten this type later to match your GameSettings
  settings: unknown;
}

// Helper to create exactly 6 players
const createPlayers = (): Player[] => {
  const NUM_PLAYERS = 6;
  return Array.from({ length: NUM_PLAYERS }, (_, index) => ({
    id: index + 1,
    name: `Player ${index + 1}`,
    isImposter: false,
    word: '',
  }));
};

function PlayerGrid({ settings }: PlayerGridProps) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [cardRevealed, setCardRevealed] = useState(false);

  useEffect(() => {
    const newPlayers = createPlayers();
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
    setCardRevealed(false);
  }, [settings]);

  const handleRegenerate = () => {
    const newPlayers = createPlayers();
    setPlayers(newPlayers);
    setCurrentPlayerIndex(0);
    setCardRevealed(false);
  };

  const handleCardRevealed = () => {
    setCardRevealed(true);
  };

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setCardRevealed(false);
    }
  };

  if (players.length === 0) {
    return <div>Loading players...</div>;
  }

  const currentPlayer = players[currentPlayerIndex];
  const isLastPlayer = currentPlayerIndex === players.length - 1;

  return (
    <div className="player-grid-container">
      <div className="player-grid-header">
        <h2>Pass & Play</h2>
        <button className="regenerate-btn" onClick={handleRegenerate}>
          Restart Game
        </button>
      </div>

      <div className="player-progress">
        <p className="player-counter">
          Player {currentPlayerIndex + 1} of {players.length}
        </p>
      </div>

      <div className="player-card-wrapper">
        <PlayerCard
          key={`${currentPlayer.id}-${currentPlayerIndex}`}
          player={currentPlayer}
          onRevealed={handleCardRevealed}
        />
      </div>

      <div className="player-navigation">
        <button
          className="nav-btn nav-btn-primary"
          onClick={handleNextPlayer}
          disabled={!cardRevealed || isLastPlayer}
        >
          Pass to Next Player
        </button>

        {cardRevealed && isLastPlayer && (
          <div className="game-complete">
            <p>All players have seen their cards!</p>
            {/* <button className="nav-btn nav-btn-primary" onClick={handleRevealImposters}>
              Reveal Imposters
            </button> */}
            <button className="nav-btn nav-btn-primary" onClick={handleRegenerate}>
              Start New Game
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PlayerGrid;

