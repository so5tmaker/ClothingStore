import React from 'react';
import styled from 'styled-components';

const StyledAttributesBox = styled.div`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: ${({ selected }) => (selected ? 'white' : '#1d1f22')};
  width: 63px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  cursor: ${props => props.detail ? 'pointer' : 'text'};
  background: ${({ background }) => background};
  border: 1px solid ${({ selected }) => (selected ? '#1d1f22' : '#A6A6A6')};
`;

export const AttributesBox = (props) => {
  return <StyledAttributesBox {...props} />
};