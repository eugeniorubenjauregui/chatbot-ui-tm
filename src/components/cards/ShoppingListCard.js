// src/components/cards/ShoppingListCard.js
import React from 'react';
import styled from 'styled-components';
import BaseCard from './BaseCard';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ShoppingListContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isRTL ? 'flex-end' : 'flex-start')};
  padding-bottom: 24px; /* 24px of padding at the bottom */
  padding-left: 12px;
`;

const ItemsList = styled.ul`
  margin: 8px 0;
  padding-left: ${(props) => (props.$isRTL ? '0' : '20px')};
  padding-right: ${(props) => (props.$isRTL ? '20px' : '0')};
  list-style-type: disc;
`;

const TotalRow = styled.div`
  margin-top: 12px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.text};
`;

function ShoppingListCard({ data, isRTL, actionMenu }) {
  const { t } = useTranslation();

  const handleActionClick = (action) => {
    // Handle any card-level actions
    console.log(`ShoppingListCard: action "${action}" triggered`);
  };

  const handleContentClick = () => {
    // Possibly navigate to a details page or open a modal
    console.log('Navigating to ShoppingList details');
  };

  return (
    <BaseCard
      title={data.title} // e.g. "Replenish your Favorites from Produce"
      headerColor="#d0f0d0"
      bgColor={data.bgColor || '#ffffff'}
      onActionClick={handleActionClick}
      onContentClick={handleContentClick}
      showRating={false}
      isRTL={isRTL}
      actionMenu={actionMenu}
    >
      <ShoppingListContent $isRTL={isRTL}>
        <p>{t(`Category: ${data.categoryName}`)}</p>
        <h3>{t('Recommended Items')}</h3>

        <ItemsList $isRTL={isRTL}>
          {data.items.map((item, index) => (
            <li key={index}>
              {/* 
                Example format: 
                "Bananas x 3 = $4.50 total" 
                where item.estimatedCost is the line total for that item 
              */}
              {item.name} x {item.recommendedQty} = $
              {item.estimatedCost.toFixed(2)} 
            </li>
          ))}
        </ItemsList>

        <TotalRow>
          {t('Projected Total')}: ${data.projectedTotal.toFixed(2)}
        </TotalRow>
      </ShoppingListContent>
    </BaseCard>
  );
}

ShoppingListCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string,
    categoryName: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        recommendedQty: PropTypes.number,
        estimatedCost: PropTypes.number // This is our line total
      })
    ),
    projectedTotal: PropTypes.number, // sum of line totals
  }).isRequired,
  isRTL: PropTypes.bool,
  actionMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};

export default ShoppingListCard;
