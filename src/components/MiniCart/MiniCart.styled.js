import React from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: absolute;
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  color: #1d1f22;
  padding: 15px;
  background: #ffffff;
  top: 100px;
  max-height: ${({ overflows }) => (overflows ? '900px' : 'unset')};
  overflow-y: ${({ overflows }) => (overflows ? 'scroll' : 'unset')};
  box-shadow: ${({ border }) => (border ? '0px 0px 30px rgba(223, 220, 220, 0.5)' : 'none')};
  left: ${({ left }) => left}px;
`;

export const MiniCartContainer = (props) => {
  return <StyledContainer {...props} />
};

const StyledAmount = styled.div`
  font-family: Raleway;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  margin-top:${({ marginTop }) => marginTop}
`;

export const MiniCartAmount = (props) => {
  return <StyledAmount {...props} />
};