import express from 'express';
const router = express.Router();
import ProductDataSource from '../data-sources/product';
import Product from '../db/schema/product';

router.post('/image-upload', async (req, res) => {
  const products = req.body
  const dataSource = new ProductDataSource(Product)
  const result = await dataSource.addProducts(products)
  res.send(result)
});

export default router;
