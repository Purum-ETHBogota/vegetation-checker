import React from 'react'
import styled from 'styled-components';

const Button = (props: { handler: any, text: string }) => {
  const { handler, text } = props;
  
  return (
    <StyledButton onClick={handler}>{text}</StyledButton>
  )
}

const StyledButton = styled.button`
  text-align: center;
  padding: 15px 30px;
  border-radius: 100px;
  background-color: #494949;
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  margin: auto;
`;

export default Button;
