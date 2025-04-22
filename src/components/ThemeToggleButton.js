// src/components/ThemeToggleButton.js
import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;

  &:focus {
    outline: none;
  }
`;

function ThemeToggleButton() {
  const { toggleTheme, themeName } = useContext(ThemeContext);

  return (
    <ToggleButton onClick={toggleTheme} aria-label="Toggle Theme">
      {themeName === 'light' ? <FaMoon /> : <FaSun />}
    </ToggleButton>
  );
}

export default ThemeToggleButton;