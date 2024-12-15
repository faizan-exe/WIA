import React, { useState } from 'react';
import Header from '../../components/Header';

function SpecificProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample data to simulate form submission
  const [userProfile, setUserProfile] = useState({
    address: '123 Main St, Cityville, Country',
    qualification: 'Bachelor in Computer Science',
    image: 'https://thumbs.dreamstime.com/b/portrait-nice-young-girl-show-tongue-wear-top-isolated-turquoise-color-background-portrait-nice-young-girl-show-tongue-323915903.jpg',
    preferences: {
      skills: 'JavaScript, React, Node.js',
      industries: ['Technology', 'Finance'],
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
                alt="SpecificProfile"
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

          </div>
        </div>
      </div>

    </>
  );
}

export default SpecificProfile;
