import { nanoid } from "nanoid";
import helmet from "koa-helmet";

const security = (ctx, next) => {
  ctx.state.nonce = nanoid(32);
  return helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: ["'self'", `'nonce-${ctx.state.nonce}'`],
        styleSrc: ["'self'", `'nonce-${ctx.state.nonce}'`],
      },
    },
  })(ctx, next);
};

export default security;
