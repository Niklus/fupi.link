import { nanoid } from "nanoid";
import isURL from "validator/lib/isURL.js";
import Router from "@koa/router";

export const linkRouter = new Router({
  prefix: "/api/links",
});

linkRouter.post("/", async (ctx) => {
  let user = "anonymous";

  try {
    const { body } = ctx.request;

    if (!isURL(body.link) || !body.link) {
      return ctx.redirect("/?message=" + "Invalid URL");
    }

    const collection = await ctx.db.collection("links");

    const items = await collection.filter({
      link: body.link,
      user,
    });

    if (items.results.length) {
      console.log("Found existing link");
      return ctx.redirect("/?shortLink=" + items.results[0].props.shortLink);
    }

    let idExists = true;
    let linkId;

    while (idExists) {
      linkId = nanoid(5);
      const item = await collection.get(linkId);
      if (!item) {
        idExists = false;
      }
    }

    const { props } = await ctx.db.collection("links").set(linkId, {
      link: body.link,
      shortLink: `${process.env.ORIGIN}/${linkId}`,
      clicks: 0,
      user,
    });

    ctx.redirect("/?shortLink=" + props.shortLink);
  } catch (err) {
    console.error(err);
    ctx.throw(500, "Internal Server Error");
  }
});

/*linkRouter.get("/", async (ctx) => {
  try {
    const collection = await ctx.db.collection("links");
    const items = await collection.list();
    console.log(items);
    ctx.body = JSON.stringify(items, null, 3);
  } catch (err) {
    console.error(err);
    ctx.throw(500, "Internal Server Error");
  }
});*/
