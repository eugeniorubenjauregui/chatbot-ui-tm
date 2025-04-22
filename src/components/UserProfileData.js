// src/components/UserProfileData.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const ProfileContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.cardBackground};
  box-shadow: ${(props) => props.theme.shadows.card};
  border-radius: 8px;
  padding: 24px;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  font-size: 1.125rem;
  padding: 8px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  
  @media (min-width: 640px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${(props) => (props.readOnly ? '#f5f5f5' : '#ffffff')};
  cursor: ${(props) => (props.readOnly ? 'not-allowed' : 'text')};
`;

const Select = styled.select`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  background-color: #ffffff;
`;

const SectionGridContainer = styled.div`
  display: flex;
  flex-direction: column; /* Stacks children vertically */
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.color || props.theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${(props) => props.hoverColor || props.theme.colors.primaryDark};
  }
`;

function UserProfileData({ userProfile, availableLanguages, handleResetPassword, handleDeleteAccount, handleProfileUpdate }) {
  const { t } = useTranslation();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [profile, setProfile] = useState({}); // Holds the editable profile data

  // Initialize profile data on mount
  useEffect(() => {
    if (userProfile && userProfile.UserObj) {
      setProfile(userProfile.UserObj);
    }
  }, [userProfile]);

  // Update profile state when the user changes input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Handle form submission or save updates
  const handleSaveChanges = () => {
    handleProfileUpdate(profile); // Call the parent function to save changes
  };

  return (
    <ProfileContainer>
      <ToggleButton onClick={() => setIsProfileVisible(!isProfileVisible)}>
        {isProfileVisible ? '▲' : '▼'}&nbsp;<strong>{t('My Info')}</strong>
      </ToggleButton>
      {isProfileVisible && (
        <SectionGridContainer>
          <SectionGrid>
            {/* Editable Name */}
            <div>
              <Label htmlFor="name">{t('Name')}:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={profile.name || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Uneditable Email */}
            <div>
              <Label>{t('Email (login)')}:</Label>
              <Input
                type="email"
                value={userProfile.User || ''}
                readOnly
              />
            </div>

            {/* Editable City */}
            <div>
              <Label htmlFor="homeRegionCity">{t('City')}:</Label>
              <Input
                type="text"
                name="homeRegionCity"
                id="homeRegionCity"
                value={profile.homeRegionCity || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Editable State/Province */}
            <div>
              <Label htmlFor="homeRegionState">{t('State/Province')}:</Label>
              <Input
                type="text"
                name="homeRegionState"
                id="homeRegionState"
                value={profile.homeRegionState || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Editable Country */}
            <div>
              <Label htmlFor="homeRegionCountry">{t('Country')}:</Label>
              <Input
                type="text"
                name="homeRegionCountry"
                id="homeRegionCountry"
                value={profile.homeRegionCountry || ''}
                onChange={handleInputChange}
              />
            </div>

            {/* Editable Preferred Language */}
            <div>
              <Label htmlFor="primaryLanguage">{t('Preferred Language')}:</Label>
              <Select
                name="primaryLanguage"
                id="primaryLanguage"
                value={profile.primaryLanguage || ''}
                onChange={handleInputChange}
              >
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {t(lang)}
                  </option>
                ))}
              </Select>
            </div>

            {/* Editable Other Languages */}
            <div>
              <Label htmlFor="additionalLanguages">{t('Other Languages')}:</Label>
              <Input
                type="text"
                name="additionalLanguages"
                id="additionalLanguages"
                value={profile.additionalLanguages || ''}
                onChange={handleInputChange}
                placeholder={t('e.g., French, German')}
              />
            </div>
          </SectionGrid>
          <ButtonGroup>
            <Button onClick={handleSaveChanges} color="#4CAF50" hoverColor="#45a049">
              {t('Save Changes')}
            </Button>
            <Button onClick={handleResetPassword} color="#FFC107" hoverColor="#e0a800">
              {t('Reset Password')}
            </Button>
            <Button onClick={handleDeleteAccount} color="#F44336" hoverColor="#d32f2f">
              {t('Delete Account')}
            </Button>
          </ButtonGroup>
        </SectionGridContainer>
      )}
    </ProfileContainer>
  );
};

UserProfileData.propTypes = {
  userProfile: PropTypes.shape({
    User: PropTypes.string,
    UserObj: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      homeRegionCity: PropTypes.string,
      homeRegionState: PropTypes.string,
      homeRegionCountry: PropTypes.string,
      primaryLanguage: PropTypes.string,
      additionalLanguages: PropTypes.string,
    }),
    Preferences: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  availableLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleResetPassword: PropTypes.func.isRequired,
  handleDeleteAccount: PropTypes.func.isRequired,
  handleProfileUpdate: PropTypes.func.isRequired,
};

export default UserProfileData;