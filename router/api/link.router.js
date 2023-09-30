import { Router } from "../../deps.js";
import { createLink } from "../../controllers/link.controller.js";
import { auth } from "../../middlewares/auth.js";

export const linkRouter = new Router({
  prefix: "/api/links",
});

// create public link
linkRouter.post("/", createLink);
// create private link
linkRouter.post("/user", auth, createLink);
