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
    if (!ctx.user) {
      return ctx.throw(401, "Request is not authorized");
    }

    await next();
  } catch (error) {
    console.error(error);
    ctx.throw(401, "Request is not authorized");
  }
};

/*const auth = async (ctx, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findOne({ _id }).select("_id");

    // If user doesn't exist, return error even though token is valid
    if (!req.user) {
      return res.status(401).json({ error: "Request is not authorized" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};*/

export default auth;
