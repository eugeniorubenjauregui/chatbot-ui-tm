// src/components/SelectOption.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-sizing: border-box;
`;

const SelectDropdown = ({ options, value, onChange }) => (
  <StyledSelect value={value} onChange={onChange}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </StyledSelect>
);

SelectDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectDropdown;