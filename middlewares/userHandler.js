export const userHandler = (ctx, next) => {
  const token = ctx.cookies.get("token");
  if (token) {
    ctx.redirect("/user");
  } else {
    return next();
  }
};
