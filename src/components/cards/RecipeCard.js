// src/components/cards/RecipeCard.js
import React, { useState } from 'react';
import styled from 'styled-components';
import BaseCard from './BaseCard';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Rating from 'react-rating';
import { FaRegStar, FaStar } from 'react-icons/fa';

const RecipeContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isRTL ? 'flex-end' : 'flex-start')};
`;

const Description = styled.p`
  margin-top: 12px;
  color: ${(props) => props.theme.colors.text};
`;

const IngredientsList = styled.ul`
  margin: 8px 0;
  padding-left: ${(props) => (props.$isRTL ? '0' : '20px')};
  padding-right: ${(props) => (props.$isRTL ? '20px' : '0')};
  list-style-type: disc;
`;

const InstructionsList = styled.ol`
  margin: 8px 0;
  padding-left: ${(props) => (props.$isRTL ? '0' : '20px')};
  padding-right: ${(props) => (props.$isRTL ? '20px' : '0')};
`;

const ToolsList = styled.ul`
  margin: 8px 0;
  padding-left: ${(props) => (props.$isRTL ? '0' : '20px')};
  padding-right: ${(props) => (props.$isRTL ? '20px' : '0')};
  list-style-type: square;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0;
`;

function RecipeCard({ data, isRTL, actionMenu }) {
  const { t } = useTranslation();
  const [rating, setRating] = useState(0);

  const handleActionClick = (action) => {
    switch (action) {
      case 'notInterestedSpecific':
        console.log('Not interested in this specific recipe');
        break;
      case 'notInterestedType':
        console.log('Not interested in this type of recipe');
        break;
      case 'saveForLater':
        console.log('Recipe saved for later');
        break;
      default:
        console.log(`Action "${action}" triggered`);
    }
  };

  const handleContentClick = () => {
    // Navigate to the recipe details page
    console.log('Navigating to recipe details');
  };

  return (
    <BaseCard
      title={data.title}
      headerColor="#ffd5a0" // Half-tone lighter color
      bgColor={data.bgColor}
      onActionClick={handleActionClick}
      onContentClick={handleContentClick}
      showRating={true}
      isRTL={isRTL}
      actionMenu={actionMenu}
    >
      <RecipeContent $isRTL={isRTL}>
        <Description>{t(data.description)}</Description>

        <h3>{t('Ingredients')}</h3>
        <IngredientsList $isRTL={isRTL}>
          {data.ingredients.map((ingredient, index) => (
            <li key={index}>{t(ingredient)}</li>
          ))}
        </IngredientsList>

        <h3>{t('Instructions')}</h3>
        <InstructionsList $isRTL={isRTL}>
          {data.instructions.map((instruction, index) => (
            <li key={index}>{t(instruction)}</li>
          ))}
        </InstructionsList>

        <h3>{t('Tools')}</h3>
        <ToolsList $isRTL={isRTL}>
          {data.tools.map((tool, index) => (
            <li key={index}>{t(tool)}</li>
          ))}
        </ToolsList>
      </RecipeContent>

      {/* Rating Component */}
      <RatingWrapper>
        <span>{t('Rate this Recipe')}:</span>
        <Rating
          initialRating={rating}
          onChange={(rate) => setRating(rate)}
          emptySymbol={<FaRegStar color="#ffc107" size={20} />}
          fullSymbol={<FaStar color="#ffc107" size={20} />}
          aria-label={t('Rating')}
        />
      </RatingWrapper>
    </BaseCard>
  );
}

RecipeCard.propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      ingredients: PropTypes.arrayOf(PropTypes.string),
      instructions: PropTypes.arrayOf(PropTypes.string),
      tools: PropTypes.arrayOf(PropTypes.string),
      bgColor: PropTypes.string,
    }).isRequired,
  isRTL: PropTypes.bool,
  actionMenu: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};


export default RecipeCard;