import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../../Repository/authRepo';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Using useMutation for signup
  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Signup successful:", data);
      // Redirect on successful signup
      navigate('/create-profile'); 
    },
    onError: (err) => {
      console.error(err);
      setError('Signup failed. Please try again.');
    },
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSignup = (event) => {
    event.preventDefault(); // Prevent form submission reload
    console.log("Signup clicked with data:", formData);

    // Trigger the mutation
    mutation.mutate({
      name: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Signup</h1>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'} // Toggle input type
              id="password"
              placeholder="Enter your password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility
              className="absolute top-[50%] right-[2%] cursor-pointer text-gray-500 hover:text-gray-700"
            >
              {showPassword ? '🙈' : '👁️'} {/* Replace with actual icons if needed */}
            </span>
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={formData.role}
              onChange={handleInputChange}
              required
            >
              <option value="">Select your role</option>
              <option value="mentor">Mentor</option>
              <option value="org">Organization</option>
              <option value="woman">Woman</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={mutation.isPending} // Disable the button when loading
          >
            {mutation.isPending? <span className='loader'/> : 'Signup'}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
