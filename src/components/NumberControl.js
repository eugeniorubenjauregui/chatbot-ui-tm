// src/components/NumberControl.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  box-sizing: border-box;
`;

const NumberControl = ({ value, onChange, min, max }) => (
  <StyledInput
    type="number"
    value={value}
    min={min}
    max={max}
    onChange={onChange}
  />
);

NumberControl.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

NumberControl.defaultProps = {
  min: undefined,
  max: undefined,
};

export default NumberControl;