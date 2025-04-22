// src/MainPageComponents/DetailPanel.js
import React from 'react';
import styled from 'styled-components';

const PanelContainer = styled.div`
  flex: 1;
  padding: 16px;
  overflow-y: auto;
`;

// A small breadcrumb display for the path
const Breadcrumb = styled.div`
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: #666;
`;

function DetailPanel({ pageType, data }) {
  // Common breadcrumb for categories or products
  const renderBreadcrumb = () => {
    if (!data?.fullPath) return null;

    // Optionally transform /Home/Produce/Fruits => "Home > Produce > Fruits"
    const pathSegments = data.fullPath.split('/');
    // Remove empty first segment if it starts with '/'
    const filteredSegments = pathSegments.filter(Boolean);

    return (
      <Breadcrumb>
        {filteredSegments.join(' > ')}
      </Breadcrumb>
    );
  };

  if (pageType === 'category') {
    return (
      <PanelContainer>
        {renderBreadcrumb()}
        <h2>Category Detail: {data?.name}</h2>
        <p>This is the Category Detail Page for {data?.name}.</p>
        {/* More category info */}
      </PanelContainer>
    );
  }

  if (pageType === 'product') {
    return (
      <PanelContainer>
        {renderBreadcrumb()}
        <h2>Product Detail: {data?.name}</h2>
        <p>
          Product ID: {data?.id} <br />
          Brand: {data?.brand} <br />
          Price: {data?.price}
        </p>
        {/* More product details here */}
      </PanelContainer>
    );
  }

  if (pageType === 'search') {
    return (
      <PanelContainer>
        <h2>Search Results for: {data?.query}</h2>
        <ul>
          {data.results?.map((result) => (
            <li key={result.id}>{result.name}</li>
          ))}
        </ul>
      </PanelContainer>
    );
  }

  return (
    <PanelContainer>
      <h2>Welcome</h2>
      <p>Select a category or product from the tree on the left, or try a search.</p>
    </PanelContainer>
  );
}

export default DetailPanel;