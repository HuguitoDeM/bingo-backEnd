class AbstractModel {
  constructor() {
    if (this.constructor === AbstractModel) {
      throw new Error("AbstractModel no pueded ser instanciada directamente");
    }
  }
  create() {
    throw new Error("método create debe ser implementado");
  }

  read() {
    throw new Error("método read debe ser implementado");
  }
}

class UserModel extends AbstractModel {
  constructor() {
    super();
    this.users = [];
  }

  create(user) {
    this.users.push(user);
  }

  addUser(user) {
    if (!user.id || !user.username) {
      throw new Error("El usuario debe tener un ID y un nombre de usuario");
    }
    this.users.push({ ...user, isPlaying: flase });
  }

  getUsers() {
    return [...this.users];
  }
}

class UserInGame extends UserModel {
  constructor() {
    super();
  }

  startPlaying(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("usuario no encontrado");
    }
    user.isPlaying = true;
  }

  getPlayingUsers() {
    return this.users.filter((user) => user.isPlaying);
  }
}

export default { UserModel, UserInGame };
