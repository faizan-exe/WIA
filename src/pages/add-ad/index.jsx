import React, { useState } from 'react';
import Header from '../../components/Header';

function AddAdvertisement() {
  const [advertisement, setAdvertisement] = useState({
    mentorName: '',
    services: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    image: null,
    experience: '',
    location: '',
    availableSlots: '',
    priceRange: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvertisement((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setAdvertisement((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulate form submission logic
    console.log('Advertisement Submitted:', advertisement);

    // Reset form
    setAdvertisement({
      mentorName: '',
      services: '',
      description: '',
      contactEmail: '',
      contactPhone: '',
      image: null,
      experience: '',
      location: '',
      availableSlots: '',
      priceRange: '',
    });

    alert('Advertisement added successfully!');
  };

  return (
    <>
        <Header userRole={'mentor'} />
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add Advertisement</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl space-y-4"
      >
        <div>
          <label className="block font-medium text-gray-700">Mentor Name</label>
          <input
            type="text"
            name="mentorName"
            value={advertisement.mentorName}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Services Offered</label>
          <input
            type="text"
            name="services"
            value={advertisement.services}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Career guidance, Interview preparation"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={advertisement.description}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Describe the services in detail"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={advertisement.contactEmail}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Contact Phone</label>
          <input
            type="text"
            name="contactPhone"
            value={advertisement.contactPhone}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter your phone number (optional)"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Experience (Years)</label>
          <input
            type="number"
            name="experience"
            value={advertisement.experience}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter years of experience"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={advertisement.location}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Remote, New York, USA"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Available Slots</label>
          <input
            type="text"
            name="availableSlots"
            value={advertisement.availableSlots}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., Weekends, Weekdays after 6 PM"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Price Range</label>
          <input
            type="text"
            name="priceRange"
            value={advertisement.priceRange}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., $50 - $100 per session"
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload an Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-md p-2"
          />
          {advertisement.image && (
            <p className="text-sm text-gray-600 mt-2">
              Selected file: {advertisement.image.name}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="reset"
            onClick={() =>
              setAdvertisement({
                mentorName: '',
                services: '',
                description: '',
                contactEmail: '',
                contactPhone: '',
                image: null,
                experience: '',
                location: '',
                availableSlots: '',
                priceRange: '',
              })
            }
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </>

  );
}

export default AddAdvertisement;
