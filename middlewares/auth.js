import { jwt } from "../deps.js";

export const auth = async (ctx, next) => {
  // Get token from header
  const token = ctx.cookies.get("token");

  // Check if not token exists
  if (!token) {
    return ctx.redirect("/login?msg=Not authorized");
  }

  try {
    const { _id } = jwt.verify(token, Deno.env.get("JWT_SECRET"));
    const result = await ctx.kv.get(["user", _id]);

    if (result?.value) {
      ctx.state.user = result.value;
      return next();
    } else {
      ctx.throw(401, "Request is not authorized");
    }
  } catch (error) {
    console.error(error.message, error.stack);
    ctx.cookies.set("token", null, { httpOnly: true, maxAge: -1 });
    ctx.redirect("/login?msg=session expired");
  }
};
