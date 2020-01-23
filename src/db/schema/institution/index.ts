import mongoose, { Schema } from 'mongoose';

const InstitutionSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, `Institution's name required`],
    unique: true,
  },
  about: {
    type: String,
  },
  accounts: {
    type: Array,
  },
  image: {
    type: String,
  },
});

export default mongoose.model('Institution', InstitutionSchema);
