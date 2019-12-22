import UserDataSource from './user';
import User from '../db/schema/user';
import Institution from '../db/schema/institution';
import InstitutionDataSource from './institution';
import ProductDataSource from './product';
import Product from '../db/schema/product';

export default () => ({
  user: new UserDataSource(User.collection),
  institution: new InstitutionDataSource(Institution.collection),
  product: new ProductDataSource(Product.collection),
});
