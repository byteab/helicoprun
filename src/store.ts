import { proxy } from 'valtio'

export const store = proxy<{
  authenticateState:
    | 'idle'
    | 'not-authenitcated'
    | 'loading'
    | 'authenticated'
    | 'skip'
  score: number
  step: 'start' | 'gameOver' | 'game'
  currentBalance: number
  account: string
}>({
  authenticateState: 'not-authenitcated',
  score: 0,
  step: 'start',
  currentBalance: 0,
  account: '',
})
