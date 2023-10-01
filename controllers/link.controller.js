import { nanoid } from "../deps.js";
import { isURL } from "../deps.js";

export const createLink = async (ctx) => {
  const userId = ctx.state?.user?._id || "anonymous";

  try {
    const { body } = ctx.request;

    if (!isURL(body.link) || !body.link) {
      return ctx.redirect("/?message=" + "Invalid URL");
    }

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
      .check({ key: primaryKey, versionstamp: null })
      .check({ key: secondaryKey, versionstamp: null })
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

export const deleteLink = async (ctx) => {
  // Get link id from ctx.params
  // Get user id from ctx.state.user._id

  // Delete link from KV store: links
  // Delete link from KV store: link-by-user

  ctx.redirect("/user");
};
