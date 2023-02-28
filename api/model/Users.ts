import mongoose, { HydratedDocument, Model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types";
import { randomUUID } from "crypto";

const SALT_WORK_FACTOR = 10;

interface IUserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const Schema = mongoose.Schema;
const UserSchema = new Schema<IUser, UserModel, IUserMethods>({
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: async function (
        this: HydratedDocument<IUser>,
        username: string
      ): Promise<boolean> {
        if (!this.isModified("username")) return true;
        const user: HydratedDocument<IUser> | null = await Users.findOne({
          username,
        });
        return !Boolean(user);
      },
      message: "This user is already registered",
    },
  },

  password: {
    type: String,
    required: true,
  },

  token: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

UserSchema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;

    return ret;
  },
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

const Users = mongoose.model<IUser, UserModel>("Users", UserSchema);
export default Users;
