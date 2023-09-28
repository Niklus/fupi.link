import jwt from "jsonwebtoken";

const auth = async (ctx, next) => {
  const { authorization } = ctx.request.headers;

  if (!authorization) {
    return ctx.throw(401, "Authorization token required");
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    ctx.state.user = await ctx.db.collection("users").get(_id);

    // If user doesn't exist, return error even though token is valid
    if (!ctx.state.user) {
      return ctx.throw(401, "Request is not authorized");
    }

    await next();
  } catch (error) {
    console.error(error);
    ctx.throw(401, "Request is not authorized");
  }
};

export default auth;
