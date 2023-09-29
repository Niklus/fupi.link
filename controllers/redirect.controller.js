export const goToLandingPage = (ctx) => {
  ctx.redirect("http://127.0.0.1:3000"); // TODO: change to fupilink.com
};

export const goToLink = async (ctx) => {
  try {
    const { linkId } = ctx.params;

    const item = await ctx.kv.get(["links", linkId]);

    if (!item?.value) {
      return ctx.redirect(
        "http://127.0.0.1:3000/?message=" + "Link not found. Create a new one?"
      );
    }

    const { clicks, ...rest } = item.value;

    await ctx.kv.set(["links", linkId], {
      clicks: clicks + 1,
      ...rest,
    });

    ctx.redirect(item.value.link);
  } catch (err) {
    ctx.throw(500, err.message);
  }
};
