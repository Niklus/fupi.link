import Koa from "koa";
import vhost from "koa-virtual-host";
import logger from "koa-logger";
import serve from "koa-static";
import { koaBody } from "koa-body";
import compress from "koa-compress";
import security from "./middleware/security.js";
import * as router from "./router/index.js";
import notFoundHandler from "./middleware/notFoundHandler.js";
import errorHandler from "./middleware/errorHandler.js";
import db from "./db/db.js";
import views from "./views/index.js";
import "dotenv/config.js";

const PORT = process.env.PORT || 3000;

// Apps
const app_redir = new Koa();
const app_landing = new Koa();
const app_host = new Koa();

// Link Redirector
app_redir
  .use(router.redirectRouter.routes())
  .use(router.redirectRouter.allowedMethods());

// Landing Page
app_landing
  .use(koaBody())
  .use(router.pageRouter.routes())
  .use(router.pageRouter.allowedMethods())
  .use(router.linkRouter.routes())
  .use(router.linkRouter.allowedMethods())
  .use(router.userRouter.routes())
  .use(router.userRouter.allowedMethods());

// Host
app_host
  .use(db)
  .use(compress())
  .use(security)
  .use(logger())
  .use(serve("./public"))
  .use(views)
  .use(vhost(/localhost/i, app_redir)) // for fupi.link
  .use(vhost("127.0.0.1", app_landing)) // for fupilink.com
  .use(notFoundHandler)
  .on("error", errorHandler);

app_host.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
