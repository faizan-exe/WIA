import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { getUserProfile } from '../../Repository/authRepo';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    role: '',
  });

  // Using `useQuery` hook to fetch user profile data
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['userProfile'],
    queryFn: getUserProfile,
  });

  useEffect(() => {
    if (data) {
      // Set initial profile data to the state when data is available
      setUserProfile({
        name: data.name || '',
        email: data.email || '',
        role: data.role || '',
      });
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the user profile data in the modal (local state)
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let imageUrl = data.image;
  
    // If a new image is selected, upload it to ImgBB
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
  
      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=5789a9111a607fd180aa3981f47e7c36`, // Replace with your ImgBB API Key
          formData
        );
  
        if (response.data && response.data.data) {
          imageUrl = response.data.data.url;
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image');
        return;
      }
    }
  
    // Prepare the updated profile with the new image URL
    const updatedProfile = {
      ...data,
      image: imageUrl,
      name: userProfile.name,
      email: userProfile.email,
      role: userProfile.role,
    };
  
    // Retrieve the token from localStorage
    const token = localStorage.getItem('token'); // Assuming your token is stored in localStorage
  
    // Perform the API call to update the user profile
    try {
      const res = await axios.put(
        'http://localhost:5001/api/auth/user/', // Replace with your actual backend API endpoint
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token in Authorization header
          },
        }
      );
  
      if (res.status === 200) {
        alert('Profile updated successfully');
        
        // Fetch the updated profile after successful update
        refetch();
        
        setIsModalOpen(false); // Close modal after successful update
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <Header userRole={data.role} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">Profile</h1>

          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Personal Information</h2>
              <img
                src={data.image || 'https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png'}
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full mx-auto object-cover mt-2 mb-2"
              />
              <p className="text-gray-600">Name: {data.name}</p>
              <p className="text-gray-600">Email: {data.email}</p>
              <p className="text-gray-600">Role: {data.role}</p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Profile</h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={userProfile.name} // Bind local state
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={userProfile.email} // Bind local state
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                {/* Image upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
