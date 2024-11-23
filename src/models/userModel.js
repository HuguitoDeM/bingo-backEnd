import { generarTablerosUnicos } from "../../generateTable.js";
import bcrytp from "bcrypt";
import { v4 as uuidv4 } from "uuid";
class AbstractModel {
  constructor() {
    if (this.constructor === AbstractModel) {
      throw new Error("AbstractModel no pueded ser instanciada directamente");
    }
  }
  create() {
    throw new Error("método create debe ser implementado");
  }
}

export class UserModel extends AbstractModel {
  constructor() {
    super();
    this.users = [];
  }

  async create(user) {
    if (!user.username) {
      throw new Error("El usuario debe tener un nombre");
    }

    const hashedPassword = await bcrytp.hash(user.password, 10);
    const newUser = {
      id: uuidv4(),
      username: user.username,
      password: hashedPassword,
      enCola: false,
      isPlaying: false,
      tablero: null,
    };
    this.users.push(newUser);
    return newUser;
  }

  getUsers() {
    return [...this.users];
  }

  getUser(id) {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async login(username, password) {
    const user = this.users.find((user) => user.username === username);
    if (!user) {
      throw new Error("usuario no encontrado");
    }
    const Comparepasswords = await bcrytp.compare(password, user.password);
    if (!Comparepasswords) {
      throw new Error("Contraseña incorrecta");
    }
    return user;
  }
}

export class UserInGame extends UserModel {
  constructor() {
    super();
  }

  enCola(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("usuario no encontrado");
    }
    user.enCola = true;
  }

  startPlaying(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("usuario no encontrado");
    }
    user.enCola = false;
    user.isPlaying = true;
    user.tablero = generarTablerosUnicos();
  }

  getPlayingUsers() {
    return this.users.filter((user) => user.isPlaying);
  }

  finishPlay(id) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new Error("usuario no encontrado");
    }
    user.enCola = false;
    user.isPlaying = false;
    user.tablero = null;
  }
}
