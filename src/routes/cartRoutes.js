import express from 'express';
const router = express.Router(); 
import * as cartController from '../controllers/cartController.js';


// Rutas para carritos
router.delete('/:cid/products/:pid', cartController.removeProductFromCart);
router.put('/:cid', cartController.updateCart);
router.put('/:cid/products/:pid', cartController.updateProductQuantityInCart);
router.get('/:cid', cartController.getCartById);

export default router;
