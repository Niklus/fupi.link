const notFound = (ctx, next) => {
  ctx.status = 404;
  ctx.body = ctx.render("notFound", { title: "Not Found" });
  return next();
};

export default notFound;
