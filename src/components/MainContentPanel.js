// src/components/MainContentPanel.js
import React, { useState, useEffect, useContext, useRef } from 'react';
import styled from 'styled-components';
import StateDataDisplay from './StateDataDisplay';
import MessageList from './MessageList';
import Tabs from './Tabs';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';
import { useChatbotContext } from '../contexts/ChatbotContext';
import { useShoppingList } from '../contexts/ShoppingListContext';

const MainContentContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.$isRTL ? 'row-reverse' : 'row')};
  background-color: #f1f1f1;
  overflow: hidden;
  flex: 1;
`;

const ContentColumn = styled.div`
  flex: 1; /* Takes all remaining space */
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MainHeader = styled.div`
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  padding: 10px;
  font-size: 1.75rem; /* ≈ 28px */
  font-weight: 400;
  text-align: left;
  height: 41px; /* Explicitly set to match ExpandCollapseButton */
  line-height: 1; /* Ensure text aligns vertically */
  display: flex;
  align-items: center;
`;

const TopSection = styled.div`
  flex-basis: ${(props) => (props.$isMessageListVisible ? props.$topHeight : 100)}%;
  flex-shrink: 0;
  flex-grow: 0;
  overflow-y: auto;
  padding: 20px;
  transition: flex-basis 0.1s ease;
`;

const Splitter = styled.div`
  height: 8px;
  background: #ccc;
  cursor: row-resize;
  flex-shrink: 0;
  flex-grow: 0;

  &:hover {
    background: #aaa;
  }
`;

const BottomSection = styled.div`
  flex-basis: ${(props) => 100 - props.$topHeight}%;
  overflow-y: auto;
  border-top: 1px solid #ccc;
  transition: flex-basis 0.1s ease;
`;

function MainContentPanel({
  data,
  isRTL,
  isMessageListVisible,
  messages,
  onBotActionClick,
  activeTab,
  onSetActiveTab,
}) {
  const { t } = useTranslation();
  const { themeName } = useContext(ThemeContext);
  const { userId, userToken } = useContext(AuthContext);
  const { chatbotContext } = useChatbotContext();
  const { shoppingList } = useShoppingList();

  const [topHeight, setTopHeight] = useState(70);
  const contentColumnRef = useRef(null);
  const [incomingContext, setIncomingContext] = useState(null);

  useEffect(() => {
    if (chatbotContext) {
      console.log('Chatbot sees new context doc:', chatbotContext);
      setIncomingContext(chatbotContext);
    }
  }, [chatbotContext]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!contentColumnRef.current) return;
    const containerRect = contentColumnRef.current.getBoundingClientRect();
    const offsetY = e.clientY - containerRect.top;
    const containerHeight = containerRect.height;

    let newTopHeight = (offsetY / containerHeight) * 100;
    if (newTopHeight < 10) newTopHeight = 10;
    if (newTopHeight > 90) newTopHeight = 90;

    setTopHeight(newTopHeight);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <MainContentContainer $isRTL={isRTL}>
      <Tabs activeTab={activeTab} onTabChange={onSetActiveTab} isRTL={isRTL} />
      <ContentColumn ref={contentColumnRef}>
        <MainHeader>{t('Tabs.' + activeTab)}</MainHeader>
        <TopSection $topHeight={topHeight} $isMessageListVisible={isMessageListVisible}>
          <StateDataDisplay
            activeTab={activeTab}
            data={data}
            isRTL={isRTL}
            handleRecipeClick={(recipeId) => {
              console.log('Recipe clicked:', recipeId);
            }}
          />
        </TopSection>
        {isMessageListVisible && (
          <>
            <Splitter onMouseDown={handleMouseDown} />
            <BottomSection $topHeight={topHeight}>
              <MessageList messages={messages} onActionClick={onBotActionClick} />
            </BottomSection>
          </>
        )}
      </ContentColumn>
    </MainContentContainer>
  );
}

export default MainContentPanel;