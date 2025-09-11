import axios from "axios";
const API_BASE_URL = 'https://admin.gomasjid.co.uk/app/api';
interface FetchMasjidsParams {
    latitude: number;
    longitude: number;
    radius?: number;
  }

export const fetchMasjids = async ({ latitude, longitude, radius = 10 }: FetchMasjidsParams) => {
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    radius: radius.toString()
  });
// console.log('fetchMasjids', queryParams.toString());
  // console.log(`${API_BASE_URL}/masjids/nearby?${queryParams.toString()}`);
  const response = await fetch(
    // https://admin.gomasjid.co.uk/app/api/masjids/nearby?latitude=37.785834&longitude=-122.406417&radius=50
    `${API_BASE_URL}/masjids/nearby?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );

  if (!response.ok) {
    // throw new Error('Failed to fetch masjids');
  }

  return response.json();
};

export const AddUserFavMasjid = async ( masjid_id: number,userToken: string ) => {
  try { 
    const response = await axios.get(`${API_BASE_URL}/masjids/add-fav/${masjid_id}`,{
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response); 
    return response;
    // return JSON.stringify(response.data);
  } catch (error) {
    // console.error('Error inserting User FavMasjid', error);
  }
}
export const RemoveUserFavMasjid = async ( masjid_id: number,userToken: string ) => {
  try { 
    const response = await axios.delete(`${API_BASE_URL}/masjids/delete-fav/${masjid_id}`,
      {
        // data,
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
    // return JSON.stringify(response.data);
  } catch (error) {
    // console.error('Error inserting User FavMasjid', error);
  }
}
export const followMasjid = async ( masjid_id: number, userToken: string ) => {
  try { 
    const response = await axios.get(`${API_BASE_URL}/masjids/follow/${masjid_id}`,{
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    // console.error('Error Following Masjid', error);
  }
}

export const fetchUserMasjids = async ( userToken: string ) => {
  try {
    // console.log(`${API_BASE_URL}/masjids/list-fav`);
    // console.log(userToken);
    const response = await axios.get(`${API_BASE_URL}/masjids/list-fav`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data); 
    return response.data;
    // return JSON.stringify(response.data);
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const ClaimMasjidReq = async (masjid_id: number, data: any, userToken: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/masjids/request-admin/${masjid_id}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('ClaimMasjidReq error status:', error.response?.status);
      console.error('ClaimMasjidReq error data:', error.response?.data);
    } else {
      console.error('Unexpected error in ClaimMasjidReq:', error);
    }

    throw error; // rethrow so you can catch it in the component
  }
};

export const fetchMasjidDetails = async ( masjid_id: number ) => {
  try { // /admin/masjid/:masjid_id
    const response = await axios.get(`${API_BASE_URL}/masjids/${masjid_id}`, {
      params: { masjid_id: masjid_id },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getMasjidDetail = async ( masjid_id: number ) => {
  try { // /admin/masjid/:masjid_id
    const response = await axios.get(`${API_BASE_URL}/admin/masjid/${masjid_id}`, {
      params: { masjid_id: masjid_id },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const updateMasjidData = async ( masjid_id: number, data: any, userToken: string ) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/masjid/update/${masjid_id}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getMasjidAnnouncement = async ( masjid_id: number ) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/announcements/masjid/${masjid_id}`, {
      params: { masjid_id: masjid_id },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const CreateMasjidAnnouncement = async ( masjid_id: number, data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/announcement/create/${masjid_id}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const DeleteMasjidAnnouncement = async ( announcement_id: number, userToken: string ) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/announcement/delete/${announcement_id}`,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getMasjidImaams = async ( masjid_id: number ) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/masjid/${masjid_id}/imams`, {
      params: { masjid_id: masjid_id },
    });
    // console.log(response.data); 
    return response.data;
    // return JSON.stringify(response.data);
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const DeleteMasjidImaam = async ( imaam_id: number, userToken: string, masjid_id: number ) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/imam/delete/${imaam_id}`, {
      params: { masjid_id: masjid_id, imam_id: imaam_id },
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const addMasjidImam = async ( masjid_id: number, data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/imam/create`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getImaam = async ( imam_id: number ) => {
  console.log('getImaam', imam_id);
  console.log(`${API_BASE_URL}/imam/${imam_id}`);
  try {
    const response = await axios.get(`${API_BASE_URL}/imam/${imam_id}`, {
      params: { imam_id: imam_id },
    });
    // console.log(response.data); 
    return response.data;
    // return JSON.stringify(response.data);
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getMasjidEvents = async ( masjid_id: number ) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/masjids/${masjid_id}/events`, {
      params: { masjid_id: masjid_id },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const addMasjidEvent = async ( masjid_id: number, data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/masjids/${masjid_id}/event/create`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getEventDetails = async ( event_id: number ) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/event/${event_id}`, {
      params: { event_id: event_id },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const userUnRegisterEvent = async ( event_id: number, user_id: number, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/event/unregister`,
      { user_id: user_id, event_id: event_id },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const userRegisterEvent = async ( event_id: number, user_id: number, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/event/register`,
      { user_id: user_id, event_id: event_id },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getEvents = async (latitude: number, longitude: number, userToken: string) => {
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString()
  });
  const response = await fetch(
    `${API_BASE_URL}/events?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      }
    }
  );
  console.log(response, 'getEvents');

  if (!response.ok) {
    // throw new Error('Failed to fetch masjids');
  }

  return response.json();
};

export const updateSalahTime = async ( masjid_id: number, data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/masjids/${masjid_id}/prayer-timings/update`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        },
      }
    );
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const updatePrayerTiming = async ( masjid_id: number, data: any, userToken: string ) => {
  try {
    console.log(data)
    const response = await axios.post(`${API_BASE_URL}/masjids/${masjid_id}/update-salah`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response); 
    return response;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getFAQ = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/imams/qna`);
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const getUserQuestions = async (user_id: any, userToken: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/qna`, {
      params: { user_id: user_id },
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const AskImamQuestion = async ( data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/imams/qna/ask`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};
  
export const getQuestionConversation = async (question_id: any, userToken: string) => {
  console.log(userToken);
  try {
    const response = await axios.get(`${API_BASE_URL}/imams/qna/${question_id}`, {
      params: { question_id: question_id },
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};
export const sendConversationMsg = async ( data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/conversation`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response); 
    return response;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};
  
// Imam Dashboard
export const getImamQuestions = async (userToken: string ) => {
  console.log(userToken);
  try { 
    const response = await axios.get(`${API_BASE_URL}/imam-questions`,{
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
    // return JSON.stringify(response.data);
  } catch (error) {
    // console.error('Error fetching ImamQuestions data', error);
  }
};

export const imamAnswerQuestion = async ( data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/imam-answer`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error imamAnswerQuestion:', error);
  }
};

export const ChangeImam = async ( userToken: string, imam_id: number, masjid_id: number ) => { 
  try {
    const response = await axios.post(`${API_BASE_URL}/change-following-imam`,
      { imam_id: imam_id, masjid_id: masjid_id },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error imamAnswerQuestion:', error);
  }
};

export const userDashboard = async (latitude: number, longitude: number, userToken: string) => {
  try {
    console.log("latittt", latitude, longitude, userToken);
    const response = await axios.post(`${API_BASE_URL}/home`,
      { latitude: latitude, longitude: longitude },
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error imamAnswerQuestion:', error);
  }
};

export const refreshAppData = async ( userToken: string ) => {
  // console.log('refreshAppData', userToken);
  try { 
    const response = await axios.get(`${API_BASE_URL}/refresh-app-data`,{
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log("response: ",response.data); 
    return response.data;
    // return JSON.stringify(response.data);
  } catch (error) {
    console.error('Error inserting User FavMasjid', error);
  }
}

export const profileUpdate = async ( data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/update-profile`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};

export const userFeedback = async ( data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/submit-feedback`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error imamAnswerQuestion:', error);
  }
};

export const getUserAnnouncements = async (userToken: string ) => {
  try { 
    const response = await axios.get(`${API_BASE_URL}/user/announcement`,{
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
    // return JSON.stringify(response.data);
  } catch (error) {
    console.error('Error fetching announcements data', error);
  }
};

export const notificationUpdate = async ( data: any, userToken: string, deviceToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/user/notification/update/${deviceToken}`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    // console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error notification:', error);
  }
};

export const userReport = async ( data: any, userToken: string ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/report-user`,
      data,
      {
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data); 
    return response.data;
  } catch (error) {
    console.error('Error imamAnswerQuestion:', error);
  }
};


// Zakaat API functions
export interface ZakatData {
  nisab: number | string;
  netWorth: number | string;
  amount: number;
  userId: string;
  currency: string;
  date?: string;
  eligibility?: string;
  // Calculator data fields
  cashInHand?: number;
  cashInBankAccount?: number;
  otherSavings?: number;
  investment?: number;
  moneyOwed?: number;
  businessAssets?: number;
  goldInGrams?: number;
  silverInGrams?: number;
  utilityBillsValue?: number;
  personalLoansValue?: number;
  overdraftValue?: number;
  creditCardsValue?: number;
  businessLiabilitiesValue?: number;
  totalAssets?: number;
  totalLiabilities?: number;
}

export const saveZakatData = async (data: ZakatData, userToken?: string) => {
  try {
    console.log('Auth token being used:', userToken);
    
    // Set up headers based on whether we have a token
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    
    if (userToken) {
      headers['Authorization'] = `Bearer ${userToken}`;
    }
    
    const response = await axios.post(
      `${API_BASE_URL}/zakat/save`,
      data,
      { headers }
    );
    
    console.log('Zakat data saved successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error saving Zakat data:', error);
    if (axios.isAxiosError(error)) {
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    throw error;
  }
};

// Function to get all Zakat records for the current user
export const getUserZakatHistory = async (userToken: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/zakat`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    });
    
    // Log the entire response for debugging
    console.log('Full API response:', JSON.stringify(response.data));
    
    // Return the zakat_history if it exists, otherwise return empty array
    return response.data?.zakat_history || [];
  } catch (error) {
    console.error('Error fetching Zakat history:', error);
    throw error;
  }
};

// Delete a specific Zakat record
export const deleteZakatRecord = async (id: number, userToken: string) => {
  try {
    // Log the URL we're trying to access
    const url = `${API_BASE_URL}/zakat/delete/${id}`;
    console.log('Attempting to delete zakat record at:', url);
    
    const response = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      }
    });
    console.log('Zakat record deleted successfully');
    return response.data;
  } catch (error) {
    console.error('Error deleting Zakat record:', error);
    if (axios.isAxiosError(error)) {
      // Get more details from the error
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
    }
    throw error;
  }
};

export const fetchRestaurants = async (latitude: number, longitude: number) => {
  const queryParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString()
  });
  const response = await fetch(
   `${API_BASE_URL}/restaurants?${queryParams.toString()}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }
  );
  // console.log(response);
  if (!response.ok) {
    // throw new Error('Failed to fetch restaurants');
  }
  return response.json();
};

export const getCountryCodes = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/countrycodes`);
    console.log(response.data); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};

export const fetchMasjidDB = async ( data: any ) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/fetch-masjid-db`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response); 
    return response.data;
  } catch (error) {
    // console.error('Error fetching data:', error);
  }
};