import { createContext, useContext } from 'react';
import { io, Socket } from 'socket.io-client';

const socket = io('http://localhost:8080');

socket.on('connect', () => {
  if (typeof localStorage === 'object') {
    const botId = localStorage.getItem('activeBot');
    if (botId) {
      socket.emit('join', botId);
    }
  }
});

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
