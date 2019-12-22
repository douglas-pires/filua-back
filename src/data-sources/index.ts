import UserDataSource from './user';
import User from '../db/schema/user';
import Institution from '../db/schema/institution';
import InstitutionDataSource from './institution';

export default () => ({
  user: new UserDataSource(User.collection),
  institution: new InstitutionDataSource(Institution.collection),
});
