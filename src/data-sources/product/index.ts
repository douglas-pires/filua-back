import DataSourceMongo from '../base';
import Product from '../../db/schema/product';

export default class ProductDataSource extends DataSourceMongo {
  getProducts() {
    return this.find();
  }

  getOneProduct(input) {
    const { id } = input;
    return this.findOne({ _id: id });
  }

  addProduct(input) {
    const { name, image, price, categoryTree, partnerUrl, partner } = input;

    const product = new Product({
      name,
      image,
      price,
      categoryTree,
      partnerUrl,
      partner,
    });

    return this.save(product);
  }

  removeProduct(input) {
    const { id } = input;

    return this.deleteOne({ _id: id });
  }

  updateProduct(input) {
    const { id, name, image, price, categoryTree, partnerUrl, partner } = input;

    return this.updateOne(
      { _id: id },
      {
        name,
        image,
        price,
        categoryTree,
        partnerUrl,
        partner,
      },
    );
  }
}
