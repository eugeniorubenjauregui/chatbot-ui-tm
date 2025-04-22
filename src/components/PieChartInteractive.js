// src/components/PieChartInteractive.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PieChartContainer = styled.div`
  width: 100%;
  height: 300px;
  /* Add your pie chart styling or integrate a chart library here */
  background-color: #f0f0f0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PieChartInteractive = ({ onChange, data }) => {
  // Implement the interactive pie chart logic here
  return (
    <PieChartContainer>
      {/* Placeholder for the pie chart */}
      <p>Pie Chart Interactive Component</p>
    </PieChartContainer>
  );
};

PieChartInteractive.propTypes = {
  onChange: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default PieChartInteractive;