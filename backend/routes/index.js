import { Router } from "express";
import { userRouter } from "./user.js";
import { accountRouter } from "./account.js";

const apiRouter = Router();
apiRouter.use("/user", userRouter);
apiRouter.use("/account", accountRouter);

export { apiRouter };
