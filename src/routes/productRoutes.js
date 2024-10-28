import express from 'express'; 
const router = express.Router(); 
import * as productController from '../controllers/productController.js';


// Rutas para productos
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

export default router;
