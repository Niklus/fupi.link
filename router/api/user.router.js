import { Router } from "../../deps.js";

import {
  signUp,
  logIn,
  deleteUser,
} from "../../controllers/user.controller.js";

export const userRouter = new Router({
  prefix: "/api/users",
});

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);

// Use auth middleware to protect this route
userRouter.del("/delete", deleteUser);
