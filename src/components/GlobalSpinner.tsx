import * as React from 'react'
import styled from 'styled-components'

export function GlobalSpinner() {
  return (
    <Wrapper>
      <LoaderContainer>
        <Spinner />
      </LoaderContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  isolation: isolate;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`

const LoaderContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
`
const Spinner = styled.div`
  width: 64px;
  height: 64px;
  border: 8px solid;
  border-color: #fff transparent #fff transparent;
  border-radius: 50%;
  animation: spin-anim 1.2s linear infinite;
`
