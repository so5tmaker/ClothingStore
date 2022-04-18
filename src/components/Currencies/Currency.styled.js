import React from 'react';
import styled from 'styled-components';

const StyledCurrrencyList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  right: 800px;
  top: 70px;
  width: fit-content;
  font-family: "Raleway";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 160%;
  color: #1d1f22;
  box-shadow: 0px 0px 30px rgba(223, 220, 220, 0.5);
  padding: 15px;
  background: #ffffff;
  top:${({ top }) => top};
  left:${({ left }) => left};
`;

export const CurrrencyItem = styled.div`
  margin: 0px 0px;
  padding: 10px;
  :hover {
    background-color: #5ece7b;
    cursor: pointer;
`;

export const CurrrencyList = (props) => {
  return <StyledCurrrencyList {...props} />
};