import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Product from "./Product";

// Import icons from react-icons
import { FaPlus, FaMinus, FaEllipsisH, FaTrash } from "react-icons/fa";

const StyledListItem = styled.div`
  position: relative; /* for absolute-positioned help button & menu */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 12px;
  background-color: ${(props) => props.theme.colors.background};

  h3 {
    margin: 0 0 8px 0;
    font-weight: 800;
    /* h3 remains fully left-justified. */
  }
`;

const ItemDetails = styled.div`
  /* Indent all fields after the name by 8px */
  padding-left: 12px;

  p {
    margin: 4px 0;
  }
`;

const HelpButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;

  background: ${(props) => props.theme.buttons.background};
  color: ${(props) => props.theme.buttons.textColor};
  border: none;
  border-radius: 50%;
  padding: 6px 8px;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;

  &:hover {
    background: ${(props) => props.theme.buttons.hoverBackground};
  }
`;

/** Menu container for the ellipsis button */
const HelpMenu = styled.ul`
  position: absolute;
  top: 36px; /* below the ellipsis button */
  right: 8px;
  list-style: none;
  margin: 0;
  padding: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  min-width: 120px;
  z-index: 999;

  li {
    padding: 8px 16px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.colors.categoryHeaderBg};
      color: ${(props) => props.theme.buttons.textColor};
    }
  }
`;

const StyledFooterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
  padding-top: 8px;
  border-top: 1px solid #eee;
`;

const QuantitySpinner = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  button {
    background: #fff;
    color: ${(props) => props.theme.colors.primary};
    border: 1px solid #eee;
    border-radius: 4px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: ${(props) => props.theme.buttons.hoverBackground};
      color: ${(props) => props.theme.buttons.textColor};
    }
  }

  span {
    min-width: 20px;
    text-align: center;
  }
`;

const RemoveButton = styled.button`
  background: #fff;
  color: ${(props) => props.theme.colors.primary};
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 28px;
  height: 28px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background: ${(props) => props.theme.buttons.hoverBackground};
  }
`;

function ListItem({ item, onRemoveItem }) {
  const { t } = useTranslation();

  const {
    name,
    description,
    brand,
    quantity,
    size,
    measurement,
    preparation,
    skuOptions,
  } = item;

  // Default to 1 if quantity is null or <= 0
  const initialQuantity = quantity && quantity > 0 ? quantity : 1;
  const [localQuantity, setLocalQuantity] = useState(initialQuantity);

  // Toggling the help menu
  const [menuOpen, setMenuOpen] = useState(false);
  function toggleMenu() {
    setMenuOpen((open) => !open);
  }

  // In a real app, you'd pass a callback down from the parent to actually remove the item
  function handleRemove() {
    console.log("Remove item from the list:", name);
    if (onRemoveItem) {
      onRemoveItem(item.id);
    }
  }

  function handleDetails() {
    console.log("Details clicked for:", name);
  }

  function handleShopSwap() {
    console.log("Shop / Swap clicked for:", name);
  }

  // Determine price from the first SKU
  let priceValue = 0;
  if (
    skuOptions &&
    skuOptions.products &&
    skuOptions.products.length > 0 &&
    skuOptions.products[0].price
  ) {
    const rawPrice = skuOptions.products[0].price; // e.g. "$1.99"
    const numericVal = parseFloat(rawPrice.replace(/[^\d.]/g, ""));
    if (!isNaN(numericVal)) {
      priceValue = numericVal;
    }
  }

  // Spinner handlers
  const increment = () => setLocalQuantity((q) => q + 1);
  const decrement = () => setLocalQuantity((q) => (q > 1 ? q - 1 : 1));

  const lineTotal = priceValue * localQuantity;

  return (
    <StyledListItem>
      {/* Help Button & Menu */}
      <HelpButton onClick={toggleMenu}>
        <FaEllipsisH />
      </HelpButton>
      {menuOpen && (
        <HelpMenu>
          <li onClick={handleDetails}>{t("listItem.menuDetails")}</li>
          <li onClick={handleShopSwap}>{t("listItem.menuShopSwap")}</li>
          <li onClick={handleRemove}>{t("listItem.menuRemove")}</li>
        </HelpMenu>
      )}

      {/* Name: fully left-justified */}
      <h3>{name}</h3>

      {/* Everything else: indented 8px */}
      <ItemDetails>
        {description && <p>{description}</p>}
        {brand && (
          <p>
            <strong>{t("common.brandLabel")}:</strong> {brand}
          </p>
        )}
        {size && (
          <p>
            <strong>{t("common.sizeLabel")}:</strong> {size}
          </p>
        )}
        {measurement && (
          <p>
            <strong>{t("common.measurementLabel")}:</strong> {measurement}
          </p>
        )}
        {preparation && (
          <p>
            <strong>{t("common.preparationLabel")}:</strong> {preparation}
          </p>
        )}

        {/* SKU Products (if any) */}
        {skuOptions && skuOptions.products && skuOptions.products.length > 0 && (
          <div className="sku-products">
            <h4>{t("listItem.skuTitle")}</h4>
            {skuOptions.products.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        )}
      </ItemDetails>

      {/* Footer */}
      <StyledFooterBar>
        <QuantitySpinner>
          <button onClick={decrement}>
            <FaMinus />
          </button>
          <span>{localQuantity}</span>
          <button onClick={increment}>
            <FaPlus />
          </button>
          <RemoveButton onClick={handleRemove}>
            <FaTrash />
          </RemoveButton>
        </QuantitySpinner>

        {priceValue > 0 && (
          <div>
            <strong>{t("common.priceLabel")}:</strong>{" "}
            {t("common.currency", { val: lineTotal.toFixed(2) })}
          </div>
        )}
      </StyledFooterBar>
    </StyledListItem>
  );
}

export default ListItem;