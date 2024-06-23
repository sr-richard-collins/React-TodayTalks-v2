import axios from 'axios';

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL || 'https://tnreaders.in/images/';
// const IMAGE_BASE_URL = "http://191.101.0.94:9000/images/";
// const IMAGE_BASE_URL = 'https://tnreaders.in/images/';

const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_API_BASE_URL || 'https://www.Tnreaders.in/', // Default URL
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://www.Tnreaders.in/', // Default URL
});

export default axiosInstance;

export { IMAGE_BASE_URL };
