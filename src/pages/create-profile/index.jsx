import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProfile() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    address: '',
    qualification: '',
    image: null,
    preferences: {},
  });

  const predefinedRole = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role : '';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      preferences: {
        ...formData.preferences,
        [name]: checked,
      },
    });
  };

  const handleNextStep = () => setStep(step + 1);

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('address', formData.address);
    data.append('qualification', formData.qualification);
    data.append('image', formData.image);
    data.append('preferences', JSON.stringify(formData.preferences)); // Add preferences to FormData if needed

    try {
      const response = await fetch('your-api-endpoint', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        // Handle success (e.g., show a success message or redirect)
        console.log('Profile created successfully');
        if (predefinedRole === 'organization') {
          // Redirect to organization jobs page
          navigate('/org-jobs');
        }
        else if (predefinedRole === 'mentor') {
          // Redirect to mentor page
          navigate('/mentors');
        }
        else {
          // Redirect to jobs page
          navigate('/jobs');}
      } else {
        // Handle failure (e.g., show an error message)
        console.error('Error creating profile');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-900">{step==3?"Submit Profile":"Create Your Profile"}</h1>

        {step === 1 && (
          <div className="space-y-4">
            {/* Step 1 Form Fields */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="qualification" className="block text-sm font-medium text-gray-700">Qualification</label>
              <input
                type="text"
                id="qualification"
                name="qualification"
                placeholder="Enter your qualification"
                value={formData.qualification}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && predefinedRole === 'woman' && (
          <div className="space-y-4">
            {/* Preferences for woman role */}
            <h2 className="text-xl font-semibold text-gray-800">Entrepreneur Preferences</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preferred Industries</label>
              <div className="mt-1 space-y-2">
                {['Skincare', 'Healthcare', 'Gaming', 'Furniture'].map((industry) => (
                  <div key={industry} className="flex items-center">
                    <input
                      type="checkbox"
                      id={industry}
                      name={industry}
                      onChange={handlePreferenceChange}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={industry} className="ml-2 text-sm text-gray-700">{industry}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-gray-700">Key Skills</label>
              <input
                type="text"
                id="skills"
                name="skills"
                placeholder="Enter key skills"
                value={formData.preferences.skills || ''}
                onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, skills: e.target.value } })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && predefinedRole === 'organization' && (
          <div className="space-y-4">
            {/* Preferences for organization role */}
            <h2 className="text-xl font-semibold text-gray-800">Organization Details</h2>
            <div>
              <label htmlFor="org-name" className="block text-sm font-medium text-gray-700">Organization Name</label>
              <input
                type="text"
                id="org-name"
                name="orgName"
                placeholder="Enter vendor name"
                value={formData.preferences.orgName || ''}
                onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, orgName: e.target.value } })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="focus" className="block text-sm font-medium text-gray-700">Areas of Focus</label>
              <textarea
                id="focus"
                name="focus"
                placeholder="Describe your areas of focus"
                value={formData.preferences.focus || ''}
                onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, focus: e.target.value } })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && predefinedRole === 'mentor' && (
          <div className="space-y-4">
            {/* Preferences for mentor role */}
            <h2 className="text-xl font-semibold text-gray-800">Mentor Details</h2>
            <div>
              <label htmlFor="expertise" className="block text-sm font-medium text-gray-700">Area of Expertise</label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                placeholder="Enter your expertise"
                value={formData.preferences.expertise || ''}
                onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, expertise: e.target.value } })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Years of Experience</label>
              <input
                type="number"
                id="experience"
                name="experience"
                placeholder="Enter years of experience"
                value={formData.preferences.experience || ''}
                onChange={(e) => setFormData({ ...formData, preferences: { ...formData.preferences, experience: e.target.value } })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          </div>
        )}

        {step === 3 && (
          <div>
            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateProfile;
