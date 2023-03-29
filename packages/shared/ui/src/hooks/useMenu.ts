import { createContext, useContext } from 'react';

const menuContext = createContext(
  {} as {
    open: boolean;
    setOpen: (open: boolean) => void;
  }
);

export const MenuProvider = menuContext.Provider;
export const useMenu = () => {
  return useContext(menuContext);
};
