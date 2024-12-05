import axios from "axios";


const API_URL = process.env.NEXT_PUBLIC_API_URL;


const getHotelsResults = async (query: string) => {
    try {
      const response = await axios.post(`${API_URL}/search/bar-result?query=${query}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching search results:", error);
      return []; 
    }
  };

export default getHotelsResults; 