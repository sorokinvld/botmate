import { Composer, Context } from 'grammy';

export const createComposers = () => {
  const composers: Composer<Context>[] = [];

  return {
    add: (composer: Composer<Context>) => {
      composers.push(composer);
    },
    getAll: () => composers,
  };
};
