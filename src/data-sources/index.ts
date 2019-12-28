import UserDataSource from './user';
import InstitutionDataSource from './institution';
import ProductDataSource from './product';
import User from '../db/schema/user';
import Institution from '../db/schema/institution';
import Product from '../db/schema/product';

export default () => ({
  user: new UserDataSource(User),
  institution: new InstitutionDataSource(Institution),
  product: new ProductDataSource(Product),
});
