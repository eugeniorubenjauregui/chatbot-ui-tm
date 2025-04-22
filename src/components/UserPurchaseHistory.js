import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";

dayjs.extend(isoWeek);

const HistoryContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.cardBackground};
  box-shadow: ${(props) => props.theme.shadows.card};
  border-radius: 8px;
  padding: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const ControlsBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 16px;

  select,
  button {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid ${(props) => props.theme.colors.border};
    background-color: ${(props) => props.theme.colors.surface};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
  }
`;

const GroupContainer = styled.div`
  margin-bottom: 16px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

const GroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.textLight};
  padding: 8px 12px;
  cursor: pointer;

  h3 {
    margin: 0;
    font-size: 1rem;
  }
`;

const GroupBody = styled.div`
  background-color: ${(props) => props.theme.colors.surface};
  padding: 8px 12px;
`;

const ItemRow = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
  padding: 4px 0;
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;

  .item-name {
    font-weight: 600;
  }
  .item-price {
    color: ${(props) => props.theme.colors.secondaryText};
  }
`;

function UserPurchaseHistory({ data }) {
  const { t } = useTranslation();

  const timeRangeOptions = [
    { value: "lastWeek", label: t("purchasesHistory.lastWeek") },
    { value: "last2Weeks", label: t("purchasesHistory.last2Weeks") },
    { value: "thisMonth", label: t("purchasesHistory.thisMonth") },
    { value: "lastMonth", label: t("purchasesHistory.lastMonth") },
    { value: "last2Months", label: t("purchasesHistory.last2Months") },
    { value: "last3Months", label: t("purchasesHistory.last3Months") },
    { value: "last4Months", label: t("purchasesHistory.last4Months") },
    { value: "last6Months", label: t("purchasesHistory.last6Months") },
  ];

  const groupingModes = [
    { value: "category", label: t("purchasesHistory.groupByCategory") },
    { value: "receipt", label: t("purchasesHistory.groupByReceipt") },
    { value: "week", label: t("purchasesHistory.groupByWeek") },
  ];

  const [timeRange, setTimeRange] = useState("lastWeek");
  const [groupBy, setGroupBy] = useState("category");
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (groupKey) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const now = dayjs();

  const filteredReceipts = useMemo(() => {
    let cutoff = now.subtract(7, "day"); // default lastWeek
    switch (timeRange) {
      case "last2Weeks":
        cutoff = now.subtract(14, "day");
        break;
      case "thisMonth":
        cutoff = now.startOf("month");
        break;
      case "lastMonth":
        cutoff = now.subtract(1, "month").startOf("month");
        break;
      case "last2Months":
        cutoff = now.subtract(2, "month").startOf("month");
        break;
      case "last3Months":
        cutoff = now.subtract(3, "month").startOf("month");
        break;
      case "last4Months":
        cutoff = now.subtract(4, "month").startOf("month");
        break;
      case "last6Months":
        cutoff = now.subtract(6, "month").startOf("month");
        break;
      default:
        cutoff = now.subtract(7, "day");
        break;
    }

    return data.filter((r) => {
      const receiptDate = dayjs(r.date_purchased);
      return receiptDate.isAfter(cutoff);
    });
  }, [timeRange, data, now]);

  // Flatten
  const allItems = useMemo(() => {
    const items = [];
    for (const receipt of filteredReceipts) {
      const receiptDate = dayjs(receipt.date_purchased);
      for (const item of receipt.items) {
        items.push({
          ...item,
          receiptDate,
          receiptId: receiptDate.format("YYYY-MM-DD"),
          receiptDateStr: receipt.date_purchased,
          storeName: receipt.store_name,
        });
      }
    }
    return items;
  }, [filteredReceipts]);

  // Group
  const groupedData = useMemo(() => {
    if (groupBy === "category") {
      const categoryMap = {};
      for (const it of allItems) {
        const cat = it.item_category || t("purchasesHistory.uncategorized");
        if (!categoryMap[cat]) categoryMap[cat] = [];
        categoryMap[cat].push(it);
      }
      const groupArray = Object.keys(categoryMap).map((cat) => ({
        key: cat,
        items: categoryMap[cat],
      }));
      groupArray.sort((a, b) => b.items.length - a.items.length);
      return groupArray;
    } else if (groupBy === "receipt") {
      const receiptMap = {};
      for (const it of allItems) {
        const dateKey = dayjs(it.receiptDateStr).format("YYYY-MM-DD");
        if (!receiptMap[dateKey]) {
          receiptMap[dateKey] = [];
        }
        receiptMap[dateKey].push(it);
      }
      const groupArray = Object.keys(receiptMap).map((dateKey) => ({
        key: dateKey,
        items: receiptMap[dateKey],
      }));
      groupArray.sort((a, b) => dayjs(b.key).valueOf() - dayjs(a.key).valueOf());
      return groupArray;
    } else if (groupBy === "week") {
      const weekMap = {};
      for (const it of allItems) {
        const year = it.receiptDate.year();
        const week = it.receiptDate.isoWeek();
        const groupKey = `${year}-W${String(week).padStart(2, "0")}`;
        if (!weekMap[groupKey]) {
          weekMap[groupKey] = [];
        }
        weekMap[groupKey].push(it);
      }
      const groupArray = Object.keys(weekMap).map((wkey) => ({
        key: wkey,
        items: weekMap[wkey],
      }));
      groupArray.sort((a, b) => {
        const [ayear, aweek] = a.key.split("-W");
        const [byear, bweek] = b.key.split("-W");
        const ay = parseInt(ayear, 10);
        const aw = parseInt(aweek, 10);
        const by = parseInt(byear, 10);
        const bw = parseInt(bweek, 10);
        if (by !== ay) return by - ay;
        return bw - aw;
      });
      return groupArray;
    }
    return [];
  }, [groupBy, allItems, t]);

  // Summary + "Top 3" aggregated
  const summary = useMemo(() => {
    const totalItems = allItems.length;
    let totalSpent = 0;
    const brandCount = {};
    const categoryCount = {};
    const itemCount = {};

    for (const it of allItems) {
      totalSpent += it.item_total_price || 0;

      if (!brandCount[it.brand]) {
        brandCount[it.brand] = 0;
      }
      brandCount[it.brand] += it.quantity;

      const cat = it.item_category || t("purchasesHistory.uncategorized");
      if (!categoryCount[cat]) {
        categoryCount[cat] = 0;
      }
      categoryCount[cat] += it.quantity;

      if (!itemCount[it.item_name]) {
        itemCount[it.item_name] = 0;
      }
      itemCount[it.item_name] += it.quantity;
    }

    function top3(countMap) {
      const arr = Object.entries(countMap);
      arr.sort((a, b) => b[1] - a[1]);
      return arr.slice(0, 3).map(([k, c]) => ({ name: k, count: c }));
    }

    const topBrands = top3(brandCount);
    const topCategories = top3(categoryCount);
    const topItems = top3(itemCount);

    return {
      totalItems,
      totalSpent,
      topBrands,
      topCategories,
      topItems,
    };
  }, [allItems, t]);

  function aggregateItemsByName(items) {
    const map = {};
    for (const it of items) {
      const key = it.item_name;
      if (!map[key]) {
        map[key] = { item_name: key, totalQuantity: 0, totalPrice: 0 };
      }
      map[key].totalQuantity += it.quantity;
      map[key].totalPrice += it.item_total_price;
    }
    return Object.values(map);
  }

  const isAllExpanded = useMemo(() => {
    if (!expandedGroups["summary"]) return false;
    for (const group of groupedData) {
      if (!expandedGroups[group.key]) {
        return false;
      }
    }
    return true;
  }, [expandedGroups, groupedData]);

  const toggleAllGroups = () => {
    const expand = !isAllExpanded;
    const newState = { summary: expand };
    for (const group of groupedData) {
      newState[group.key] = expand;
    }
    setExpandedGroups(newState);
  };

  return (
    <HistoryContainer>
      <SectionHeader>
        <strong>{`User Purchase History:`}</strong>
      </SectionHeader>
      <ControlsBar>
        <div>
          <label htmlFor="timeRangeSelect" style={{ marginRight: 8 }}>
            {t("purchasesHistory.headerRange")}:
          </label>
          <select
            id="timeRangeSelect"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRangeOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="groupBySelect" style={{ marginRight: 8 }}>
            {t("purchasesHistory.groupBy")}:
          </label>
          <select
            id="groupBySelect"
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
          >
            {groupingModes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.label}
              </option>
            ))}
          </select>
        </div>

        <button onClick={toggleAllGroups}>
          {isAllExpanded
            ? t("purchasesHistory.collapseAll")
            : t("purchasesHistory.expandAll")}
        </button>
      </ControlsBar>

      {/* Summary Group */}
      <GroupContainer>
        <GroupHeader onClick={() => toggleGroup("summary")}>
          <h3>{t("purchasesHistory.summary")}</h3>
          <span>
            {expandedGroups["summary"]
              ? t("purchasesHistory.collapse")
              : t("purchasesHistory.expand")}
          </span>
        </GroupHeader>
        {expandedGroups["summary"] && (
          <GroupBody>
            <div style={{ marginBottom: 8 }}>
              <strong>{t("purchasesHistory.totalItems")}:</strong>{" "}
              {summary.totalItems}
            </div>
            <div style={{ marginBottom: 8 }}>
              <strong>{t("purchasesHistory.totalSpent")}:</strong>{" $"}
              {summary.totalSpent.toFixed(2)}
            </div>

            {/* Top Brands as a bulleted list */}
            <div style={{ marginBottom: 8 }}>
              <strong>{t("purchasesHistory.topBrands")}:</strong>
              <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                {summary.topBrands.map((b) => (
                  <li key={b.name}>
                    {b.name} ({b.count})
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Categories as a bulleted list */}
            <div style={{ marginBottom: 8 }}>
              <strong>{t("purchasesHistory.topCategories")}:</strong>
              <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                {summary.topCategories.map((c) => (
                  <li key={c.name}>
                    {c.name} ({c.count})
                  </li>
                ))}
              </ul>
            </div>

            {/* Top Items as a bulleted list */}
            <div style={{ marginBottom: 8 }}>
              <strong>{t("purchasesHistory.topItems")}:</strong>
              <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
                {summary.topItems.map((i) => (
                  <li key={i.name}>
                    {i.name} ({i.count})
                  </li>
                ))}
              </ul>
            </div>
          </GroupBody>
        )}
      </GroupContainer>

      {/* Main Groups */}
      {groupedData.map((group) => {
        const groupKey = group.key;
        const itemCount = group.items.length;

        let groupLabel = groupKey;
        if (groupBy === "receipt") {
          groupLabel = dayjs(groupKey).format("YYYY-MM-DD");
        } else if (groupBy === "week") {
          const [year, w] = groupKey.split("-W");
          groupLabel = `${t("purchasesHistory.week")} ${w}, ${year}`;
        }

        const aggregated = aggregateItemsByName(group.items);
        aggregated.sort((a, b) => a.item_name.localeCompare(b.item_name));

        return (
          <GroupContainer key={groupKey}>
            <GroupHeader onClick={() => toggleGroup(groupKey)}>
              <h3>
                {groupLabel} ({itemCount})
              </h3>
              <span>
                {expandedGroups[groupKey]
                  ? t("purchasesHistory.collapse")
                  : t("purchasesHistory.expand")}
              </span>
            </GroupHeader>
            {expandedGroups[groupKey] && (
              <GroupBody>
                {aggregated.map((aggItem, idx) => (
                  <ItemRow key={`${aggItem.item_name}-${idx}`}>
                    <span className="item-name">
                      {aggItem.item_name} ({aggItem.totalQuantity})
                    </span>
                    <span className="item-price">
                      ${aggItem.totalPrice.toFixed(2)}
                    </span>
                  </ItemRow>
                ))}
              </GroupBody>
            )}
          </GroupContainer>
        );
      })}
    </HistoryContainer>
  );
}

export default UserPurchaseHistory;