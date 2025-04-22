// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import apiService from '../services/apiService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userToken') || null;
    }
    return null;
  });
  const [userId, setUserId] = useState(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('userId')) || null;
    }
    return null;
  });
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sessionId') || null;
    }
    return null;
  });
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userToken) localStorage.setItem('userToken', userToken);
      else localStorage.removeItem('userToken');
    }
  }, [userToken]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (userId) localStorage.setItem('userId', JSON.stringify(userId));
      else localStorage.removeItem('userId');
    }
  }, [userId]);

  useEffect(() => {
    if (sessionId) localStorage.setItem('sessionId', sessionId);
    else localStorage.removeItem('sessionId');
  }, [sessionId]);

  // Anonymous login
  const loginAnonymous = async () => {
    try {
      const response = await apiService.loginAnonymous();
      const { token, userId, sessionId } = response;
      setUserToken(token);
      setUserId(userId);
      setSessionId(sessionId);
    } catch (error) {
      console.error('Anonymous login failed:', error);
      setAuthError(error.message);
      throw error;
    }
  };

  // User login
  const loginAsUser = async (credentials) => {
    try {
      const response = await apiService.doLogin(credentials.username, credentials.password);
      // const { token, userId, sessionId } = response;
      setUserToken(response.access_token);
      setUserId(credentials.username);
      return response;
    } catch (error) {
      console.error('Login failed:', error);
      setAuthError(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUserToken(null);
    setUserId(null);
    setSessionId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        userId,
        sessionId,
        loginAsUser,
        loginAnonymous,
        logout,
        isLoggedIn: !!userToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};