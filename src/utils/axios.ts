import axios, {
  AxiosHeaders,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Create an axios instance with a specific base URL and headers
const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    'Content-Type': 'application/json',
    accept: '*',
  },
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    let token = localStorage.getItem('token');

    // Extract token from query parameters if available
    const urlParams = new URLSearchParams(window.location.search);
    const queryToken = urlParams.get('token');

    if (queryToken) {
      // Use token from query parameter if present
      token = queryToken;
      localStorage.setItem('token', token);
    }

    // Check if headers exist and if not, initialize them as AxiosHeaders
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    // Set the Authorization header if token is present
    if (token) {
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    } else {
      // If no token, remove the Authorization header
      (config.headers as AxiosHeaders).delete('Authorization');
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  (error) => {
    const { data } = error.response;
    console.log({ message: data.message, status: error.response.status });

    // Handle specific error statuses or messages
    if (error.response.status === 4000) {
      console.log('unauthenticated');
      localStorage.setItem('token', '');
      window.location.href = '/invalid';
    }
    return Promise.reject(error);
  },
);

export default instance;
