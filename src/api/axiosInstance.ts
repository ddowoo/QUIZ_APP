import axios from 'axios';

export const quizAxios = axios.create({
  baseURL: 'https://opentdb.com/api.php',
  withCredentials: true,
});

quizAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

quizAxios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
