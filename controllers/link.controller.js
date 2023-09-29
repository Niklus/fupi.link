import { nanoid } from "../deps.js";
import { isURL } from "../deps.js";

export const createLink = async (ctx) => {
  const userId = ctx.state?.user?._id || "anonymous";

  try {
    const { body } = ctx.request;

    if (!isURL(body.link) || !body.link) {
      return ctx.redirect("/?message=" + "Invalid URL");
    }

    let result = await ctx.kv.get([userId, body.link]);

    if (result?.value) {
      console.log("Found existing link");
      return ctx.redirect("/?shortLink=" + result.value.shortLink);
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
    const secondaryKey = [userId, body.link];

    console.log("Creating new link");

    const res = await ctx.kv
      .atomic()
      .set(primaryKey, link)
      .set(secondaryKey, link)
      .commit();

    if (!res.ok) {
      throw new Error("Failed to create link");
    }

    ctx.redirect(`/?shortLink=${shortLink}`);
  } catch (err) {
    ctx.throw(500, err.message);
  }
};
