// src/components/Feed.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdvertisementCard from './cards/AdvertisementCard';
import RecipeCard from './cards/RecipeCard';
import VideoCard from './cards/VideoCard';
import BlinklinkCard from './cards/BlinklinkCard';
import ShoppingListCard from './cards/ShoppingListCard'; // We'll create this file next
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import receiptsData from '../data/grocery_receipt_data.json'; // Mock receipts data

const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 16px;
  box-sizing: border-box;
  align-items: center; /* Center the content horizontally */
`;

const ToggleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
  flex: 0 0 auto;
  max-width: 800px; /* Optional: set a maximum width */
`;

const CardsContainer = styled.div`
  flex: 1;
  min-height: 0; /* Allow CardsContainer to shrink */
  overflow-y: auto; /* Make the cards area scrollable */
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%; /* Set width to 100% */
  max-width: 800px; /* Optional: set a maximum width */
  
  /* Custom scrollbar styles for WebKit browsers */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 6px;
    border: 3px solid #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

const ToggleButton = styled.button`
  background-color: ${(props) =>
    props.$active ? props.theme.colors.primary : '#e0e0e0'};
  color: ${(props) =>
    props.$active ? props.theme.colors.textLight : props.theme.colors.text};
  border: none;
  border-radius: 16px;
  padding: 8px 12px;
  margin: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.primary};
  }
`;

function Feed({ isRTL = false }) { // Default parameter
  const { t } = useTranslation();
  const [visibleCardTypes, setVisibleCardTypes] = useState({
    advertisement: true,
    video: true,
    blinklink: true,
    recipe: true,
    mealPlan: true,
    product: true,
    coupon: true,
    shoppingList: true, // We want the new shoppingList type to be toggleable
  });

  const popupOptions = [
    {
      name: 'notInterestedSpecific',
      text: 'Not interested in this specific content',
    },
    {
      name: 'notInterestedType',
      text: 'Not interested in this type of content or format',
    },
    {
      name: 'saveForLater',
      text: 'Save for later',
    },
    // Add more prompts as needed
  ];

  // -----------------------
  // 1. Base sample data
  // -----------------------
  const initialCardData = [
    {
      id: 1,
      type: 'advertisement',
      bgColor: '#F7FFFA',
      title: 'Chocolate Sale',
      imageUrl: '/images/chocolate-cake-pops-33715.jpg',
      description: 'All Chocolates are ON SALE NOW!',
      link: 'https://www.pexels.com/search/chocolate/',
      actionMenu: popupOptions,
    },
    {
      id: 2,
      type: 'video',
      bgColor: '#F7FFFA',
      videoUrl: '/videos/chocolate-sd_640_360_30fps.mp4',
      title: `Hershey's Chocolate`,
      description: 'A delightful chocolate experience.',
      actionMenu: popupOptions,
    },
    {
      id: 3,
      type: 'blinklink',
      bgColor: '#F7FFFA',
      title: `Blinklink Creator Stream`,
      description: 'A sampling of created videos just for you.',
      actionMenu: popupOptions,
    },
    {
      id: 31,
      type: 'recipe',
      bgColor: '#ffffff',
      title: 'Chocolate Cake Pops',
      description: 'Fun and delightful chocolate cake pops, perfect for parties and treats.',
      ingredients: [
        'Chocolate cake',
        'Chocolate frosting',
        'Chocolate melts or candy coating',
        'Lollipop sticks',
        'Sprinkles (optional)'
      ],
      instructions: [
        'Crumble the chocolate cake into fine crumbs in a large bowl.',
        'Mix in chocolate frosting until the mixture holds together.',
        'Roll the mixture into small balls and place them on a baking sheet.',
        'Insert a lollipop stick into each ball.',
        'Freeze the cake pops for about 15 minutes.',
        'Melt the chocolate melts or candy coating.',
        'Dip each cake pop into the melted chocolate, covering completely.',
        'Decorate with sprinkles if desired.',
        'Let the cake pops set until the coating is firm.'
      ],
      tools: ['Large bowl', 'Baking sheet', 'Lollipop sticks', 'Microwave-safe bowl'],
      actionMenu: popupOptions,
    },
  ];

  // -----------------------
  // 2. Generate a "ShoppingList" Card from receipts data
  // -----------------------
  // We create a function to parse the receipts, group by category, find top items,
  // then pick a single category to highlight or create multiple. We'll do one for example.

  function buildShoppingListCardFromReceipts() {
    // Step A: Flatten all items
    const allItems = [];
    for (const receipt of receiptsData) {
      for (const item of receipt.items) {
        // We'll store category, item_name, quantity, item_total_price, etc.
        allItems.push(item);
      }
    }

    // Step B: Group by category => { categoryName: { itemName: { freq, totalSpent, ...} } }
    const categoryMap = {};
    for (const it of allItems) {
      const cat = it.item_category || 'Misc';
      if (!categoryMap[cat]) {
        categoryMap[cat] = {};
      }
      const name = it.item_name || 'Unknown';
      if (!categoryMap[cat][name]) {
        categoryMap[cat][name] = {
          name,
          totalQuantity: 0,
          totalSpent: 0,
          occurrences: 0,
        };
      }
      categoryMap[cat][name].totalQuantity += it.quantity;
      categoryMap[cat][name].totalSpent += it.item_total_price;
      categoryMap[cat][name].occurrences += 1;
    }

    // Step C: Find which category you want to highlight. 
    // For example, pick the category with the largest sum of totalQuantity or totalSpent
    let bestCategory = null;
    let bestCategoryKey = '';
    let bestSum = 0;

    for (const catKey of Object.keys(categoryMap)) {
      // sum totalQuantity or totalSpent across items
      const catItems = categoryMap[catKey];
      let catSum = 0;
      for (const itemName of Object.keys(catItems)) {
        catSum += catItems[itemName].totalQuantity;
      }
      if (catSum > bestSum) {
        bestSum = catSum;
        bestCategoryKey = catKey;
      }
    }

    // Step D: Sort items in that category by frequency or totalQuantity
    const bestCatItemsObj = categoryMap[bestCategoryKey];
    const sortedItems = Object.values(bestCatItemsObj).sort((a, b) => {
      // sort desc by totalQuantity
      return b.totalQuantity - a.totalQuantity;
    });

    // Step E: pick top 5
    const top5 = sortedItems.slice(0, 5);

    // Step F: Build the shopping list data
    // We'll guess a recommended quantity (maybe half or equal to what they've bought historically).
    // We'll guess a price by average per item in the past.
    // Then sum up the total.
    let totalProjectedCost = 0;

    const recommendedItems = top5.map((itemObj) => {
      const avgUnitPrice = itemObj.totalSpent / itemObj.totalQuantity || 1;
      const recommendedQty = Math.max(1, Math.round(itemObj.totalQuantity / itemObj.occurrences));
      const estimatedCost = recommendedQty * avgUnitPrice;
      totalProjectedCost += estimatedCost;
      return {
        name: itemObj.name,
        recommendedQty,
        estimatedCost: +estimatedCost.toFixed(2),
      };
    });

    totalProjectedCost = +totalProjectedCost.toFixed(2);

    // Step G: Build the card object
    // We'll make it type: "shoppingList"
    const cardObj = {
      id: 9999, // some unique ID
      type: 'shoppingList',
      bgColor: '#ffffff', // '#f8fff5',
      title: `Replenish your Favorites from ${bestCategoryKey}`,
      categoryName: bestCategoryKey,
      items: recommendedItems, 
      projectedTotal: totalProjectedCost,
      actionMenu: popupOptions,
    };

    return cardObj;
  }

  // In a real app, you might store multiple or do advanced logic. We'll build just ONE for the demo
  const [cardData, setCardData] = useState(() => {
    const base = [...initialCardData];
    // Insert the newly built ShoppingList Card
    const shoppingListCard = buildShoppingListCardFromReceipts();
    base.push(shoppingListCard);
    return base;
  });

  // This toggles the feed card type
  const handleToggle = (type) => {
    setVisibleCardTypes((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Switch for rendering each card
  const renderCard = (card) => {
    switch (card.type) {
      case 'advertisement':
        return (
          <AdvertisementCard
            key={card.id}
            data={card}
            isRTL={isRTL}
            actionMenu={card.actionMenu}
          />
        );
      case 'video':
        return (
          <VideoCard
            key={card.id}
            data={card}
            isRTL={isRTL}
            actionMenu={card.actionMenu}
          />
        );
      case 'blinklink':
        return (
          <BlinklinkCard
            key={card.id}
            data={card}
            isRTL={isRTL}
            actionMenu={card.actionMenu}
          />
        );
      case 'recipe':
        return (
          <RecipeCard
            key={card.id}
            data={card}
            isRTL={isRTL}
            actionMenu={card.actionMenu}
          />
        );
      case 'shoppingList':
        // NEW CASE: We handle the ShoppingListCard
        return (
          <ShoppingListCard
            key={card.id}
            data={card}
            isRTL={isRTL}
            actionMenu={card.actionMenu}
          />
        );
      // Others: mealPlan, product, coupon, etc. would go here
      default:
        return null;
    }
  };

  return (
    <FeedContainer>
      {/* Toggles */}
      <ToggleContainer>
        {Object.keys(visibleCardTypes).map((type) => (
          <ToggleButton
            key={type}
            $active={visibleCardTypes[type]}
            onClick={() => handleToggle(type)}
            aria-pressed={visibleCardTypes[type]}
          >
            {t(type.charAt(0).toUpperCase() + type.slice(1))}
          </ToggleButton>
        ))}
      </ToggleContainer>

      {/* Cards */}
      <CardsContainer>
        {cardData
          .filter((card) => visibleCardTypes[card.type])
          .map((card) => renderCard(card))}
      </CardsContainer>
    </FeedContainer>
  );
}

Feed.propTypes = {
  isRTL: PropTypes.bool,
};

export default Feed;