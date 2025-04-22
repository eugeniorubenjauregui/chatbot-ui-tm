// src/components/QuickChatPopup.js
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Tabs from './Tabs'; // The same Tabs you had before

const Container = styled.div`
  position: relative;
`;

// background-color: #28a745;
// hover background-color: #218838;
const PlusButton = styled.button`
  margin-right: 10px;
  background: ${(props) => props.theme.buttons.background};
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;

  &:hover {
    background: ${(props) => props.theme.buttons.hoverBackground};
  }
`;

const PopupDialog = styled.div`
  position: absolute;
  bottom: 50px; /* or adjust to your layout */
  left: 0;      /* or right: 0, depending on your preference */
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  z-index: 1000;
  width: 250px; /* or match your full tab width if desired */
  max-height: 600px;
  overflow-y: auto;
`;

function QuickChatPopup({
  activeTab,
  setActiveTab, // We'll rely on the parent passing these
}) {
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const plusButtonRef = useRef(null);

  const handlePlusClick = () => {
    // setShowPopup((prev) => !prev);
  };

  // When user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPopup &&
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !plusButtonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  // 1) Local function that changes the tab and closes the popup
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowPopup(false);
  };

  return (
    <Container>
      <PlusButton onClick={handlePlusClick} ref={plusButtonRef} aria-label={t('Tabs Menu')}>
        <FaPlus />
      </PlusButton>
    </Container>
  );
}

export default QuickChatPopup;