import mongoose from 'mongoose';

const FragmentSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  uz: { type: String, required: true },
  kz: { type: String, required: true },
  tr: { type: String, required: true },
});

const Fragment = mongoose.model('Fragment', FragmentSchema);

export default Fragment;
