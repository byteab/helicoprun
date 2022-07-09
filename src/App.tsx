import React from 'react'
import Phaser from 'phaser'
import './App.css'
import { config } from './phaser'

let game: Phaser.Game | null = null

function App() {
  const [isLoaded, setLoaded] = React.useState(false)

  if (!isLoaded) {
    setLoaded(true)
    if (game === null) {
      game = new Phaser.Game(config)
    }
  }
  return <></>
}

export default App
