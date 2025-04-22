// src/components/UserGoals.js
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PieChartInteractive from './PieChartInteractive';

const GoalsContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background-color: ${(props) => props.theme.colors.cardBackground};
  box-shadow: ${(props) => props.theme.shadows.card};
  border-radius: 8px;
  padding: 24px;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const SectionHeader = styled.h2`
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 16px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  background-color: ${(props) => (props.readOnly ? '#f5f5f5' : '#ffffff')};
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.primaryDark};
  }
`;

function UserGoals({ userProfile, handleUpdateGoal, callLLMService }) {
  const [goals, setGoals] = useState({
    groceryBudget: userProfile.groceryBudget || 'Unspecified',
    dailyCalories: userProfile.dailyCalories || 'Unspecified',
    dailyCarbs: userProfile.dailyCarbs || 'Unspecified',
    dailyProtein: userProfile.dailyProtein || 'Unspecified',
    dailyFats: userProfile.dailyFats || 'Unspecified',
    dailyHydration: userProfile.dailyHydration || 'Unspecified',
    macronutrientBalance: userProfile.macronutrientBalance || { fat: 30, protein: 30, carbs: 40 }
  });

  const handleGoalChange = (goal, value) => {
    setGoals(prevGoals => ({
      ...prevGoals,
      [goal]: value,
    }));
  };

  const handleMacronutrientChange = (fat, protein, carbs) => {
    setGoals(prevGoals => ({
      ...prevGoals,
      macronutrientBalance: { fat, protein, carbs }
    }));
  };

  return (
    <GoalsContainer>
      <Section>
        <SectionHeader>{`Set Your Goals`}</SectionHeader>

        {/* Weekly Grocery Budget */}
        <div>
          <label htmlFor="groceryBudget"><strong>Weekly Grocery Budget Goal ($):</strong></label>
          <Input
            type="number"
            id="groceryBudget"
            value={goals.groceryBudget === 'Unspecified' ? '' : goals.groceryBudget}
            placeholder="Unspecified"
            onChange={(e) => handleGoalChange('groceryBudget', e.target.value || 'Unspecified')}
          />
        </div>
      </Section>

      <Section>
        {/* Daily Hydration Goal */}
        <div>
          <label htmlFor="dailyHydration"><strong>Daily Hydration Goal (liters/fluid oz):</strong></label>
          <Input
            type="number"
            id="dailyHydration"
            value={goals.dailyHydration === 'Unspecified' ? '' : goals.dailyHydration}
            placeholder="Unspecified"
            onChange={(e) => handleGoalChange('dailyHydration', e.target.value || 'Unspecified')}
          />
        </div>
      </Section>

      <Section>
        {/* Macronutrient Balance Slider */}
        <div>
          <label><strong>Target Balance of Fats/Protein/Carbs (%):</strong></label>
          <PieChartInteractive
            onChange={handleMacronutrientChange}
            data={goals.macronutrientBalance}
          />
        </div>
      </Section>

      <Button onClick={() => {
        console.log(goals);
        handleUpdateGoal(goals);
      }}>
        Save Goals
      </Button>
    </GoalsContainer>
  );
};

UserGoals.propTypes = {
  userProfile: PropTypes.shape({
    groceryBudget: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dailyCalories: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dailyCarbs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dailyProtein: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dailyFats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    dailyHydration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    macronutrientBalance: PropTypes.shape({
      fat: PropTypes.number,
      protein: PropTypes.number,
      carbs: PropTypes.number,
    }),
  }).isRequired,
  handleUpdateGoal: PropTypes.func.isRequired,
  callLLMService: PropTypes.func.isRequired,
};

export default UserGoals;