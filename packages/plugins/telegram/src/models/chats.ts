import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  chatId: String,
  type: String,
  title: String,
  username: String,
  firstName: String,
  lastName: String,
  bot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot',
  },
});

export const Chat = mongoose.model('TelegramChat', ChatSchema);
