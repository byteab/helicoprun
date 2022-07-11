/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import RetryImageUrl from '../assets/refresh.png'
import { Button } from '../components/Button'
import { GlobalSpinner } from '../components/GlobalSpinner'
import { store } from '../store'

export const GameOver = () => {
  const snap = useSnapshot(store)
  const [claimState, setClaimState] = React.useState<
    'idle' | 'loading' | 'claimed' | 'failed'
  >('idle')
  const claimTokens = async () => {
    setClaimState('loading')
    setTimeout(() => {
      setClaimState('claimed')
      store.currentBalance += store.score / 100
    }, 3000)
  }
  const getBalance = async () => {
    // get balance
    setTimeout(() => {
      store.currentBalance = 100
    }, 100)
  }
  React.useEffect(() => {
    getBalance()
  }, [])

  const reloadTheGame = () => {
    store.step = 'game'
  }
  return (
    <Wrapper>
      <CardWrapper>
        <Card>
          <Image onClick={reloadTheGame} src={RetryImageUrl} />
          <ColumnsGroup>
            <FirstColumn>
              <Text>Score {snap.score}</Text>
              <Text>
                Earning: {snap.score / 100} <span>ENG</span>
              </Text>
              <Text>
                Currnet Balance: {snap.currentBalance} <span>ENG</span>
              </Text>
            </FirstColumn>
            <SecondColumn>
              {claimState !== 'claimed' ? (
                <Button
                  variant="small"
                  disabled={claimState === 'loading'}
                  title="Claim Tokens"
                  onClick={claimTokens}
                />
              ) : null}
            </SecondColumn>
          </ColumnsGroup>
          {claimState === 'loading' ? <GlobalSpinner /> : null}
        </Card>
      </CardWrapper>
    </Wrapper>
  )
}

const Image = styled.img`
  width: 100px;
  align-self: center;
  opacity: 0.6;

  &:hover {
    opacity: 0.8;
  }
`

const Text = styled.h1`
  font-size: 1.3rem;
  color: hsl(1000, 0%, 30%);
  text-align: left;
  margin-right: var(--margin-right);
  & span {
    color: red;
    font-size: 0.9rem;
  }
`

const FirstColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 40px;
`
const SecondColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

const ColumnsGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  padding: 30px 40px;
  border-radius: 10px;
`

const Card = styled.div`
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  background-color: hsla(100, 0%, 70%, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
