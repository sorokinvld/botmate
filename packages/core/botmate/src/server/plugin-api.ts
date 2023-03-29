import { Router } from 'express';

const createPluginApi = (botmate: BotMate.BotMateInstance) => {
  const pluginApi = Router();

  pluginApi.get('/', (_, res) => {
    const enabledPlugins = botmate.config.get('enabledPlugins');
    res.json(enabledPlugins);
  });

  pluginApi.post('/run-service', async (req, res) => {
    const data = req.body;
    // todo: add validation
    const { pluginName, pluginService, payload } = data;
    try {
      const [a, b] = pluginService.split('.');
      const service = botmate.service(`plugin::${pluginName}.${a}`);
      const response = await service[b](payload);
      res.json(response);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  return pluginApi;
};

export default createPluginApi;
