import React from 'react';
import styled from 'styled-components';

const StyledAttributesBox = styled.div`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 0.05em;
  color: ${({ selected }) => (selected ? 'white' : '#1d1f22')};
  width: ${({ selected }) => (selected ? '61' : '63')}px;
  height: ${({ selected }) => (selected ? '43' : '45')}px;
  line-height: 45px;
  text-align: center;
  cursor: ${props => props.detail ? 'pointer' : 'text'};
  background: ${({ background }) => background};
  border:${({ bordered }) => (bordered)};
`;

const StyledDivBorder = styled.div`{
  height: 45px;
  width: 63px;
  border: ${({ selected }) => (selected ? '#44ff03 1px solid' : '')};
}`;

export const DivBorder = (props) => {
  return <StyledDivBorder {...props} />
};

export const AttributesBox = (props) => {
  return <StyledAttributesBox {...props} />
};