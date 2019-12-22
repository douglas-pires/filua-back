import mongoose, { Schema } from 'mongoose';

const InstitutionSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Nome da instituição obrigatório'],
    unique: true,
  },
  about: {
    type: String,
  },
  accounts: {
    type: Array,
  },
});

export default mongoose.model('Institution', InstitutionSchema);
