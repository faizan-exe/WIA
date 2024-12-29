import React, { useState } from "react";
import Header from "../../components/Header";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { createMentorAd } from "../../Repository/mentorRepo";
import axios from 'axios'; 
import { useNavigate } from "react-router-dom";

function AddAdvertisement() {
  const [advertisement, setAdvertisement] = useState({
    mentorName: "",
    services: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    experience: "",
    location: "",
    availableSlots: "",
    priceRange: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdvertisement((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAdvertisement((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      mentorName,
      services,
      description,
      contactEmail,
      contactPhone,
      experience,
      location,
      availableSlots,
      priceRange,
      image,
    } = advertisement;

    // Check if all required fields are filled
    if (
      !mentorName ||
      !services ||
      !description ||
      !contactEmail ||
      !contactPhone ||
      !experience ||
      !location ||
      !availableSlots ||
      !priceRange ||
      !image
    ) {
      alert("Please fill in all fields before submitting the form.");
      return;
    }

    // Upload the image to ImgBB
    try {
      const imageData = new FormData();
      imageData.append("image", image);

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=5789a9111a607fd180aa3981f47e7c36`, // Replace with your ImgBB API Key
        imageData
      );

      if (response.data && response.data.data) {
        const imageUrl = response.data.data.url;

        // Proceed to create the ad with the image URL
        const adData = {
          mentorName,
          services,
          description,
          contactEmail,
          contactPhone,
          experience,
          location,
          availableSlots,
          priceRange,
          image: imageUrl, // Use the URL returned from ImgBB
        };

        // Send adData to your backend to save the ad
        mutation.mutate(adData);


        navigate('/my-ad')
        // Reset form after submission
        setAdvertisement({
          mentorName: "",
          services: "",
          description: "",
          contactEmail: "",
          contactPhone: "",
          experience: "",
          location: "",
          availableSlots: "",
          priceRange: "",
          image: null,
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  const mutation = useMutation({
    mutationFn: createMentorAd,
    onSuccess: (data) => {
      console.log("Advertisement added successfully!", data);
      QueryClient.invalidateQueries("getAllAds");
    },
    onError: (error) => {
      console.error("Error adding advertisement:", error);
    },
    
  });

  return (
    <>
      <Header userRole={"mentor"} />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Add Advertisement
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block font-medium text-gray-700">
              Mentor Name
            </label>
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
            <label className="block font-medium text-gray-700">
              Services Offered
            </label>
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
            <label className="block font-medium text-gray-700">
              Description
            </label>
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
            <label className="block font-medium text-gray-700">
              Contact Email
            </label>
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
            <label className="block font-medium text-gray-700">
              Contact Phone
            </label>
            <input
              type="text"
              name="contactPhone"
              value={advertisement.contactPhone}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Experience (Years)
            </label>
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
            <label className="block font-medium text-gray-700">
              Available Slots
            </label>
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
            <label className="block font-medium text-gray-700">
              Price Range
            </label>
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
            <label className="block font-medium text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              required
              className="w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="reset"
              onClick={() =>
                setAdvertisement({
                  mentorName: "",
                  services: "",
                  description: "",
                  contactEmail: "",
                  contactPhone: "",
                  experience: "",
                  location: "",
                  availableSlots: "",
                  priceRange: "",
                  image: null,
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
              {mutation.isPending ? "Adding..." : "Add Advertisement"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddAdvertisement;
