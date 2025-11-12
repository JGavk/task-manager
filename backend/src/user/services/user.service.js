const userPersistence = require('../persistences/user.persistence');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserService {
  async register({ name, email, password }) {
    if (!email || !password) throw { status: 400, message: 'email and password are required' };

    const existing = await userPersistence.findByEmail(email);
    if (existing) throw { status: 400, message: 'email already in use' };

    const hashed = await bcrypt.hash(password, 10);
    const now = new Date();
    const user = await userPersistence.create({
      name: name || null,
      email,
      password: hashed,
      created_At: now,
      updated_At: now
    });

    const { password: _p, ...safe } = user.toJSON ? user.toJSON() : user;
    return safe;
  }

  async login({ email, password }) {
    if (!email || !password) throw { status: 400, message: 'email and password are required' };

    const user = await userPersistence.findByEmail(email);
    if (!user) throw { status: 400, message: 'invalid credentials' };

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw { status: 400, message: 'invalid credentials' };

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });

    const { password: _p, ...safe } = user.toJSON ? user.toJSON() : user;
    return { user: safe, token };
  }
}

module.exports = new UserService();