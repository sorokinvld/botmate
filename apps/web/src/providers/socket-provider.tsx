import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:8080');

const socketContext = createContext<{ socket: Socket }>({ socket });

type SocketProviderProps = {
  children: React.ReactNode;
};
export const SocketProvider = ({ children }: SocketProviderProps) => {
  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
};

export const useSocketIO = () => {
  return useContext(socketContext);
};
