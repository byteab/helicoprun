import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
// setup phaser
import App from './App'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'

ReactDOM.createRoot(document.getElementById('root')!).render(<App />)

declare global {
  interface Window {
    ethereum?: any
  }
}
