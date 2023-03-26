import mongoose from 'mongoose';
import { BotSchema } from '@botmate/schemas';

export const Bot = mongoose.model('Bot', BotSchema);
