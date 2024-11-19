import axios from 'axios';
export const client = axios.create({
  baseURL: 'https://affwa.atparui.com', // Base URL for the API
  headers: {
    'Content-Type': 'application/json',
  },
});