'use strict';

const { createbotmateInstance } = require('../../../../../test/helpers/botmate');
const { isKnexQuery } = require('../utils/knex');

let botmate;

describe('knex', () => {
  beforeAll(async () => {
    botmate = await createbotmateInstance();
  });

  afterAll(async () => {
    await botmate.destroy();
  });

  describe('isKnexQuery', () => {
    test('knex query: true', () => {
      const res = isKnexQuery(botmate.db.connection('botmate_core_store_settings'));
      expect(res).toBe(true);
    });

    test('knex raw: true', () => {
      const res = isKnexQuery(
        botmate.db.connection.raw('SELECT * FROM botmate_core_store_settings')
      );
      expect(res).toBe(true);
    });

    test.each([[''], [{}], [[]], [2], [new Date()]])('%s: false', (value) => {
      const res = isKnexQuery(value);
      expect(res).toBe(false);
    });
  });
});
