import { useState } from 'react'
import PlayerGrid from './components/PlayerGrid'
import './App.css'


function App() {

  return (
    <>
      <h1>Imposter Game</h1>
      
      <PlayerGrid settings={undefined} />

    </>
  )
}

export default App
