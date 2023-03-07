import { User, useUsersControllerProfileQuery } from '@api';

export const useUser = () => {
  const { data } = useUsersControllerProfileQuery();
  return data as User;
};
