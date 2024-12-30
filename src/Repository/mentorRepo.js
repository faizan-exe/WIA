import axios from "axios";

export const createMentorAd = async (adData) => {
  const token = localStorage.getItem("token"); // Replace with actual token
  const response = await axios.post(
    "https://web-be-180924265462.us-central1.run.app/api/mentors/ads",
    adData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.ad;
};

export const getMentorAds = async () => {
  const token = localStorage.getItem("token");
  console.log("Token:", token);
  try {
    let response = await axios.get("https://web-be-180924265462.us-central1.run.app/api/mentors/ads", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data.ads; 
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("No ads found for this user.");
      return []; // Return an empty array instead of throwing an error
    }
    console.error(
      "Error fetching ads:",
      error.response ? error.response.data.message : error.message
    );
    throw error; // Throw other errors to be handled by the query
  }
};


export const editMentorAd = async (adId, adData) => {
  const token = localStorage.getItem("token");
  console.log("Token:", adData,adId);
  try {
    const response = await axios.put(
      `https://web-be-180924265462.us-central1.run.app/api/mentors/ads/${adId}`,
      adData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Ad updated successfully:", response.data.ad);
    return response.data.ad; // The updated ad
  } catch (error) {
    console.error(
      "Error updating ad:",
      error.response ? error.response.data.message : error.message
    );
    throw error;
  }
};

export const getAllAds = async () => {
  const token = localStorage.getItem("token"); // Get the token from localStorage
  try {
    const response = await axios.get("https://web-be-180924265462.us-central1.run.app/api/mentors/allAds", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Bearer token to the headers
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching all ads:",
      error.response ? error.response.data.message : error.message
    );
    throw error;
  }
};


export const deleteAd = async (adId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.delete(
      `https://web-be-180924265462.us-central1.run.app/api/mentors/ads/${adId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Ad deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error deleting ad:",
      error.response ? error.response.data.message : error.message
    );
    throw error;
  }
}