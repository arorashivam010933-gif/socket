import User from '../models/User.js';

export async function findOrCreateUserByUsername(username) {
  let user = await User.findOne({ username });
  if (!user) {
    user = await User.create({ username });
  }
  return user;
}

export async function getUserById(id) {
  return User.findById(id);
}