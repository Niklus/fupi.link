import { Koa } from "./deps.js";
import { logger } from "./deps.js";
import { serve } from "./deps.js";
import { koaBody } from "./deps.js";
import { compress } from "./deps.js";
import { vhost } from "./deps.js";
import { load } from "./deps.js";

import * as router from "./router/index.js";
import security from "./middlewares/security.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";
import errorHandler from "./middlewares/errorHandler.js";
import db from "./middlewares/db.js";
import views from "./middlewares/views.js";
import keys from "./middlewares/keys.js";
import { limiter } from "./middlewares/limiter.js";

// Load environment variables
await load({ export: true });

const PORT = Deno.env.get("PORT");

// Apps
const linker = new Koa();
const website = new Koa();
const host = new Koa();

// Link Redirector
linker
  .use(router.redirectRouter.routes())
  .use(router.redirectRouter.allowedMethods());

// Website
website
  .use(koaBody())
  .use(views)
  .use(router.pageRouter.routes())
  .use(router.pageRouter.allowedMethods())
  .use(router.linkRouter.routes())
  .use(router.linkRouter.allowedMethods())
  .use(router.userRouter.routes())
  .use(router.userRouter.allowedMethods());

// Host
host
  .use(limiter)
  .use(keys)
  .use(db)
  .use(compress())
  .use(serve(`${Deno.cwd()}/public`))
  .use(security)
  .use(logger())
  .use(vhost("fupilink.deno.dev", linker)) // CHANGE TO fupi.link later
  .use(vhost("fupilink.deno.dev", website)) // Change later to fupilink.com
  .use(notFoundHandler)
  .on("error", errorHandler)
  .listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
