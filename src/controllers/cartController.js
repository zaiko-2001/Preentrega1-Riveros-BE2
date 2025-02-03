import Cart from '../models/modelCart.js';
import Ticket from '../models/modelTicket.js';
import Product from '../models/modelProduct.js';
import { v4 as uuidv4 } from 'uuid';

// Eliminar un producto del carrito
export const removeProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;
  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.json({ status: 'success', message: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Actualizar el carrito con un arreglo de productos
export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;
  try {
    const cart = await Cart.findByIdAndUpdate(cid, { products }, { new: true });
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', message: 'Carrito actualizado', data: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Actualizar la cantidad de un producto en el carrito
export const updateProductQuantityInCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ status: 'error', message: 'Cantidad no válida' });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (productInCart) {
      productInCart.quantity = quantity;
      await cart.save();
      res.json({ status: 'success', message: 'Cantidad de producto actualizada', data: cart });
    } else {
      res.status(404).json({ status: 'error', message: 'Producto no encontrado en el carrito' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Obtener carrito con productos completos usando populate
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', data: cart });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Finalizar compra y generar ticket
export const finalizePurchase = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    }

    let totalAmount = 0;
    let productsToKeep = [];

    for (const item of cart.products) {
      const product = await Product.findById(item.product._id);
      if (!product || product.stock < item.quantity) {
        productsToKeep.push(item);
      } else {
        product.stock -= item.quantity;
        totalAmount += product.price * item.quantity;
        await product.save();
      }
    }

    if (totalAmount === 0) {
      return res.status(400).json({ status: 'error', message: 'No hay stock suficiente para completar la compra' });
    }

    const ticket = new Ticket({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: totalAmount,
      purchaser: req.user.email
    });

    await ticket.save();

    cart.products = productsToKeep;
    await cart.save();

    res.json({ status: 'success', message: 'Compra finalizada', data: ticket });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
