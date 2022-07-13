import * as React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

interface Props {
  onAccept: () => void
  onReject: () => void
}

export function Dialog({ onAccept, onReject }: Props) {
  return (
    <Wrapper>
      <Title>Please connect your wallet</Title>
      <Row>
        <Button onClick={onAccept} title="connect" variant="small" />
        <Button
          onClick={onReject}
          title="cancel"
          type="cancel"
          variant="small"
        />
      </Row>
    </Wrapper>
  )
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 10%;
`

const Wrapper = styled.div`
  width: 400px;
  height: 200px;
  background-color: #fff;
  box-shadow: 10px 10px 244px -17px rgba(0, 0, 0, 0.82);
  border-radius: 5px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  isolation: isolate;
  z-index: 2;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: hsl(0, 0%, 20%);
`
