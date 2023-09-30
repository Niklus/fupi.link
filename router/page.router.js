import { Router } from "../deps.js";
import { auth } from "../middlewares/auth.js";
import { userHandler } from "../middlewares/userHandler.js";

export const pageRouter = new Router();

pageRouter.get(
  "/",
  userHandler,
  (ctx) => (ctx.body = ctx.render("home", { title: "Home" }))
);

pageRouter.get(
  "/about",
  (ctx) => (ctx.body = ctx.render("about", { title: "About" }))
);

pageRouter.get(
  "/login",
  userHandler,
  (ctx) => (ctx.body = ctx.render("login", { title: "Login" }))
);

pageRouter.get(
  "/signup",
  userHandler,
  (ctx) => (ctx.body = ctx.render("signup", { title: "Sign up" }))
);

pageRouter.get("/user", auth, async (ctx) => {
  const records = await ctx.kv.list({
    prefix: ["link-by-user", ctx.state.user._id],
  });

  const links = [];

  for await (const link of records) {
    links.push(link.value);
  }

  ctx.body = ctx.render("user", { title: "User", user: ctx.state.user, links });
});

pageRouter.get("/logout", (ctx) => {
  ctx.cookies.set("token", null, { httpOnly: true, maxAge: -1 });
  ctx.redirect("/");
});
