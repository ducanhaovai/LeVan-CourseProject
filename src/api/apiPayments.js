import axios from "axios";

const BASE_URL = process.env.REACT_APP_Payments_API_URL;

// Lấy tất cả payments
export const getAllPayments = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Tìm payment theo ID
export const getPaymentById = async (id) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};

// Tìm payment theo transaction_id
export const getPaymentByTransactionId = async (transaction_id) => {
  const response = await axios.get(`${BASE_URL}/transaction/${transaction_id}`);
  return response.data;
};

// Tạo một payment mới
export const createPayment = async (paymentData) => {
  const response = await axios.post(BASE_URL, paymentData);
  return response.data;
};

// Cập nhật payment
export const updatePayment = async (id, paymentData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, paymentData);
  return response.data;
};

// Xóa payment theo ID
export const deletePayment = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
