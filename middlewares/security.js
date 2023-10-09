import { nanoid } from "../deps.js";
import { helmet } from "../deps.js";

const security = (ctx, next) => {
  ctx.state.nonce = nanoid(32);
  return helmet({
    contentSecurityPolicy: {
      directives: {
        scriptSrc: [`'nonce-${ctx.state.nonce}'`, "*cdnjs.cloudflare.com"],
        styleSrc: [`'nonce-${ctx.state.nonce}'`, "*.cdn.jsdelivr.net"],
      },
    },
  })(ctx, next);
};

export default security;
