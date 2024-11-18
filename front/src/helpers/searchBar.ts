import axios from "axios";
import { config } from "dotenv";
<<<<<<< Updated upstream
config({ path: ".env" });
=======
config({path: '.env'});
>>>>>>> Stashed changes

// const API_URL = process.env.API_URL;
const API_URL = process.env.NEXT_PUBLIC_API_URL;


const getResult = async (query: string) => {
  try {
    const response = await axios.post(
<<<<<<< Updated upstream
      `http://localhost:3000/search/bar?query=${query}`
=======
      `${API_URL}/search/bar?query=${query}`
>>>>>>> Stashed changes
    );

    if (response) {
      console.log(response);
      const data = await response.data;
      return Array.isArray(data) ? data : [];
    } else {
      console.error("Error en la respuesta del servidor");
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud:", error);
    return [];
  }
};
export default getResult;
