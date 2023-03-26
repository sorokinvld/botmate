'use strict';

const { createbotmateInstance } = require('../../../../../test/helpers/botmate');

let botmate;

describe('transactions', () => {
  let original;
  beforeAll(async () => {
    botmate = await createbotmateInstance();
    original = await botmate.db
      .queryBuilder('botmate::core-store')
      .select(['*'])
      .where({ id: 1 })
      .execute();
  });

  afterAll(async () => {
    await botmate.destroy();
  });

  afterEach(async () => {
    await botmate.db
      .queryBuilder('botmate::core-store')
      .update({
        key: original[0].key,
      })
      .where({ id: 1 })
      .execute();
  });

  describe('using a transaction method', () => {
    test('commits successfully', async () => {
      await botmate.db.transaction(async () => {
        await botmate.db
          .queryBuilder('botmate::core-store')
          .update({
            key: 'wrong key',
          })
          .where({ id: 1 })
          .execute();

        await botmate.db
          .queryBuilder('botmate::core-store')
          .update({
            key: 'new key',
          })
          .where({ id: 1 })
          .execute();
      });

      const end = await botmate.db
        .queryBuilder('botmate::core-store')
        .select(['*'])
        .where({ id: 1 })
        .execute();

      expect(end[0].key).toEqual('new key');
    });

    test('rollback successfully', async () => {
      try {
        await botmate.db.transaction(async () => {
          // this is valid
          await botmate.db
            .queryBuilder('botmate::core-store')
            .update({
              key: 'wrong key',
            })
            .where({ id: 1 })
            .execute();

          // this throws
          await botmate.db
            .queryBuilder('invalid_uid')
            .update({
              key: 'bad key',
              invalid_key: 'error',
            })
            .where({ id: 1 })
            .execute();
        });

        expect('this should not be reached').toBe(false);
      } catch (e) {
        // do nothing
      }

      const end = await botmate.db
        .queryBuilder('botmate::core-store')
        .select(['*'])
        .where({ id: 1 })
        .execute();

      expect(end[0].key).toEqual(original[0].key);
    });

    test('nested rollback -> rollback works', async () => {
      try {
        await botmate.db.transaction(async () => {
          // this is valid
          await botmate.db
            .queryBuilder('botmate::core-store')
            .update({
              key: 'changed key',
            })
            .where({ id: 1 })
            .execute();

          // here we'll make a nested transaction that throws and then confirm we still have "changed key" from above
          try {
            await botmate.db.transaction(async () => {
              await botmate.db
                .queryBuilder('botmate::core-store')
                .update({
                  key: 'changed key - nested',
                })
                .where({ id: 1 })
                .execute();

              // this should throw and roll back
              await botmate.db
                .queryBuilder('invalid_uid')
                .update({
                  invalid_key: 'error',
                })
                .where({ id: 1 })
                .execute();
            });
          } catch (e) {
            // do nothing
          }

          // should equal the result from above
          const result = await botmate.db
            .queryBuilder('botmate::core-store')
            .select(['*'])
            .where({ id: 1 })
            .execute();

          expect(result[0].key).toEqual('changed key');

          // this throws
          await botmate.db
            .queryBuilder('invalid_uid')
            .update({
              key: original[0].key,
              invalid_key: 'error',
            })
            .where({ id: 1 })
            .execute();
        });

        expect('this should not be reached').toBe(false);
      } catch (e) {
        // do nothing
      }

      const end = await botmate.db
        .queryBuilder('botmate::core-store')
        .select(['*'])
        .where({ id: 1 })
        .execute();

      expect(end[0].key).toEqual(original[0].key);
    });

    test('nested commit -> rollback works', async () => {
      try {
        await botmate.db.transaction(async () => {
          // this is valid
          await botmate.db
            .queryBuilder('botmate::core-store')
            .update({
              key: 'changed key',
            })
            .where({ id: 1 })
            .execute();

          // here we'll make a nested transaction that works, and then later we'll rollback the outer transaction
          try {
            await botmate.db.transaction(async () => {
              await botmate.db
                .queryBuilder('botmate::core-store')
                .update({
                  key: 'changed key - nested',
                })
                .where({ id: 1 })
                .execute();
            });
          } catch (e) {
            // do nothing
          }

          // should equal the result from above
          const result = await botmate.db
            .queryBuilder('botmate::core-store')
            .select(['*'])
            .where({ id: 1 })
            .execute();

          expect(result[0].key).toEqual('changed key - nested');

          // this throws
          await botmate.db
            .queryBuilder('invalid_uid')
            .update({
              key: original[0].key,
              invalid_key: 'error',
            })
            .where({ id: 1 })
            .execute();
        });

        expect('this should not be reached').toBe(false);
      } catch (e) {
        // do nothing
      }

      const end = await botmate.db
        .queryBuilder('botmate::core-store')
        .select(['*'])
        .where({ id: 1 })
        .execute();

      expect(end[0].key).toEqual(original[0].key);
    });
  });

  describe('using a transaction object', () => {
    test('commits successfully', async () => {
      const trx = await botmate.db.transaction();

      try {
        await botmate.db
          .queryBuilder('botmate::core-store')
          .update({
            key: 'wrong key',
          })
          .where({ id: 1 })
          .transacting(trx.get())
          .execute();

        await botmate.db
          .queryBuilder('botmate::core-store')
          .update({
            key: original[0].key,
          })
          .where({ id: 1 })
          .transacting(trx.get())
          .execute();

        await trx.commit();
      } catch (e) {
        await trx.rollback();
        console.log(e.message);
        expect('this should not be reached').toBe(false);
      }

      const end = await botmate.db
        .queryBuilder('botmate::core-store')
        .select(['*'])
        .where({ id: 1 })
        .execute();

      expect(end[0].key).toEqual('botmate_content_types_schema');
    });

    test('rollback successfully', async () => {
      const trx = await botmate.db.transaction();

      try {
        await botmate.db
          .queryBuilder('botmate::core-store')
          .update({
            key: 'wrong key',
          })
          .where({ id: 1 })
          .transacting(trx.get())
          .execute();

        // this query should throw because it has errors
        await botmate.db
          .queryBuilder('invalid_uid')
          .update({
            key: 123,
            key_not_here: 'this should error',
          })
          .where({ id: 'this should error' })
          .transacting(trx.get())
          .execute();

        await trx.commit();
        expect('this should not be reached').toBe(false);
      } catch (e) {
        await trx.rollback();
      }

      const end = await botmate.db
        .queryBuilder('botmate::core-store')
        .select(['*'])
        .where({ id: 1 })
        .execute();

      expect(end[0].key).toEqual('botmate_content_types_schema');
    });
  });
});
