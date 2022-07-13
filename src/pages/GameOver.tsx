/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ethers } from 'ethers'
import * as React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import RetryImageUrl from '../assets/refresh.png'
import { Button } from '../components/Button'
import { GlobalSpinner } from '../components/GlobalSpinner'
import { store } from '../store'
import abi from '../assets/abi.json'
import { CONTRACT_ADDRESS, GOD_WOKEN_TESTNET_CHAIN_ID } from '../constants'
import { Dialog } from '../components/Dialog'

export const GameOver = () => {
  const snap = useSnapshot(store)
  const [claimState, setClaimState] = React.useState<
    'idle' | 'loading' | 'claimed' | 'failed' | 'need-to-connect'
  >('idle')
  // the authenticated is because of async nature of snap.authenticateState
  const claimTokens = async (account?: string) => {
    if (!account && snap.authenticateState === 'not-authenitcated') {
      setClaimState('need-to-connect')
      return
    }
    setClaimState('loading')
    const tokenAmountToClaim = store.score / 100
    const ethereum = window.ethereum
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
      const _account = snap.account || account
      if (_account) {
        await contract.mint(
          _account,
          ethers.utils.parseEther(String(tokenAmountToClaim))
        )
        setClaimState('claimed')
      } else {
        toast.error('Your account is not set yet!')
        setClaimState('failed')
      }
    } else {
      setClaimState('failed')
      toast.error('Please make sure metamask is installed!')
    }
  }
  const getBalance = async () => {
    // get balance
    const ethereum = window.ethereum
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer)
      if (snap.account) {
        const balance = await contract.balanceOf(snap.account)
        const formatedValue = Number(ethers.utils.formatEther(balance))
        store.currentBalance = formatedValue
      } else {
        toast.error('Your account is not set yet!')
      }
    } else {
      toast.error('Please make sure metamask is installed!')
    }
  }

  React.useEffect(() => {
    if (snap.authenticateState === 'authenticated') {
      getBalance()
    }
  }, [snap.authenticateState])

  const connectWithMetamask = async () => {
    if (window.ethereum) {
      /**
       * get me all ethereum accounts. if I am already authorized in [Metamask]
       */
      try {
        store.authenticateState = 'loading'
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        if (
          (await provider.getNetwork()).chainId !== GOD_WOKEN_TESTNET_CHAIN_ID
        ) {
          toast.error('Please make sure you are using Godwoken testnet')
          store.authenticateState = 'not-authenitcated'
          return
        }
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length) {
          store.account = accounts[0]
          store.authenticateState = 'authenticated'
          claimTokens(accounts[0])
        } else {
          store.authenticateState = 'not-authenitcated'
        }
      } catch (error) {
        store.authenticateState = 'not-authenitcated'
      }
    } else {
      toast.error('Please make sure Metamask is installed!')
    }
  }

  const reloadTheGame = () => {
    store.step = 'game'
  }
  return (
    <Wrapper>
      {claimState === 'need-to-connect' ? (
        <Dialog
          onAccept={connectWithMetamask}
          onReject={() => setClaimState('idle')}
        />
      ) : null}
      <CardWrapper>
        <Card>
          <Image onClick={reloadTheGame} src={RetryImageUrl} />
          <ColumnsGroup>
            <FirstColumn>
              <Text>Score: {snap.score}</Text>
              <Text>
                Earning: {snap.score / 100} <span>ENG</span>
              </Text>
              <Text>
                {snap.currentBalance
                  ? `Currnet Balance: ${Number(snap.currentBalance).toFixed(
                      3
                    )} `
                  : ''}
                {snap.currentBalance ? <span>ENG</span> : ''}
              </Text>
            </FirstColumn>
            <SecondColumn>
              {claimState !== 'claimed' ? (
                <Button
                  variant="small"
                  disabled={claimState === 'loading'}
                  title="Claim Tokens"
                  onClick={() => claimTokens()}
                />
              ) : (
                <ClaimedText>Claimed</ClaimedText>
              )}
            </SecondColumn>
          </ColumnsGroup>
          {claimState === 'loading' || snap.authenticateState === 'loading' ? (
            <GlobalSpinner />
          ) : null}
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
  min-width: 300px;
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
  min-width: 200px;
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
  min-height: 40%;
`

const Card = styled.div`
  justify-content: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
`

const ClaimedText = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  text-transform: uppercase;
  color: hsl(40, 100%, 50%);
  transform: rotateZ(-20deg);
`

const Wrapper = styled.div`
  background-color: hsla(100, 0%, 70%, 0.7);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`
