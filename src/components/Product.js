import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledProduct = styled.div`
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 8px;
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
  background-color: ${(props) => props.theme.colors.background};

  .product-image {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 4px;
  }

  .product-details {
    flex: 1;
    h4 {
      margin: 4px 0;
    }
  }

  .product-ad-banner {
    margin-top: 8px;
    img {
      max-width: 100%;
      display: block;
    }
  }
`;

function Product({ product, productAdBannerUrl }) {
  const { t } = useTranslation();
  const {
    name,
    description,
    brand,
    price,
    imageUrl
  } = product;

  return (
    <StyledProduct>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          className="product-image"
        />
      )}

      <div className="product-details">
        <h4>{name}</h4>
        {description && <p>{description}</p>}
        {brand && (
          <p>
            <strong>{t("common.brandLabel")}:</strong> {brand}
          </p>
        )}
        {price && (
          <p>
            <strong>{t("common.priceLabel")}:</strong> {price}
          </p>
        )}
      </div>

      {productAdBannerUrl && (
        <div className="product-ad-banner">
          <img
            src={productAdBannerUrl}
            alt={t("product.adAlt", { productName: name })}
          />
        </div>
      )}
    </StyledProduct>
  );
}

export default Product;