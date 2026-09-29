import * as userService from '../services/userService.js';

export async function createUser(req, res) {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'username required' });
    }

    const user = await userService.findOrCreateUserByUsername(username);
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}