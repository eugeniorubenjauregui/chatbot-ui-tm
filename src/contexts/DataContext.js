// src/contexts/DataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/apiService';
import { useAuth } from './AuthContext';
import { useShoppingList } from './ShoppingListContext';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ recipes: [] });
  const [userProfile, setUserProfile] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  const { userToken } = useAuth();
  const shoppingListContext = useShoppingList();

  // Fetch user profile whenever the userToken changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (userToken) {
        try {
          setLoading(true);
          const profile = await apiService.getUserProfile(userId, userToken);
          if (profile) {
            setUserProfile(profile);
            setUserId(profile.id);
            if (profile.ShoppingList) {
              console.log('Setting shopping list:', profile.ShoppingList);
              shoppingListContext.setShoppingList(profile.ShoppingList);
              shoppingListContext.setShoppingListId(profile.ShoppingList.id);
              console.log('Shopping list updated:', shoppingListContext.shoppingList);
            }
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setUserProfile(null);
        setUserId(null);
      }
    };
    fetchUserProfile();
  }, [userToken]);

  const updateUserProfile = async (profileData) => {
    if (userToken) {
      try {
        setLoading(true);
        const updatedProfile = await apiService.updateUserProfile(userToken, profileData);
        setUserProfile(updatedProfile);
        setUserId(updatedProfile.id);
        return updatedProfile;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const callLLMService = async (prompt, fastMode=false) => {
    if (prompt) {
      try {
        setLoading(true);
        const llmResponse = await apiService.callLLMService(prompt, fastMode);

        // Handle the response from the LLM, which could be any of a dozen different formats

        return llmResponse;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  const callPrefsService = async (prefId, addPref=true, prefValue=null, prefStrength=0.0) => {
    if (prefId) {
      try {
        setLoading(true);
        const prefResponse = await apiService.callPrefsService(prefId, addPref, prefValue, prefStrength);

        // Handle the response from the LLM, which could be any of a dozen different formats

        return prefResponse;
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      } finally {
        setLoading(false);
      }
    }
  };

  // Other data fetching methods as needed

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        userProfile,
        setUserProfile,
        userId,
        setUserId,
        updateUserProfile,
        callLLMService,
        callPrefsService,
        loading,
        setLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) throw new Error('useData must be used within a DataProvider');
  return context;
};