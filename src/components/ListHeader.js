import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

/**
 * Styled component for the list header container
 */
const StyledListHeader = styled.div`
  margin-bottom: 24px;
  h1 {
    margin: 0;
    font-size: 1.5rem;
  }
  p {
    margin: 4px 0 0 0;
    color: #555;
  }
`;

/**
 * Renders the name and description of the list
 */
function ListHeader({ name, description }) {
  const { t } = useTranslation();

  return (
    <StyledListHeader>
      <h1>{name}</h1>
      {description && <p>{description}</p>}
    </StyledListHeader>
  );
}

export default ListHeader;