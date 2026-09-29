import * as messageService from '../services/messageService.js';

export async function getMessages(req, res) {
  try {
    const messages = await messageService.getRecentMessages(50);
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}