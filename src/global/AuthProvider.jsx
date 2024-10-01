import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [user, setUser] = useState(null);

  const saveAuthToken = (token, userInfo) => {
    setAuthToken(token);
    setUser(userInfo);
    console.log('Saving token:', token);
    console.log('Saving user info:', userInfo);
  };

  const getAuthToken = () => {
    return authToken;
  };

  const getUser = () => {
    return user;
  };

  return (
    <AuthContext.Provider value={{ saveAuthToken, getAuthToken, getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
