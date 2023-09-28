import koa from "koa";
import logger from "koa-logger";
import serve from "koa-static";
import { koaBody } from "koa-body";
import compress from "koa-compress";
import security from "./middleware/security.js";
import * as router from "./router/index.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import db from "./db/db.js";
import "dotenv/config.js";
import views from "./views/index.js";

const app = new koa();
const PORT = process.env.PORT || 3000;

app
  .use(db)
  .use(compress())
  .use(security)
  .use(logger())
  .use(serve("./public"))
  .use(views)
  .use(koaBody())
  .use(router.pageRouter.routes())
  .use(router.pageRouter.allowedMethods())
  .use(router.linkRouter.routes())
  .use(router.linkRouter.allowedMethods())
  .use(router.userRouter.routes())
  .use(router.userRouter.allowedMethods())
  .use(notFoundHandler)
  .on("error", errorHandler)
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
