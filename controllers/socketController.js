import * as userService from '../services/userService.js';
import * as messageService from '../services/messageService.js';

export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('client connected:', socket.id);

    socket.on('send_message', async (data) => {
      try {
        const { userId, text } = data;
        if (!userId || !text) return;

        const user = await userService.getUserById(userId);
        if (!user) return;

        const message = await messageService.createMessage(userId, text);

        // Broadcast to everyone
        io.emit('new_message', {
          _id: message._id,
          text: message.text,
          user: message.user,
          createdAt: message.createdAt
        });
      } catch (err) {
        console.error('send_message error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('client disconnected:', socket.id);
    });
  });
}