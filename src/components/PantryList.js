// src/components/ShoppingList.js

import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ShoppingListModel from '../models/ShoppingList';
import ListItemContainer from './ListItemContainer';
import PropTypes from 'prop-types';

// Styled Components

function PantryList({ data }) {
  const { t } = useTranslation();
  const shoppingList = data || {};
  // console.log("Safe Data (Shopping List):", shoppingList);

  if (!data) {
    return <div>{t('Loading Pantry list...')}</div>;
  }

  // Parse the data into ShoppingList model
  // console.log("Shopping List", shoppingList);

  return (
    <ListItemContainer 
      data={data} 
    />
  );
}

PantryList.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PantryList;