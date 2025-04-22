// src/components/ChatbotButton.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

// Red
// 'linear-gradient(rgb(234, 33, 57) 0%, rgb(200, 16, 46) 100%)',
// background-color: #EA2139;
// 'rgb(200, 16, 46)';
//   background-color: #C8102E;

// Green
// background-color: #28a745;
//   &:hover {
//   background-color: #218838;
// }


const Button = styled.button`
  position: fixed;
  bottom: 20px;
  ${(props) => (props.$isRTL ? 'left: 20px;' : 'right: 20px;')}
  width: 80px; /* Increased size */
  height: 80px; /* Increased size */
  background: ${(props) => props.theme.buttons.background};
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 32px; /* Larger icon */
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  &:hover {
    background-color: ${(props) => props.theme.buttons.hoverBackground};
  }
`;

function ChatbotButton({ isRTL, toggleChatbot }) {
  const { t } = useTranslation();

  return (
    <Button onClick={toggleChatbot} $isRTL={isRTL} aria-label={t('Chatbot')}>
      💬
    </Button>
  );
}

export default ChatbotButton;