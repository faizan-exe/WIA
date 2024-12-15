import React, { useState } from 'react';
import Header from '../../components/Header';

function AddJob() {
  const [jobData, setJobData] = useState({
    image: '',
    jobName: '',
    jobDescription: '',
    expectedSalary: '',
    industry: 'Technology',
    location: '',
    jobType: 'Full-Time',
    skills: '',
    experience: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setJobData((prev) => ({
          ...prev,
          image: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Data Submitted:', jobData);
    // Add logic to send jobData to backend or API
    alert('Job added successfully!');
  };

  return (
    <>
    <Header userRole={'organization'} />
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-3xl p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Job</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Job Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            {jobData.image && (
              <img
                src={jobData.image}
                alt="Job Preview"
                className="mt-4 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Job Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Name</label>
            <input
              type="text"
              name="jobName"
              value={jobData.jobName}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job name"
              required
            />
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Description</label>
            <textarea
              name="jobDescription"
              value={jobData.jobDescription}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job description"
              rows="4"
              required
            ></textarea>
          </div>

          {/* Expected Salary */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Expected Salary</label>
            <input
              type="text"
              name="expectedSalary"
              value={jobData.expectedSalary}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter expected salary"
            />
          </div>

          {/* Industry */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Industry</label>
            <div className="mt-2 space-y-2">
              {['Technology', 'Healthcare', 'Education', 'Finance'].map((industry) => (
                <label key={industry} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="industry"
                    value={industry}
                    checked={jobData.industry === industry}
                    onChange={handleInputChange}
                    className="focus:ring-indigo-500 focus:border-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <span className="text-gray-700">{industry}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={jobData.location}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter job location"
            />
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Job Type</label>
            <select
              name="jobType"
              value={jobData.jobType}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Freelance">Freelance</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Required Skills</label>
            <input
              type="text"
              name="skills"
              value={jobData.skills}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter skills separated by commas"
            />
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Experience (in years)</label>
            <input
              type="number"
              name="experience"
              value={jobData.experience}
              onChange={handleInputChange}
              className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter required experience"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Job
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}

export default AddJob;
