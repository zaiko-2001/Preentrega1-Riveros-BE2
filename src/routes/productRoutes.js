import express from 'express';
import { authorize } from '../middlewares/authMiddleware.js';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { passportAuth } from '../middlewares/passportAuth.js';

const router = express.Router();

// Obtener productos (público)
router.get('/', getProducts);

// Crear, actualizar y eliminar (solo admins)
router.post('/', passportAuth, authorize(['admin']), createProduct);
router.put('/:id', passportAuth, authorize(['admin']), updateProduct);
router.delete('/:id', passportAuth, authorize(['admin']), deleteProduct);

export default router;
