import React from 'react'
import styled from 'styled-components';

const Input = (props: { label: string, value: string, onChange: any}) => {
  const { label, value, onChange } = props;

  const handleChange = (e: any) => {
    onChange(e.target.value);
  }

  return (
    <StyledDiv>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput placeholder='Add coordinate' type="text" value={value} onChange={handleChange} />
    </StyledDiv>
  )
}

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
`;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 6px 70px;
`;

const StyledInput = styled.input`
  box-shadow: 4px 4px 76px -5px rgb(0 0 0 / 25%);
  border: none;
  height: 40px;
  padding: 10px;
  border-radius: 100px;
  text-align: center;
`;

export default Input;
