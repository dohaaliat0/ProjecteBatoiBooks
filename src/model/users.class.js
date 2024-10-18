import User from './user.class';

export default class Users {
  constructor() {
    this.data = [];
    this.nextId = 1;
  }

  populate(usersData) {
    this.data = usersData.map(user => new User(user.id, user.nick, user.email, user.password));
    this.nextId = Math.max(...this.data.map(user => user.id)) + 1; // Actualiza el ID para evitar duplicados
  }

  addUser(userData) {
    const newUser = new User(this.nextId++, userData.nick, userData.email, userData.password);
    this.data.push(newUser);
    return newUser;
  }

  removeUser(userId) {
    const index = this.getUserIndexById(userId);
    if (index === -1) throw new Error(`Usuario con ID ${userId} no encontrado`);
    return this.data.splice(index, 1)[0];
  }
  changeUser(user) {
    const index = this.getUserIndexById(user.id);
    if (index === -1) {
        throw new Error(`Usuario con ID ${user.id} no encontrado`);
    }
    const modifiedUser = new User(user.id, user.nick, user.email, user.password);
    this.data[index] = modifiedUser;
    return modifiedUser;
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
}
