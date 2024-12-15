import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JobCard({ job }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
      {/* Main Info */}
      <div className="flex items-center space-x-4">
        {job.image && (
          <img
            src={job.image}
            alt={job.jobName}
            className="w-16 h-16 rounded object-cover"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{job.jobName}</h2>
          <p className="text-gray-600 text-sm" >Organization: {job.organizationName}</p>
          <p className="text-gray-600 text-sm">Expected Salary: {job.expectedSalary}</p>
        </div>
      </div>

      {/* View Details Button */}
      <button
        onClick={handleModalToggle}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
      >
        View Details
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto"
          onClick={handleModalToggle}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Job Details</h3>
              <button
                onClick={handleModalToggle}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-gray-700">Job Name</h4>
                <p className="text-gray-600">{job.jobName}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Organization Name</h4>
                <p className="text-blue-600 font-bold hover:text-lg transition-all duration-100 ease-out cursor-pointer " onClick={()=>navigate('/profile/sass')}>{job.organizationName}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Job Description</h4>
                <p className="text-gray-600">{job.jobDescription}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Expected Salary</h4>
                <p className="text-gray-600">{job.expectedSalary}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Industry</h4>
                <p className="text-gray-600">{job.industry}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Location</h4>
                <p className="text-gray-600">{job.location}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Job Type</h4>
                <p className="text-gray-600">{job.jobType}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Required Skills</h4>
                <p className="text-gray-600">{job.skills}</p>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-700">Experience</h4>
                <p className="text-gray-600">{job.experience} years</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="mt-6 text-right">
              <button
                onClick={handleModalToggle}
                className="px-4 py-2 bg-gray-300 rounded-md text-gray-800 hover:bg-gray-400 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobCard;
