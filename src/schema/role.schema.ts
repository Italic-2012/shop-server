import * as mongoose from 'mongoose';

export const RoleSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  status: { type: Number, default: 1 },
  add_time: {
    type: Number,
    default: Date.now(),
  },
});
