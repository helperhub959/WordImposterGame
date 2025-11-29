import { useState } from 'react';
import RevealCard from './RevealCard';
import { getRandomFrontText } from '../data/words';
import './PlayerCard.css';

export interface Player {
  id: number;
  name: string;
  isImposter: boolean;
  word: string;
}

interface PlayerCardProps {
  player: Player;
  frontText?: string;
  onRevealed?: () => void;
}

function PlayerCard({ player, frontText, onRevealed }: PlayerCardProps) {
  const [flipped, setFlipped] = useState(false);
  const displayFrontText = frontText || getRandomFrontText();

  const getBackWord = () => {
    if (player.isImposter) {
      return 'IMPOSTER';
    }
    return player.word;
  };

  const handleFlip = () => {
    if (!flipped) {
      setFlipped(true);
      onRevealed?.();
    }
  };

  return (
    <div className={`player-card-container ${player.isImposter ? 'imposter' : ''}`}>
      <div className="player-card-header">
        <h3 className="player-name">{player.name}</h3>
      </div>
      <RevealCard
        frontText={displayFrontText}
        backWord={getBackWord()}
        onFlip={handleFlip}
      />
    </div>
  );
}

export default PlayerCard;

