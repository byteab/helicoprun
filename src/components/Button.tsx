/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from 'react'
import styled from 'styled-components'

interface Props {
  title: string
  disabled?: boolean
  onClick?: any
  variant?: 'small' | 'medium' | 'large'
  type?: 'primary' | 'cancel'
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

const BUTTON_TYPE = {
  primary: {
    backgroundColor: 'hsl(6, 100%, 24%)',
    backgroundColorDisabled: 'hsl(6, 30%, 24%)',
    textColor: 'hsl(0, 0%, 98%)',
    backgroundColorHover: 'hsl(6, 100%, 34%)',
    backgroundColorHoverDisabled: 'hsl(6, 30%, 24%)',
  },
  cancel: {
    backgroundColor: '#fff',
    backgroundColorDisabled: 'hsl(0, 0%, 95%)',
    textColor: 'hsl(0, 0%, 10%)',
    backgroundColorHover: 'hsl(0, 0%, 93%)',
    backgroundColorHoverDisabled: 'hsl(0, 0%, 95%)',
  },
}

export const Button: React.FC<Props> = ({
  title,
  disabled,
  onClick,
  variant = 'large',
  type = 'primary',
}) => {
  const fontSize = VARIANTS[variant].fontSize
  const padding = VARIANTS[variant].padding
  const backgroundColor = BUTTON_TYPE[type].backgroundColor
  const backgroundColorDisabled = BUTTON_TYPE[type].backgroundColorDisabled
  const backgroundColorHover = BUTTON_TYPE[type].backgroundColorHover
  const backgroundColorHoverDisabled =
    BUTTON_TYPE[type].backgroundColorHoverDisabled
  const textColor = BUTTON_TYPE[type].textColor
  return (
    <ButtonElem
      onClick={onClick}
      style={{
        //@ts-ignore
        '--bg-color': disabled ? backgroundColorDisabled : backgroundColor,
        '--font-size': fontSize + 'rem',
        '--padding': padding,
        '--font-color': textColor,
        '--bg-color-hover': disabled
          ? backgroundColorHoverDisabled
          : backgroundColorHover,
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
  line-height: 100%;
  background-color: var(--bg-color);
  color: var(--font-color);
  border-radius: 5px;
  letter-spacing: 2px;
  border: 1px solid hsl(0, 0%, 10%);

  &:hover {
    background-color: var(--bg-color-hover);
  }
`
