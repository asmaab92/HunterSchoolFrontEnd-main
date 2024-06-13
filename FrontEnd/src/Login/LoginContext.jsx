import React, { useEffect, createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userInfo, setUserInfo] = useState(() => {
    const savedUserInfo = localStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  const toggleLogin = () => {
    setIsLoggedIn((prevIsLoggedIn) => !prevIsLoggedIn);
    localStorage.setItem('isLoggedIn', JSON.stringify(!isLoggedIn));
  };

  const saveLoginInfo = (data) => {
    setUserInfo(data);
    localStorage.setItem('userInfo', JSON.stringify(data));
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setUserInfo(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
  };

  useEffect(() => {
    const storedLoggedInStatus = localStorage.getItem('isLoggedIn');
    if (storedLoggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, toggleLogin, logout, userInfo, saveLoginInfo, isAdmin }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
