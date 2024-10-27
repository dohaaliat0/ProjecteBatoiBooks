import User from './user.class';
import { getDBUsers, addDBUser, removeDBUser, changeDBUser, changeDBUserPassword } from '../services/users.api.js';

export default class Users {
  constructor() {
    this.data = [];
      this.nextId = 1;
  }

  async populate() {
    try {
        const users = await getDBUsers();
        this.data = users.map((item) => new User(
            item.id,
            item.nick,
            item.email,
            item.password
        ))
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

  async addUser(userData) {
      const user = await addDBUser(userData);
      const userNew = new User(user.id, user.nick, user.email, user.password);
      this.data.push(userNew);
    return userNew;
  }

  async removeUser(userId) {
  const index = this.getUserIndexById(userId);
    if (index === -1) throw new Error(`Usuario con ID ${userId} no encontrado`);
   this.data = this.data.filter((user) => user.id !== userId);
   await removeDBUser(userId);
   return {};
  }

  async changeUser(user) {
    const index = this.getUserIndexById(user.id);
    if (index === -1) {
        throw new Error(`Usuario con ID ${user.id} no encontrado`);
    }
    this.data[index] = user;
    await changeDBUser(user);
    return user;
  }

    async changeUserPassword(userId, newPassword) {
        const userIndex = this.data.findIndex(user => user.id === userId);
        if (userIndex === -1) {
            throw new Error(`No se ha encontrado al usuario con ID ${userId}`);
        }
        await changeDBUserPassword(userId, newPassword);
        this.data[userIndex].password = newPassword;
        return this.data[userIndex];
    }

    getUserById(userId) {
    const user = this.data.find(user => user.id === userId);
    if (!user) {
        throw new Error(`Usuario con ID ${userId} no encontrado`);
    }
    return user;
  }

  getUserIndexById(userId) {
    const index = this.data.findIndex(user => user.id === userId);
    if (index === -1) {
        throw new Error(`Usuario con ID ${userId} no encontrado`);
    }
    return index;
  }

  getUserByNickName(nick) {
    const user = this.data.find(user => user.nick === nick);
    if (!user) {
        throw new Error(`Usuario con nickname ${nick} no encontrado`);
    }
    return user;
  }

  toString() {
    return this.data.map(user => user.toString()).join('\n');
  }

    _generateId() {
        return this.data.length > 0 ? Math.max(...this.data.map(book => book.id)) + 1 : 1;
    }
}
