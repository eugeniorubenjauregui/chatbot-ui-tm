import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ListItem from "./ListItem";

const StyledCategorySection = styled.section`
  margin-bottom: 32px;
  background-color: #fff;
  
  h2 {
    margin-top: 0;
    font-size: 1.25rem;
    background-color: ${(props) => props.theme.colors.categoryHeaderBg};
    color: ${(props) => props.theme.colors.categoryHeaderText};
    padding: 8px;
  }

  .category-ad-banner {
    margin: 8px 0;
    img {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
`;

function Category({ categoryName, categoryAdBannerUrl, items }) {
  const { t } = useTranslation();

  return (
    <StyledCategorySection>
      <h2>{categoryName}</h2>

      {categoryAdBannerUrl && (
        <div className="category-ad-banner">
          <img
            src={categoryAdBannerUrl}
            alt={t("category.adAlt", { categoryName })}
          />
        </div>
      )}

      {items.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </StyledCategorySection>
  );
}

export default Category;