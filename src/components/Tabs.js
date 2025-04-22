// src/components/Tabs.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import {
  FaHome,
  FaListUl,
  FaShoppingCart,
  FaUtensils,
  FaCalendarAlt,
  FaUser,
  FaChevronLeft,
  FaChevronRight,
} from 'react-icons/fa';

// Styles
const TabsWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${(props) => (props.$expanded ? '220px' : '60px')}; /* Toggle between expanded and collapsed */
  background-color: ${(props) => props.theme.colors.background};
  z-index: 2;
  transition: width 0.3s ease; /* Smooth transition */
`;

const ExpandCollapseButton = styled.button`
  width: 100%;
  height: 41px; /* Matches MainHeader height (10px padding + 1.75rem font-size + border) */
  background-color: ${(props) => props.theme.colors.header};
  color: ${(props) => props.theme.colors.headerText};
  border: none;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.messageListBackground};
  }
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex: 1;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  position: relative;
  width: 100%;
  padding: ${(props) => (props.$expanded ? '20px 20px' : '20px 10px')};
  background: ${(props) =>
    props.$active ? props.theme.colors.messageListBackground : 'transparent'};
  color: ${(props) =>
    props.$active ? props.theme.colors.text : props.theme.colors.secondary};
  border: none;
  border-left: ${(props) =>
    props.$active && !props.$isRTL ? '4px solid ' + props.theme.colors.primary : 'none'};
  border-right: ${(props) =>
    props.$active && props.$isRTL ? '4px solid ' + props.theme.colors.primary : 'none'};
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: ${(props) => (props.$active ? '700' : '400')};
  text-align: ${(props) => (props.$isRTL ? 'right' : 'left')};
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${(props) => props.theme.colors.messageListBackground};
    color: ${(props) => props.theme.colors.text};
  }

  &:hover .popup-text {
    display: block; /* Show popup on hover regardless of expanded state */
  }
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: ${(props) => (props.$expanded && !props.$isRTL ? '8px' : '0')};
  margin-left: ${(props) => (props.$expanded && props.$isRTL ? '8px' : '0')};
`;

const TabText = styled.span`
  display: ${(props) => (props.$expanded ? 'inline' : 'none')}; /* Show text only when expanded */
`;

const PopupText = styled.span`
  display: none; /* Hidden by default, shown on hover */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${(props) => (props.$isRTL ? 'right: 60px;' : 'left: 60px;')};
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  padding: 8px 12px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 10;
  pointer-events: none;
`;

const TabImage = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
`;

function Tabs({ activeTab, onTabChange, isRTL }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false); // Default to collapsed

  const tabs = [
    { id: 'FOR_YOU', name: 'Suggestions', icon: <FaHome />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/0bddf8f7-f279-403b-92a8-c5f1cbee7506___3f0be00a37959d0ac96a78253e272f14.png' },
    { id: 'SHOPPING_LIST', name: 'Shopping List', icon: <FaListUl />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/421e7e71-049b-4412-ac36-401e445502b2___d2f57847aba57998a86c37162b382146.png' },
    { id: 'CART', name: 'Cart', icon: <FaShoppingCart />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/fa1c94ae-f5e7-4c5e-bcf8-82f6234b1693___14d16b16ec56effb31d886ba08e856cd.png' },
    { id: 'PANTRY', name: 'I Have...', icon: <FaListUl />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/d3f76007-d252-40f0-9f53-7e3f992cabfa___aa3fa6fdea3750daac45c461f2d1d0c8.png' },
    { id: 'RECIPES', name: 'Recipes', icon: <FaUtensils />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/a34662d9-a50c-424c-a55c-9329c05c64c5___6dfe5b4a8c4e056c51f213bde7569a02.png' },
    { id: 'MEAL_PLANS', name: 'Meal Plans', icon: <FaCalendarAlt />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/6ed6009c-ef4a-46c0-9fb3-42350657dbca___1b30b1e675d852c4bb75ca272fdbf0ad.png' },
    { id: 'ABOUT_ME', name: 'About Me', icon: <FaUser />, image: 'https://tmgrocery.vtexassets.com/assets/vtex.file-manager-graphql/images/5bd0e136-2eec-4b53-9057-221f9a59e435___9cc751f108dd9ad250ce0b06418bf769.png' },
  ];

  const handleTabClick = (tabId) => {
    onTabChange(tabId);
  };

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <TabsWrapper $expanded={expanded}>
      <ExpandCollapseButton onClick={toggleExpand} aria-label={expanded ? 'Collapse' : 'Expand'}>
        {expanded ? (isRTL ? <FaChevronRight /> : <FaChevronLeft />) : (isRTL ? <FaChevronLeft /> : <FaChevronRight />)}
      </ExpandCollapseButton>
      <TabsContainer role="tablist">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const hasImage = tab.image && tab.image.trim() !== '';

          return (
            <Tab
              key={tab.id}
              role="tab"
              $active={isActive}
              $isRTL={isRTL}
              $expanded={expanded}
              onClick={() => handleTabClick(tab.id)}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              title={t('Tabs.' + tab.id)}
            >
              <IconWrapper $expanded={expanded} $isRTL={isRTL}>
                {hasImage ? (
                  <TabImage src={tab.image} alt={`${tab.name} icon`} />
                ) : (
                  tab.icon
                )}
              </IconWrapper>
              <TabText $expanded={expanded}>{t('Tabs.' + tab.id)}</TabText>
              <PopupText className="popup-text" $isRTL={isRTL}>
                {t('Tabs.' + tab.id)}
              </PopupText>
            </Tab>
          );
        })}
      </TabsContainer>
    </TabsWrapper>
  );
}

export default Tabs;