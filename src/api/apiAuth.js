import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL_AUTH;

export const logout = async (token) => {
  try {
    const response = await axios.post(
      `${API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error during logout request:", error);
    throw error;
  }
};
