import { model, Schema } from 'mongoose';

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
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'inactive',
    },
    // errors: {
    //   type: Array,
    //   default: [],
    // },
  },
  {
    timestamps: true,
  }
);

const Bot = model('Bot', BotSchema);

const services = {
  bot: ({ botmate }) => {
    botmate.eventHub.on('bot.error', async (payload) => {
      const { bot, error } = payload;
      await Bot.updateOne(
        { _id: bot._id },
        {
          $set: {
            status: 'inactive',
          },
          // $push: {
          //   errors: {
          //     message: error.message,
          //   },
          // },
        }
      );
    });

    return {
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
      start: async ({ botId }) => {
        const bot = await Bot.findOne({
          _id: botId,
        });
        if (!bot) return;

        await botmate.service(`plugin::${bot.platform}.bot`).start({ bot });
        await Bot.updateOne(
          { _id: botId },
          {
            $set: {
              status: 'active',
            },
          }
        );

        return {
          ok: true,
        };
      },
      stop: async ({ botId }) => {
        const bot = await Bot.findOne({
          _id: botId,
        });
        if (!bot) return;

        await botmate.service(`plugin::${bot.platform}.bot`).stop({ bot });
        await Bot.updateOne(
          { _id: botId },
          {
            $set: {
              status: 'inactive',
            },
          }
        );

        return {
          ok: true,
        };
      },
    };
  },
};

export default {
  services,
};
