import { safeBrowse } from "../deps.js";
import { isURL } from "../deps.js";

// Middleware to check if the link is valid and not malicious
export const linkHandler = async (ctx, next) => {
  const { body } = ctx.request;

  if (!isURL(body.link, { protocols: ["https"] }) || !body.link) {
    return ctx.redirect("/?message=" + "Invalid URL");
  }

  const lookup = safeBrowse({
    apiKey: Deno.env.get("GOOGLE_CLIENT_ID"),
  });

  try {
    const isMalicious = await lookup.checkSingle(body.link);
    if (isMalicious) {
      return ctx.redirect("/?message=" + "Malicious URL");
    }
    return next();
  } catch (err) {
    console.error(err);
    ctx.redirect("/?message=" + "Something went wrong. Try again later.");
  }
};
