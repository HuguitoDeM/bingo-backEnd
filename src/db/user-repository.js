import dbLocal from "db-local";

const { Schema } = new dbLocal({ path: "/db" });
const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export class UserRepository {
  static create({ username, password }) {
    if (typeof username !== "string")
      throw new Error("username tiene que ser un string");
    if (username.length < 3)
      throw new Error(
        "username tiene que tener al menos 3 caracteres de longitud"
      );
    if (typeof password !== "string")
      throw new Error("password tiene que ser un string");
    if (username.length < 6)
      throw new Error(
        "password tiene que tener al menos 6 caracteres de longitud"
      );
    const user = User.findOne({ username });
    if (user) throw new Error("username ya existe");
    const id = crypto.randomUUID();
    user
      .create({
        _id: id,
        username,
        password,
      })
      .save();
    return id;
  }
  static login({ username, password }) {}
}
