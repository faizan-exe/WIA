import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdvertisementCard({ advertisement }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  console.log(advertisement.image);
  

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center space-y-2">
      {/* Card Content */}
      <img
        src={advertisement.image}
        alt={`${advertisement.mentorName}'s advertisement`}
        className="w-32 h-32 rounded-full object-cover"
      />
      <h3 className="text-lg font-bold text-gray-800">{advertisement.mentorName}</h3>
      <p className="text-sm text-gray-600">{advertisement.services}</p>
      <button
        onClick={handleModalToggle}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        View Details
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onScroll={(e)=>e.stopPropagation()}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Advertisement Details</h2>
              <button
                onClick={handleModalToggle}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                &#10005;
              </button>
            </div>

            {/* Modal Content (Scrollable) */}
            <div className="px-6 py-4 max-h-[70vh] overflow-y-scroll flex flex-col space-y-3">
              <img
                src={advertisement.image}
                alt={`${advertisement.mentorName}'s advertisement`}
                className="w-full h-48 rounded-lg object-cover mb-4"
              />
              <p>
                <strong>Mentor Name:</strong> <p className='cursor-pointer font-bold text-blue-400 hover:text-lg transition-all duration-100 ease-in-out' onClick={()=>navigate('/profile/asa')} >{advertisement.mentorName}</p>
              </p>
              <p>
                <strong>Services:</strong> {advertisement.services}
              </p>
              <p>
                <strong>Description:</strong> {advertisement.description}
              </p>
              <p>
                <strong>Contact Email:</strong> {advertisement.contactEmail}
              </p>
              <p>
                <strong>Contact Phone:</strong> {advertisement.contactPhone || 'N/A'}
              </p>
              <p>
                <strong>Experience:</strong> {advertisement.experience} years
              </p>
              <p>
                <strong>Location:</strong> {advertisement.location}
              </p>
              <p>
                <strong>Available Slots:</strong> {advertisement.availableSlots}
              </p>
              <p>
                <strong>Price Range:</strong> {advertisement.priceRange}
              </p>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end px-6 py-4 border-t">
              <button
                onClick={handleModalToggle}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
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

export default AdvertisementCard;
