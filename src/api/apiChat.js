import axios from "axios";

const API_URL = process.env.REACT_APP_CHAT_API_URL;
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Tạo phòng chat
export const postRoom = async (roomData) => {
  return axiosInstance
    .post("/create-room", roomData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error in create room:", error.response);
      throw error;
    });
};

// Lấy thông tin phòng chat và tin nhắn của người dùng
export const getRoomUserMessage = async (userId) => {
  return axiosInstance
    .get(`/rooms/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching room and messages:", error.response);
      throw error;
    });
};

// Lấy tin nhắn trong một phòng
export const getRoomMessage = async (roomId, page = 1, limit = 20) => {
  return axiosInstance
    .get(`/messages/${roomId}`, {
      params: { page, limit },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error fetching messages:", error.response);
      throw error;
    });
};

// Gửi tin nhắn
export const postMessage = async (messageData) => {
  return axiosInstance
    .post("/send-message", messageData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error sending message:", error.response);
      throw error;
    });
};

// Tạo phòng chat riêng tư
export const postRoomUser = async (userData) => {
  return axiosInstance
    .post("/create-private-room", userData)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error creating private room:", error.response);
      throw error;
    });
};
