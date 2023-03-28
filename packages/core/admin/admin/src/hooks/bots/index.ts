import { useMutation } from 'react-query';
import { MakePOST } from '../../utils/http';

export const useCreateBot = () => {
  const mutation = useMutation((data: any) => {
    return MakePOST('/bots', data);
  });

  return mutation;
};

export const useBots = () => {};
