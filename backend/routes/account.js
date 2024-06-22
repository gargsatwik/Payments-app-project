import { Router } from "express";
import { Balances } from "../db";
import authMiddleware from "../middleware";
import mongoose from "mongoose";

const accountRouter = Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Balances.findOne({ _id: req.userId });
  res.json({
    balance: account.balance,
  });
});

accountRouter.post("/transfer", async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;
  const fromAccount = await Balances.findOne({ _id: req.userId });
  if (!fromAccount || fromAccount.balance < amount) {
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  const toAccount = await Balances.findOne({ _id: to });
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid account",
    });
  }
  await Balances.updateOne({ _id: to }, { $inc: { balance: amount } }).session(
    session
  );
  await Balances.updateOne(
    { _id: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);

  session.commitTransaction();
  res.json({ message: "Transaction complete" });
});

module.exports(accountRouter);
