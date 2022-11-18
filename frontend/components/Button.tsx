import React from 'react'
import styled from 'styled-components';

const Button = (props: { handler: any, text: string, disabled: boolean }) => {
  const { handler, text, disabled } = props;
  
  return (
    <StyledButton disabled={disabled} onClick={handler}>{text}</StyledButton>
  )
}

const StyledButton = styled.button`
  text-align: center;
  padding: 15px 30px;
  border-radius: 100px;
  background-color: ${({ disabled }) => disabled ? '#49494935' : '#494949' };
  color: white;
  font-size: 20px;
  font-weight: 700;
  border: none;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  margin: auto;
`;

export default Button;
