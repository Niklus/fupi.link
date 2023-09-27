import koa from "koa";
import logger from "koa-logger";
import serve from "koa-static";
import { koaBody } from "koa-body";
import compress from "koa-compress";
import render from "./views/render.js";
import security from "./middleware/security.js";
import { homeRouter, aboutRouter, linkRouter } from "./router/index.js";
import notFound from "./middleware/notFound.js";
import db from "./db/db.js";
import "dotenv/config.js";

const app = new koa();

app
  .use(db)
  .use(compress())
  .use(security)
  .use(logger())
  .use(serve("./public"))
  .use(render)
  .use(koaBody())
  .use(homeRouter.routes())
  .use(homeRouter.allowedMethods())
  .use(aboutRouter.routes())
  .use(aboutRouter.allowedMethods())
  .use(linkRouter.routes())
  .use(linkRouter.allowedMethods())
  .use(notFound)
  .listen(3000, () => {
    console.log("Listening on port 3000");
  });
