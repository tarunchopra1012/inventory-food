import axios from 'axios';

class SquareHelper {
  constructor(token) {
    this.token = token;
    this.apiBaseUrl = 'https://connect.squareup.com';
  }

  async getVendorLocations() {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/v2/locations`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error retrieving vendor locations:', error);
      throw error;
    }
  }

  // Add more Square-related functions here
}

export default SquareHelper;
