import { Schema } from 'mongoose';

export const BotSchema = new Schema(
  {
    name: String,
    platform: String,
    secrets: Object,
    info: Object,
  },
  {
    timestamps: true,
  }
);
