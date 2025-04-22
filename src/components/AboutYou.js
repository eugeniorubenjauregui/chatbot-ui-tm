// src/components/AboutYou.js
import React from 'react';
import styled from 'styled-components';
import UserProfileData from './UserProfileData';
import UserPreferenceSettings from './UserPreferenceSettings';
import UserPurchaseHistory from './UserPurchaseHistory';
import UserGoals from './UserGoals';
import PropTypes from 'prop-types';
import receiptsData from '../data/grocery_receipt_data.json'; // Assuming receiptsData is a mock data file
import { useAuth } from '../contexts/AuthContext'; // Assuming useAuth is a custom hook to access AuthContext
import { useData } from '../contexts/DataContext'; // Assuming useData is a custom hook to access DataContext

const AboutYouContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px;
  overflow-y: auto;
  max-height: 100%;
  box-sizing: border-box;
`;

function AboutYou({ isRTL = false }) {
  const { userToken, userId } = useAuth(); // Access user data and services from AuthContext
  const { data, fetchRecipes, loading, userProfile, updateUserProfile, callLLMService, callPrefsService } = useData(); // Access data services from DataContext

  const handleAddPreferenceCallback = (prefSelected) => {
    // Implement callback logic, possibly updating the user profile
    // For example:
    console.log(`Preference "${prefSelected}" added!`);
    // You might need to update the user profile in the DataContext or AuthContext
  };

  const handleRecipeClick = () => {
    // Implement if necessary
  };

  const handleProfileUpdate = (profile) => {
    // Update the user profile in the backend via DataContext
    updateUserProfile(profile);
  };

  const handleUpdateGoal = (goals) => {
    // Update user goals via backend service
    console.log('Goals to update:', goals);
    // Implement the service call as needed
    callLLMService(goals);
  };

  return (
    <AboutYouContainer>
      <UserProfileData
        userProfile={userProfile}
        availableLanguages={['English', 'Spanish', 'German']}
        handleResetPassword={() => {
          // Implement reset password functionality
          console.log('Reset password clicked!');
        }}
        handleDeleteAccount={() => {
          // Implement delete account functionality
          console.log('Delete account clicked!');
        }}
        handleProfileUpdate={handleProfileUpdate}
      />
      <UserPreferenceSettings
        userProfile={userProfile}
        handleAddPreferenceCallback={handleAddPreferenceCallback}
        callPrefsService={callPrefsService}
      />
      <UserPurchaseHistory data={receiptsData} />
      <UserGoals
        userProfile={userProfile}
        handleUpdateGoal={handleUpdateGoal}
        callLLMService={callLLMService}
      />
    </AboutYouContainer>
  );
}

AboutYou.propTypes = {
  isRTL: PropTypes.bool,
};

export default AboutYou;