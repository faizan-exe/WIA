import React, { useState } from 'react';
import JobCard from '../../components/JobCard';
import Header from '../../components/Header';

function OrgJobs() {
  const [jobPosts, setJobPosts] = useState([
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      jobName: 'Frontend Developer',
      jobDescription:
        'Looking for a skilled frontend developer with experience in React, JavaScript, and CSS to build user-facing applications.',
      expectedSalary: '$70,000 - $90,000',
      industry: 'Technology',
      location: 'New York, NY',
      jobType: 'Full-Time',
      skills: 'React, JavaScript, CSS',
      experience: 3,
      organizationName: 'Tech Innovators Inc.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      jobName: 'Data Scientist',
      jobDescription:
        'Seeking a data scientist proficient in Python, machine learning, and data visualization to analyze business insights.',
      expectedSalary: '$90,000 - $120,000',
      industry: 'Finance',
      location: 'San Francisco, CA',
      jobType: 'Full-Time',
      skills: 'Python, Machine Learning, Data Visualization',
      experience: 4,
      organizationName: 'DataCorp Analytics',
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      jobName: 'Healthcare Administrator',
      jobDescription:
        'We are hiring a healthcare administrator to oversee hospital operations and manage patient services efficiently.',
      expectedSalary: '$80,000 - $100,000',
      industry: 'Healthcare',
      location: 'Chicago, IL',
      jobType: 'Full-Time',
      skills: 'Management, Communication, Leadership',
      experience: 5,
      organizationName: 'Healthy Lives Hospital',
    },
    {
      id: 4,
      image: 'https://via.placeholder.com/100',
      jobName: 'Content Writer',
      jobDescription:
        'Hiring a creative content writer to produce high-quality articles, blogs, and social media posts for our clients.',
      expectedSalary: '$40,000 - $60,000',
      industry: 'Education',
      location: 'Remote',
      jobType: 'Part-Time',
      skills: 'Writing, SEO, Creativity',
      experience: 2,
      organizationName: 'EduCreative Solutions',
    },
    {
      id: 5,
      image: 'https://via.placeholder.com/100',
      jobName: 'AI Research Engineer',
      jobDescription:
        'Join our team as an AI research engineer to develop cutting-edge AI models and deploy them in real-world scenarios.',
      expectedSalary: '$110,000 - $150,000',
      industry: 'Technology',
      location: 'Austin, TX',
      jobType: 'Full-Time',
      skills: 'AI, Machine Learning, Deep Learning',
      experience: 6,
      organizationName: 'AI Pioneers Inc.',
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  const handleEditClick = (job) => {
    setCurrentJob(job);
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
    setCurrentJob(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    setJobPosts((prev) =>
      prev.map((job) =>
        job.id === currentJob.id ? { ...currentJob } : job
      )
    );
    handleModalClose();
  };

  return (
    <>
      <Header userRole={'organization'} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800">Job Listings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobPosts.map((job) => (
            <div key={job.id} className="relative">
              {/* JobCard Component */}
              <JobCard job={job} />

              {/* Buttons Container */}
              <div className="bg-white p-2 flex justify-around space-x-2 rounded-lg shadow-md mt-0">
                <button
                  onClick={() => handleEditClick(job)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Edit
                </button>
                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && currentJob && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClose}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Job Details
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Job Name</label>
                <input
                  type="text"
                  name="jobName"
                  value={currentJob.jobName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Job Description</label>
                <textarea
                  name="jobDescription"
                  value={currentJob.jobDescription}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </div>

              <div>
                <label className="block font-medium text-gray-700">Expected Salary</label>
                <input
                  type="text"
                  name="expectedSalary"
                  value={currentJob.expectedSalary}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Industry</label>
                <input
                  type="text"
                  name="industry"
                  value={currentJob.industry}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={handleModalClose}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OrgJobs;
