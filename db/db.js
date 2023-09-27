import db from "@cyclic.sh/dynamodb";

export default async (ctx, next) => {
  ctx.db = db;
  return next();
};
