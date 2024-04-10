// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Custom hook to consume the context
export const useAuth = () => useContext(AuthContext);

// Provider component to wrap around the app
export const AuthProvider = ({ children }) => {
 
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

 
  const authValues = { token, setToken, userId, setUserId };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};
