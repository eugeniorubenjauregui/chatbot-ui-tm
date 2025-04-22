// src/MainPageComponents/CategoryTree.js
import React from 'react';
import styled from 'styled-components';

const TreeNode = styled.div`
  margin-left: ${(props) => (props.$level || 0) * 16}px;
  cursor: pointer;
  padding: 4px 0;
`;

function CategoryTree({
  data,
  level = 0,
  parentPath = '/Home', // Start from "/Home"
  onCategoryClick,
  onProductClick,
}) {
  if (!data) return null;

  return data.map((node) => {
    const hasSubCategories = node?.subCategories?.length > 0;
    const hasProducts = node?.products?.length > 0;

    // Build full path for the current node
    const nodeFullPath = `${parentPath}/${node.name}`;

    return (
      <div key={node.name}>
        {/* Render category */}
        <TreeNode
          $level={level}
          onClick={() => {
            // Pass along full path in addition to node
            onCategoryClick(node, nodeFullPath);
          }}
        >
          {node.name}
        </TreeNode>

        {/* If subCategories exist, recurse */}
        {hasSubCategories && (
          <CategoryTree
            data={node.subCategories}
            $level={level + 1}
            parentPath={nodeFullPath}  // Pass updated path for children
            onCategoryClick={onCategoryClick}
            onProductClick={onProductClick}
          />
        )}

        {/* If products exist, list them */}
        {hasProducts &&
          node.products.map((product) => {
            // The product also inherits nodeFullPath from its parent category
            const productFullPath = `${nodeFullPath}/${product.name}`;

            return (
              <TreeNode
                key={product.id}
                $level={level + 1}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent category click
                  onProductClick(node, product, productFullPath);
                }}
              >
                {product.name}
              </TreeNode>
            );
          })}
      </div>
    );
  });
}

export default CategoryTree;