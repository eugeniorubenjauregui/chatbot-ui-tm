// src/components/LanguageSwitcher.js
import React from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SwitcherContainer = styled.div`
  margin-bottom: 20px;
`;

const LanguageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #5a6268;
  }
`;

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    document.dir = ['ar', 'he', 'fa', 'ur'].includes(lng) ? 'rtl' : 'ltr';
  };

  return (
    <SwitcherContainer>
      <LanguageButton onClick={() => changeLanguage('en')}>EN</LanguageButton>
      <LanguageButton onClick={() => changeLanguage('es')}>ES</LanguageButton>
      <LanguageButton onClick={() => changeLanguage('ar')}>AR</LanguageButton>
      <LanguageButton onClick={() => changeLanguage('he')}>HE</LanguageButton>
    </SwitcherContainer>
  );
}

export default LanguageSwitcher;