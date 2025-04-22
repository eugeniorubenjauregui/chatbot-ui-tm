// src/components/AddPrefPopup.js
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PopupContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: ${(props) => props.theme.shadows.card};
`;

const AddPrefPopup = ({ preferences, onClose, onSelect }) => {
  return (
    <PopupOverlay onClick={onClose}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        <h2>Add Preference</h2>
        <ul>
          {preferences.map((pref) => (
            <li key={pref.id}>
              <button onClick={() => onSelect(pref)}>
                {pref.name}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose}>Close</button>
      </PopupContent>
    </PopupOverlay>
  );
};

AddPrefPopup.propTypes = {
  preferences: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default AddPrefPopup;