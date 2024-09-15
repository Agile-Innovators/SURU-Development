import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);

  const saveAuthToken = (token) => {
    setAuthToken(token);
    console.log('Saving token:', token);
  };

  const getAuthToken = () => {
    return authToken;
  };

  return (
    <AuthContext.Provider value={{ saveAuthToken, getAuthToken }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(AuthContext);
}
