import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  withCredentials: true,
  autoConnect: false,
});

socket.on('connect', () => {
  console.log('🔥 SOCKET CONNECTED:', socket.id);
});

socket.on('connect_error', (err) => {
  console.log('❌ SOCKET ERROR:', err.message);
});
