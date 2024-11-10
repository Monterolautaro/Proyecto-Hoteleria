import { BadRequestException } from '@nestjs/common';
import axios from 'axios';

const authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';

export async function getAccessToken() {
  try {
    const response = await axios.post(authUrl, null, {
      params: {
        grant_type: 'client_credentials',
        client_id: process.env.API_KEY,
        client_secret: process.env.API_SECRET,
      },
    });

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);

    return accessToken;
  } catch (error) {
    throw new BadRequestException('Failed to retrieve access token');
  }
}