const services = (botmate) => ({});
const controllers = {
  bot: {
    find: async (req, res) => {
      console.log('res', typeof res);
    },
  },
};

const routes = [
  {
    path: '/bots',
    method: 'GET',
    handler: 'bot.find',
  },
];

export default {
  services,
  controllers,
  routes,
};
