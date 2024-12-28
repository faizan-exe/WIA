import axios from 'axios';


export const createMentorAd = async (adData) => {
    const response = await axios.post('http://localhost:5001/api/mentors/ads', adData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        'Content-Type': 'application/json',
      }
    });
  return response.data.ad;
};

export const getMentorAds = async () => {
  const token = localStorage.getItem('token');
  console.log('Token:', token);
  try {
    let response = await axios.get('http://localhost:5001/api/mentors/ads', {
      headers: {
        'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
      }
    });

    console.log('Fetched ads:', response.data.ads);
  response.data.ads.map((ad) => {
    ad.image = 'https://static.wikia.nocookie.net/shipping/images/0/09/Batman.jpg/revision/latest?cb=20210522210953';
  })
    return response.data.ads; // The list of mentor's ads
  } catch (error) {
    console.error('Error fetching ads:', error.response ? error.response.data.message : error.message);
    throw error;
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
    throw error;
  }
}

