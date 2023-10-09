import { nanoid } from "../deps.js";

export const createLink = async (ctx) => {
  const userId = ctx.state?.user?._id || "anonymous";

  try {
    const { body } = ctx.request;

    let result = await ctx.kv.get(["link-by-user", userId, body.link]);

    if (result?.value) {
      console.log("Found existing link");

      if (userId === "anonymous") {
        return ctx.redirect("/?shortLink=" + result.value.shortLink);
      } else {
        return ctx.redirect("/user?shortLink=" + result.value.shortLink);
      }
    }

    let idExists = true;
    let linkId;

    while (idExists) {
      linkId = nanoid(5);
      const item = await ctx.kv.get(["links", linkId]);
      if (!item?.value) {
        idExists = false;
      }
    }

    const shortLink = `${Deno.env.get("ORIGIN")}/${linkId}`;

    const link = {
      link: body.link,
      clicks: 0,
      userId,
      linkId,
      shortLink,
    };

    const primaryKey = ["links", linkId];
    const secondaryKey = ["link-by-user", userId, body.link];

    console.log("Creating new link");

    const res = await ctx.kv
      .atomic()
      .set(primaryKey, link)
      .set(secondaryKey, link)
      .commit();

    if (!res.ok) {
      throw new Error("Failed to create link");
    }

    if (userId === "anonymous") {
      return ctx.redirect("/?shortLink=" + shortLink);
    } else {
      return ctx.redirect("/user?shortLink=" + shortLink);
    }
  } catch (err) {
    ctx.throw(500, err.message);
  }
};

export const getLinks = async (ctx) => {
  const records = await ctx.kv.list({
    prefix: ["link-by-user", ctx.state.user._id],
  });

  const links = [];

  for await (const link of records) {
    links.push(link.value);
  }

  ctx.body = JSON.stringify(links);
};

export const deleteLink = async (ctx) => {
  if (!ctx.state.user._id || ctx.state.user._id == "anonymous") {
    return ctx.throw(400, "Unauthorized");
  }

  const linkId = ctx.request.body.linkId;
  const link = ctx.request.body.link;

  if (!linkId || !link) {
    return ctx.throw(400, "Missing linkId or link");
  }

  try {
    const primaryKey = ["links", linkId];
    const secondaryKey = ["link-by-user", ctx.state.user._id, link];

    const res = await ctx.kv
      .atomic()
      .delete(primaryKey)
      .delete(secondaryKey)
      .commit();

    if (!res.ok) {
      throw new Error("Failed to delete link");
    }

    ctx.body = JSON.stringify({ ok: true });
  } catch (err) {
    ctx.throw(500, err.message);
  }
};
