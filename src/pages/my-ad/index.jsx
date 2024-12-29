import React, { useState, useEffect } from "react";
import AdvertisementCard from "../../components/AdCard";
import Header from "../../components/Header";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { editMentorAd, getMentorAds } from "../../Repository/mentorRepo";
import axios from "axios";

function MyAd() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [formData, setFormData] = useState({
    mentorName: "",
    services: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    image: null,
    experience: 0,
    location: "",
    availableSlots: "",
    priceRange: "",
  });

  const { data: ads, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["mentorAds"],
    queryFn: getMentorAds,
  });

  const handleEdit = (advertisement) => {
    setCurrentAd(advertisement);
    setFormData({
      ...advertisement,
      image: null, // Reset the image when editing (or handle separately)
    });
    setIsModalOpen(true);
  };

  const handleDelete = (advertisement) => {
    console.log("Deleting Advertisement:", advertisement);
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

  const handleSaveChanges = async () => {
    let imageUrl = currentAd.image; 

    if (formData.image) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("image", formData.image);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=5789a9111a607fd180aa3981f47e7c36`, 
          formDataToUpload
        );

        if (response.data && response.data.data) {
          imageUrl = response.data.data.url; 
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image");
        return;
      }
    }


    const updatedAd = {
      ...formData,
      image: imageUrl, // Handle image upload if necessary
    };
    console.log("Updating Advertisement:", currentAd, updatedAd);

    try {
      const response = await editMentorAd(currentAd._id, updatedAd);
      refetch();
      console.log("Advertisement updated successfully:", response);
    } catch (error) {
      console.error("Error updating advertisement:", error);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    <>
      <Header userRole={"mentor"} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Mentor Advertisements
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads?.length > 0 &&
            ads.map((advertisement, index) => (
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
        {ads?.length === 0 && <p className="mx-auto">No advertisements added yet.</p>}
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
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
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
