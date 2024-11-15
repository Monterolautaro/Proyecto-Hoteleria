const getResult = async (query: string) => {

try {

    const response = await fetch( `http://localhost:3000/search/bar?query=${encodeURIComponent(query)}`, {
        method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

    })
    console.log(response)
    if (response.ok) {
        const data = await response.json();
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