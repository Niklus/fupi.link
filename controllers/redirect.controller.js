export const goToLandingPage = (ctx) => {
  ctx.redirect("http://127.0.0.1:3000"); // TODO: change to fupilink.com
};

export const goToLink = async (ctx) => {
  try {
    const { id } = ctx.params;

    /*const collection = await ctx.db.collection("links");
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

    ctx.redirect(item.props.link);*/

    ctx.redirect(
      "http://127.0.0.1:3000/?message=" + "Link not found. Create a new one?"
    );
  } catch (err) {
    ctx.throw(500, err.message);
  }
};
