import { Router } from "../deps.js";

import {
  goToLandingPage,
  goToLink,
} from "../controllers/redirect.controller.js";

export const redirectRouter = new Router();

redirectRouter.get("/", goToLandingPage);
redirectRouter.get("/:linkId", goToLink);
