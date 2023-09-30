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

    const { clicks, link, userId, shortLink } = item.value;

    const record = {
      clicks: clicks + 1,
      link,
      userId,
      linkId,
      shortLink,
    };

    const primaryKey = ["links", linkId];
    const secondaryKey = ["link-by-user", userId, link];

    const res = await ctx.kv
      .atomic()
      .set(primaryKey, record)
      .set(secondaryKey, record)
      .commit();

    if (!res.ok) {
      throw new Error("Failed to create link");
    }

    ctx.redirect(link);
  } catch (err) {
    ctx.throw(500, err.message);
  }
};
