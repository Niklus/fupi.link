const notFound = (ctx, next) => {
  // Last middleware in the chain - 404 Not Found
  ctx.status = 404;
  ctx.body = ctx.render("notFound", { title: "Not Found" });
};

export default notFound;
