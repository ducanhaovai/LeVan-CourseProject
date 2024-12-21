import axios from "axios";

const BASE_URL = process.env.REACT_APP_NOTI_API_URL;

export const fetchNotifications = async (userId) => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Notifications fetched:", response.data);

    return response.data;
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error.response ? error.response.data : error.message
    );
    return { success: false, error: error.message };
  }
};
