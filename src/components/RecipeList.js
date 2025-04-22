// src/components/RecipeList.js
import React from 'react';
import PropTypes from 'prop-types';

const RecipeList = ({ recipes, handleRecipeClick }) => {
  // Handle empty or missing recipes
  if (!recipes || recipes.length === 0) {
    return (
      <div>
        <strong>No recipes available.</strong>
      </div>
    );
  }

  let currentCategory = '';

  return (
    <div>
      <strong>Your Recipes:</strong>
      <br />
      {recipes.map((recipe, index) => {
        const {
          id,
          name,
          servings,
          cuisine,
          ingredientNames,
          dietaryPreferences,
          category,
          sponsored,
        } = recipe;

        // Process dietary preferences
        const dietaryPreferencesString = Array.isArray(dietaryPreferences)
          ? dietaryPreferences
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(', ')
          : 'None';

        // Process ingredient names
        const ingredientNamesString = Array.isArray(ingredientNames)
          ? ingredientNames
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(', ')
          : '';

        // Render category header when category changes
        let categoryHeader = null;
        if (currentCategory !== category) {
          currentCategory = category;
          categoryHeader = (
            <div
              key={`category-${index}`}
              className="bg-gray-200 pl-2 pr-16 py-1 mb-2 mt-2"
            >
              {sponsored ? (
                <button
                  className="border-2 rounded-full px-2 border-gray-700 text-xl text-blue-600 hover:text-yellow-500 underline cursor-pointer"
                  title={`Click to see more recipes in the category "${category}"`}
                >
                  Sponsored Category: {category}
                </button>
              ) : (
                <strong>Category: {category}</strong>
              )}
            </div>
          );
        }

        return (
          <div key={id || index}>
            {categoryHeader}
            <div className="pl-4">
              &emsp;•{' '}
              <span
                className="text-lg text-blue-600 hover:text-yellow-500 underline cursor-pointer"
                onClick={() => handleRecipeClick(id)}
                title={`Click to open recipe for "${name}"`}
              >
                {name}
              </span>{' '}
              (serves {servings})
              <br />
              &emsp;&emsp;&emsp;• Cuisine: {cuisine}
              <br />
              &emsp;&emsp;&emsp;• Ingredients: {ingredientNamesString}
              <br />
              &emsp;&emsp;&emsp;• Dietary Preferences: {dietaryPreferencesString}
              <br />
              <br />
            </div>
          </div>
        );
      })}
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleRecipeClick: PropTypes.func.isRequired,
};

export default RecipeList;