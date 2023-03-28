import axios from 'axios';
const base = import.meta.env.VITE_APP_API_URL;

export const MakeGET = (path: string) => {
  return axios.get(`${base}${path}`);
};

export const MakePOST = (path: string, data: any) => {
  return axios.post(`${base}${path}`, data);
};
