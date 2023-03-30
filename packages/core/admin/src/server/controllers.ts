import { createDebug } from '@botmate/utils';

const debug = createDebug('botmate:core:admin:controllers');

const controllers = {
  auth: ({ botmate }) => ({
    register: async (req, res) => {
      const register = botmate.service('admin::auth').register;
      const { email, password } = req.body;
      register({ email, password })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    },
    login: async (req, res) => {
      const login = botmate.service('admin::auth').login;
      const { email, password } = req.body;
      login({ email, password })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    },
  }),
};

export default controllers;
