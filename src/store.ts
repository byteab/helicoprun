import { proxy } from 'valtio'

export const store = proxy<{
  authenticateState: 'idle' | 'not-authenitcated' | 'loading' | 'authenticated'
  score: number
  step: 'start' | 'gameOver' | 'game'
  currentBalance: number
  account: string
}>({
  authenticateState: 'idle',
  score: 0,
  step: 'start',
  currentBalance: 0,
  account: '',
})
