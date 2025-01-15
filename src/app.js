import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { config } from 'dotenv';
import './config/passport.js'; // Configuración de Passport
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import sessionRoutes from './routes/sessions.js';

const app = express();
config(); // Cargar variables de entorno

// Verifica si la variable de entorno está definida
console.log('MongoDB URI:', process.env.MONGODB_URI);

// Middleware y configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Parseo de cookies
app.use(passport.initialize()); // Inicializar Passport

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/sessions', sessionRoutes); // Rutas de sesiones (usuarios y autenticación)

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Conexión exitosa a la base de datos'))
  .catch((error) => console.error('Error conectando a la base de datos:', error));

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
