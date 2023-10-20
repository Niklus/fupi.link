import { nanoid } from "../deps.js";
import { helmet } from "../deps.js";

const security = (ctx, next) => {
  ctx.state.nonce = nanoid(32);
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", `'nonce-${ctx.state.nonce}'`],
        styleSrc: ["'self'", `'nonce-${ctx.state.nonce}'`],
        scriptSrcElem: [
          "https://cdnjs.cloudflare.com",
          `'nonce-${ctx.state.nonce}'`,
        ],
        styleSrcElem: [
          "https://cdn.jsdelivr.net",
          `'nonce-${ctx.state.nonce}'`,
        ],
        imgSrc: [
          "'self'",
          "data:",
          "https://cdn.jsdelivr.net",
        ],
      },
    },
  })(ctx, next);
};

export default security;
