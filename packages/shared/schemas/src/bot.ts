import { Schema } from 'mongoose';

export const BotSchema = new Schema(
  {
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
