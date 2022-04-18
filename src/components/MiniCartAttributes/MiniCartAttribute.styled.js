import React from 'react';
import styled from 'styled-components';

const StyledAttributesBox = styled.div`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin-top: 6px;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  cursor: ${props => props.detail ? 'pointer' : 'text'};
  background: ${({ background }) => background};
  color: ${({ selected }) => (selected ? '#1d1f22' : '#A6A6A6')};
  border: 1px solid ${({ selected }) => (selected ? '#1d1f22' : '#A6A6A6')};
`;

export const MiniCartAttributesBox = (props) => {
  return <StyledAttributesBox {...props} />
};