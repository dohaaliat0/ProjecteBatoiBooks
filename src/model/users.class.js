import User from './user.class';
import { changeDBUserPassword } from '../services/users.api';

export default class Users {
  constructor() {
    this.data = [];
  }

  async populate() {
    try {
        const users = await getDBUsers(); 
        this.data = usersData.map(user => new User(user.id, user.nick, user.email, user.password));

    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

  async addUser(userData) {
    const newUser = new User(this.nextId++, userData.nick, userData.email, userData.password);
    this.data.push(newUser);
    await this.addUser(userData);
    return newUser;
  }

  async removeUser(userId) {
    const index = this.getUserIndexById(userId);
    if (index === -1) throw new Error(`Usuario con ID ${userId} no encontrado`);
   this.data = this.data.filter((user) => user.id !== userId);
   await this.removeUser(userId);
  }

  async changeUser(user) {
    const index = this.getUserIndexById(user.id);
    if (index === -1) {
        throw new Error(`Usuario con ID ${user.id} no encontrado`);
    }
    const modifiedUser = new User(user.id, user.nick, user.email, user.password);
    this.data[index] = modifiedUser;
    await this.changeUser(modifiedUser);
    return modifiedUser;
  }

  async changeUserPassword(userId, newPassword) {
    const userData = this.getUserById(userId); 

    if (!userData) {
        throw new Error(`No se ha encontrado al usuario con ID ${userId}`);
    }

    try {
        const result = await changeDBUserPassword(userData, newPassword); 
        console.log(`Contraseña cambiada correctamente para el usuario ${userId}`);
        return result;
    } catch (error) {
        console.error(`Error al cambiar la contraseña: ${error}`);
        throw error;
    }
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
