// src/components/ControlPanel.js
import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext'; // Import AuthContext
import users from '../data/users'; // Import the users array

const PanelContainer = styled.div`
  padding: 10px;
`;

const ThemeButton = styled.button`
  margin: 5px;
  padding: 10px;
  cursor: pointer;
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Select = styled.select`
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
`;

function ControlPanel({ setStateData }) {
  const { t } = useTranslation();
  const [botSetting, setBotSetting] = useState('');
  const [testType, setTestType] = useState('');
  const [selectedUser, setSelectedUser] = useState('undefined'); // Default to Anonymous
  const { toggleTheme } = useContext(ThemeContext);
  const { loginAsUser } = useContext(AuthContext); // Access the new loginAsUser function

  const handleSettingChange = (e) => {
    setBotSetting(e.target.value);
  };

  const handleTestChange = (e) => {
    setTestType(e.target.value);
  };

  const applySetting = () => {
    setStateData((prevData) => ({
      ...prevData,
      setting: botSetting,
    }));
  };

  const runTest = () => {
    setStateData((prevData) => ({
      ...prevData,
      test: testType,
    }));
    // Add logic to run specific tests based on testType
    alert(`Running test: ${testType}`);
  };

  // List of users
  // const users = [
  //   { username: 'undefined', displayName: 'Anonymous' },
  //   { username: 'aleesha@me.com', displayName: 'Aleesha Jones' },
  //   { username: 'satya@imehta.com', displayName: 'Satya Mehta' },
  //   { username: 'dimple@imehta.com', displayName: 'Dimple Mehta' },
  //   { username: 'carol@smithfam.com', displayName: 'Carol Smith' },
  //   { username: 'james@smithfam.com', displayName: 'James Smith' },
  //   { username: 'katie@smithfam.com', displayName: 'Katie Smith' },
  //   { username: 'junior@smithfam.com', displayName: 'Junior Smith' },
  //   { username: 'blake@boomer.com', displayName: 'Blake Boomer' },
  // ];

  const handleUserChange = (e) => {
    const selected = e.target.value;
    setSelectedUser(selected);
    const creds = { username: selected, password: 'password' };
    loginAsUser(creds); // Call the function to update authentication state
  };

  return (
    <PanelContainer>
      <h3>Select Theme</h3>
      <ThemeButton onClick={() => toggleTheme('light')}>Light Theme</ThemeButton>
      <ThemeButton onClick={() => toggleTheme('red')}>Red Theme</ThemeButton>
      <ThemeButton onClick={() => toggleTheme('dark')}>Dark Theme</ThemeButton>

      <Panel>
        {/* Existing sections remain the same */}
        <Section>
            <Label htmlFor="bot-setting">{t('Settings')}</Label>
            <Input
            id="bot-setting"
            type="text"
            value={botSetting}
            onChange={handleSettingChange}
            placeholder={t('Settings')}
            />
            <Button onClick={applySetting}>{t('Apply Setting')}</Button>
        </Section>
        <Section>
            <Label htmlFor="test-type">{t('Run Test')}</Label>
            <Select id="test-type" value={testType} onChange={handleTestChange}>
            <option value="">{t('Select Test')}</option>
            <option value="test1">Test 1</option>
            <option value="test2">Test 2</option>
            <option value="test3">Test 3</option>
            </Select>
            <Button onClick={runTest}>{t('Run Test')}</Button>
        </Section>

        {/* New Section for User Selection */}
        <Section>
          <Label htmlFor="user-selection">{t('Select User')}</Label>
          <Select id="user-selection" value={selectedUser} onChange={handleUserChange}>
            {users.map((user) => (
              <option key={user.username} value={user.username}>
                {user.displayName}
              </option>
            ))}
          </Select>
        </Section>
      </Panel>
    </PanelContainer>
  );
}

export default ControlPanel;