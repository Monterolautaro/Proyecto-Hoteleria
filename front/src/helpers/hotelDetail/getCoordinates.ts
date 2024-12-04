export const getCoordinates = async (address: string) => {
  const API_KEY = process.env.NEXT_PUBLIC_MAP_API_KEY;
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
