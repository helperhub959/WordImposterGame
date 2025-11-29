import { useState } from 'react'
import SettingsModal, { type GameSettings } from './components/SettingsModal'
import PlayerGrid from './components/PlayerGrid'
import { getRandomWord, getRandomFrontText } from './data/words'
import './App.css'

const DEFAULT_SETTINGS: GameSettings = {
  numPlayers: 6,
  numImposters: 2,
  categories: ['animals', 'foods', 'jobs'],
  hintEnabled: true
}

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS)


  const handleSaveSettings = (newSettings: GameSettings) => {
    setSettings(newSettings)
    console.log('Settings saved:', newSettings)
  }

  return (
    <>
      <div style={{ position: 'relative', width: '100%' }}>
        <button 
          onClick={() => setIsSettingsOpen(true)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: '600',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#5568d3'}
          onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
        >
          Game Settings
        </button>
      </div>

      <h1>Imposter Game</h1>
      
      <PlayerGrid settings={settings} />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={handleSaveSettings}
      />
    </>
  )
}

export default App
