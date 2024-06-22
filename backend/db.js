import mongoose, { Mongoose, Schema, mongo } from "mongoose";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

dotenv.config();
const DB_URI = process.env.DB_URI;
const client = await mongoose.connect(DB_URI);

const usersSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  _id: uuidv4(),
});

const balancesSchema = new Schema({
  balance: { type: Number, default: 0 },
  _id: { type: Schema.Types.ObjectId, ref: "Users" },
});

export const Users = mongoose.model("Users", usersSchema);
export const Balances = mongoose.model("Balances", balancesSchema);

const saltLength = 10;

async function insertUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, saltLength);
  const updatedField = {
    password: hashedPassword,
  };
  await Users.create({ ...user, ...updatedField });
  await Balances.create({
    _id: user._id,
    balance: 1 + Math.random() * 10000,
  });
}

async function updateUser(req) {
  const currentData = Users.findOne({ _id: req.userId });
  const newData = req.body;
  var password = currentData.password;
  if (newData.password != currentData.password) {
    password = await bcrypt.hash(newData.password, saltLength);
  }
  const updatedData = {
    password: hashedPassword,
    firstName: newData.firstName,
    lastName: newData.lastName,
  };
  await Users.updateOne(updatedData, {
    _id: req.userId,
  });
}
