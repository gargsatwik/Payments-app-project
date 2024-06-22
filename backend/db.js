import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const DB_URI = process.env.DB_URI;
const client = await mongoose.connect(DB_URI);

const usersSchema = new Schema({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
});

const balancesSchema = new Schema({
  balance: { type: Number, default: 0 },
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
});

export const Users = mongoose.model("Users", usersSchema);
export const Balances = mongoose.model("Balances", balancesSchema);

const saltLength = 10;

async function insertUser(user) {
  const hashedPassword = await bcrypt.hash(user.password, saltLength);
  const updatedField = {
    password: hashedPassword,
  };
  const newUser = await Users.create({ ...user, ...updatedField });
  await Balances.create({
    userId: user._id,
    balance: 1 + Math.random() * 10000,
  });
  return newUser;
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

export { insertUser, updateUser };
