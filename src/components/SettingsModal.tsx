import { useState, useEffect } from 'react';
import { themes } from '../data/words';
import './SettingsModal.css';

export interface GameSettings {
  numPlayers: number;
  numImposters: number;
  categories: string[];
  hintEnabled: boolean;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onSave: (settings: GameSettings) => void;
}

function SettingsModal({ isOpen, onClose, settings, onSave }: SettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<GameSettings>(settings);

  useEffect(() => {
    if (isOpen) {
      setLocalSettings(settings);
    }
  }, [isOpen, settings]);

  // Calculate max imposters based on player count
  // 3-5 players: max 1 imposter
  // 6-8 players: max 2 imposters
  // 9-10 players: max 3 imposters
  const getMaxImposters = (numPlayers: number): number => {
    if (numPlayers >= 3 && numPlayers <= 5) return 1;
    if (numPlayers >= 6 && numPlayers <= 8) return 2;
    if (numPlayers >= 9 && numPlayers <= 10) return 3;
    return 1; // fallback
  };

  const handleCategoryToggle = (category: string) => {
    setLocalSettings(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-modal-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-modal-header">
          <h2>Game Settings</h2>
          <button className="settings-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="settings-modal-content">
          {/* Number of Players */}
          <div className="settings-section">
            <label className="settings-label">Number of Players</label>
            <div className="settings-input-group">
              <button
                className="settings-number-btn"
                onClick={() => setLocalSettings(prev => {
                  const newNumPlayers = Math.max(3, prev.numPlayers - 1);
                  const maxImposters = getMaxImposters(newNumPlayers);
                  return {
                    ...prev,
                    numPlayers: newNumPlayers,
                    numImposters: Math.min(prev.numImposters, maxImposters)
                  };
                })}
              >
                −
              </button>
              <input
                type="number"
                className="settings-number-input"
                value={localSettings.numPlayers}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 3;
                  const newNumPlayers = Math.max(3, Math.min(10, value));
                  const maxImposters = getMaxImposters(newNumPlayers);
                  setLocalSettings(prev => ({
                    ...prev,
                    numPlayers: newNumPlayers,
                    numImposters: Math.min(prev.numImposters, maxImposters)
                  }));
                }}
                min={3}
                max={10}
              />
              <button
                className="settings-number-btn"
                onClick={() => setLocalSettings(prev => {
                  const newNumPlayers = Math.min(10, prev.numPlayers + 1);
                  const maxImposters = getMaxImposters(newNumPlayers);
                  return {
                    ...prev,
                    numPlayers: newNumPlayers,
                    numImposters: Math.min(prev.numImposters, maxImposters)
                  };
                })}
              >
                +
              </button>
            </div>
          </div>

          {/* Number of Imposters */}
          <div className="settings-section">
            <label className="settings-label">Number of Imposters</label>
            <div className="settings-input-group">
              <button
                className="settings-number-btn"
                onClick={() => setLocalSettings(prev => ({
                  ...prev,
                  numImposters: Math.max(1, prev.numImposters - 1)
                }))}
              >
                −
              </button>
              <input
                type="number"
                className="settings-number-input"
                value={localSettings.numImposters}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 1;
                  const maxImposters = getMaxImposters(localSettings.numPlayers);
                  setLocalSettings(prev => ({
                    ...prev,
                    numImposters: Math.max(1, Math.min(maxImposters, value))
                  }));
                }}
                min={1}
                max={getMaxImposters(localSettings.numPlayers)}
              />
              <button
                className="settings-number-btn"
                onClick={() => setLocalSettings(prev => {
                  const maxImposters = getMaxImposters(prev.numPlayers);
                  return {
                    ...prev,
                    numImposters: Math.min(maxImposters, prev.numImposters + 1)
                  };
                })}
              >
                +
              </button>
            </div>
            <p className="settings-hint">
              Max: {getMaxImposters(localSettings.numPlayers)} imposters
            </p>
          </div>

          {/* Categories */}
          <div className="settings-section">
            <label className="settings-label">Categories</label>
            <div className="settings-categories">
              {themes.map(category => (
                <button
                  key={category}
                  className={`settings-category-btn ${
                    localSettings.categories.includes(category) ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryToggle(category)}
                >
                  <span className="settings-category-text">{category}</span>
                  {localSettings.categories.includes(category) && (
                    <span className="settings-category-check"> ✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Hint Toggle */}
          <div className="settings-section">
            <label className="settings-label">Hint</label>
            <div className="settings-toggle-group">
              <button
                className={`settings-toggle ${localSettings.hintEnabled ? 'enabled' : 'disabled'}`}
                onClick={() => setLocalSettings(prev => ({
                  ...prev,
                  hintEnabled: !prev.hintEnabled
                }))}
              >
                <span className="settings-toggle-slider"></span>
                <span className="settings-toggle-label">
                  {localSettings.hintEnabled ? 'ON' : 'OFF'}
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="settings-modal-footer">
          <button className="settings-btn settings-btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="settings-btn settings-btn-save" onClick={handleSave}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;

