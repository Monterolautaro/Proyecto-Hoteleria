import axios from 'axios'

const getResult = async (query: string) => {

try {

    const response = await axios.post(`http://localhost:3000/search/bar?query=${query}`)
    
    if (response) {
      console.log(response)
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



}
export default getResult