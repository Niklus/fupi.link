import Router from "@koa/router";

export const redirectRouter = new Router();

redirectRouter.get("/", async (ctx) => {
  ctx.redirect("http://127.0.0.1:3000"); // TODO: change to fupilink.com
});

redirectRouter.get("/:id", async (ctx) => {
  try {
    const { id } = ctx.params;

    const collection = await ctx.db.collection("links");
    const item = await collection.get(id);

    if (!item) {
      return ctx.redirect(
        "http://127.0.0.1:3000/?message=" + "Link not found. Create a new one?"
      );
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
