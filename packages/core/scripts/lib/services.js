const mongoose = require('mongoose');

const ScriptSchema = new mongoose.Schema(
  {
    name: String,
    script: String,
    bot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bot',
    },
  },
  {
    timestamps: true,
  }
);

const Script = mongoose.model('Script', ScriptSchema);

const services = {
  script: () => ({
    find: async (query) => {
      return await Script.find(query);
    },
    create: async (script) => {
      return await Script.create(script);
    },
  }),
};

module.exports = services;
