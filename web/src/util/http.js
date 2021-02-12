import axios from "axios";

const baseURL = "http://localhost:8000";

export const VOCAL_TOKEN_ID = "0.0.325945";

var axiosInstance = axios.create({
  baseURL,
  /* other custom settings */
});

export const getBalance = (accountId) => {
  return axiosInstance.post("/balance", { accountId });
};
