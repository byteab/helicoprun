import React from 'react'
import Phaser from 'phaser'
import './App.css'
import { config } from './phaser'
import { Start } from './pages/Start'
import { GameOver } from './pages/GameOver'
import { useSnapshot } from 'valtio'
import { store } from './store'
import { ToastContainer } from 'react-toastify'

let game: Phaser.Game | null = null

function App() {
  const snap = useSnapshot(store)

  if (snap.step === 'game') {
    if (game === null) {
      game = new Phaser.Game(config)
    }
  }

  if (snap.step === 'start') {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          pauseOnFocusLoss
          pauseOnHover
          role="error"
        />
        <Start />
      </>
    )
  } else if (snap.step === 'gameOver') {
    return (
      <>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          pauseOnFocusLoss
          pauseOnHover
          role="error"
        />
        <GameOver />
      </>
    )
  } else {
    return <></>
  }
}

export default App
