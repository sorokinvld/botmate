import { Schema } from 'mongoose';

export const BotSchema = new Schema(
  {
    id: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    platform: {
      type: String,
      require: true,
    },
    secrets: {
      type: Object,
      require: true,
    },
    info: {
      type: Object,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);
