const notFound = (ctx, next) => {
  ctx.body = ctx.render("notFound", { title: "Not Found" });
  return next();
};

export default notFound;
