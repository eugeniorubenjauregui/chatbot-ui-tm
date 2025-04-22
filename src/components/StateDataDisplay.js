// src/components/StateDataDisplay.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import Feed from './Feed';
import RecipeList from './RecipeList';
import ShoppingList from './ShoppingList';
import PantryList from './PantryList';
import AboutYou from './AboutYou'; // Import the new AboutYou component
import PropTypes from 'prop-types';
import { useShoppingList } from '../contexts/ShoppingListContext';

const DataContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* Prevent parent from scrolling */
  min-height: 0; /* Allow children to shrink */
`;

function StateDataDisplay({
  activeTab,
  data = {
    shoppingList: {
      id: '',
      name: 'Shopping List',
      listItems: [],
    },
    recipes: [],
  },
  isRTL = false,
  handleRecipeClick,
}) {
  const { t } = useTranslation();

  const { shoppingList } = useShoppingList();
  console.log('Shopping List (as reported to StateDataDisplay):', shoppingList);

  // Switch based on 'id' values
  const renderContent = () => {
    switch (activeTab) {
      case 'FOR_YOU':
        return <Feed isRTL={isRTL} />;
      case 'ABOUT_ME':
        return <AboutYou isRTL={isRTL} />; // Render AboutYou component
      case 'SHOPPING_LIST':
        return <ShoppingList data={shoppingList ?? {}} />;
      case 'PANTRY':
        return <PantryList data={shoppingList ?? {}} />;
      case 'CART':
        return (
          <div>
            {t(`This is your Shopping Cart that is ready for checkout`)}
          </div>
        );
      case 'MEAL_PLANS':
        return (
          <div>
            {t(
              `This is your past and present list of Meal Plans that you can use and re-use all day long`
            )}
          </div>
        );
      case 'RECIPES':
        // Render RecipeList here
        return (
          <RecipeList
            recipes={data.recipes}
            handleRecipeClick={handleRecipeClick}
          />
        );
      default:
        return <div>{t(`Tabs.SELECT_A_TAB`)}</div>;
    }
  };

  return <DataContainer>{renderContent()}</DataContainer>;
}

StateDataDisplay.propTypes = {
  activeTab: PropTypes.string.isRequired,
  data: PropTypes.shape({
    shoppingList: PropTypes.object,
    recipes: PropTypes.array,
  }),
  isRTL: PropTypes.bool,
  handleRecipeClick: PropTypes.func.isRequired,
};

export default StateDataDisplay;