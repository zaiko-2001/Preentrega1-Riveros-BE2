import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import { config } from 'dotenv';

const app = express();
config();

// Verifica si la variable de entorno está definida
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Middleware y configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {  
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión exitosa a la base de datos'))
.catch(error => console.error('Error conectando a la base de datos:', error));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
