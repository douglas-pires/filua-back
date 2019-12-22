import DataSource from '../base';
import User, { IUser } from '../../db/schema/user';

export default class UserDataSource extends DataSource {
  async getUser(input) {
    const { id } = input;
    const result = await User.findById(id);
    return result.toObject();
  }

  async login(input) {
    const { email, password } = input;
    const user = (await User.findOne({ email })) as IUser;

    if (!user) return { message: 'Usuário não encontrado' };

    if (user.comparePassword(password)) {
      user.createTokens();
      return {
        token: user.token,
        refreshToken: user.refreshToken,
      };
    }

    throw new Error('Usuário inválido');
  }

  async register(input: IUser) {
    const { fullName, username, email, password, confirmPassword } = input;

    const userExists = await User.findOne({
      email,
    });

    if (userExists) throw new Error('O usuário já existe');

    const user = new User({
      fullName,
      email,
      username,
      password,
      confirmPassword,
    }) as IUser;

    return user.save();
  }
}
