'use strict';

// Test an API with all the possible filed types and simple filterings (no deep filtering, no relations)
const { createbotmateInstance } = require('../../../../test/helpers/botmate');
const { createTestBuilder } = require('../../../../test/helpers/builder');

const builder = createTestBuilder();
let botmate;

const testCT = {
  displayName: 'test',
  singularName: 'test',
  pluralName: 'tests',
  kind: 'collectionType',
  attributes: {
    name: {
      type: 'string',
    },
  },
};

const fixtures = {
  test: [
    {
      name: 'Hugo LLORIS',
    },
    {
      name: 'Samuel UMTITI',
    },
    {
      name: 'Lucas HERNANDEZ',
    },
  ],
};

describe('Deep Filtering API', () => {
  beforeAll(async () => {
    await builder.addContentType(testCT).build();

    botmate = await createbotmateInstance();
  });

  afterAll(async () => {
    await botmate.destroy();
    await builder.cleanup();
  });

  test('Return an array of ids on createMany', async () => {
    const res = await botmate.db.query('api::test.test').createMany({ data: fixtures.test });

    expect(res).toMatchObject({ count: expect.any(Number) });
    expect(Array.isArray(res.ids)).toBe(true);
    expect(res.ids.length > 0).toBe(true);
  });
});
