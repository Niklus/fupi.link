import Router from "@koa/router";

export const pageRouter = new Router();

pageRouter.get("/", async (ctx) => {
  ctx.body = ctx.render("home", { title: "Home" });
});

pageRouter.get("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;

    const collection = await ctx.db.collection("links");
    const item = await collection.get(id);

    if (!item) {
      return ctx.redirect("/?message=" + "Item not found");
    }

    const { clicks, created, updated, ...rest } = item.props;

    const newProps = {
      clicks: clicks + 1,
      ...rest,
    };

    await collection.set(id, newProps);

    ctx.redirect(item.props.link);
  } catch (err) {
    ctx.throw(500, err.message);
  }
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
