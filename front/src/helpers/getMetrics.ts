import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMetrics = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/admin/metrics`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return null;
  }
};
