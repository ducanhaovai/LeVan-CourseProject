import axios from "axios";
import axiosInstance from "hook/AxiosInterceptor";

const BASE_URL = process.env.REACT_APP_Payments_API_URL;

export const makePayment = async ({
  user_id,
  course_id,
  amount,
  payment_method,
  transaction_id,
}) => {
  try {
    const response = await axiosInstance.post(`${BASE_URL}/payment`, {
      user_id,
      course_id,
      amount,
      payment_method,
      transaction_id,
    });

    return response.data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw error;
  }
};
