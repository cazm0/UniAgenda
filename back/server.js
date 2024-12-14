import express, { json } from 'express'; // Importa Express
import cors from 'cors'; // Middleware para manejar CORS

const app = express();
const PORT = 3001; // El puerto donde correrá el servidor

// Middlewares
app.use(cors()); // Habilita CORS
app.use(json()); // Permite recibir JSON en las solicitudes

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡El servidor está funcionando correctamente!');
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});