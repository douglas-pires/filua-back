import mongoose, { Document, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import path from 'path';

const encrypt = (plainText: string, saltRounds = 10) =>
  bcrypt.hashSync(plainText, saltRounds);

export interface User extends Document {
  name: string;
  password: string;
  confirmPassword: string;
  email: string;
  token: string;
  refreshToken: string;
  createdAt: Date;
  comparePassword: (plainText: string) => any;
  createTokens: () => any;
}

const UserSchema: Schema<User> = new mongoose.Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  confirmPassword: {
    type: String,
    required: [true, 'Password confirmation is required'],
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
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
    throw new Error('The confirmation must be the same as the password');

  next();
});

UserSchema.methods.comparePassword = function(confirmationPassword) {
  return bcrypt.compareSync(confirmationPassword, this.password);
};

UserSchema.methods.createTokens = function() {
  const tokenData = {
    name: this.name,
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
