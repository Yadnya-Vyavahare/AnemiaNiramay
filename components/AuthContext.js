import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState('');

  const setAuthData = (name) => {
    setUserName(name);
  };

  const signOut = async () => {
    // Clear user credentials here (set them to empty strings)
    setUserName('');
    // You can add password clearing logic if needed
  };

  return (
    <AuthContext.Provider value={{ userName, setAuthData, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
