import Router from "@koa/router";

export const homeRouter = new Router();

homeRouter.get("/", async (ctx) => {
  ctx.body = ctx.render("home", { title: "Home" });
});

homeRouter.get("/:id", async (ctx) => {
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
    console.error(err);
    ctx.throw(500, "Internal Server Error");
  }
});
