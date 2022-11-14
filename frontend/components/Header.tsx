import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import logo from '../public/logo.png';
import Wallet from './Wallet';

const Header = () => {
  return (
    <StyledDiv>
      <Image src={logo} alt="Hypertally" />
      <Wallet />
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: auto;
  max-width: 100%;
  margin: 50px 200px;
  align-items: center;
  justify-content: space-between;
`;

export default Header;