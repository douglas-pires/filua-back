import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';

const encrypt = (plainText: string, saltRounds = 10) =>
  bcrypt.hashSync(plainText, saltRounds);

export interface IUser extends Document {
  username: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  email: string;
  token: string;
  refreshToken: string;
  createdAt: Date;
  comparePassword: (plainText: string) => any;
  createTokens: () => any;
}

const UserSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Usuário obrigatório'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Senha obrigatória'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Confirmação de senha obrigatória'],
  },
  fullName: {
    type: String,
    required: [true, 'Nome obrigatório'],
  },
  email: {
    type: String,
    required: [true, 'Email obrigatório'],
    unique: true,
  },
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

UserSchema.pre<IUser>('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = encrypt(this.password);

  if (!this.comparePassword(this.confirmPassword))
    throw new Error('A confirmação da senha deve ser igual à senha');

  next();
});

UserSchema.methods.comparePassword = function(confirmationPassword) {
  return bcrypt.compareSync(confirmationPassword, this.password);
};

UserSchema.methods.createTokens = function() {
  const tokenData = {
    username: this.username,
    fullName: this.fullName,
    email: this.email,
  };

  const privateKey = path.resolve(__dirname, 'jwtRS256.key');

  this.token = jwt.sign(tokenData, privateKey, {
    expiresIn: '1m',
  });

  this.refreshToken = jwt.sign(tokenData, privateKey, {
    expiresIn: '7d',
  });
};

export default mongoose.model('User', UserSchema);
