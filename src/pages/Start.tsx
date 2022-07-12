import { ethers } from 'ethers'
import * as React from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import { useSnapshot } from 'valtio'
import { Button } from '../components/Button'
import { GlobalSpinner } from '../components/GlobalSpinner'
import { GOD_WOKEN_TESTNET_CHAIN_ID } from '../constants'
import RetryImageUrl from '../assets/refresh.png'
import { store } from '../store'

// preload images
const img = new Image()
img.src = RetryImageUrl

export function Start() {
  const snap = useSnapshot(store)
  const [account, setAccount] = React.useState<string | undefined>()
  const [loading, setLoading] = React.useState(false)

  const checkWalletConnectionStatus = async () => {
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
          method: 'eth_accounts',
        })
        if (accounts.length) {
          setAccount(accounts[0])
          store.authenticateState = 'authenticated'
          store.account = accounts[0]
        } else {
          store.authenticateState = 'not-authenitcated'
        }
      } catch (error) {
        store.authenticateState = 'not-authenitcated'
      }
    } else {
      toast.error('Please make sure Metamask is installed!')
      store.authenticateState = 'not-authenitcated'
    }
  }

  React.useEffect(() => {
    checkWalletConnectionStatus()
  }, [])

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
          setAccount(accounts[0])
          store.account = accounts[0]
          store.authenticateState = 'authenticated'
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

  const onButtonClick = () => {
    console.log('button clicked')
    connectWithMetamask()
  }

  return (
    <Wrapper>
      {loading ? <GlobalSpinner /> : <></>}
      <Card>
        {snap.authenticateState === 'idle' ||
        snap.authenticateState === 'loading' ? (
          <GlobalSpinner />
        ) : (
          <></>
        )}
        {snap.authenticateState === 'not-authenitcated' ? (
          <>
            <TitleElem>Please connect your wallet</TitleElem>
            <Button
              disabled={
                store.authenticateState === 'idle' ||
                store.authenticateState === 'loading'
              }
              onClick={onButtonClick}
              title="Connect"
            />
          </>
        ) : (
          <></>
        )}
        {snap.authenticateState === 'authenticated' ? (
          <Button
            onClick={() => {
              store.step = 'game'
            }}
            title="Start The Game"
          />
        ) : (
          <></>
        )}
      </Card>
    </Wrapper>
  )
}

const TitleElem = styled.h1`
  font-size: 2.5rem;
  margin: 100px 10px;
  font-weight: 400;
  color: hsl(0, 0%, 100%);
`

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
