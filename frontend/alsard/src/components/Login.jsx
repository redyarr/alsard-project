import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const {t} = useTranslation();





  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      login({ username: data.username });
      localStorage.setItem('token', data.token);
      navigate(-1);
    }
    catch (error) {
      alert('Invalid credentials');
    }

  };


  //   const handleLogin =  (e) => {
  //     e.preventDefault();

  //     if (username === 'admin' && password === 'password') {
  //       login({ username });
  //       navigate(-1);
  //     } else {
  //       alert('Invalid credentials');
  //     }
  //   };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{t('home.login')}</button>
      </form>
    </div>
  );
};

export default LoginPage;

