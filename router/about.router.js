import Router from "@koa/router";

export const aboutRouter = new Router({
  prefix: "/info",
});

aboutRouter.get("/about", (ctx) => {
  ctx.body = ctx.render("about", { title: "About" });
});
