import React, { useState } from "react";
import styled from "styled-components";

const Tag = (props: { type: string, value: string | number }) => {
  const { type, value } = props;
  let color: string;
  let background: string;

  switch (type) {
    case "credits":
      color = "#08671D";
      background = "#C1FFED";
      break;
    case "verifier":
      color = "#6300B1";
      background = "#EFEBFF";
      break;
    case "country":
      color = "#404040";
      background = "#F0F0F0";
      break;
    case "rating":
      color = "#404040";
      background = "#DBDBDB";
      break;
    case "year":
      color = "#B100A0";
      background = "#FDCBEF";
      break;
    case "purpose":
      color = "#D36500";
      background = "#FFF5EB";
      break;
    default:
      color = "#404040";
      background = "#F0F0F0";
      break;
  }

  return (
    <StyledTag color={color} tagBackground={background}>
      {value}
    </StyledTag>
  );
};

const StyledTag = styled.span`
    padding: 5px 12px;
    background-color: ${({ tagBackground }) => tagBackground};
    color: ${({ color }) => color};
    font-size: 10px;
    font-weight: 700;
    margin: 2px;
    border-radius: 100px;
`;

export default Tag;
