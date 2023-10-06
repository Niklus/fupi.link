import { Router } from "../deps.js";
import { auth } from "../middlewares/auth.js";
import { userHandler } from "../middlewares/userHandler.js";

export const pageRouter = new Router();

// TODO: make a pageController and move these there

pageRouter.get(
  "/",
  userHandler,
  (ctx) => (ctx.body = ctx.render("home", { title: "Home", route: "/" }))
);

pageRouter.get(
  "/about",
  (ctx) => (ctx.body = ctx.render("about", { title: "About", route: "/about" }))
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

  // TODO: only pass user and destruct in template
  ctx.body = ctx.render("user", {
    title: "User",
    user: ctx.state.user,
    links,
    route: "/user",
  });
});

pageRouter.get("/analytics", auth, (ctx) => {
  // TODO: only pass user and destruct in template
  ctx.body = ctx.render("analytics", {
    title: "Analytics",
    user: ctx.state.user,
    route: "/analytics",
  });
});

pageRouter.get("/logout", (ctx) => {
  ctx.cookies.set("token", null, { httpOnly: true, maxAge: -1 });
  ctx.redirect("/");
});
