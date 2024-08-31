import axios from 'axios';
import Config from 'react-native-config';

// Create a custom axios instance
const api = axios.create({
  baseURL: 'http://10.0.2.2:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 seconds
});
export const register = fromData => {
  // console.log(fromData);
  return api.post('/user/create', fromData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const loginUser = data => {
  const phNo = {
    phoneNumber: data,
  };
  return api.post('/user/login', phNo);
};
export const logoutUser = data => {
  const phNo = {
    phoneNumber: data,
  };
  return api.post('/user/logout', phNo);
};
export const sendOtpMessage = data => {
  const phNo = {
    phoneNumber: data,
  };
  return api.post('/user/send-otp', phNo);
};
export const verifyOtp = data => {
  return api.post('/user/verify-otp', data);
};
export const reSendOtpMessage = data => {
  return api.post('/user/resend-otp', data);
};
export const getUserByPhonr = data => {
  const phoneNo = {
    phoneNumbers: data,
  };
  // console.log('dd', phoneNo);
  return api.post('/user/get-users-by-phone', phoneNo);
};
