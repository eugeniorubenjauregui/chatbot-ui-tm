// src/components/cards/BaseCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShareAlt, FaHeart, FaEllipsisH } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useSwipeable } from 'react-swipeable';
import { useTranslation } from 'react-i18next';

const CardContainer = styled.div`
  background-color: ${(props) => props.$bgColor || props.theme.colors.cardBackground};
  border-radius: 8px;
  box-shadow: ${(props) => props.theme.shadows.card};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  background-color: ${(props) => props.theme.colors.cardHeader};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 16px;
`;

const Title = styled.h2`
  font-size: 1.1rem;
  margin: 0;
  text-align: ${(props) => (props.$isRTL ? 'right' : 'left')};
  color: ${(props) => props.theme.colors.textLight};
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 8px;
  margin-left: 8px;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.iconColor};

  &:hover {
    color: ${(props) => props.theme.colors.iconHover};
  }
`;

const CardContent = styled.div`
  padding: 0; /* Remove padding to let the video take full width */
  cursor: pointer;
  color: ${(props) => props.theme.colors.text};
  flex: none;
  width: 100%;
`;

const CardFooter = styled.div`
  background-color: ${(props) => props.theme.colors.cardFooter};
  height: 8px;
`;

const RatingContainer = styled.div`
  padding: 8px 16px;
  display: ${(props) => (props.$showRating ? 'block' : 'none')};
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 50px; /* Adjust based on header height */
  ${(props) => (props.$isRTL ? 'left: 16px;' : 'right: 16px;')}
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
`;

const OptionItem = styled.div`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.colors.messageListBackground};
  }
`;

function BaseCard({
  title,
  headerColor,
  bgColor,
  children,
  onActionClick,
  onContentClick,
  onRate,
  showRating,
  isRTL,
  actionMenu,
  ...rest
}) {
  const { t } = useTranslation();
  const [showOptions, setShowOptions] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      onActionClick('dislike');
    },
    onSwipedRight: () => {
      onActionClick('like');
    },
    delta: 50, // Minimum distance for swipe
  });

  const handleMoreClick = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionSelect = (optionName) => {
    onActionClick(optionName);
    setShowOptions(false);
  };

  return (
    <CardContainer $bgColor={bgColor} {...handlers} aria-label={t(title)} {...rest}>
      <CardHeader $headerColor={headerColor}>
        <Title $isRTL={isRTL}>{t(title)}</Title>
        <ActionButtons>
          <ActionButton onClick={() => onActionClick('share')} aria-label={t('Share')}>
            <FaShareAlt />
          </ActionButton>
          <ActionButton onClick={() => onActionClick('like')} aria-label={t('Like')}>
            <FaHeart />
          </ActionButton>
          <ActionButton onClick={handleMoreClick} aria-label={t('More Options')}>
            <FaEllipsisH />
          </ActionButton>
        </ActionButtons>
      </CardHeader>
      <CardContent onClick={onContentClick} role="button" tabIndex={0} aria-label={t('View Details')}>
        {children}
      </CardContent>
      {showRating && (
        <RatingContainer $showRating={showRating}>
          {/* Replace with your rating component */}
          <div>{t('Rating Component Placeholder')}</div>
        </RatingContainer>
      )}
      <CardFooter $headerColor={headerColor} />
      {showOptions && (
        <OptionsMenu $isRTL={isRTL} role="menu">
          {actionMenu.map((option) => (
            <OptionItem
              key={option.name}
              onClick={() => handleOptionSelect(option.name)}
              role="menuitem"
            >
              {t(option.text)}
            </OptionItem>
          ))}
        </OptionsMenu>
      )}
    </CardContainer>
  );
}

BaseCard.propTypes = {
  title: PropTypes.string.isRequired,
  headerColor: PropTypes.string,
  bgColor: PropTypes.string,
  children: PropTypes.node.isRequired,
  onActionClick: PropTypes.func,
  onContentClick: PropTypes.func,
  onRate: PropTypes.func,
  showRating: PropTypes.bool,
  isRTL: PropTypes.bool,
  actionMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};


export default BaseCard;