// src/components/CloseButton.js
import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #ffffff;
  font-size: 1.2rem;

  &:hover {
    color: #ff0000;
  }
`;

function CloseButton({ onClick }) {
  return (
    <Button onClick={onClick} aria-label="Close">
      <FaTimes />
    </Button>
  );
}

export default CloseButton;