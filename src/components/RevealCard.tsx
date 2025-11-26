import { useState, useEffect } from 'react';
import './RevealCard.css';

interface RevealCardProps {
  frontText: string;
  backWord: string;
  onFlip?: () => void;
  autoFlip?: boolean;
  flipDelay?: number;
}

function RevealCard({ 
  frontText, 
  backWord, 
  onFlip,
  autoFlip = false,
  flipDelay = 2000 
}: RevealCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
      onFlip?.();
    }
  };

  // Auto-flip functionality
  useEffect(() => {
    if (autoFlip && !isFlipped) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
        onFlip?.();
      }, flipDelay);
      return () => clearTimeout(timer);
    }
  }, [autoFlip, flipDelay, isFlipped, onFlip]);

  return (
    <div 
      className={`reveal-card ${isFlipped ? 'flipped' : ''}`}
      onClick={handleFlip}
    >
      <div className="reveal-card-inner">
        <div className="reveal-card-front">
          <h3>Flip it!</h3>
          <p>{frontText}</p>
        </div>
        <div className="reveal-card-back">
          <h2>{backWord}</h2>
        </div>
      </div>
    </div>
  );
}

export default RevealCard;

