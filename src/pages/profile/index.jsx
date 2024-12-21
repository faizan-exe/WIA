import React, { useState } from 'react';
import Header from '../../components/Header';

function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data to simulate form submission
  const [userProfile, setUserProfile] = useState({
    address: '123 Main St, Cityville, Country',
    qualification: 'Bachelor in Computer Science',
    image: 'https://thumbs.dreamstime.com/b/portrait-nice-young-girl-show-tongue-wear-top-isolated-turquoise-color-background-portrait-nice-young-girl-show-tongue-323915903.jpg',
    preferences: {
      skills: 'JavaScript, React, Node.js',
      industries: ['Skincare', 'Healthcare', 'Gaming', 'Furniture'],
      expertise: 'Software Development',
      experience: 5,
      orgName: 'Tech Innovators Inc.',
      focus: 'Software development and AI research',
    },
  });

  // For testing purposes, we'll assume the role is 'job-seeker'
  // const predefinedRole = 'job-seeker';
  // const predefinedRole = 'organization';
  const predefinedRole = 'mentor';

  // Handle input changes in the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePreferencesChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <Header userRole={predefinedRole} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md space-y-6">
          <h1 className="text-2xl font-bold text-center text-gray-900">Profile</h1>

          <div className="space-y-4">
            <div className="text-center">
              <img
                src={userProfile.image}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-800 mt-4">Personal Information</h2>
              <p className="text-gray-600">Address: {userProfile.address}</p>
              <p className="text-gray-600">Qualification: {userProfile.qualification}</p>
            </div>

            {predefinedRole === 'job-seeker' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Job Seeker Preferences</h2>
                <p className="text-gray-600">Preferred Industries: {userProfile.preferences.industries.join(', ')}</p>
                <p className="text-gray-600">Skills: {userProfile.preferences.skills}</p>
              </div>
            )}

            {predefinedRole === 'organization' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Organization Details</h2>
                <p className="text-gray-600">Organization Name: {userProfile.preferences.orgName}</p>
                <p className="text-gray-600">Areas of Focus: {userProfile.preferences.focus}</p>
              </div>
            )}

            {predefinedRole === 'mentor' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Mentor Details</h2>
                <p className="text-gray-600">Area of Expertise: {userProfile.preferences.expertise}</p>
                <p className="text-gray-600">Years of Experience: {userProfile.preferences.experience}</p>
              </div>
            )}

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

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={userProfile.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Qualification</label>
                <input
                  type="text"
                  name="qualification"
                  value={userProfile.qualification}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              {predefinedRole === 'job-seeker' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Preferred Industries</label>
                  <input
                    type="text"
                    name="industries"
                    value={userProfile.preferences.industries.join(', ')}
                    onChange={(e) =>
                      handlePreferencesChange({
                        target: { name: 'industries', value: e.target.value.split(', ') },
                      })
                    }
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label className="block text-sm font-medium text-gray-700 mt-2">Skills</label>
                  <input
                    type="text"
                    name="skills"
                    value={userProfile.preferences.skills}
                    onChange={handlePreferencesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              )}

              {predefinedRole === 'organization' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization Name</label>
                  <input
                    type="text"
                    name="orgName"
                    value={userProfile.preferences.orgName}
                    onChange={handlePreferencesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label className="block text-sm font-medium text-gray-700 mt-2">Focus</label>
                  <textarea
                    name="focus"
                    value={userProfile.preferences.focus}
                    onChange={handlePreferencesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  ></textarea>
                </div>
              )}

              {predefinedRole === 'mentor' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Expertise</label>
                  <input
                    type="text"
                    name="expertise"
                    value={userProfile.preferences.expertise}
                    onChange={handlePreferencesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <label className="block text-sm font-medium text-gray-700 mt-2">Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={userProfile.preferences.experience}
                    onChange={handlePreferencesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)} // Save functionality can be added here
                className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
