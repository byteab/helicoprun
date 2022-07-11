/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  disabled?: boolean
  onClick?: () => void
  variant?: 'small' | 'medium' | 'large'
}

const VARIANTS = {
  small: {
    fontSize: 0.9,
    padding: '10px 20px',
  },
  medium: {
    fontSize: 1,
    padding: '15px 25px',
  },
  large: {
    fontSize: 1.7,
    padding: '20px 30px',
  },
}

export const Button: React.FC<Props> = ({
  title,
  disabled,
  onClick,
  variant = 'large',
}) => {
  const fontSize = VARIANTS[variant].fontSize
  const padding = VARIANTS[variant].padding
  return (
    <ButtonElem
      onClick={onClick}
      style={{
        //@ts-ignore
        '--bg-color': disabled ? 'hsl(6, 30%, 24%)' : 'hsl(6, 100%, 24%) ',
        '--font-size': fontSize + 'rem',
        '--padding': padding,
      }}
      disabled={disabled}
    >
      {title}
    </ButtonElem>
  )
}

const ButtonElem = styled.button`
  border: none;
  padding: var(--padding);
  font-size: var(--font-size);
  background-color: var(--bg-color);
  color: #fff;
  border-radius: 5px;
  letter-spacing: 2px;

  &:hover {
    background-color: ${(p) =>
      p.disabled ? 'hsl(6, 30%, 24%)' : 'hsl(6, 100%, 34%)'};
  }
`
