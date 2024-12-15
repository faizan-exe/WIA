import React, { useState, useEffect } from 'react';
import AdvertisementCard from '../../components/AdCard';
import Header from '../../components/Header';

function MyAd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [formData, setFormData] = useState({
    mentorName: '',
    services: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    image: null,  // Update image to store a file
    experience: 0,
    location: '',
    availableSlots: '',
    priceRange: '',
  });

  const sampleAdvertisements = [
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    {
      mentorName: 'John Doe',
      services: 'Career Coaching, Resume Building',
      description: 'Helping professionals advance their careers with personalized guidance.',
      contactEmail: 'johndoe@example.com',
      contactPhone: '123-456-7890',
      image: "https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953",
      experience: 5,
      location: 'Remote',
      availableSlots: 'Weekends, Evenings',
      priceRange: '$50 - $100 per session',
    },
    // More sample advertisements...
  ];

  const handleEdit = (advertisement) => {
    setCurrentAd(advertisement);
    setFormData({
      ...advertisement,
      image: null, // Reset the image when editing
    }); 
    setIsModalOpen(true);
  };

  const handleDelete = (advertisement) => {
    console.log('Deleting Advertisement:', advertisement);
    // Logic to delete the advertisement
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle image file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSaveChanges = () => {
    // Logic to save changes to the advertisement
    console.log('Updated Advertisement:', formData);
    setIsModalOpen(false);
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Reset overflow when component unmounts
    };
  }, [isModalOpen]);

  return (
    <>
      <Header userRole={'mentor'} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mentor Advertisements</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleAdvertisements.map((advertisement, index) => (
            <div key={index} className="flex flex-col items-center">
              <AdvertisementCard advertisement={advertisement} />
              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleEdit(advertisement)}
                  className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(advertisement)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Edit Advertisement</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                &#10005;
              </button>
            </div>

            {/* Modal Content */}
            <form className="space-y-4 overflow-y-auto max-h-[500px]">
              <input
                type="text"
                name="mentorName"
                value={formData.mentorName}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Mentor Name"
              />
              <input
                type="text"
                name="services"
                value={formData.services}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Services"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Description"
              />
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Contact Email"
              />
              <input
                type="text"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Contact Phone"
              />
              
              {/* Image File Input */}
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 border rounded-md"
                accept="image/*"
              />
              {formData.image && (
                <div className="mt-4">
                  <p>Image Preview:</p>
                  <img 
                    src={URL.createObjectURL(formData.image)} 
                    alt="Preview" 
                    className="mt-2 w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}

              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Experience (years)"
              />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Location"
              />
              <input
                type="text"
                name="availableSlots"
                value={formData.availableSlots}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Available Slots"
              />
              <input
                type="text"
                name="priceRange"
                value={formData.priceRange}
                onChange={handleFormChange}
                className="w-full p-2 border rounded-md"
                placeholder="Price Range"
              />

              <div className="flex space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MyAd;
