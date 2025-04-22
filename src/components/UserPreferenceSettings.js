// src/components/UserPreferenceSettings.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AddPrefPopup from './AddPrefPopup'; // Convert this component similarly if needed
import NumberControl from './NumberControl'; // Convert this component similarly if needed
import SelectDropdown from './SelectOption'; // Convert this component similarly if needed

const PreferencesContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.cardBackground};
  box-shadow: ${(props) => props.theme.shadows.card};
  border-radius: 8px;
  padding: 24px;
`;

// Define the Label styled-component
const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const PreferencesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;

const PreferenceButton = styled.button`
  padding: 8px 16px;
  border: 2px solid #FFC107;
  border-radius: 9999px;
  background-color: ${(props) => (props.active ? '#FFC107' : '#FFFFFF')};
  color: ${(props) => (props.active ? '#000000' : '#000000')};
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${(props) => (props.active ? '#FFA000' : '#FFC107')};
    color: #FFFFFF;
  }
`;

const ToggleButton = styled.button`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #FFFFFF;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

const UserPreferenceSettings = ({ userProfile, handleAddPreferenceCallback, callPrefsService }) => {
  const [isPreferencesVisible, setIsPreferencesVisible] = useState(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [servingSize, setServingSize] = useState(1); 
  const [units, setUnits] = useState('metric'); // Default value for units
  const [userPrefs, setUserPrefs] = useState(userProfile.Preferences || []); // Initialize preferences

  useEffect(() => {
    // Initialization logic here
    console.log(`UserPreferenceSettings component initialized! Profile data: ${JSON.stringify(userProfile)}`);

    // Set the serving size and units preference data
    let servingSizePref = userPrefs.find(p => p.id === 'serving-size');
    setServingSize(servingSizePref?.value || 4);

    let unitsPref = userPrefs.find(p => p.id === 'units');
    setUnits(unitsPref?.value || 'imperial');
  }, [userProfile, userPrefs]);

  const allPrefs = [
    {"id": "gluten-free", "name": "Gluten Free", "description": "Excludes foods containing gluten, wheat, barley, or rye.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "soy-free", "name": "Soy Free", "description": "Excludes foods containing soy or soybeans.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "dairy-free", "name": "Dairy Free", "description": "Excludes dairy products such as milk, cheese, and yogurt.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "sugar-free", "name": "Sugar Free", "description": "Avoids foods containing added sugars or sweeteners.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "alcohol-free", "name": "Alcohol Free", "description": "Excludes all beverages or foods containing alcohol.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "peanut-free", "name": "Peanut Free", "description": "Avoids all foods containing peanuts or peanut derivatives due to allergies.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "treenut-free", "name": "Treenut Free", "description": "Avoids all foods containing tree nuts such as almonds, walnuts, cashews, etc. due to allergies.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "shellfish-free", "name": "Shellfish Free", "description": "Avoids all types of shellfish (shrimp, crab, lobster, etc.) due to allergies.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "egg-free", "name": "Egg Free", "description": "Excludes all foods containing eggs or egg products due to allergies or dietary restrictions.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "fish-free", "name": "Fish Free", "description": "Avoids all types of fish and seafood.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "latex-free", "name": "Latex Free", "description": "Avoids products containing latex due to allergies.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "sugar-alcohol-free", "name": "Sugar Alcohol Free", "description": "Avoids foods containing sugar alcohols like sorbitol or xylitol.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "no-trans-fat", "name": "0g Trans Fat", "description": "Prefers foods with no trans fats, a type of unhealthy fat.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "low-glycemic-index", "name": "Low Glycemic Index", "description": "Chooses foods with a low glycemic index that affect blood sugar levels slowly.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "low-fat", "name": "Low Fat", "description": "Prefers foods with reduced fat content.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "low-carb", "name": "Low Carb", "description": "Follows a diet with reduced carbohydrate intake.", "type": "HealthPreference", "valueType": "boolean"},
    {"id": "plant-based", "name": "Plant-Based", "description": "Focuses on a diet primarily consisting of vegetables, fruits, whole grains, legumes, nuts, and seeds.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "pescetarian", "name": "Pescetarian", "description": "Excludes meat but may include fish.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "vegetarian", "name": "Vegetarian", "description": "Excludes meat but may include dairy products and eggs.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "vegan", "name": "Vegan", "description": "Excludes all animal products, including meat, dairy, eggs, and honey.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "paleo", "name": "Paleo", "description": "Focuses on whole, unprocessed foods believed to be similar to what humans ate during the Paleolithic era.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "keto", "name": "Keto", "description": "High-fat, low-carbohydrate diet that forces the body to burn fat for fuel.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "halal", "name": "Halal", "description": "Preparation of food in accordance with Islamic dietary laws and regulations.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "kosher", "name": "Kosher", "description": "A kosher diet follows Jewish laws on food preparation and consumption, excluding pork and shellfish, and separating meat and dairy.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "ayurvedic", "name": "Ayurvedic", "description": "Ayurvedic cooking focuses on balancing the body's doshas (vata, pitta, kapha) with foods that suit an individual's constitution.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "organic", "name": "Organic", "description": "Focuses on foods produced without synthetic pesticides, fertilizers, or genetically modified organisms (GMOs).", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "local", "name": "Local", "description": "Prioritizes consuming food grown or raised within a specific geographic region.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "sustainable", "name": "Sustainable", "description": "Considers the environmental and social impact of food production.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "home-cooking", "name": "Home-Cooking", "description": "Preparing meals at home from scratch rather than relying on processed or pre-made foods.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "convenience", "name": "Convenience", "description": "Prioritizes ease and speed of meal preparation, often involving processed or pre-made foods.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "health-focused", "name": "Health-Focused", "description": "Makes dietary choices based on perceived health benefits.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "budget-conscious", "name": "Budget-Conscious", "description": "Considers affordability when making food choices.", "type": "LifestylePreference", "valueType": "boolean"},
    {"id": "serving-size", "name": "Serving Size", "description": "Number of Servings most often prepared when cooking.", "type": "Preference", "valueType": "number", "valueRange": [1, 20]},
    {"id": "units", "name": "Units", "description": "The unit of measure for the ingredient - Metric or Imperial", "type": "Preference", "valueType": "select", "valueOptions": ["Metric", "Imperial"]},
];

  const handleAddPreference = (preference) => {
    // Logic to add the selected preference to the user's profile
    console.log('Selected preference:', preference);
    handleAddPreferenceCallback(preference.id);
    // Optionally update the state
    setUserPrefs([...userPrefs, preference]);
  };

  const updatePreferenceValue = (id, newValue) => {
    setUserPrefs(prevPrefs => prevPrefs.map(p => p.id === id ? { ...p, relPrefValue: newValue } : p));
    console.log(`Preference "${id}" updated to ${newValue}!`);
  };

  const handlePreferenceUpdates = (prefSelected, value) => {
    console.log(`Preference "${prefSelected}" updated to ${value}!`);
    updatePreferenceValue(prefSelected, value);
  };

  const handleTogglePreferenceUpdates = async (prefSelected, addPrefToProfile) => {
    console.log(`Preference "${prefSelected}" updated to ${addPrefToProfile}!`);

    if (addPrefToProfile) {
      // await callPrefsService(prefSelected, true);
      const prefToAdd = allPrefs.find(p => p.id === prefSelected);
      const alreadyAdded = userPrefs.find(p => p.id === prefSelected);
      if (prefToAdd && !alreadyAdded) {
        setUserPrefs([...userPrefs, prefToAdd]);
      }
    } else {
      // await callPrefsService(prefSelected, false);
      const newPrefs = userPrefs.filter(p => p.id !== prefSelected);
      setUserPrefs(newPrefs);
    }
  };

  const handleServingsPreferenceUpdates = (prefSelected, value) => {
    console.log(`Preference "${prefSelected}" updated to ${value}!`);
    setServingSize(value);
    // callPrefsService(prefSelected, true, value, 1.0);
  };

  const handleUnitsPreferenceUpdates = (prefSelected, value) => {
    console.log(`Preference "${prefSelected}" updated to ${value}!`);
    setUnits(value);
    updatePreferenceValue(prefSelected, value);
  };

  return (
    <PreferencesContainer>
      <Section>
        <SectionHeader>
          <strong>{/* Optionally add an icon or additional styling */}{/* Health-Related */} {`Health-Related Preferences:`}</strong>
        </SectionHeader>
        <PreferencesGrid>
          {allPrefs
            .filter((pref) => pref.type === 'HealthPreference')
            .map((pref) => {
              if (pref.valueType === 'boolean') {
                const hasPref = userPrefs.find(p => p.id === pref.id);
                return (
                  <PreferenceButton
                    key={pref.id}
                    active={!!hasPref}
                    onClick={() => handleTogglePreferenceUpdates(pref.id, !hasPref)}
                  >
                    {pref.name}
                  </PreferenceButton>
                );
              }
              return null;
            })}
        </PreferencesGrid>
      </Section>

      <Section>
        <SectionHeader>
          <strong>{`Lifestyle Preferences:`}</strong>
        </SectionHeader>
        <PreferencesGrid>
          {allPrefs
            .filter((pref) => pref.type === 'LifestylePreference')
            .map((pref) => {
              if (pref.valueType === 'boolean') {
                const hasPref = userPrefs.find(p => p.id === pref.id);
                return (
                  <PreferenceButton
                    key={pref.id}
                    active={!!hasPref}
                    onClick={() => handleTogglePreferenceUpdates(pref.id, !hasPref)}
                  >
                    {pref.name}
                  </PreferenceButton>
                );
              }
              return null;
            })}
        </PreferencesGrid>
      </Section>

      <Section>
        <SectionHeader>
          <strong>{`Other Preferences:`}</strong>
        </SectionHeader>
        <PreferencesGrid>
          {allPrefs
            .filter((pref) => pref.type === 'Preference')
            .map((pref) => {
              if (pref.valueType === 'number') {
                return (
                  <div key={pref.id}>
                    <Label>{pref.name}</Label>
                    <NumberControl 
                      value={servingSize || 1}
                      onChange={(newValue) => handleServingsPreferenceUpdates(pref.id, newValue)}
                      min={pref.valueRange[0]}
                      max={pref.valueRange[1]}
                    />
                    <p>{pref.description}</p>
                  </div>
                );
              } else if (pref.valueType === 'select') {
                return (
                  <div key={pref.id}>
                    <Label>{pref.name}</Label>
                    <SelectDropdown 
                      options={pref.valueOptions} 
                      value={units} 
                      onChange={(e) => handleUnitsPreferenceUpdates(pref.id, e.target.value)}
                    />
                    <p>{pref.description}</p>
                  </div>
                );
              } else if (pref.valueType === 'boolean') {
                const hasPref = userPrefs.find(p => p.id === pref.id);
                return (
                  <PreferenceButton
                    key={pref.id}
                    active={!!hasPref}
                    onClick={() => handleTogglePreferenceUpdates(pref.id, !hasPref)}
                  >
                    {pref.name}
                  </PreferenceButton>
                );
              }
              return null;
            })}
        </PreferencesGrid>
      </Section>

      {/* Add Preference Popup */}
      {isPopupVisible && (
        <AddPrefPopup
          preferences={allPrefs}
          onClose={() => setIsPopupVisible(false)}
          onSelect={handleAddPreference}
        />
      )}
    </PreferencesContainer>
  );
};

UserPreferenceSettings.propTypes = {
  userProfile: PropTypes.shape({
    Preferences: PropTypes.arrayOf(PropTypes.object),
    // ... other user profile fields
  }).isRequired,
  handleAddPreferenceCallback: PropTypes.func.isRequired,
  callPrefsService: PropTypes.func.isRequired,
};

export default UserPreferenceSettings;