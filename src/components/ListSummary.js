import React from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const StyledListSummary = styled.div`
  text-align: right;
`;

function ListSummary({ totalPrice, budget }) {
  const { t } = useTranslation();

  return (
    <StyledListSummary>
      <div>
        <strong>{t("listSummary.totalPrice")}:</strong> 
        {" "}
        {t("common.currency", { val: totalPrice.toFixed(2) })}
      </div>
      <div>
        <strong>{t("listSummary.budget")}:</strong> 
        {" "}
        {t("common.currency", { val: budget.toFixed(2) })}
      </div>
    </StyledListSummary>
  );
}

export default ListSummary;