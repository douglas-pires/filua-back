import express from 'express';
const router = express.Router();
import ProductDataSource from '../data-sources/product';
import Product from '../db/schema/product';

router.post('/products', async (req, res) => {
  const products = req.body
  try {
    const dataSource = new ProductDataSource(Product)
    const result = await dataSource.addProducts(products)
    res.send(result)
  } catch (error) {
    res.send(error)
  }
});

export default router;
