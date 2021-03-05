import React from 'react'
import NewEntry from '../NewEntry'
import styled from 'styled-components'

const StyledHeader = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  background-color: #212121;
  padding: 20px;
  box-sizing: border-box;
`

const Header = () => {
  return (
    <StyledHeader>
      <NewEntry />
    </StyledHeader>
  )
}

export default Header