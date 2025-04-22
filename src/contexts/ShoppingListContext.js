// src/contexts/ShoppingListContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/apiService';
import { useAuth } from './AuthContext';

export const ShoppingListContext = createContext();

export const ShoppingListProvider = ({ children }) => {
  const [shoppingListId, setShoppingListId] = useState(null);
  const [shoppingList, setShoppingList] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userToken, userId } = useAuth();

  // Fetch user profile whenever the userToken changes
  useEffect(() => {
    const fetchShoppingList = async () => {
      if (userToken) {
        try {
          const shopList = await apiService.fetchShoppingList(userToken, userId);
          setShoppingList(shopList);
          console.log('Shopping list updated:', shopList);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setShoppingList(null);
      }
    };
  }, [userToken]);

  const addItemsToShoppingList = async (listItem) => {
    if (listItem) {
      try {
        const shopList = await apiService.updateShoppingList(userToken, listItem);
        setShoppingList(shopList);
        console.log('Shopping list updated:', shopList);
        return shoppingList;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    }
  };

  // Other data fetching methods as needed

  return (
    <ShoppingListContext.Provider
      value={{
        shoppingList,
        setShoppingList,
        loading,
        setLoading,
        shoppingListId,
        setShoppingListId,
      }}
    >
      {children}
    </ShoppingListContext.Provider>
  );
};

export const useShoppingList = () => {
  const context = useContext(ShoppingListContext);
  if (context === undefined) throw new Error('useShoppingList must be used within a ShoppingListProvider');
  return context;
};