import Message from '../models/Message.js';

export async function getRecentMessages(limit = 50) {
  return Message.find()
    .sort({ createdAt: 1 })
    .limit(limit)
    .populate('user', 'username');
}

export async function createMessage(userId, text) {
  const message = await Message.create({ user: userId, text });
  return Message.findById(message._id).populate('user', 'username');
}