import { importSchema } from 'graphql-import';
import User, { IUser } from './user';

export const typeDefs = importSchema('src/schema/user/user.graphql');

export const resolvers = {
  Query: {
    async login(_, { input }) {
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
    },
    async user(_, { input }) {
      const { id } = input;
      const result = await User.findById(id);
      return result.toObject();
    },
  },
  Mutation: {
    async register(_, { input }) {
      const { fullName, username, email, password, confirmPassword } = input;

      const userExists = await User.findOne({ email });

      if (userExists) throw new Error('O usuário já existe');

      const user = new User({
        fullName,
        email,
        username,
        password,
        confirmPassword,
      }) as IUser;

      const savedUser = await user.save();

      return savedUser;
    },
  },
};
