import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const navigate=useNavigate();

  const [authState, setAuthState] = useState(() => {
    const token = localStorage.getItem('token');
    return {
      isAuthenticated: !!token,
      token,
      user: null,
    };
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({
        isAuthenticated: true,
        token,
        user: { username: 'admin' }, 
      });
    }
  }, []);


  const login = ({ username, token }) => {
    localStorage.setItem('token', token);
    setAuthState({
      isAuthenticated: true,
      token,
      user: { username },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuthState({
      isAuthenticated: false,
      token: null,
      user: null,
    });

  navigate('/')
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
