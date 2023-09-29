import { Router } from "../../deps.js";
import { createLink } from "../../controllers/link.controller.js";
import { auth } from "../../middlewares/auth.js";

export const linkRouter = new Router({
  prefix: "/api/links",
});

linkRouter.post("/", createLink);

// protected routes
linkRouter.post("/user", auth, createLink);
