import axios from 'axios';

const token = localStorage.getItem('token');

export const createMentorAd = async (adData) => {
  try {
    const response = await axios.post('http://localhost:5001/api/mentors/ads', adData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
      }
    });

    console.log('Ad created successfully:', response.data.ad);
    return response.data.ad; // The newly created ad
  } catch (error) {
    console.error('Error creating ad:', error.response ? error.response.data.message : error.message);
    return null;
  }
};

export const getMentorAds = async () => {
  console.log('Token:', token);
  try {
    const response = await axios.get('http://localhost:5001/api/mentors/ads', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      }
    });

    console.log('Fetched ads:', response.data.ads);
    return response.data.ads; // The list of mentor's ads
  } catch (error) {
    console.error('Error fetching ads:', error.response ? error.response.data.message : error.message);
    return [];
  }
};

export const editMentorAd = async (adId, adData) => {
  try {
    const response = await axios.put(`http://localhost:5001/api/mentors/ads/${adId}`, adData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
      }
    });

    console.log('Ad updated successfully:', response.data.ad);
    return response.data.ad; // The updated ad
  }
  catch (error) {
    console.error('Error updating ad:', error.response ? error.response.data.message : error.message);
    return null;
  }
}

