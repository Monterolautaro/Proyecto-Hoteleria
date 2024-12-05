/* eslint-disable prettier/prettier */
// eslint-disable
import axios from 'axios';
import fs from 'fs';

const PATH = '/Users/macbook/Desktop/Hotelify broken/Proyecto-Hoteleria/back/src/helpers/hotels/hotels.json';


const BATCH_SIZE = 5;

const API_URL = 'https://hotelify-3yic.onrender.com/hotels/batch';
// const API_URL = 'http://localhost:4000/hotels/batch';

async function uploadBatches() {
  // Esto lee el archivo, lo parsea y lo guarda en una variable
  const hotels = JSON.parse(fs.readFileSync(PATH, 'utf-8'));

  // Itero los hoteles en grupos de 5
  for (let i = 0; i < hotels.length; i += BATCH_SIZE) {
    const batch = hotels.slice(i, i + BATCH_SIZE);

    try {
      // hago una petición para ejecutar el controlador del hotel, POST a /hotels/batch
      const response = await axios.post(API_URL, batch);

      if (response.status === 400) {
        throw new Error('Error loading lote 1:', response.status);
      }
      if (response.status === 200) {
        console.log(`Lote ${i / BATCH_SIZE + 1} successfully loaded`);
      }
    } catch (error) {
      if (error.response) {
        console.error(
          'Error de respuesta del servidor:',
          error.response.status,
          error.response.data,
        );
      } else if (error.request) {
        console.error('Error de conexión:', error.request);
      } else {
        console.error('Error desconocido:', error);
      }
      throw new Error(
        `Error al cargar el lote ${i / BATCH_SIZE + 1}: ${error.message}`,
      );
    }
  }
}
// Usar ' node src/helpers/upload-batches.mjs  '
uploadBatches();
