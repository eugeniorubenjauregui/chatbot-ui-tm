// src/App.js
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import MainPage from './MainPage';
import { AuthContext } from '../src/contexts/AuthContext';
import GlobalStyles from './GlobalStyles';
import './i18n/config'; // Ensure i18n is initialized
//import apiService from './services/apiService';
//import Config from './constants/config';
import { ChatbotProvider } from './contexts/ChatbotContext';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
`;

function App(props) {

  const { loginAsUser } = useContext(AuthContext); 

  useEffect(() => {
    if(props.user){
      const creds = { username: props.user, password: 'password' };
      loginAsUser(creds); 
    }
  },[props])

  return (
    <>
      <GlobalStyles /> {/* Apply global styles */}
      <AppContainer>
        <ChatbotProvider>
          <MainPage />
        </ChatbotProvider>
      </AppContainer>
    </>
  );
}

export default App;