import Router from "@koa/router";

export const pageRouter = new Router();

pageRouter.get("/", async (ctx) => {
  ctx.body = ctx.render("home", { title: "Home" });
});

pageRouter.get("/page/about", async (ctx) => {
  ctx.body = ctx.render("about", { title: "About" });
});

pageRouter.get("/page/login", (ctx) => {
  ctx.body = ctx.render("login", { title: "Login" });
});

pageRouter.get("/page/signup", (ctx) => {
  ctx.body = ctx.render("signup", { title: "Sign up" });
});
