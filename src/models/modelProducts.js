import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  status: Boolean
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);
export default Product;
