import { nanoid } from "../deps.js";
import { helmet } from "../deps.js";

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
