import axios from 'axios';
import { LoginData } from '../types';
const baseUrl = 'http://localhost:3001/api/login';

const login = async (credentials: LoginData) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
