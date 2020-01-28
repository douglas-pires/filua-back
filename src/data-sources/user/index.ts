import DataSource from '../base';
import UserSchema, { User } from '../../db/schema/user';

export default class UserDataSource extends DataSource {
  async getUser(input) {
    const { id } = input;
    const result = await UserSchema.findById(id);
    return result.toObject();
  }

  async a () {
    return 0
  }

  async login(input) {
    const { email, password } = input;
    const user = (await UserSchema.findOne({ email })) as User;

    if (!user) return { message: 'User not found' };

    if (user.comparePassword(password)) {
      user.createTokens();
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        token: user.token,
        refreshToken: user.refreshToken,
      };
    }

    throw new Error('Invalid user');
  }

  async register(input: User) {
    const { name, email, password, confirmPassword } = input;

    const userExists = await UserSchema.findOne({
      email,
    });

    if (userExists) throw new Error('The user already exists');

    const user = new UserSchema({
      name,
      email,
      password,
      confirmPassword,
    }) as User;

    return user.save();
  }
}
