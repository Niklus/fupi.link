export default (ctx, next) => {
  ctx.app.keys = [Deno.env.get("COOKIE_KEY")];
  return next();
};
