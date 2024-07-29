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


  return (
<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
    {t('home.signInToYourAccount')}
  </h2>
</div>

<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
  <form action="#" method="POST" onSubmit={handleLogin} className="space-y-6">
    <div>
      <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
        {t('home.userName')}
      </label>
      <div className="mt-2">
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 outline-none sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <div className="flex items-center justify-between">
        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
          {t("home.password")}
        </label>
      </div>
      <div className="mt-2">
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 outline-none sm:text-sm sm:leading-6"
        />
      </div>
    </div>

    <div>
      <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        {t('home.login')}
      </button>
    </div>
  </form>

  <p className="mt-10 text-center text-sm text-gray-500">
    {t('home.note')}
  </p>
</div>
</div>
  );
};

export default LoginPage;

