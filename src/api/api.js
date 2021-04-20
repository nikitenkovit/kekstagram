import Axios from 'axios';

export const baseURL = `https://21.javascript.pages.academy/kekstagram`;
const timeout = 7000;

export const axiosInstance = Axios.create({baseURL, timeout});
