import mongoose from 'mongoose';

const baseConnection = () => {
  const MONGO_BASE_URL = process.env.MONGO_DB_CONNECTION;

  mongoose.connect(MONGO_BASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  return mongoose.connection;
};

export default baseConnection;
