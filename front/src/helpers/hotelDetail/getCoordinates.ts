export const getCoordinates = async (address: string) => {
  const API_KEY = "a57afff3483a4946a7d4934c3914f8cc";
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    address
  )}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { lat, lng };
    } else {
      throw new Error("No se encontraron resultados.");
    }
  } catch (error) {
    console.error("Error obteniendo coordenadas:", error);
  }
};
