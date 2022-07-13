import * as React from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button'
import RetryImageUrl from '../assets/refresh.png'
import { store } from '../store'

// preload images
const img = new Image()
img.src = RetryImageUrl

export function Start() {
  return (
    <Wrapper>
      <Card>
        <Button
          onClick={() => {
            store.step = 'game'
          }}
          title="Start The Game"
        />
      </Card>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(200, 30%, 20%);
`

const Card = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 70%;
  height: 70%;
  border-width: 5px;
  border-style: solid;
  border-color: hsl(150, 10%, 80%);
  background-color: hsl(0, 0%, 50%);
`
