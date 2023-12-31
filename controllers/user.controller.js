import { jwt } from "../deps.js";
import { isEmail } from "../deps.js";
import { nanoid } from "../deps.js";
import { crypto } from "../deps.js";
import { util } from "../deps.js";

const scrypt = util.promisify(crypto.scrypt);

const createToken = (_id) => {
  return jwt.sign({ _id }, Deno.env.get("JWT_SECRET"), { expiresIn: "3d" });
};

export const signUp = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    if (!isEmail(email)) {
      return ctx.redirect("/signup?error=email&msg=Invalid email");
    }

    if (password.length < 6) {
      return ctx.redirect("/signup?error=password&msg=Password too short");
    }

    const result = await ctx.kv.get(["user-by-email", email]);

    if (result.value) {
      return ctx.redirect("/signup?error=email&msg=Email already exists");
    }

    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(password, salt, 64);
    const _id = nanoid(10);

    const user = {
      _id,
      email,
      password: `${buf.toString("hex")}.${salt}`,
    };

    const primaryKey = ["user", _id];
    const secondaryKey = ["user-by-email", email];

    const res = await ctx.kv
      .atomic()
      .set(primaryKey, user)
      .set(secondaryKey, user)
      .commit();

    if (!res.ok) {
      throw new Error("Failed to create link");
    }

    const token = createToken(_id);

    ctx.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      signed: true,
    });

    ctx.redirect("/user?message=Signed up");
  } catch (err) {
    ctx.throw(500, err);
  }
};

export const logIn = async (ctx) => {
  try {
    const { email, password } = ctx.request.body;

    if (!isEmail(email)) {
      return ctx.redirect("/login?error=email&msg=Invalid email");
    }

    const result = await ctx.kv.get(["user-by-email", email]);

    if (!result?.value) {
      return ctx.redirect("/login?error=email&msg=Email not found");
    }

    const { _id, password: savedPassword } = result.value;

    const [hashed, salt] = savedPassword.split(".");
    const hashedProvided = await scrypt(password, salt, 64);

    const match = hashed === hashedProvided.toString("hex");

    if (!match) {
      return ctx.redirect("/login?error=password&msg=Incorrect password");
    }

    const token = createToken(_id);

    ctx.cookies.set("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 3,
      signed: true,
    });

    ctx.redirect("/user");
  } catch (err) {
    ctx.throw(500, err);
  }
};

export const deleteUser = async (ctx) => {
  try {
    const { _id } = ctx.state.user;

    const primaryKey = ["user", _id];
    const secondaryKey = ["user-by-email", ctx.state.user.email];

    const res = await ctx.kv
      .atomic()
      .delete(primaryKey)
      .delete(secondaryKey)
      .commit();

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    ctx.redirect("/?message=Deleted user");
  } catch (err) {
    ctx.throw(500, err);
  }
};
