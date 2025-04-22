import React, { useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ListHeader from "./ListHeader";
import ListCategory from "./ListCategory";
import ListSummary from "./ListSummary";

// A styled container for the entire list
const StyledListItemContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.background};
`;

// A row that holds the list header (left) and the list summary (right)
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px; /* space below the header row */
`;

function ListItemContainer({ data, budget = 50.0 }) {
  const { t } = useTranslation();
  const {
    name,
    description,
    listItems = []
  } = data;

  // Group items by category
  const itemsByCategory = useMemo(() => {
    return listItems.reduce((acc, item) => {
      const category = item.category || t("category.uncategorized");
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    }, {});
  }, [listItems, t]);

  const categoryNames = Object.keys(itemsByCategory);

  // Calculate total price across all items
  // We'll parse any item price from the first SKU (if present).
  // Then totalPrice = sum( quantity * price )
  // If price is not available or can't be parsed, it's treated as 0.
  const totalPrice = useMemo(() => {
    let sum = 0;
    listItems.forEach((item) => {
      // If quantity <= 0 or null, default to 1
      const qty = (item.quantity && item.quantity > 0) ? item.quantity : 1;

      // Price may be stored in item or in item.skuOptions.products[0].price
      let price = 0;
      const skuList = item.skuOptions?.products;
      if (skuList && skuList.length > 0 && skuList[0].price) {
        // Attempt to parse something like "$1.99"
        const rawPriceStr = skuList[0].price; 
        // e.g. parse out numeric portion
        const numericValue = parseFloat(rawPriceStr.replace(/[^\d.]/g, ""));
        if (!isNaN(numericValue)) {
          price = numericValue;
        }
      }

      sum += qty * price;
    });
    return sum;
  }, [listItems]);

  return (
    <StyledListItemContainer>
      <HeaderRow>
        {/* Left: List Header */}
        <ListHeader name={name} description={description} />

        {/* Right: List Summary (shows total price and budget) */}
        <ListSummary totalPrice={totalPrice} budget={budget} />
      </HeaderRow>

      {/* Render each category */}
      {categoryNames.map((catName) => {
        const categoryAdBannerUrl = null; //`https://example.com/ads/${catName}.jpg`;
        return (
          <ListCategory
            key={catName}
            categoryName={catName}
            categoryAdBannerUrl={categoryAdBannerUrl}
            items={itemsByCategory[catName]}
          />
        );
      })}
    </StyledListItemContainer>
  );
}

export default ListItemContainer;