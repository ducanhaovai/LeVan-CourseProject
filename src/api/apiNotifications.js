import axios from "axios";

const BASE_URL = process.env.REACT_APP_NOTI_API_URL;

export const fetchNotifications = async (userId) => {
  try {
    const token = localStorage.getItem("token");
    // Log the request details
    console.log("Fetching notifications for userId:", userId, "with token:", token);

    const response = await axios.get(`${BASE_URL}/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Log the full response from the API
    console.log("Notifications fetched successfully:", response.data.data[0]);

    return response.data;
  } catch (error) {
    // Enhanced error logging
    console.error(
      "Error fetching notifications:",
      error.response ? error.response.data : error.message
    );
    console.log("Detailed error:", error); // Logging the complete error object for more details

    return { success: false, error: error.message };
  }
};
