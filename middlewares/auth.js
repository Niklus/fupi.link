import { jwt } from "../deps.js";

export const auth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    return ctx.throw(401, "Authorization token required");
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, Deno.env.get("JWT_SECRET"));

    let result = await ctx.kv.get(["users", _id]);

    // If user doesn't exist, return error even though token is valid
    if (!result?.value) {
      return ctx.throw(401, "Request is not authorized");
    }

    ctx.state.user = result.value;

    return next(); // Do I need to return next() here?
  } catch (error) {
    console.error(error.message, error.stack);
    ctx.body = "Server Error";
  }
};
