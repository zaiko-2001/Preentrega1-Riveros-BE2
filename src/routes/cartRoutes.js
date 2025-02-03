import express from 'express';
import { authorize } from '../middlewares/authMiddleware.js';
import { passportAuth } from '../middlewares/passportAuth.js';
import { 
  addProductToCart, 
  removeProductFromCart, 
  updateCart, 
  updateProductQuantityInCart, 
  getCartById, 
  finalizePurchase 
} from '../controllers/cartController.js';

const router = express.Router();

// Agregar producto al carrito (solo usuarios)
router.post('/:cartId/product/:productId', passportAuth, authorize(['user']), addProductToCart);

// Eliminar un producto del carrito (solo usuarios)
router.delete('/:cartId/product/:productId', passportAuth, authorize(['user']), removeProductFromCart);

// Actualizar todo el carrito con un nuevo arreglo de productos (solo usuarios)
router.put('/:cartId', passportAuth, authorize(['user']), updateCart);

// Actualizar la cantidad de un producto en el carrito (solo usuarios)
router.put('/:cartId/product/:productId', passportAuth, authorize(['user']), updateProductQuantityInCart);

// Obtener el carrito con productos completos (usuarios y administradores)
router.get('/:cartId', passportAuth, getCartById);

// Finalizar la compra y generar un ticket (solo usuarios)
router.post('/:cartId/purchase', passportAuth, authorize(['user']), finalizePurchase);

export default router;
