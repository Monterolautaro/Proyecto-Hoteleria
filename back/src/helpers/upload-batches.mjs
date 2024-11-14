import axios from 'axios';
import fs from 'fs';

const PATH = "/Users/macbook/Desktop/Hotelify/Proyecto-Hoteleria/back/src/helpers/hotels/hotels.json"
const BATCH_SIZE = 5;
const API_URL = 'http://localhost:3000/hotels/batch';

async function uploadBatches() {

    // Esto lee el archivo, lo parsea y lo guarda en una variable
    const hotels = JSON.parse(fs.readFileSync(PATH, 'utf-8'));
    console.log('Hotels cargados:', hotels);
    

    // Itero los hoteles en grupos de 5
    for (let i = 0; i < hotels.length; i += BATCH_SIZE) {

        const batch = hotels.slice(i, i + BATCH_SIZE);

        try {
            // hago una petición para ejecutar el controlador del hotel, POST a /hotels/batch
            await axios.post(API_URL, batch);
            console.log(`Lote ${i / BATCH_SIZE + 1} cargado con éxito`);

        } catch (error) {

            throw new Error(`Error al cargar el lote ${i / BATCH_SIZE + 1}:`, error.message);

        }
    }
}
// Usar ' node src/helpers/upload-batches.mjs  '
uploadBatches();