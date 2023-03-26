import mongoose from 'mongoose';

export const initDb = async (url: string) => {
  await mongoose.connect(url);
  return mongoose;
};
