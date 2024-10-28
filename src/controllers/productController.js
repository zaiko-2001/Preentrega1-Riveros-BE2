import Product from '../models/modelProducts.js';

// Obtener productos con filtros, paginación y ordenamiento
export const getProducts = async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  
  // Asegurar que limit y page sean números enteros positivos
  const limitNumber = Math.max(parseInt(limit), 1);
  const pageNumber = Math.max(parseInt(page), 1);

  // Filtro para búsqueda por categoría o disponibilidad
  const filter = query ? { $or: [{ category: query }, { status: query === 'true' }] } : {};
  const options = {
    limit: limitNumber,
    page: pageNumber,
    sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
  };

  try {
    const products = await Product.paginate(filter, options);
    res.json({
      status: 'success',
      payload: products.docs,
      totalPages: products.totalPages,
      page: pageNumber,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevPage: products.hasPrevPage ? pageNumber - 1 : null,
      nextPage: products.hasNextPage ? pageNumber + 1 : null,
      prevLink: products.hasPrevPage ? `/api/products?limit=${limitNumber}&page=${pageNumber - 1}` : null,
      nextLink: products.hasNextPage ? `/api/products?limit=${limitNumber}&page=${pageNumber + 1}` : null
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};

// Obtener producto por ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }
    res.json({ status: 'success', data: product });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
};
