import { RateLimit } from "../deps.js";

const rateLimit = RateLimit.RateLimit;

const limiter = rateLimit.middleware({
  interval: { min: 120 }, // 120 minutes = 15*60*1000
  max: 100, // limit each IP to 100 requests per interval
});

export default (ctx, next) => {
  ctx.app.use(limiter);
  return next();
};
