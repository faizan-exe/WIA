import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../Repository/authRepo';
import { useMutation } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

function Login() {
  const predefinedRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : '';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful:', data);

      // Decode the token
      const decodedToken = jwtDecode(data.token); 
      console.log('Decoded Token:', decodedToken);

      // Save token and decoded data to local storage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(decodedToken));

     if (predefinedRole === 'mentor') {
      navigate('/my-ad');}
    },
    onError: (error) => {
      setError(error?.response?.data?.message || 'An error occurred');
    },
  });

  const handleLogin = (event) => {
    event.preventDefault();
    const userData = { email, password };
    
    // Trigger the mutation
    mutation.mutate(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update state on change
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update state on change
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}  {/* Show error message */}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={mutation.isPending}  
          >
            {mutation.isPending ?  <span className='loader'/>: 'Login'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
