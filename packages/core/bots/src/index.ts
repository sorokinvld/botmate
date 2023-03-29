import mongoose from 'mongoose';
import { BotSchema } from '@botmate/schemas';

const Bot = mongoose.model('Bot', BotSchema);

const services = {
  bot: ({ botmate }) => ({
    find: () => {
      return Bot.find();
    },
    create: async (data: any) => {
      if (!data.secrets) throw new Error('Secrets are required');

      const { platform, secrets } = data;

      try {
        const service = await botmate.service(`plugin::${platform}.bot`);
        const botData = await service.create(secrets);
        const data = await Bot.create({
          id: botData.id,
          secrets,
          platform,
          name: botData.name,
          info: botData.info,
        });

        return data;
      } catch (e) {
        throw new Error(e.message);
      }
    },
  }),
};

export default {
  services,
};
